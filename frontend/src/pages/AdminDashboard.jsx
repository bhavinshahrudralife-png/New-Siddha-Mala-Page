import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut,Users,FileText,Image,ExternalLink,Loader2 } from 'lucide-react';
import { fetchMe,logout,formatApiError } from '../lib/api';
import { PageEditor } from '../admin/PageEditor';
import { LeadInbox } from '../admin/LeadInbox';
import { MediaLibrary } from '../admin/MediaLibrary';
import { usePage,mediaUrl } from '../context/PageContext';
import '../admin/admin.css';

export default function AdminDashboard() {
  const navigate=useNavigate();const [user,setUser]=useState(null);const [tab,setTab]=useState('leads');const [error,setError]=useState('');const {brand}=usePage();
  useEffect(()=>{fetchMe().then(r=>setUser(r.data)).catch(e=>{if(e.response?.status===401)navigate('/admin/login');else setError(formatApiError(e));});},[navigate]);
  const leave=async()=>{try{await logout();navigate('/admin/login');}catch(e){setError(formatApiError(e));}};
  if(!user)return <main className="admin-loading">{error?<p role="alert" data-testid="admin-load-error">{error}</p>:<Loader2 size={28} className="animate-spin"/>}</main>;
  return <div className="admin-shell" data-testid="admin-dashboard"><header className="admin-header"><div className="admin-brand"><img src={mediaUrl(brand.logo)} alt={brand.name}/><div><h1>Content studio</h1><p data-testid="admin-user-email">{user.email}</p></div></div><div className="editor-actions"><a href="/siddha-mala.html" target="_blank" rel="noopener noreferrer" className="admin-secondary" data-testid="admin-view-site"><ExternalLink size={14}/>View website</a><button className="admin-secondary" onClick={leave} data-testid="admin-logout-button"><LogOut size={14}/>Logout</button></div></header>{error&&<p role="alert" className="admin-error" data-testid="admin-error">{error}</p>}<nav className="admin-tabs" aria-label="Admin views">{[['leads','Lead inbox',Users],['content','Page editor',FileText],['media','Media library',Image]].map(([key,label,Icon])=><button key={key} className={tab===key?'active':''} onClick={()=>setTab(key)} data-testid={`admin-tab-${key}`}><Icon size={16}/>{label}</button>)}</nav><div className="admin-workspace"><div hidden={tab!=='leads'}><LeadInbox/></div><div hidden={tab!=='content'}><PageEditor/></div>{tab==='media'&&<MediaLibrary/>}</div></div>;
}