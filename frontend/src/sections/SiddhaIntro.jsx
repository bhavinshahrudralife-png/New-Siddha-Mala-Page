import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { usePage, mediaUrl } from '../context/PageContext';
import { useConsultation } from '../context/ConsultationContext';
import { Reveal, ProductImage } from '../components/Editorial';
export default function SiddhaIntro() {
  const page = usePage(); const s = {...page.signature,brochure:mediaUrl(page.signature.brochure)}; const ref = useRef();
  const reduce = useReducedMotion(); const moving = page.motion.enabled && !reduce;
  const { scrollYProgress } = useScroll({target:ref,offset:['start end','end start']});
  const y = useTransform(scrollYProgress,[0,1],[-45,45]); const rotate = useTransform(scrollYProgress,[0,1],[-10,5]);
  const {openConsultation} = useConsultation();
  return <section ref={ref} id="about" className="signature-section section-space" data-testid="siddha-intro-section"><div className="site-container signature-layout"><motion.div className="signature-mala" style={moving?{y,rotate}:{}}><ProductImage src={s.image} alt={s.image_alt} loading="lazy"/><span className="signature-image-caption">{page.brand.name}</span></motion.div><div className="signature-copy"><Reveal><p className="eyebrow">{s.eyebrow}</p><h2 className="editorial-title multiline" data-testid="signature-heading">{s.title}</h2><p className="signature-lead">{s.text}</p></Reveal><div className="signature-points">{s.points.map((p,i) => <Reveal className="signature-point" delay={i*.08} key={p.id}><span>0{i+1}</span><div><h3>{p.title}</h3><p>{p.text}</p></div></Reveal>)}</div><Reveal className="signature-actions"><button className="primary-button" onClick={() => openConsultation()} data-testid="signature-consult-button">{s.cta_label}<ArrowUpRight size={17}/></button>{s.brochure && <><a href={s.brochure} className="text-link" target="_blank" rel="noopener noreferrer" data-testid="brochure-download"><Download size={15}/>{s.brochure_label}</a><p className="source-note" data-testid="brochure-source-note">{s.brochure_note}</p></>}</Reveal></div></div></section>;
}