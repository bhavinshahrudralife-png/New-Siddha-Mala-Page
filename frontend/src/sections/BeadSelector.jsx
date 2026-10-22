import { useRef } from 'react';
import { AnimatePresence,motion } from 'framer-motion';
import { ArrowLeft,ArrowRight,Pause,Play } from 'lucide-react';
import { usePage,mediaUrl } from '../context/PageContext';
import { SectionHeading } from '../components/Editorial';
import { useVisibleSequence } from '../hooks/useVisibleSequence';

function BeadDetail({bead,index,total,s}) {
  return <AnimatePresence mode="wait" initial={false}><motion.div key={bead.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.32}}>
    <div className="orbit-detail-top"><span className="small-index" data-testid="bead-counter">{String(index+1).padStart(2,'0')} / {total}</span><span className="detail-rule"/><span className="small-index">{s.description_label}</span></div>
    <div className="orbit-detail-bead"><img src={mediaUrl(bead.img)} alt={`${bead.name} Rudraksha`} data-testid="bead-display-image"/></div>
    <p className="eyebrow" data-testid="bead-display-theme">{bead.theme}</p>
    <h3 className="bead-detail-name" data-testid="bead-display-name">{bead.name}<em>Rudraksha</em></h3>
    <p className="bead-deity" data-testid="bead-display-deity">{bead.deity}<span>·</span>{bead.quantity} {bead.quantity===1?'bead':'beads'} in the listed combination</p>
    <p className="orbit-description" data-testid="bead-display-description">{bead.desc}</p>
  </motion.div></AnimatePresence>;
}

export default function BeadSelector() {
  const page=usePage();const s=page.beads;const items=s.items;const ref=useRef(null);
  const seq=useVisibleSequence(ref,items.length,s.interval_seconds||5,s.autoplay!==false&&page.motion.enabled);
  const bead=items[seq.index];const step=360/items.length;
  return <section ref={ref} id="composition" className="orbit-section section-space" data-testid="bead-selector-section"><div className="site-container"><SectionHeading section={s} id="beads"/>
    <div className="orbit-layout">
      <div className={`orbit-stage ${seq.reduced?'orbit-static':''}`} style={{'--orbit-seconds':`${s.orbit_seconds||70}s`}} data-testid="bead-orbit" {...seq.events}>
        <div className="orbit-halo" aria-hidden="true"/>
        <img className="orbit-mala" src={mediaUrl(s.image)} alt="The complete Siddha Mala" data-testid="orbit-mala-image"/>
        <div className="orbit-ring" role="tablist" aria-label="Select Rudraksha form">{items.map((b,i)=><button key={b.id} role="tab" aria-selected={seq.index===i} aria-label={b.name} onClick={()=>seq.select(i)} data-testid={`bead-slot-${b.id}`} className={`orbit-bead ${seq.index===i?'active':''}`} style={{'--angle':`${i*step}deg`}}><span className="orbit-bead-inner"><img src={mediaUrl(b.img)} alt="" loading="lazy"/><small>{b.name.replace(' Mukhi','')}</small></span></button>)}</div>
      </div>
      <div className="orbit-detail" id="bead-detail" role="tabpanel" data-testid="bead-detail-panel">
        <BeadDetail bead={bead} index={seq.index} total={items.length} s={s}/>
        <div className="bead-controls"><button onClick={()=>seq.select(seq.index-1)} className="icon-button" aria-label="Previous bead" data-testid="bead-previous"><ArrowLeft size={18}/></button><span>{s.orbit_hint}</span>{!seq.reduced&&<button className="icon-button" onClick={seq.toggle} aria-pressed={!seq.paused} aria-label={seq.paused?'Play bead tour':'Pause bead tour'} data-testid="bead-autoplay">{seq.paused?<Play size={14}/>:<Pause size={14}/>}</button>}<button onClick={()=>seq.select(seq.index+1)} className="icon-button" aria-label="Next bead" data-testid="bead-next"><ArrowRight size={18}/></button></div>
      </div>
    </div>
    <div className="composition-breakdown" data-testid="composition-breakdown"><strong data-testid="composition-total">{items.reduce((sum,b)=>sum+b.quantity,0)} beads</strong><p>{s.breakdown}</p></div><p className="belief-note">{s.note}</p>
  </div></section>;
}
