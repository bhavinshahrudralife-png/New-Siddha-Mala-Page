"""Download official, public Rudralife product photography with source provenance."""
import concurrent.futures
import io
import json
import re
from html import unescape
from pathlib import Path
from urllib.parse import quote

import requests
from PIL import Image, ImageDraw

ROOT = Path('/app/frontend/public/assets/rudralife')
ROOT.mkdir(parents=True, exist_ok=True)
PRODUCTS = [
    ('bead-1', 'one-mukhi-without-capping'),
    ('bead-2', 'two-mukhi-super-collector-rudraksha'),
    ('bead-3', 'three-mukhi-rudraksha'),
    ('bead-4', 'four-mukhi-rudraksha'),
    ('bead-5', 'five-mukhi-rudraksha'),
    ('bead-6', 'six-mukhi-rudraksha'),
    ('bead-7', 'seven-mukhi-rudraksha'),
    ('bead-8', 'eight-mukhi-large-rudraksha'),
    ('bead-9', 'nine-mukhi-small-rudraksha'),
    ('bead-10', 'ten-mukhi-small-rudraksha'),
    ('bead-11', 'eleven-mukhi-small-rudraksha'),
    ('bead-12', 'twelve-mukhi-small-rudraksha'),
    ('bead-13', 'thirteen-mukhi-small-rudraksha'),
    ('bead-14', 'fourteen-mukhi-large-rudraksha'),
    ('bead-15', 'gaurishankar-rudraksha'),
    ('bead-16', 'ganesh-rudraksha'),
    ('mala', 'siddha-mala-large'),
    ('mala-collector', 'siddha-mala-collector'),
    ('mala-super', 'siddha-mala-super-collector'),
]

def download(product):
    name, slug = product
    url = f'https://www.rudralife.com/product/{slug}'
    r = requests.get(url, timeout=45)
    r.raise_for_status()
    match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', r.text, re.S)
    data = json.loads(match.group(1))['props']['pageProps']['product']
    og = unescape(re.search(r'<meta property="og:image" content="([^"]+)"', r.text).group(1))
    image = Image.open(io.BytesIO(requests.get(og, timeout=45).content)).convert('RGB')
    image.thumbnail((1800, 1800))
    image.save(ROOT / f'{name}-original.jpg', quality=95)
    record = {'id': name, 'url': url, 'image_source': og, 'name': data.get('item'), 'description': data.get('description'), 'benefits': data.get('benefits'), 'product_data': data}
    print(name, image.size, og, flush=True)
    return record

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        records = list(pool.map(download, PRODUCTS))
    (ROOT / 'sources.json').write_text(json.dumps(records, indent=2, ensure_ascii=False))
    sheet = Image.new('RGB', (1000, 4 * 250), '#f5f2ed')
    draw = ImageDraw.Draw(sheet)
    for i, (name, _) in enumerate(PRODUCTS):
        im = Image.open(ROOT / f'{name}-original.jpg')
        im.thumbnail((185, 212))
        x,y = (i % 5) * 200, (i // 5) * 250
        sheet.paste(im, (x + (200-im.width)//2, y))
        draw.text((x+12, y+215), name, fill='#351e12')
    sheet.save('/tmp/rudralife-contact-sheet.jpg')