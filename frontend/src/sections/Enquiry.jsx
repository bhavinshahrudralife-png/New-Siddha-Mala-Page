import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { usePage } from '../context/PageContext';
import { useConsultation } from '../context/ConsultationContext';
import { ConsultationForm } from '../components/ConsultationForm';
import { Reveal } from '../components/Editorial';

export default function Enquiry() {
  const { consultation:s, footer } = usePage(); const { openConsultation } = useConsultation();
  return <section id="enquiry" className="enquiry-section section-space" data-testid="enquiry-section"><div className="site-container enquiry-layout">
    <Reveal className="enquiry-copy"><p className="eyebrow">{s.eyebrow}</p><h2 className="editorial-title multiline" data-testid="enquiry-heading">{s.title}</h2><p>{s.text}</p><span className="consultation-note">{s.note}</span><a href={`https://wa.me/${footer.whatsapp}?text=${encodeURIComponent('Namaste, I would like a Siddha Mala consultation.')}`} target="_blank" rel="noopener noreferrer" className="text-link whatsapp-link" data-testid="enquiry-whatsapp-button"><MessageCircle size={18}/>{s.whatsapp_label}<ArrowUpRight size={16}/></a><button className="text-link secondary-consult" onClick={() => openConsultation()} data-testid="enquiry-open-popup">{s.popup_label}<ArrowUpRight size={16}/></button></Reveal>
    <Reveal><ConsultationForm/></Reveal>
  </div></section>;
}