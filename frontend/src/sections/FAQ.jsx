import { ArrowUpRight } from 'lucide-react';
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from '../components/ui/accordion';
import { usePage } from '../context/PageContext';
import { useConsultation } from '../context/ConsultationContext';
import { Reveal } from '../components/Editorial';
export default function FAQ() {
  const {faq:s}=usePage(); const {openConsultation}=useConsultation();
  return <section id="faq" className="faq-section section-space" data-testid="faq-section"><div className="site-container faq-layout"><Reveal><p className="eyebrow">{s.eyebrow}</p><h2 className="editorial-title multiline" data-testid="faq-heading">{s.title}</h2><button className="text-link" onClick={()=>openConsultation()} data-testid="faq-consultation-link">{s.cta_label}<ArrowUpRight size={17}/></button></Reveal><Reveal><Accordion type="single" collapsible className="faq-list">{s.items.map((faq,i)=><AccordionItem value={faq.id} key={faq.id} data-testid={`faq-item-${i}`} className="faq-item"><AccordionTrigger data-testid={`faq-trigger-${i}`} className="faq-trigger"><span><small>{String(i+1).padStart(2,'0')}</small>{faq.q}</span></AccordionTrigger><AccordionContent data-testid={`faq-content-${i}`} className="faq-answer">{faq.a}</AccordionContent></AccordionItem>)}</Accordion></Reveal></div></section>;
}