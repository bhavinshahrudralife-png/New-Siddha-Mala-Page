import { ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../data/content';
export default function Story() {
  return <section id="story" className="story-section section-space" data-testid="story-section"><div className="site-container story-layout">
    <figure className="story-image"><img src={IMAGES.malaSatin} alt="Rudralife Siddha Mala with gold fittings, presented on silk beside its wooden box" loading="lazy" data-testid="story-product-image"/><figcaption>A SIGNATURE CREATION BY RUDRALIFE</figcaption></figure>
    <div className="story-copy"><p className="eyebrow">THE RUDRALIFE STORY</p><h2 className="editorial-title">Ancient wisdom.<br/><em>Uncompromising care.</em></h2><p>Rudralife’s journey is built around a single sacred bead. A dedication to sourcing, studying and sharing authentic Rudraksha, with knowledge at the heart of every recommendation.</p><p>The Siddha Mala is a registered and trademarked Rudralife creation, handcrafted with authentic Nepal Rudraksha and prepared with the ACE Energization process.</p><div className="story-signoff"><span>Authenticity, before everything.</span><a href="https://www.rudralife.com/profile-mission" target="_blank" rel="noopener noreferrer" className="text-link" data-testid="story-source-link">The Rudralife legacy <ArrowUpRight size={16}/></a></div></div>
  </div></section>;
}