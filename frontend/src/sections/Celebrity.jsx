import { useRef } from 'react';
import { AnimatePresence,motion } from 'framer-motion';
import { ArrowLeft,ArrowRight,Pause,Play } from 'lucide-react';
import { usePage } from '../context/PageContext';
import { ProductImage,SectionHeading } from '../components/Editorial';
import { useVisibleSequence } from '../hooks/useVisibleSequence';

const initials=name=>name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

export default function Celebrity() {
  const page=usePage();const s=page.patrons;const ref=useRef(null);
  const seq=useVisibleSequence(ref,s.items.length,s.interval_seconds,s.autoplay&&page.motion.enabled);
  const person=s.items[seq.index];
  if(!person)return null;
  return <section ref={ref} className="clients-section section-space" id="patrons" data-testid="celebrity-section">
    <div className="site-container">
      <SectionHeading section={s} id="patrons"/>
      <div className="client-carousel" data-autoplay-state={seq.reason} {...seq.events} role="region" aria-roledescription="carousel" aria-label="Clients who chose the Siddha Mala">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={person.id} className="client-slide" data-testid={`patron-${person.id}`}
            initial={seq.reduced?false:{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30,transition:{duration:seq.reduced?0:.15}}} transition={{duration:seq.reduced?0:.4,ease:[.22,1,.36,1]}}>
            <figure className="client-photo">{person.image?<ProductImage src={person.image} alt={person.image_alt} data-testid={`${person.id}-image`}/>:<div className="client-monogram" data-testid={`${person.id}-image`} aria-label={person.image_alt}>{initials(person.name)}</div>}</figure>
            <div className="client-copy">
              <span className="small-index">{String(seq.index+1).padStart(2,'0')} / {String(s.items.length).padStart(2,'0')}</span>
              <h3 data-testid="patron-story-title">{person.name}</h3>
              <p className="client-role">{person.role}</p>
              <p className="client-text" data-testid="patron-story-text">{person.text}</p>
            </div>
          </motion.article>
        </AnimatePresence>
        <div className="client-nav">
          <div className="client-dots">{s.items.map((p,i)=><button className={i===seq.index?'active':''} onClick={()=>seq.select(i)} aria-label={p.name} aria-current={i===seq.index?'true':undefined} key={p.id} data-testid={`patron-select-${p.id}`}>{p.name}</button>)}</div>
          <div className="sequence-controls">
            <button className="icon-button" onClick={()=>seq.select(seq.index-1)} aria-label="Previous story" data-testid="patron-previous"><ArrowLeft size={16}/></button>
            <button className="icon-button" onClick={()=>seq.select(seq.index+1)} aria-label="Next story" data-testid="patron-next"><ArrowRight size={16}/></button>
            {!seq.reduced&&<button className="icon-button" onClick={seq.toggle} aria-pressed={!seq.paused} aria-label={seq.paused?'Play stories':'Pause stories'} data-testid="patron-autoplay">{seq.paused?<Play size={14}/>:<Pause size={14}/>}</button>}
          </div>
        </div>
        <div className="story-timer" aria-hidden="true"><motion.span key={`${seq.index}-${seq.playing}`} initial={{scaleX:0}} animate={{scaleX:seq.playing?1:0}} transition={{duration:seq.playing?s.interval_seconds:0,ease:'linear'}}/></div>
      </div>
    </div>
  </section>;
}
