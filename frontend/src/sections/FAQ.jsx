import { ArrowUpRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { FAQS } from '../data/content';
export default function FAQ() {
  return <section id="faq" className="faq-section section-space" data-testid="faq-section"><div className="site-container faq-layout">
    <div><p className="eyebrow">A LITTLE MORE CLARITY</p><h2 className="editorial-title">Naturally,<br/><em>you have questions.</em></h2><a href="#enquiry" className="text-link" data-testid="faq-consultation-link">Ask our experts <ArrowUpRight size={17}/></a></div>
    <Accordion type="single" collapsible className="faq-list">{FAQS.map((faq, i) => <AccordionItem value={`faq-${i}`} key={faq.q} data-testid={`faq-item-${i}`} className="faq-item"><AccordionTrigger data-testid={`faq-trigger-${i}`} className="faq-trigger"><span><small>0{i+1}</small>{faq.q}</span></AccordionTrigger><AccordionContent data-testid={`faq-content-${i}`} className="faq-answer">{faq.a}</AccordionContent></AccordionItem>)}</Accordion>
  </div></section>;
}