import { createElement } from 'react';
import { Mail,Phone,Save,Trash2 } from 'lucide-react';
import { Dialog,DialogContent,DialogTitle,DialogDescription } from '../components/ui/dialog';

export const statuses=['new','contacted','qualified','closed'];
export const statusOptions=statuses.map(s=>createElement('option',{key:s,value:s},s[0].toUpperCase()+s.slice(1)));

export function LeadDetail({selected,setSelected,busy,onSave,onDelete}) {
  return <Dialog open={!!selected} onOpenChange={open=>{if(!open)setSelected(null);}}>
    <DialogContent className="lead-dialog" data-testid="lead-detail-dialog" data-lenis-prevent>
      <DialogTitle>{selected?.name}</DialogTitle><DialogDescription>Consultation enquiry · {selected?.source}</DialogDescription>
      {selected&&<>
        <div className="lead-contact-links"><a href={`mailto:${selected.email}`} data-testid="lead-email-link"><Mail size={15}/>{selected.email}</a><a href={`tel:${selected.phone}`} data-testid="lead-phone-link"><Phone size={15}/>{selected.phone}</a></div>
        <dl className="lead-details">
          <div><dt>Country</dt><dd data-testid="lead-country">{selected.country} {selected.country_code}</dd></div>
          <div><dt>Company</dt><dd data-testid="lead-company">{selected.company||'—'}</dd></div>
          <div><dt>Profession</dt><dd data-testid="lead-profession">{selected.profession||'—'}</dd></div>
          {selected.city&&<div><dt>City</dt><dd>{selected.city}</dd></div>}
          <div><dt>Interest</dt><dd data-testid="lead-interest">{selected.interest||'General consultation'}</dd></div>
          <div><dt>Message</dt><dd data-testid="lead-message">{selected.message||'No message provided'}</dd></div>
          <div><dt>Received</dt><dd>{new Date(selected.created_at).toLocaleString('en-IN')}</dd></div>
        </dl>
        <label className="cms-field">Status<select value={selected.status} onChange={e=>setSelected({...selected,status:e.target.value})} data-testid="lead-edit-status">{statusOptions}</select></label>
        <label className="cms-field">Internal notes<textarea rows={3} maxLength={5000} value={selected.notes||''} onChange={e=>setSelected({...selected,notes:e.target.value})} data-testid="lead-edit-notes"/></label>
        <div className="lead-dialog-actions"><button className="admin-danger" onClick={()=>onDelete(selected)} data-testid={`lead-delete-${selected.id}`}><Trash2 size={14}/>Delete</button><button className="admin-primary" disabled={busy} onClick={onSave} data-testid="lead-save-button"><Save size={15}/>Save lead</button></div>
      </>}
    </DialogContent>
  </Dialog>;
}