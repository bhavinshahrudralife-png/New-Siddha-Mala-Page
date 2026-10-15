import { ArrowUpRight } from 'lucide-react';
import { usePage } from '../context/PageContext';
import { Reveal,ProductImage } from '../components/Editorial';
export default function SpiritualStory() {
  const {spiritual:s}=usePage();
  return <section id="spiritual-story" className="spiritual-section section-space" data-testid="spiritual-section"><div className="site-container"><Reveal className="spiritual-heading"><p className="eyebrow">{s.eyebrow}</p><h2 className="editorial-title multiline" data-testid="spiritual-heading">{s.title}</h2></Reveal><Reveal className="shiva-figure"><ProductImage src={s.image} alt={s.image_alt} loading="lazy" data-testid="shiva-image"/><span>{s.caption}</span></Reveal><div className="spiritual-copy">{s.paragraphs.map((text,i)=><Reveal key={i} delay={i*.08}><span className="small-index">0{i+1}</span><p>{text}</p></Reveal>)}</div><Reveal><a href={s.source} target="_blank" rel="noopener noreferrer" className="text-link" data-testid="spiritual-source">{s.source_label}<ArrowUpRight size={16}/></a></Reveal></div></section>;
}