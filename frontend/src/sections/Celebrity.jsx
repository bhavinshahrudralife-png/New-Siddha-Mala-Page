import { useRef } from 'react';
import { motion,useReducedMotion,useScroll,useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePage } from '../context/PageContext';
import { ProductImage,Reveal,SectionHeading } from '../components/Editorial';

function Patron({person,index,sourceLabel}) {
  const ref=useRef(); const page=usePage(); const reduce=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const y=useTransform(scrollYProgress,[0,1],[35,-35]); const scale=useTransform(scrollYProgress,[0,1],[1.025,1]);
  return <article ref={ref} className={`patron-feature patron-${index%2===0?'left':'right'}`} data-testid={`patron-${person.id}`}>
    <motion.figure className="patron-portrait" style={!reduce&&page.motion.enabled?{y,scale}:{}}><ProductImage src={person.image} alt={person.image_alt} data-testid={`${person.id}-image`} loading="lazy"/><figcaption><span>{person.name}</span><small>{person.role}</small></figcaption></motion.figure>
    <Reveal className="patron-editorial"><span className="small-index">0{index+1} — {person.name.toUpperCase()}</span><h3 className="multiline">{person.title}</h3>{person.quote && <blockquote data-testid={`${person.id}-quote`}>“{person.quote}”</blockquote>}<p>{person.text}</p><a className="text-link" href={person.quote_source} target="_blank" rel="noopener noreferrer" data-testid={`${person.id}-source`}>{sourceLabel}<ArrowUpRight size={16}/></a></Reveal>
  </article>;
}

export default function Celebrity() {
  const {patrons:s}=usePage();
  return <section className="patrons-section section-space" id="patrons" data-testid="celebrity-section"><div className="site-container"><SectionHeading section={s} id="patrons"/><div className="patron-features">{s.items.map((p,i)=><Patron person={p} index={i} key={p.id} sourceLabel={s.source_label}/>)}</div></div></section>;
}