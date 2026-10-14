import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Play, Pause, BadgeCheck } from 'lucide-react';
import { usePage, mediaUrl } from '../context/PageContext';
import { useConsultation } from '../context/ConsultationContext';
import Scene3D from '../components/Scene3D';
import MalaAssembly from './MalaAssembly';
import { useJourneyPlayback } from '../hooks/useJourneyPlayback';

export default function Hero() {
  const page = usePage(); const content = page.hero;
  const { openConsultation } = useConsultation();
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const reduced = prefersReduced || !page.motion.enabled;
  const visible = useInView(ref);
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start','end end'] });
  const fade = useTransform(progress, [0, 0.25, 0.45], [1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.45], [0, -65]);
  const imageY = useTransform(progress, [0, 0.35, 0.75, 1], ['-4%', '2%', '5%', '5%']);
  const imageRotate = useTransform(progress, [0, 0.65, 1], [-8, 5, 0]);
  const imageScale = useTransform(progress, [0, 0.65, 1], [0.96, 1.02, 1]);
  const { playing, toggle } = useJourneyPlayback();
  return <section ref={ref} id="top" style={{'--journey-height':`${page.motion.journey_length * 100}svh`}} className={`hero-journey ${reduced ? 'reduced-journey' : ''}`} data-testid="hero-section">
    <div className="hero-sticky">
      <div className="hero-engraving" aria-hidden="true"><span/><span/><span/></div>
      <motion.div className="hero-heading" style={reduced ? {} : { opacity: fade, y: titleY }}>
        <p className="eyebrow" data-testid="hero-eyebrow"><span className="gold-line"/>{content.eyebrow}<span className="gold-line"/></p>
        <h1 data-testid="hero-title">{content.title}</h1>
        <p className="hero-tagline" data-testid="hero-tagline">{content.tagline}</p>
      </motion.div>
      {!reduced && <Scene3D progress={progress} visible={visible} beads={page.beads.items}/>}
      <motion.div className="hero-necklace" style={reduced ? {} : { y: imageY, rotate: imageRotate, scale: imageScale }}>
        <img src={mediaUrl(content.image)} alt={content.image_alt} data-testid="hero-mala-image" fetchPriority="high"/>
      </motion.div>
      <motion.div className="hero-aside hero-aside-left" style={reduced ? {} : { opacity: fade }}>
        <span className="small-index">{content.composition_label}</span>
        <p className="multiline" data-testid="hero-composition">{content.composition}</p>
        <span className="hero-fine-print multiline">{content.note}</span>
      </motion.div>
      <motion.div className="hero-aside hero-aside-right" style={reduced ? {} : { opacity: fade }}>
        <div className="hero-certified"><BadgeCheck size={18}/><span>{content.badge}</span></div>
        <p data-testid="hero-description">{content.description}</p>
        <button className="text-link" onClick={() => openConsultation()} data-testid="hero-consult-button">{content.cta_label}<ArrowUpRight size={18}/></button>
      </motion.div>
      {!reduced && <MalaAssembly progress={progress}/>}
      <div className="hero-bottom">
        <a href="#about" data-testid="hero-scroll-cue" className="scroll-cue"><span><ArrowDown size={15}/></span>{content.scroll_label}</a>
        {!reduced && <button className={`journey-play ${playing ? 'is-playing' : ''}`} data-testid="journey-play-button" onClick={toggle} aria-pressed={playing}>{playing ? <Pause size={13}/> : <Play size={13}/>} {playing ? 'Pause journey' : 'Play journey'}</button>}
        <span className="hero-edition">{content.edition}</span>
      </div>
      <motion.div className="journey-progress" style={{ scaleX: reduced ? 1 : progress }}/>
    </div>
  </section>;
}