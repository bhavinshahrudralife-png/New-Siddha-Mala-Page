import { useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { Check,ArrowUpRight,ArrowLeft } from 'lucide-react';
import { usePage,mediaUrl } from '../context/PageContext';
export default function ThankYou() {
  const {state}=useLocation(); const {thankyou:s,brand,footer}=usePage();
  useEffect(()=>{window.scrollTo(0,0);},[]);
  return <main className="thankyou-page" data-testid="thankyou-page"><Link to="/" data-testid="thankyou-logo"><img src={mediaUrl(brand.logo)} alt={brand.name} className="brand-logo"/></Link><div className="thankyou-content"><span className="thankyou-check"><Check size={26}/></span><p className="eyebrow">{s.eyebrow}</p><h1 data-testid="thankyou-title">{s.title}{state?.name?`, ${state.name}`:''}.</h1><p data-testid="thankyou-confirmation">{s.text}</p><div className="thankyou-actions"><Link to="/" className="text-link" data-testid="thankyou-home-button"><ArrowLeft size={17}/>{s.home_label}</Link><a href={`https://wa.me/${footer.whatsapp}`} target="_blank" rel="noopener noreferrer" className="primary-button" data-testid="thankyou-whatsapp-button">{s.whatsapp_label}<ArrowUpRight size={17}/></a></div></div><img className="thankyou-bead" src={mediaUrl(s.image)} alt="Rudraksha"/></main>;
}