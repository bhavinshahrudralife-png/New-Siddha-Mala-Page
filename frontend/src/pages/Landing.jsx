import { MessageCircle } from 'lucide-react';
import Nav from '../components/Nav';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { Seo } from '../components/Seo';
import Hero from '../sections/Hero';
import EmotionalIntro from '../sections/EmotionalIntro';
import SiddhaIntro from '../sections/SiddhaIntro';
import Story from '../sections/Story';
import MalaGallery from '../sections/MalaGallery';
import BeadSelector from '../sections/BeadSelector';
import Education from '../sections/Education';
import Benefits from '../sections/Benefits';
import Celebrity from '../sections/Celebrity';
import Trust from '../sections/Trust';
import Experts from '../sections/Experts';
import Community from '../sections/Community';
import FAQ from '../sections/FAQ';
import Enquiry from '../sections/Enquiry';
import Footer from '../sections/Footer';
import { usePage } from '../context/PageContext';
import { useConsultation } from '../context/ConsultationContext';
const SECTIONS={intro:EmotionalIntro,signature:SiddhaIntro,story:Story,gallery:MalaGallery,beads:BeadSelector,education:Education,benefits:Benefits,patrons:Celebrity,trust:Trust,experts:Experts,community:Community,faq:FAQ,consultation:Enquiry};
export default function Landing() {
  const page=usePage(); const {openConsultation}=useConsultation();
  return <div className="landing-page" data-testid="landing-page"><Seo/><Nav/><main><Hero/>{page.order.map(key=>{const Component=SECTIONS[key];return Component&&page[key]?.visible?<Component key={key}/>:null;})}</main><Footer/><WhatsAppFloat number={page.footer.whatsapp}/><button className="mobile-consultation-bar" onClick={()=>openConsultation()} data-testid="mobile-sticky-consultation"><MessageCircle size={16}/>{page.brand.mobile_consultation_label}</button></div>;
}