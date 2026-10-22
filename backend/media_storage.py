"""Durable managed object storage. MongoDB owns metadata, never the storage key."""
import asyncio
import io
import os
import uuid
from datetime import datetime, timezone
import httpx
from PIL import Image, UnidentifiedImageError
from fastapi import HTTPException, Response
from pydantic import BaseModel

class MediaItem(BaseModel):
    id: str
    url: str
    filename: str
    content_type: str
    size: int
    created_at: str

storage_key = None
init_lock = asyncio.Lock()

async def init_storage(force=False):
    global storage_key
    async with init_lock:
        if storage_key and not force: return storage_key
        base = os.environ['INTEGRATION_PROXY_URL'].rstrip('/')
        async with httpx.AsyncClient(timeout=30) as client:
            result = await client.post(f'{base}/objstore/api/v1/storage/init',
                json={'emergent_key': os.environ['EMERGENT_LLM_KEY']})
            result.raise_for_status()
            storage_key = result.json()['storage_key']
            return storage_key

async def storage_request(method, path, data=None, content_type=None):
    base = os.environ['INTEGRATION_PROXY_URL'].rstrip('/') + '/objstore/api/v1/storage'
    for attempt in range(2):
        key = await init_storage(force=attempt == 1)
        headers = {'X-Storage-Key': key}
        if content_type: headers['Content-Type'] = content_type
        async with httpx.AsyncClient(timeout=90) as client:
            result = await client.request(method, f'{base}/objects/{path}', headers=headers, content=data)
        if result.status_code == 404 and attempt == 0: continue
        result.raise_for_status()
        return result

async def upload_media(db, file, user_id):
    raw = await file.read(12 * 1024 * 1024 + 1)
    if len(raw) > 12 * 1024 * 1024: raise HTTPException(413, 'Maximum file size is 12 MB.')
    if raw.startswith(b'%PDF'):
        ext, content_type = 'pdf', 'application/pdf'
    else:
        try:
            image = Image.open(io.BytesIO(raw))
            if image.format not in ('PNG','JPEG','WEBP') or image.width * image.height > 30_000_000:
                raise ValueError()
            image.load()
            image.thumbnail((2600, 2600))
            output = io.BytesIO()
            if image.mode in ('RGBA', 'LA') or 'transparency' in image.info:
                image.convert('RGBA').save(output, format='PNG', optimize=True)
                ext, content_type = 'png', 'image/png'
            else:
                image.convert('RGB').save(output, format='WEBP', quality=90)
                ext, content_type = 'webp', 'image/webp'
            raw = output.getvalue()
        except (UnidentifiedImageError, ValueError, OSError, Image.DecompressionBombError):
            raise HTTPException(422, 'Upload a valid PNG, JPEG, WebP image or PDF. SVG and HTML are not supported.')
    identity = str(uuid.uuid4())
    path = f"{os.environ['STORAGE_APP_NAME']}/uploads/{user_id}/{identity}.{ext}"
    location = {}
    try:
        result = await storage_request('PUT', path, raw, content_type)
        location['storage_path'] = result.json()['path']
    except (httpx.HTTPError, KeyError):
        # Durable fallback while managed storage is unavailable.
        from motor.motor_asyncio import AsyncIOMotorGridFSBucket
        location['gridfs_id'] = await AsyncIOMotorGridFSBucket(db, bucket_name='media_files').upload_from_stream(f'{identity}.{ext}', raw)
    item = MediaItem(id=identity, url=f'/api/media/{identity}', filename=(file.filename or 'upload')[:180],
        content_type=content_type, size=len(raw), created_at=datetime.now(timezone.utc).isoformat())
    await db.media.insert_one({**item.model_dump(), **location, 'is_deleted': False})
    return item

async def serve_media(db, identity):
    record = await db.media.find_one({'id': identity, 'is_deleted': False}, {'_id': 0})
    if not record: raise HTTPException(404, 'Media not found.')
    if record.get('gridfs_id'):
        from motor.motor_asyncio import AsyncIOMotorGridFSBucket
        stream = await AsyncIOMotorGridFSBucket(db, bucket_name='media_files').open_download_stream(record['gridfs_id'])
        content = await stream.read()
    else:
        try:
            content = (await storage_request('GET', record['storage_path'])).content
        except httpx.HTTPError:
            raise HTTPException(503, 'Media is temporarily unavailable.')
    return Response(content, media_type=record['content_type'], headers={
        'Cache-Control': 'public, max-age=86400', 'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; sandbox"})