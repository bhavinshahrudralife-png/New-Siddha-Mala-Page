import { usePage } from '../context/PageContext';
import { ProductImage,Reveal,SectionHeading } from '../components/Editorial';
export default function Benefits() {
  const {benefits:s} = usePage();
  return <section id="benefits" className="benefits-section section-space" data-testid="benefits-section"><div className="site-container"><SectionHeading section={s} id="benefits"/><div className="benefits-grid">{s.items.map((item,i)=><Reveal className="benefit-item" key={item.id} delay={i*.12} data-testid={`benefit-card-${i}`}><span className="benefit-number">0{i+1}</span><div className="benefit-bead"><ProductImage src={item.image} alt="Natural Rudraksha detail" loading="lazy"/></div><h3>{item.title}</h3><p>{item.desc}</p></Reveal>)}</div><p className="belief-note">{s.note}</p></div></section>;
}