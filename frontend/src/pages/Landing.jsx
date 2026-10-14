import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import WhatsAppFloat from '../components/WhatsAppFloat';
import Hero from '../sections/Hero';
import SiddhaIntro from '../sections/SiddhaIntro';
import Story from '../sections/Story';
import BeadSelector from '../sections/BeadSelector';
import Benefits from '../sections/Benefits';
import Celebrity from '../sections/Celebrity';
import Experts from '../sections/Experts';
import FAQ from '../sections/FAQ';
import Enquiry from '../sections/Enquiry';
import Footer from '../sections/Footer';
import { fetchContent } from '../lib/api';
import { DEFAULT_CONTENT } from '../data/content';

export default function Landing() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  useEffect(() => {
    let mounted = true;
    fetchContent().then(r => { if (mounted) setContent({ ...DEFAULT_CONTENT, ...r.data }); }).catch(() => {});
    return () => { mounted = false; };
  }, []);
  return <div data-testid="landing-page" className="landing-page">
    <Nav/>
    <main><Hero content={content}/><SiddhaIntro content={content}/><BeadSelector/><Benefits/><Story/><Celebrity/><Experts/><FAQ/><Enquiry content={content}/></main>
    <Footer content={content}/><WhatsAppFloat number={content.whatsapp}/>
  </div>;
}