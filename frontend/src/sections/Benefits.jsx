import { Flower2, Sun, Sprout, HeartHandshake } from 'lucide-react';
import { BENEFITS } from '../data/content';
const ICONS = [Flower2, Sun, Sprout, HeartHandshake];
export default function Benefits() {
  return <section id="benefits" className="benefits-section section-space" data-testid="benefits-section"><div className="site-container">
    <div className="section-heading"><div><p className="eyebrow">A PURPOSE IN EVERY BEAD</p><h2 className="editorial-title">For the life you lead.<br/><em>And the peace you seek.</em></h2></div><p className="section-caption">Sacred intentions.<br/>An everyday connection.</p></div>
    <div className="benefits-grid">{BENEFITS.map((benefit, i) => { const Icon = ICONS[i]; return <article className="benefit-item" key={benefit.title} data-testid={`benefit-card-${i}`}><span className="benefit-number">0{i+1}</span><Icon size={29} strokeWidth={1}/><h3>{benefit.title}</h3><p>{benefit.desc}</p></article>; })}</div>
  </div></section>;
}