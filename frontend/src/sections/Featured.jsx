import { usePage } from '../context/PageContext';
import { ProductImage } from '../components/Editorial';

export default function Featured() {
  const {featured:s}=usePage();
  return <section className="featured-strip" data-testid="featured-section"><div className="site-container"><div className="featured-inner">
    <p className="featured-label" data-testid="featured-label">{s.label}</p>
    <div className="featured-marquee"><div className="featured-track" style={{'--marquee-seconds':`${s.speed_seconds||40}s`}}>{[...s.items,...s.items].map((item,i)=><div className="featured-logo" key={`${item.id}-${i}`} aria-hidden={i>=s.items.length}><ProductImage src={item.image} alt={item.alt} loading="lazy" data-testid={i<s.items.length?`featured-logo-${item.id}`:undefined}/></div>)}</div></div>
  </div></div></section>;
}
