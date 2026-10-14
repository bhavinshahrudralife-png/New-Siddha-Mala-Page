import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Play, Pause, BadgeCheck } from 'lucide-react';
import { IMAGES } from '../data/content';
import Scene3D from '../components/Scene3D';
import MalaAssembly from './MalaAssembly';
import { useJourneyPlayback } from '../hooks/useJourneyPlayback';

export default function Hero({ content }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const visible = useInView(ref);
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start','end end'] });
  const fade = useTransform(progress, [0, 0.25, 0.45], [1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.45], [0, -65]);
  const imageY = useTransform(progress, [0, 0.35, 0.75, 1], ['-4%', '2%', '5%', '5%']);
  const imageRotate = useTransform(progress, [0, 0.65, 1], [-8, 5, 0]);
  const imageScale = useTransform(progress, [0, 0.65, 1], [0.96, 1.02, 1]);
  const { playing, toggle } = useJourneyPlayback();
  return <section ref={ref} id="top" className={`hero-journey ${reduced ? 'reduced-journey' : ''}`} data-testid="hero-section">
    <div className="hero-sticky">
      <div className="hero-engraving" aria-hidden="true"><span/><span/><span/></div>
      <motion.div className="hero-heading" style={reduced ? {} : { opacity: fade, y: titleY }}>
        <p className="eyebrow" data-testid="hero-eyebrow"><span className="gold-line"/> RUDRALIFE’S SIGNATURE CREATION <span className="gold-line"/></p>
        <h1 data-testid="hero-title">The <em>Siddha Mala.</em></h1>
        <p className="hero-tagline" data-testid="hero-tagline">{content.hero_title}</p>
      </motion.div>
      <Scene3D progress={progress} visible={visible}/>
      <motion.div className="hero-necklace" style={reduced ? {} : { y: imageY, rotate: imageRotate, scale: imageScale }}>
        <img src={IMAGES.malaHero} alt="Complete Rudralife Siddha Mala with natural Rudraksha and gold fittings" data-testid="hero-mala-image" fetchPriority="high"/>
      </motion.div>
      <motion.div className="hero-aside hero-aside-left" style={reduced ? {} : { opacity: fade }}>
        <span className="small-index">01 — THE SACRED COMBINATION</span>
        <p data-testid="hero-composition">1–14 Mukhi.<br/>Gauri Shankar.<br/>Ganesh.</p>
        <span className="hero-fine-print">Every bead, a purpose.<br/>Together, a complete whole.</span>
      </motion.div>
      <motion.div className="hero-aside hero-aside-right" style={reduced ? {} : { opacity: fade }}>
        <div className="hero-certified"><BadgeCheck size={18}/><span>AUTHENTIC. LAB-CERTIFIED.</span></div>
        <p data-testid="hero-description">{content.hero_subtitle}</p>
        <a className="text-link" href="#collection" data-testid="hero-discover-button">Discover the mala <ArrowUpRight size={18}/></a>
      </motion.div>
      {!reduced && <MalaAssembly progress={progress}/>}
      <div className="hero-bottom">
        <a href="#about" data-testid="hero-scroll-cue" className="scroll-cue"><span><ArrowDown size={15}/></span> A sacred journey, bead by bead</a>
        {!reduced && <button className={`journey-play ${playing ? 'is-playing' : ''}`} data-testid="journey-play-button" onClick={toggle} aria-pressed={playing}>{playing ? <Pause size={13}/> : <Play size={13}/>} {playing ? 'Pause journey' : 'Play journey'}</button>}
        <span className="hero-edition">NEPAL RUDRAKSHA · HANDCRAFTED</span>
      </div>
      <motion.div className="journey-progress" style={{ scaleX: reduced ? 1 : progress }}/>
    </div>
  </section>;
}