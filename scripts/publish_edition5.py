"""Owner-approved fifth-edition restructure. Preserves bead images, credentials and leads."""
import json
from copy import deepcopy
from pathlib import Path
import requests
from dotenv import dotenv_values

root = Path('/app')
new = json.loads((root/'backend/page_defaults.json').read_text())
url = dotenv_values(root/'frontend/.env')['REACT_APP_BACKEND_URL']; env = dotenv_values(root/'backend/.env')
session = requests.Session()
session.post(url+'/api/auth/login', json={'email': env['ADMIN_EMAIL'], 'password': env['ADMIN_PASSWORD']}, timeout=25).raise_for_status()
current = session.get(url+'/api/page-content', timeout=25).json()
(root/'source_assets').mkdir(exist_ok=True)
(root/'source_assets/page-before-edition5.json').write_text(json.dumps(current, indent=2))
page = current['page']

def fill(target, template):
    for key, value in template.items():
        if key not in target: target[key] = deepcopy(value)
        elif isinstance(value, dict) and isinstance(target[key], dict): fill(target[key], value)

for key in ('story', 'patrons', 'founder', 'featured', 'form', 'thankyou', 'order'):
    page[key] = deepcopy(new[key])
page['gallery'].pop('cta_label', None)
page['brand']['nav'] = deepcopy(new['brand']['nav'])
page['faq']['cta_label'] = new['faq']['cta_label']
fill(page, new)
r = session.put(url+'/api/admin/page-content', json={'page': page, 'revision': current['revision']}, timeout=30)
print('Publish', r.status_code, r.text[:300]); r.raise_for_status()
session.post(url+'/api/auth/logout', timeout=20)
