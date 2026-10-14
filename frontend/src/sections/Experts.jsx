import { useState } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { EXPERTS } from '../data/content';
export default function Experts() {
  const [expanded, setExpanded] = useState(null);
  return <section id="experts" className="experts-section section-space" data-testid="experts-section"><div className="site-container">
    <div className="section-heading"><div><p className="eyebrow">KNOWLEDGE. EXPERIENCE. EMPATHY.</p><h2 className="editorial-title">Real people.<br/><em>Thoughtful guidance.</em></h2></div><a href="#enquiry" className="text-link" data-testid="experts-consultation-link">Meet your guide <ArrowUpRight size={17}/></a></div>
    <div className="experts-grid">{EXPERTS.map((expert, i) => <article className="expert-item" key={expert.name} data-testid={`expert-profile-${i}`}>
      <div className="expert-photo"><img src={expert.img} alt={expert.name} loading="lazy" data-testid={`expert-image-${i}`}/></div>
      <button className="expert-heading" data-testid={`expert-card-${i}`} onClick={() => setExpanded(expanded === i ? null : i)} aria-expanded={expanded === i} aria-controls={`expert-bio-${i}`}><span><strong>{expert.name}</strong><small>{expert.role}</small></span>{expanded === i ? <Minus size={17}/> : <Plus size={17}/>}</button>
      {expanded === i && <p className="expert-bio" id={`expert-bio-${i}`} data-testid={`expert-bio-${i}`}>{expert.desc}</p>}
    </article>)}</div>
  </div></section>;
}