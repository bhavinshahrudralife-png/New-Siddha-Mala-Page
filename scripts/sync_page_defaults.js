// Keep backend defaults identical to the frontend's typed, source-backed content.
const fs = require('fs');
const vm = require('vm');
let base = fs.readFileSync('/app/frontend/src/data/content.js','utf8').replace(/export const /g,'const ');
let page = fs.readFileSync('/app/frontend/src/data/pageDefaults.js','utf8').replace(/^import .*;\n/,'').split('export function mergePage')[0].replace('export const DEFAULT_PAGE','const DEFAULT_PAGE');
const data = vm.runInNewContext(`${base}\n${page}\nJSON.stringify(DEFAULT_PAGE,null,2);`);
fs.writeFileSync('/app/backend/page_defaults.json',data);
console.log('Synchronized page defaults.');