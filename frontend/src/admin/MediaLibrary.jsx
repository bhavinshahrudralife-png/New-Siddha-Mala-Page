import { useEffect,useRef,useState } from 'react';
import { Upload,Image as ImageIcon,FileText,Check,Loader2 } from 'lucide-react';
import { fetchMedia,uploadMedia,formatApiError } from '../lib/api';
import { mediaUrl } from '../context/PageContext';
import { DEFAULT_PAGE } from '../data/pageDefaults';
import { Dialog,DialogContent,DialogTitle,DialogDescription } from '../components/ui/dialog';

const stock=[];
function collect(value) {
  if (typeof value==='string' && /^\/assets\/.+\.(png|jpg|webp|jpeg)$/.test(value) && !stock.some(s=>s.url===value)) stock.push({id:`original-${stock.length}`,url:value,filename:value.split('/').pop(),content_type:'image/png'});
  else if(Array.isArray(value))value.forEach(collect);
  else if(value&&typeof value==='object')Object.values(value).forEach(collect);
}
collect(DEFAULT_PAGE);

export function MediaLibrary({onSelect = url => window.open(mediaUrl(url), '_blank', 'noopener,noreferrer'),selected}) {
  const [items,setItems]=useState([]);const [loading,setLoading]=useState(true);const [uploading,setUploading]=useState(false);const [error,setError]=useState('');const file=useRef();
  useEffect(()=>{fetchMedia().then(r=>setItems(r.data)).catch(e=>setError(formatApiError(e))).finally(()=>setLoading(false));},[]);
  const upload=async e=>{
    const chosen=e.target.files?.[0]; if(!chosen)return;
    if(chosen.size>12*1024*1024){setError('Maximum file size is 12 MB.');e.target.value='';return;}
    setUploading(true);setError('');
    try{const r=await uploadMedia(chosen);setItems(v=>[r.data,...v]);onSelect?.(r.data.url);}catch(err){setError(formatApiError(err));}finally{setUploading(false);e.target.value='';}
  };
  return <div className="media-library" data-testid="media-library"><div className="media-toolbar"><span>Public brand media · PNG, JPG, WebP, PDF · up to 12 MB</span><button className="admin-primary" onClick={()=>file.current.click()} disabled={uploading} data-testid="media-upload-button">{uploading?<Loader2 size={16} className="animate-spin"/>:<Upload size={16}/>} {uploading?'Uploading':'Upload file'}</button><input ref={file} type="file" accept="image/png,image/jpeg,image/webp,application/pdf" hidden data-testid="media-upload-input" onChange={upload}/></div>{error&&<p className="admin-error" role="alert" data-testid="media-error">{error}</p>}{loading?<p className="admin-loading" data-testid="media-loading">Loading media…</p>:<div className="media-grid">{[...items,...stock].map(item=><button type="button" className={`media-tile ${selected===item.url?'selected':''}`} key={item.id} onClick={()=>onSelect?.(item.url)} data-testid={`media-item-${item.id}`} aria-label={`Select ${item.filename}`}>{item.content_type==='application/pdf'?<FileText size={32}/>:<img src={mediaUrl(item.url)} alt={item.filename} loading="lazy"/>}<span>{item.filename}</span>{selected===item.url&&<Check className="media-selected" size={15}/>}</button>)}</div>}</div>;
}

export function MediaField({value,onChange,path,label}) {
  const [open,setOpen]=useState(false);const isPdf=/\.pdf(?:$|\?)/i.test(value)||path.endsWith('brochure');
  return <div className="cms-media-field"><div className="cms-media-preview">{value?(isPdf?<FileText size={30}/>:<img src={mediaUrl(value)} alt={`${label} preview`}/>):<ImageIcon size={30}/>}</div><div><input id={path} value={value||''} onChange={e=>onChange(e.target.value)} data-testid={`cms-field-${path}`} placeholder="Image or document URL"/><button className="admin-secondary" type="button" onClick={()=>setOpen(true)} data-testid={`cms-media-${path}`}><ImageIcon size={14}/> Choose / upload</button></div><Dialog open={open} onOpenChange={setOpen}><DialogContent className="media-picker-dialog" data-lenis-prevent data-testid={`media-picker-${path}`}><DialogTitle>Choose {label.toLowerCase()}</DialogTitle><DialogDescription>Use an original image or upload new brand media.</DialogDescription><MediaLibrary selected={value} onSelect={url=>{onChange(url);setOpen(false);}}/></DialogContent></Dialog></div>;
}