import { ArrowUpRight } from 'lucide-react';
import { usePage } from '../context/PageContext';
import { useConsultation } from '../context/ConsultationContext';
import { Reveal, ProductImage } from '../components/Editorial';
export default function EmotionalIntro() {
  const { intro:s } = usePage(); const { openConsultation } = useConsultation();
  return <section className="emotional-section section-space" data-testid="emotional-section"><div className="site-container emotional-layout"><Reveal><p className="eyebrow">{s.eyebrow}</p><h2 className="editorial-title multiline" data-testid="emotional-heading">{s.title}</h2></Reveal><Reveal delay={0.1} className="emotional-bead"><ProductImage src={s.image} alt="Natural Rudraksha detail" loading="lazy"/></Reveal><Reveal delay={0.15} className="emotional-copy"><p>{s.text}</p><span>{s.note}</span><button className="text-link" onClick={() => openConsultation()} data-testid="emotional-consult-button">{s.cta_label}<ArrowUpRight size={16}/></button></Reveal></div></section>;
}