import { usePage } from '../context/PageContext';
import { Reveal, SectionHeading } from '../components/Editorial';
import { Accordion,AccordionItem,AccordionTrigger,AccordionContent } from '../components/ui/accordion';
export default function Education() {
  const {education:s} = usePage();
  return <section id="knowledge" className="education-section section-space" data-testid="education-section"><div className="site-container"><SectionHeading section={s} id="education"/><Reveal><Accordion type="single" collapsible className="education-list">{s.items.map((item,i)=><AccordionItem key={item.id} value={item.id}><AccordionTrigger className="education-trigger" data-testid={`education-trigger-${item.id}`}><span className="small-index">0{i+1}</span><span>{item.q}</span></AccordionTrigger><AccordionContent className="education-answer" data-testid={`education-answer-${item.id}`}>{item.a}</AccordionContent></AccordionItem>)}</Accordion></Reveal></div></section>;
}