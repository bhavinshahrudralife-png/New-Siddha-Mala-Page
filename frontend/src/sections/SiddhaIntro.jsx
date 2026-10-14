import { BadgeCheck, Fingerprint, HandHeart, Sparkles, ArrowUpRight } from 'lucide-react';

export default function SiddhaIntro({ content }) {
  return <section id="about" data-testid="siddha-intro-section">
    <div className="assurance-strip"><div className="site-container assurance-inner">
      {[[BadgeCheck, 'Lab-certified authenticity'], [Fingerprint, 'Natural Rudraksha'], [HandHeart, 'Handcrafted with care'], [Sparkles, 'ACE energization']].map(([Icon, text], i) => <div key={text} data-testid={`assurance-${i}`}><Icon size={19} strokeWidth={1.3}/><span>{text}</span></div>)}
    </div></div>
    <div className="site-container intro-layout section-space">
      <div><p className="eyebrow">ROOTED IN TRADITION. MADE FOR YOU.</p><h2 className="editorial-title">Not just worn.<br/><em>Deeply connected.</em></h2></div>
      <div className="intro-copy"><p>For over {content.stat_years.replace('+', '')} years, the Siddha Mala has been one of Rudralife’s most cherished creations.</p><p>Designed according to ancient Vedic scriptures, it brings together carefully selected Rudraksha beads into one sacred combination. Every bead has its own purpose. Together, they create a mala for every aspect of life.</p><a href="#enquiry" className="text-link" data-testid="intro-consultation">Find your connection <ArrowUpRight size={16}/></a></div>
      <div className="intro-signature"><span data-testid="intro-certified-stat">{content.stat_certified}</span><p>LAB-CERTIFIED<br/>RUDRAKSHA</p></div>
    </div>
  </section>;
}