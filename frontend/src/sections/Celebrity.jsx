import { useRef } from 'react';
import { AnimatePresence,motion } from 'framer-motion';
import { ArrowUpRight,ArrowLeft,ArrowRight,Pause,Play } from 'lucide-react';
import { usePage } from '../context/PageContext';
import { ProductImage,SectionHeading } from '../components/Editorial';
import { useVisibleSequence } from '../hooks/useVisibleSequence';

export default function Celebrity() {
  const page=usePage();const s=page.patrons;const ref=useRef(null);
  const seq=useVisibleSequence(ref,s.items.length,s.interval_seconds,s.autoplay&&page.motion.enabled);
  const person=s.items[seq.index];
  if(!person)return null;
  return <section ref={ref} className="patrons-section section-space" id="patrons" data-testid="celebrity-section">
    <div className="site-container">
      <SectionHeading section={s} id="patrons"/>
      <div className="patron-carousel" data-autoplay-state={seq.reason} {...seq.events} role="region" aria-roledescription="carousel" aria-label="Rudralife client stories">
        <div className="patron-stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article key={person.id} className={`patron-feature patron-${seq.index%2===0?'left':'right'}`} data-testid={`patron-${person.id}`}
              initial={seq.reduced?false:{opacity:0,y:20}} animate={{opacity:1,y:0}}
              exit={{opacity:0,y:-10,transition:{duration:seq.reduced?0:.12}}}
              transition={{duration:seq.reduced?0:.28,ease:[.22,1,.36,1]}}>
              <figure className="patron-portrait">
                <ProductImage src={person.image} alt={person.image_alt} data-testid={`${person.id}-image`}/>
                <figcaption><span>{person.name}</span><small>{person.role}</small></figcaption>
              </figure>
              <div className="patron-editorial">
                <span className="small-index">0{seq.index+1} — {person.name.toUpperCase()}</span>
                <h3 className="multiline" data-testid="patron-story-title">{person.title}</h3>
                <p className="multiline" data-testid="patron-story-text">{person.text}</p>
                {person.quote&&<blockquote data-testid={`${person.id}-quote`}>“{person.quote}”</blockquote>}
                <a className="text-link" href={person.quote_source} target="_blank" rel="noopener noreferrer" data-testid={`${person.id}-source`}>{s.source_label}<ArrowUpRight size={16}/></a>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
        <div className="patron-navigation">
          <div className="patron-pagination">{s.items.map((p,i)=><button className={i===seq.index?'active':''} onClick={()=>seq.select(i)} aria-current={i===seq.index?'true':undefined} key={p.id} data-testid={`patron-select-${p.id}`}><span>0{i+1}</span>{p.name}</button>)}</div>
          <div className="sequence-controls">
            <button className="icon-button" onClick={()=>seq.select(seq.index-1)} aria-label="Previous story" data-testid="patron-previous"><ArrowLeft size={16}/></button>
            <button className="icon-button" onClick={()=>seq.select(seq.index+1)} aria-label="Next story" data-testid="patron-next"><ArrowRight size={16}/></button>
            {!seq.reduced&&<button className="sequence-play" onClick={seq.toggle} aria-pressed={!seq.paused} data-testid="patron-autoplay">{seq.paused?<Play size={14}/>:<Pause size={14}/>} {seq.paused?'Play stories':'Pause stories'}</button>}
          </div>
        </div>
        <div className="story-timer" aria-hidden="true"><motion.span key={`${seq.index}-${seq.playing}`} initial={{scaleX:0}} animate={{scaleX:seq.playing?1:0}} transition={{duration:seq.playing?s.interval_seconds:0,ease:'linear'}}/></div>
      </div>
    </div>
  </section>;
}