"""One-time approved redesign migration. Preserve owner edits, never reset login/data."""
import json
from pathlib import Path
from copy import deepcopy
import requests
from dotenv import dotenv_values

root=Path('/app')
old=json.loads((root/'source_assets/peach/defaults-before.json').read_text())
new=json.loads((root/'backend/page_defaults.json').read_text())
front=dotenv_values(root/'frontend/.env');backend=dotenv_values(root/'backend/.env')
url=front['REACT_APP_BACKEND_URL'];session=requests.Session()
session.post(url+'/api/auth/login',json={'email':backend['ADMIN_EMAIL'],'password':backend['ADMIN_PASSWORD']},timeout=25).raise_for_status()
current=session.get(url+'/api/page-content',timeout=25).json()
(root/'source_assets/peach/page-before-update.json').write_text(json.dumps(current,indent=2))
def merge(before,after,existing):
    if existing==before:return deepcopy(after)
    if isinstance(after,dict) and isinstance(existing,dict):
        result=deepcopy(existing)
        for key,value in after.items():
            result[key]=merge((before or {}).get(key),value,existing.get(key)) if key in existing else deepcopy(value)
        return result
    if isinstance(after,list) and isinstance(existing,list) and after and isinstance(after[0],dict) and 'id' in after[0]:
        before_by={v['id']:v for v in before or []};new_by={v['id']:v for v in after};result=[]
        for item in existing:
            result.append(merge(before_by.get(item['id']),new_by[item['id']],item) if item['id'] in new_by else item)
        present={v['id'] for v in existing};result += [deepcopy(v) for v in after if v['id'] not in present]
        return result
    return existing
page=merge(old,new,current['page'])
for key in ('hero','signature','beads'):page[key]['image']=new[key]['image']
for section,after in [('intro','intro'),('benefits','benefits'),('experts','experts')]:
    if section=='intro':page[section]['image']=new[section]['image']
    else:
        byid={v['id']:v for v in new[section]['items']}
        for item in page[section]['items']:
            if item['id'] in byid:
                key='img' if section=='experts' else 'image';item[key]=byid[item['id']][key]
for item in page['beads']['items']:
    match=next(v for v in new['beads']['items'] if v['id']==item['id']);item['img']=match['img']
    for point in item.get('locations',[]):point['verified']=False
for key,anchor in [('beadJourney','intro'),('spiritual','signature')]:
    if key not in page['order']:page['order'].insert(page['order'].index(anchor)+1,key)
response=session.put(url+'/api/admin/page-content',json={'page':page,'revision':current['revision']},timeout=30)
print('Publish',response.status_code,response.text[:200]);response.raise_for_status()
session.post(url+'/api/auth/logout',timeout=20)
print('Peach edition published. Existing auth, forms, leads and custom edits preserved.')