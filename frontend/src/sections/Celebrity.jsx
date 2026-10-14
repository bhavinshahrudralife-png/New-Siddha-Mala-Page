import { ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../data/content';
export default function Celebrity() {
  return <section className="patrons-section section-space" data-testid="celebrity-section"><div className="site-container">
    <div className="section-heading"><div><p className="eyebrow">PERSONAL JOURNEYS. SHARED FAITH.</p><h2 className="editorial-title">A connection that<br/><em>speaks for itself.</em></h2></div><span className="section-caption">FROM THE RUDRALIFE FAMILY</span></div>
    <div className="patrons-layout">
      <figure className="milind-portrait"><img src={IMAGES.milind} alt="Milind Soman wearing a Rudraksha mala" data-testid="milind-image" loading="lazy"/><figcaption><span>Milind Soman</span><small>Model & fitness enthusiast</small></figcaption></figure>
      <div className="patron-story"><span className="small-index">MINDFUL IN EVERY MOMENT</span><h3>A life of discipline.<br/>A sacred companion.</h3><p>Milind Soman, pictured wearing Rudraksha. A personal connection to a tradition that continues across generations.</p><div className="dimple-testimonial"><img src={IMAGES.dimple} alt="Dimple Kapadia, Rudralife client" loading="lazy" data-testid="dimple-image"/><div><blockquote data-testid="dimple-quote">“Rudraksha from Mr. Tanay is very fascinating.”</blockquote><p>Dimple Kapadia <span>Actress</span></p></div></div><a href="https://www.rudralife.com" target="_blank" rel="noopener noreferrer" className="text-link" data-testid="patrons-source-link">Voices from Rudralife <ArrowUpRight size={16}/></a></div>
    </div>
  </div></section>;
}