import { createElement,useEffect,useState } from 'react';
import { Search,RefreshCw,Download,ArrowLeft,ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { fetchLeadPage,exportLeads,deleteLead,updateLead,formatApiError } from '../lib/api';
import { Dialog,DialogContent,DialogTitle,DialogDescription } from '../components/ui/dialog';
import { LeadDetail,statusOptions } from './LeadDetail';

export function LeadInbox() {
  const [data,setData]=useState({items:[],total:0});const [query,setQuery]=useState('');const [status,setStatus]=useState('');
  const [page,setPage]=useState(1);const [tick,setTick]=useState(0);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
  const [selected,setSelected]=useState(null);const [deleting,setDeleting]=useState(null);const [busy,setBusy]=useState(false);
  useEffect(()=>{
    let active=true;setLoading(true);
    const timer=setTimeout(()=>{fetchLeadPage({query,status,page}).then(r=>{if(active){setData(r.data);setError('');}}).catch(e=>{if(active)setError(formatApiError(e));}).finally(()=>{if(active)setLoading(false);});},200);
    return()=>{active=false;clearTimeout(timer);};
  },[query,status,page,tick]);
  const save=async()=>{
    setBusy(true);
    try{await updateLead(selected.id,{status:selected.status,notes:selected.notes||''});toast.success('Lead updated');setSelected(null);setTick(t=>t+1);}
    catch(e){toast.error(formatApiError(e));}finally{setBusy(false);}
  };
  const remove=async()=>{
    setBusy(true);
    try{await deleteLead(deleting.id);setDeleting(null);setSelected(null);setPage(1);setTick(t=>t+1);toast.success('Lead deleted');}
    catch(e){toast.error(formatApiError(e));}finally{setBusy(false);}
  };
  const download=async()=>{
    try{const r=await exportLeads({query,status});const url=URL.createObjectURL(r.data);const a=document.createElement('a');a.href=url;a.download='rudralife-enquiries.csv';a.click();URL.revokeObjectURL(url);}
    catch(e){toast.error(formatApiError(e));}
  };
  return <section className="lead-inbox" data-testid="admin-leads-panel">
    <header className="inbox-header"><div><p className="eyebrow">YOUR CONSULTATIONS</p><h2>Lead inbox <span data-testid="lead-total">{data.total}</span></h2></div><div className="editor-actions"><button className="admin-secondary" data-testid="leads-refresh" onClick={()=>setTick(t=>t+1)}><RefreshCw size={14}/>Refresh</button><button className="admin-primary" data-testid="leads-export" onClick={download}><Download size={14}/>Export CSV</button></div></header>
    <div className="lead-filters"><label className="lead-search"><Search size={16}/><input value={query} onChange={e=>{setQuery(e.target.value);setPage(1);}} placeholder="Search name, email, phone or city" aria-label="Search leads" data-testid="leads-search"/></label><select value={status} onChange={e=>{setStatus(e.target.value);setPage(1);}} aria-label="Filter lead status" data-testid="leads-status-filter">{createElement('option',{value:''},'All statuses')}{statusOptions}</select></div>
    {error&&<p className="admin-error" role="alert" data-testid="leads-error">{error}</p>}
    {loading?<p className="admin-loading" data-testid="leads-loading">Loading enquiries…</p>:data.items.length===0?<div className="leads-empty" data-testid="leads-empty">No enquiries match this view.</div>:<div className="lead-list">{data.items.map(lead=><button className="lead-row" key={lead.id} data-testid={`lead-card-${lead.id}`} onClick={()=>setSelected({...lead,status:lead.status||'new'})}><div><strong>{lead.name}</strong><span>{lead.email}</span></div><div><span>{lead.phone}</span><small>{lead.city}{lead.city&&lead.profession?' · ':''}{lead.profession}</small></div><div><span className={`lead-status status-${lead.status||'new'}`}>{lead.status||'new'}</span><small>{lead.source} · {new Date(lead.created_at).toLocaleDateString('en-IN')}</small></div><ArrowRight size={15}/></button>)}</div>}
    <div className="leads-pagination"><span data-testid="leads-page-label">Page {page} · {data.total} enquiries</span><div><button className="icon-button" disabled={page===1} onClick={()=>setPage(p=>p-1)} aria-label="Previous page" data-testid="leads-previous"><ArrowLeft size={15}/></button><button className="icon-button" disabled={!data.has_more} onClick={()=>setPage(p=>p+1)} aria-label="Next page" data-testid="leads-next"><ArrowRight size={15}/></button></div></div>
    <LeadDetail selected={selected} setSelected={setSelected} busy={busy} onSave={save} onDelete={setDeleting}/>
    <Dialog open={!!deleting} onOpenChange={o=>{if(!o)setDeleting(null);}}><DialogContent data-testid="lead-delete-confirmation"><DialogTitle>Delete this enquiry?</DialogTitle><DialogDescription>{deleting?.name}’s enquiry will be permanently removed. This cannot be undone.</DialogDescription><div className="editor-actions"><button className="admin-secondary" onClick={()=>setDeleting(null)} data-testid="lead-delete-cancel">Keep enquiry</button><button className="admin-danger" onClick={remove} disabled={busy} data-testid="lead-delete-confirm">Delete enquiry</button></div></DialogContent></Dialog>
  </section>;
}