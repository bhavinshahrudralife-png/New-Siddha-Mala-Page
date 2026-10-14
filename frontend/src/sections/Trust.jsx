import { ArrowUpRight, Fingerprint, ScanLine, HeartHandshake } from 'lucide-react';
import { usePage } from '../context/PageContext';
import { useConsultation } from '../context/ConsultationContext';
import { Reveal, SectionHeading } from '../components/Editorial';
const ICONS=[Fingerprint,ScanLine,HeartHandshake];
export default function Trust() {
  const {trust:s}=usePage();const {openConsultation}=useConsultation();
  return <section className="trust-section section-space" data-testid="trust-section"><div className="site-container"><SectionHeading section={s} id="trust"><button className="text-link" data-testid="trust-consult-button" onClick={()=>openConsultation()}>{s.cta_label}<ArrowUpRight size={17}/></button></SectionHeading><div className="trust-grid">{s.items.map((item,i)=>{const Icon=ICONS[i%ICONS.length];return <Reveal key={item.id} delay={i*.1} className="trust-item" data-testid={`trust-item-${item.id}`}><Icon size={28} strokeWidth={1}/><h3>{item.title}</h3><p>{item.text}</p></Reveal>;})}</div></div></section>;
}