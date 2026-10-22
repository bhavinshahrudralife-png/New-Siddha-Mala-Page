import { useEffect,useState } from 'react';
import { Save,RotateCcw,ExternalLink,Loader2,Check } from 'lucide-react';
import { toast } from 'sonner';
import { fetchPage,fetchContent,savePage,formatApiError } from '../lib/api';
import { mergePage } from '../data/pageDefaults';
import { ContentField } from './ContentField';
import { BeadMappingEditor } from './BeadMappingEditor';

const SECTIONS=[['appearance','Page colours'],['brand','Brand & header'],['hero','Hero & 3D mala'],['signature','Sacred signature'],['spiritual','Shiva & Rudraksha'],['gallery','Look closer · collection'],['story','25 years of Rudralife'],['beads','Beads around the mala (1–14, Gauri Shankar, Ganesh)'],['patrons','Customers who chose Siddha Mala'],['benefits','Spiritual benefits'],['trust','Trust & authenticity'],['founder','Dr. Tanay Seetha'],['faq','FAQ'],['featured','As Featured In'],['form','Consultation form fields'],['footer','Footer & contacts'],['thankyou','Thank-you page'],['seo','Search & sharing'],['motion','Animation settings'],['order','Section order']];

export function PageEditor() {
  const [draft,setDraft]=useState(null);const [saved,setSaved]=useState(null);const [revision,setRevision]=useState(0);const [selected,setSelected]=useState('hero');const [saving,setSaving]=useState(false);const [error,setError]=useState('');
  const load=()=>{setError('');Promise.all([fetchPage(),fetchContent()]).then(([p,c])=>{const content=mergePage(p.data.page,c.data);setDraft(content);setSaved(structuredClone(content));setRevision(p.data.revision);}).catch(e=>setError(formatApiError(e)));};
  useEffect(()=>{load();},[]);
  const dirty=draft&&JSON.stringify(draft)!==JSON.stringify(saved);
  useEffect(()=>{if(!dirty)return;const warn=e=>{e.preventDefault();e.returnValue='';};window.addEventListener('beforeunload',warn);return()=>window.removeEventListener('beforeunload',warn);},[dirty]);
  const save=async()=>{
    setSaving(true);setError('');
    try{const r=await savePage(draft,revision);setSaved(structuredClone(r.data.page));setDraft(r.data.page);setRevision(r.data.revision);toast.success('Page published successfully');}
    catch(e){setError(formatApiError(e));}finally{setSaving(false);}
  };
  if(!draft)return <div className="admin-loading">{error?<><p className="admin-error" data-testid="cms-error">{error}</p><button onClick={load} data-testid="cms-retry">Retry</button></>:'Loading page content…'}</div>;
  return <div className="page-editor" data-testid="admin-content-panel"><aside className="editor-sections"><span className="editor-caption">PAGE CONTENT</span>{SECTIONS.map(([key,label])=><button key={key} className={selected===key?'active':''} onClick={()=>setSelected(key)} data-testid={`cms-section-${key}`}>{label}{draft[key]?.visible===false&&<small>Hidden</small>}</button>)}</aside><div className="editor-main"><header className="editor-toolbar"><div><h2>{SECTIONS.find(([key])=>key===selected)?.[1]}</h2><p data-testid="cms-save-status">{dirty?'Unpublished changes':`Published · revision ${revision}`}</p></div><div className="editor-actions"><a href="/siddha-mala.html" target="_blank" rel="noopener noreferrer" className="admin-secondary" data-testid="cms-preview-link"><ExternalLink size={14}/>View page</a><button className="admin-secondary" disabled={!dirty||saving} onClick={()=>setDraft(structuredClone(saved))} data-testid="cms-discard-button"><RotateCcw size={14}/>Discard</button><button className="admin-primary" disabled={saving} onClick={save} data-testid="content-save-button">{saving?<Loader2 size={15} className="animate-spin"/>:<Save size={15}/>} {saving?'Publishing':'Publish changes'}</button></div></header>{error&&<p role="alert" className="admin-error" data-testid="cms-error">{error}</p>}{selected==='community'&&<p className="cms-verification-note" data-testid="cms-statistics-note">Customer statistics stay hidden until you enter a value, confirm verification and attach an evidence URL.</p>}<div className="editor-fields" key={selected}><ContentField value={draft[selected]} name={selected} path={selected} onChange={value=>setDraft({...draft,[selected]:value})}/></div></div></div>;
}