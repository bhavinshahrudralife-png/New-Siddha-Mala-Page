"""Versioned content documents. Rendering is plain text, never arbitrary HTML."""
import json
import re
from pathlib import Path
from datetime import datetime, timezone
from typing import Any
from fastapi import HTTPException
from pydantic import BaseModel, Field

class PageSave(BaseModel):
    page: dict[str, Any]
    revision: int = Field(ge=0)

class PageResponse(BaseModel):
    page: dict[str, Any] = Field(default_factory=dict)
    revision: int = 0
    updated_at: str | None = None

async def seed_page(db, legacy):
    # The committed JSON is generated before serving, never reconstructed at runtime.
    page = json.loads((Path(__file__).parent/'page_defaults.json').read_text())
    if legacy.get('hero_title'): page['hero']['tagline'] = legacy['hero_title']
    if legacy.get('hero_subtitle'): page['hero']['description'] = legacy['hero_subtitle']
    for key in ('phone','email','whatsapp','address','hours','website'):
        if key in legacy: page['footer'][key] = legacy[key]
    await db.page_content.update_one({'key':'landing'}, {'$setOnInsert':{
        'key':'landing', 'page':page, 'revision':1, 'updated_at':datetime.now(timezone.utc).isoformat()
    }}, upsert=True)

