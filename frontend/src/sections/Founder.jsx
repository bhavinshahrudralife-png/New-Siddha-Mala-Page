import { useEffect,useState } from 'react';
import { AnimatePresence,motion,useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePage } from '../context/PageContext';
import { useConsultation } from '../context/ConsultationContext';
import { ProductImage,Reveal } from '../components/Editorial';

export default function Founder() {
  const {founder:s,motion:m}=usePage();const {openConsultation}=useConsultation();const reduced=useReducedMotion();
  const [index,setIndex]=useState(0);const [tick,setTick]=useState(0);const count=s.images.length;
  useEffect(()=>{if(reduced||!m.enabled||count<2)return;const t=setInterval(()=>setIndex(i=>(i+1)%count),Math.max(1,s.interval_seconds)*1000);return()=>clearInterval(t);},[reduced,m.enabled,count,s.interval_seconds,tick]);
  const current=s.images[index%Math.max(count,1)];
  return <section id="experts" className="founder-section section-space" data-testid="founder-section"><div className="site-container founder-layout">
    <div className="founder-gallery" data-testid="founder-gallery">
      <AnimatePresence initial={false}>{current&&<motion.div key={current.id} className="founder-slide" initial={{opacity:0,scale:1.04}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.6}}><ProductImage src={current.image} alt={current.alt} data-testid={`founder-image-${index%count}`}/></motion.div>}</AnimatePresence>
      <div className="founder-dots">{s.images.map((img,i)=><button key={img.id} className={i===index%count?'active':''} onClick={()=>{setIndex(i);setTick(t=>t+1);}} aria-label={`Show photo ${i+1}`} data-testid={`founder-dot-${i}`}/>)}</div>
    </div>
    <Reveal className="founder-copy">
      <p className="eyebrow">{s.eyebrow}</p>
      <h2 className="founder-name" data-testid="founder-name">{s.name}</h2>
      <p className="founder-role">{s.role}</p>
      <h3 className="multiline founder-title">{s.title}</h3>
      {s.paragraphs.map((p,i)=><p className="founder-text" key={i}>{p}</p>)}
      <div className="founder-stats">{s.stats.map(st=><div key={st.id} data-testid={`founder-stat-${st.id}`}><strong>{st.value}</strong><span>{st.label}</span></div>)}</div>
      <button className="primary-button" onClick={()=>openConsultation(`Consultation with ${s.name}`)} data-testid="founder-consult-button">{s.cta_label}<ArrowUpRight size={17}/></button>
    </Reveal>
  </div></section>;
}
