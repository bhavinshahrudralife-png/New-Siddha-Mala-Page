import { ArrowUpRight } from 'lucide-react';
import { usePage } from '../context/PageContext';
import { Reveal, ProductImage } from '../components/Editorial';
export default function Story() {
  const {story:s} = usePage();
  return <section id="story" className="story-section section-space" data-testid="story-section"><div className="site-container story-layout"><Reveal><figure className="story-image"><ProductImage src={s.image} alt={s.image_alt} loading="lazy" data-testid="story-product-image"/><figcaption>{s.caption}</figcaption></figure></Reveal><Reveal className="story-copy" delay={.15}><p className="eyebrow">{s.eyebrow}</p><h2 className="editorial-title multiline" data-testid="story-heading">{s.title}</h2>{s.paragraphs.map((p,i)=><p key={i}>{p}</p>)}<div className="story-signoff"><span>{s.signoff}</span><a href={s.source} target="_blank" rel="noopener noreferrer" className="text-link" data-testid="story-source-link">{s.link_label}<ArrowUpRight size={16}/></a></div></Reveal></div></section>;
}