def validate_page(page):
    if len(json.dumps(page).encode()) > 600_000:
        raise HTTPException(422, 'Page content is too large.')
    required = ['brand', 'hero', 'intro', 'signature', 'story', 'gallery', 'beads',
                'education', 'benefits', 'patrons', 'trust', 'experts', 'community',
                'faq', 'consultation', 'form', 'footer', 'thankyou', 'seo', 'motion', 'order',
                'appearance', 'beadJourney', 'spiritual']
    if any(key not in page for key in required):
        raise HTTPException(422, 'The page is missing a required section.')
    template = json.loads((Path(__file__).parent/'page_defaults.json').read_text())
    def structure(value, example, path):
        if isinstance(example, dict):
            if not isinstance(value, dict): raise HTTPException(422, f'{path} must be an object.')
            for field, sample in example.items():
                if field not in value: raise HTTPException(422, f'Missing content field: {path}.{field}')
                structure(value[field], sample, f'{path}.{field}')
        elif isinstance(example, list):
            if not isinstance(value, list): raise HTTPException(422, f'{path} must be a list.')
            if example:
                for item in value: structure(item, example[0], path)
        elif isinstance(example, bool):
            if not isinstance(value, bool): raise HTTPException(422, f'{path} must be true or false.')
        elif isinstance(example, (int,float)):
            if isinstance(value,bool) or not isinstance(value,(int,float)): raise HTTPException(422, f'{path} must be a number.')
        elif not isinstance(value,str): raise HTTPException(422, f'{path} must be text.')
    structure(page, template, 'page')
    def check(value, key='', depth=0):
        if depth > 12:
            raise HTTPException(422, 'Content nesting is too deep.')
        if isinstance(value, dict):
            for k, v in value.items():
                if k.startswith('$') or '.' in k or k in ('__proto__', 'constructor', 'prototype'):
                    raise HTTPException(422, 'Invalid content field.')
                check(v, k, depth + 1)
        elif isinstance(value, list):
            if len(value) > 100:
                raise HTTPException(422, 'A section can contain at most 100 items.')
            for item in value: check(item, key, depth + 1)
        elif isinstance(value, str):
            if len(value) > 12000: raise HTTPException(422, 'A text field is too long.')
            if key in ('image', 'img', 'logo', 'url', 'href', 'source', 'brochure', 'privacy_url', 'terms_url') and value:
                if not re.match(r'^(https?://[^\s]+|/(?!/)[^\s]*|#[a-zA-Z][\w-]*|mailto:[^\s]+|tel:[+\d\s-]+)$', value):
                    raise HTTPException(422, f'Invalid link or image URL in {key}.')
    check(page)
    if not page['hero'].get('title', '').strip():
        raise HTTPException(422, 'Hero heading cannot be empty.')
    if not page['hero']['image'] or not page['brand']['logo']:
        raise HTTPException(422, 'The hero image and brand logo are required.')
    if len(page['beads'].get('items', [])) != 16:
        raise HTTPException(422, 'Keep all 16 distinct Rudraksha forms in the composition.')
    for section in ('beads', 'experts', 'faq', 'benefits', 'gallery', 'patrons'):
        ids = [str(item.get('id', '')) for item in page[section].get('items', [])]
        if '' in ids or len(ids) != len(set(ids)):
            raise HTTPException(422, f'{section}: item IDs must be non-empty and unique.')
        if page[section].get('visible') and not ids:
            raise HTTPException(422, f'{section}: add an item or hide the section.')
    if any(not isinstance(b['quantity'],int) or not 1 <= b['quantity'] <= 10 for b in page['beads']['items']):
        raise HTTPException(422, 'Bead quantities must be whole numbers from 1 to 10.')
    field_keys=[field.get('key') for field in page['form']['fields']]
    if set(field_keys) != {'name','email','phone','city','profession','message'} or len(field_keys) != 6:
        raise HTTPException(422, 'Keep each of the six consultation fields exactly once.')
    sections = set(required) - {'brand', 'hero', 'form', 'footer', 'thankyou', 'seo', 'motion', 'order', 'appearance'}
    order = page['order']
    if len(order) != len(set(order)) or set(order) != sections:
        raise HTTPException(422, 'Page order must contain each content section exactly once.')
    if not 2 <= float(page['motion'].get('journey_length', 3.5)) <= 6:
        raise HTTPException(422, 'Journey length must be between 2 and 6 screen heights.')
    for field in page['form'].get('fields', []):
        if field.get('key') in ('name', 'email', 'phone') and not field.get('required'):
            raise HTTPException(422, 'Name, email and phone remain required.')
    for stat in page['community'].get('stats', []):
        if stat.get('visible') and (not stat.get('verified') or not stat.get('source', '').strip()):
            raise HTTPException(422, 'Visible customer statistics need verified status and an evidence source.')
    for colour in page['appearance'].values():
        if not re.fullmatch(r'#[0-9a-fA-F]{6}', colour):
            raise HTTPException(422, 'Page colours must be six-digit hex colours.')
    for section in ('patrons','beadJourney'):
        if not 3 <= page[section]['interval_seconds'] <= 30:
            raise HTTPException(422, 'Story intervals must be between 3 and 30 seconds.')
    for bead in page['beads']['items']:
        if len(bead['locations']) > bead['quantity']:
            raise HTTPException(422, f"{bead['name']}: marker count cannot exceed the listed quantity.")
        for point in bead['locations']:
            if not isinstance(point,dict) or set(point) != {'id','x','y','verified','image','note'}:
                raise HTTPException(422, 'Invalid bead-placement marker.')
            if any(isinstance(point[a],bool) or not isinstance(point[a],(int,float)) or not 0 <= point[a] <= 100 for a in ('x','y')):
                raise HTTPException(422, 'Marker coordinates must be between 0 and 100.')
            if not isinstance(point['verified'],bool) or not isinstance(point['note'],str):
                raise HTTPException(422, 'Invalid placement confirmation.')
            if point['verified'] and (point['image'] != page['beads']['image'] or not point['note'].strip()):
                raise HTTPException(422, 'Confirmed markers need a verification note and must match the current mala image.')

async def read_page(db):
    doc = await db.page_content.find_one({'key': 'landing'}, {'_id': 0})
    return PageResponse(**(doc or {}))

async def save_page(db, data: PageSave):
    validate_page(data.page)
    now = datetime.now(timezone.utc).isoformat()
    if data.revision == 0:
        from pymongo.errors import DuplicateKeyError
        try:
            await db.page_content.insert_one({'key': 'landing', 'page': data.page,
                'revision': 1, 'updated_at': now})
        except DuplicateKeyError:
            raise HTTPException(409, 'Content changed in another session. Reload before saving.')
    else:
        result = await db.page_content.update_one({'key': 'landing', 'revision': data.revision},
            {'$set': {'page': data.page, 'updated_at': now}, '$inc': {'revision': 1}})
        if not result.matched_count:
            raise HTTPException(409, 'Content changed in another session. Reload before saving.')
    return PageResponse(page=data.page, revision=data.revision + 1, updated_at=now)