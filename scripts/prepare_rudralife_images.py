"""Prepare local PNG cutouts of official photography (no generated substitutes)."""
import concurrent.futures
import io
import json
from pathlib import Path
from urllib.parse import quote
import numpy as np
import requests
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path('/app/frontend/public/assets/rudralife')

def cutout(name):
    im = Image.open(ROOT / f'{name}-original.jpg').convert('RGBA')
    a = np.asarray(im).copy()
    # Product backgrounds are neutral studio grey. Preserve brown/gold detail,
    # remove neutral background including spaces inside each organic silhouette.
    rgb = a[:, :, :3].astype(float)
    chroma = rgb.max(2) - rgb.min(2)
    mask = np.clip((chroma - 15) / 22, 0, 1)
    if name == 'bead-1':
        mask = np.clip((chroma - 34) / 22, 0, 1)
    a[:, :, 3] = (mask * 255).astype('uint8')
    result = Image.fromarray(a)
    bbox = result.getbbox()
    result = result.crop(bbox)
    result.thumbnail((600,600))
    padded = Image.new('RGBA',(result.width+30,result.height+30))
    padded.alpha_composite(result,(15,15))
    padded.save(ROOT / f'{name}.png', optimize=True)

def fetch_asset(item):
    name,url = item
    try:
        r = requests.get(url, timeout=45); r.raise_for_status()
        im=Image.open(io.BytesIO(r.content)).convert('RGBA')
        im.thumbnail((1800,1800))
        im.save(ROOT / f'{name}.png',optimize=True)
        return name,url
    except Exception as e:
        print(name, e, flush=True)

if __name__ == '__main__':
    for n in range(1,16): cutout(f'bead-{n}')
    records=json.loads((ROOT/'sources.json').read_text())
    urls=[]
    for name in ['mala','bead-16']:
        r=next(r for r in records if r['id']==name)
        for i,image in enumerate(r['product_data']['skus'][0]['image']):
            urls.append((f'{name}-gallery-{i}', 'https://www.rudralife.com/api/getImageByName?key='+quote(image['key'],safe='')))
    urls += [
        ('logo','https://www.rudralife.com/_next/static/media/logoDark.ef9912c5.png'),
        ('milind','https://www.rudralife.com/siddha-mala/assets/milind-soman.png'),
        ('dimple','https://www.rudralife.com/_next/static/media/Client_1.ade496c7.jpg'),
    ]
    for i,(hash_,ext) in enumerate([('c35d2a3f','png'),('e651f08c','png'),('eb6727a1','png'),('71881110','png'),('ffd195c5','png'),('6954b2a8','jpg'),('12160fc3','png')],1):
        urls.append((f'expert-{i}',f'https://www.rudralife.com/_next/static/media/Expert_{i}.{hash_}.{ext}'))
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        downloaded=list(pool.map(fetch_asset,urls))
    (ROOT/'additional-sources.json').write_text(json.dumps([i for i in downloaded if i],indent=2))
    gallery=[p for p in ROOT.glob('*gallery*.png')]+[ROOT/'logo.png']
    sheet=Image.new('RGB',(1200,900),'#faf7f2');draw=ImageDraw.Draw(sheet)
    for i,p in enumerate(gallery):
        im=Image.open(p);im.thumbnail((290,260));x,y=(i%4)*300,(i//4)*300
        sheet.paste(im,(x+(300-im.width)//2,y),im);draw.text((x+10,y+270),p.stem,fill='#321d10')
    sheet.save('/tmp/rudralife-gallery.jpg')