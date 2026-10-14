import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { createElement } from 'react';
import { MediaField } from './MediaLibrary';

export const fieldLabel = value => value.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const mediaKeys = ['image', 'img', 'logo', 'brochure'];
const longKeys = ['text', 'description', 'desc', 'paragraphs', 'note', 'disclaimer', 'answer', 'a', 'message', 'caption', 'quote', 'breakdown', 'privacy', 'composition', 'signoff'];

function newValue(value) {
  if (Array.isArray(value)) return [];
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === 'id' ? crypto.randomUUID().slice(0, 8) : newValue(v)]));
  if (typeof value === 'boolean') return false;
  if (typeof value === 'number') return 1;
  return '';
}

export function ContentField({ value, onChange, path, name, locked = false }) {
  const label = fieldLabel(name);
  if (Array.isArray(value)) {
    const fixed = path === 'beads-items' || path === 'form-fields' || path === 'order';
    const move = (index, delta) => {
      const next = [...value];
      [next[index], next[index + delta]] = [next[index + delta], next[index]];
      onChange(next);
    };
    return <fieldset className="cms-array">
      <legend>{label}<span>{value.length}</span></legend>
      {value.map((item, i) => <details key={typeof item === 'object' ? item.id || item.key || i : i} className="cms-repeater" data-testid={`cms-item-${path}-${i}`} open={typeof item !== 'object'}>
        <summary data-testid={`cms-expand-${path}-${i}`}><span>{typeof item === 'object' ? (item.name || item.title || item.q || item.label || `Item ${i + 1}`) : `${i + 1}. ${item}`}</span><ChevronDown size={14}/></summary>
        <div className="cms-item-toolbar">
          <button type="button" title="Move up" aria-label="Move item up" disabled={i === 0} onClick={() => move(i, -1)} data-testid={`cms-up-${path}-${i}`}><ChevronUp size={15}/></button>
          <button type="button" title="Move down" aria-label="Move item down" disabled={i === value.length - 1} onClick={() => move(i, 1)} data-testid={`cms-down-${path}-${i}`}><ChevronDown size={15}/></button>
          {!fixed && <button type="button" title="Remove item" aria-label="Remove item" onClick={() => onChange(value.filter((_, n) => n !== i))} data-testid={`cms-remove-${path}-${i}`}><Trash2 size={14}/></button>}
        </div>
        <div className="cms-item-fields">
          {createElement(ContentField, {value:item, name:typeof item === 'object' ? 'details' : 'value', path:`${path}-${i}`, locked:path === 'order', onChange:v => onChange(value.map((old, n) => n === i ? v : old))})}
        </div>
      </details>)}
      {!fixed && <button type="button" className="admin-secondary" data-testid={`cms-add-${path}`} onClick={() => onChange([...value, newValue(value[0] || { id: '', title: '', text: '' })])}><Plus size={14}/>Add item</button>}
    </fieldset>;
  }
  if (value && typeof value === 'object') {
    return <div className="cms-object">{Object.entries(value).map(([k, v]) => createElement(ContentField, {
      key:k, value:v, name:k, path:`${path}-${k}`, locked:k === 'id' || k === 'key' || (k === 'required' && ['name', 'email', 'phone'].includes(value.key)), onChange:next => onChange({...value,[k]:next})
    }))}</div>;
  }
  if (typeof value === 'boolean') {
    return <label className="cms-toggle" htmlFor={path}>
      <input type="checkbox" id={path} checked={value} disabled={locked} onChange={e => onChange(e.target.checked)} data-testid={`cms-field-${path}`}/>
      <span>{label}</span>{locked && <small>Required for enquiries</small>}
    </label>;
  }
  return <div className={`cms-field ${locked ? 'cms-readonly' : ''}`}>
    <label htmlFor={path}>{label}{locked && <small>Fixed identifier</small>}</label>
    {mediaKeys.includes(name) ? <MediaField value={value} onChange={onChange} path={path} label={label}/>
      : typeof value === 'number' ? <input type="number" step={name === 'journey_length' ? '.1' : '1'} id={path} data-testid={`cms-field-${path}`} value={value} onChange={e => onChange(e.target.value === '' ? 0 : Number(e.target.value))}/>
      : longKeys.includes(name) || String(value).includes('\n') || String(value).length > 110 ? <textarea id={path} data-testid={`cms-field-${path}`} rows={Math.min(5, Math.max(2, String(value).split('\n').length))} value={value ?? ''} readOnly={locked} onChange={e => onChange(e.target.value)}/>
      : <input id={path} data-testid={`cms-field-${path}`} value={value ?? ''} readOnly={locked} onChange={e => onChange(e.target.value)}/>}
  </div>;
}