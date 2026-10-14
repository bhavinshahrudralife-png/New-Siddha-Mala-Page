import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { DEFAULT_CONTENT, IMAGES } from '../data/content';
import { fetchContent } from '../lib/api';
export default function ThankYou() {
  const { state } = useLocation();
  const [content, setContent] = useState(DEFAULT_CONTENT);
  useEffect(() => { window.scrollTo(0, 0); fetchContent().then(r => setContent({ ...DEFAULT_CONTENT, ...r.data })).catch(() => {}); }, []);
  return <main className="thankyou-page" data-testid="thankyou-page"><Link to="/" data-testid="thankyou-logo"><img src={IMAGES.logo} alt="Rudralife" className="brand-logo"/></Link><div className="thankyou-content"><span className="thankyou-check"><Check size={26}/></span><p className="eyebrow">A NEW CONNECTION BEGINS</p><h1 data-testid="thankyou-title">Thank you{state?.name ? `, ${state.name}` : ''}.</h1><p data-testid="thankyou-confirmation">Your enquiry has been received. The Rudralife team will be in touch to help you find the right Rudraksha for your journey.</p><div className="thankyou-actions"><Link to="/" className="text-link" data-testid="thankyou-home-button"><ArrowLeft size={17}/> Back to the mala</Link><a href={`https://wa.me/${content.whatsapp}`} target="_blank" rel="noopener noreferrer" className="primary-button" data-testid="thankyou-whatsapp-button">Continue on WhatsApp <ArrowUpRight size={17}/></a></div></div><img className="thankyou-bead" src="/assets/rudralife/bead-5.png" alt="Rudraksha"/></main>;
}