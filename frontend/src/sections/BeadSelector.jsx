import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { BEADS, IMAGES } from '../data/content';

export default function BeadSelector() {
  const [selected, setSelected] = useState(0);
  const bead = BEADS[selected];
  const reduced = useReducedMotion();
  const next = delta => setSelected(i => (i + delta + BEADS.length) % BEADS.length);
  const onKey = e => {
    if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      const n = e.key === 'Home' ? 0 : e.key === 'End' ? 15 : (selected + (['ArrowRight','ArrowDown'].includes(e.key) ? 1 : 15)) % 16;
      setSelected(n); document.querySelector(`[data-testid="bead-slot-${n+1}"]`)?.focus();
    }
  };
  return <section id="collection" className="collection-section section-space" data-testid="bead-selector-section">
    <div className="site-container">
      <div className="section-heading collection-heading"><div><p className="eyebrow">THE SACRED COMPOSITION</p><h2 className="editorial-title">Individually extraordinary.<br/><em>Together, Siddha.</em></h2></div><p className="section-caption">1 to 14 Mukhi. Gauri Shankar. Ganesh.<br/>Sixteen distinct forms of Rudraksha.<br/>One complete spiritual companion.</p></div>
      <div className="collection-layout">
        <div className="bead-dial" data-testid="bead-selector-dial" role="tablist" aria-label="Rudraksha beads" onKeyDown={onKey}>
          <div className="dial-orbit" aria-hidden="true"/><div className="dial-inner-orbit" aria-hidden="true"/>
          <div className="dial-centrepiece" aria-hidden="true"><img src={IMAGES.malaHero} alt="" loading="lazy"/><span>THE SIDDHA MALA</span></div>
          {BEADS.map((b, i) => {
            const a = i / 16 * Math.PI * 2 - Math.PI / 2;
            return <button key={b.id} id={`bead-tab-${b.id}`} role="tab" aria-selected={selected === i} aria-controls="bead-detail" tabIndex={selected === i ? 0 : -1} data-testid={`bead-slot-${b.id}`} className={`bead-node ${selected === i ? 'selected' : ''}`} style={{ left: `${50 + 42 * Math.cos(a)}%`, top: `${50 + 42 * Math.sin(a)}%` }} onClick={() => setSelected(i)}>
              <span className="node-photo"><img src={b.img} alt="" loading="lazy"/></span><span>{b.name}</span>
            </button>;
          })}
        </div>
        <div className="bead-detail" id="bead-detail" role="tabpanel" aria-labelledby={`bead-tab-${bead.id}`} data-testid="bead-detail-panel">
          <div className="bead-detail-top"><span className="small-index" data-testid="bead-counter">{String(bead.id).padStart(2, '0')} / 16</span><span className="detail-rule"/><span className="small-index">SACRED RUDRAKSHA</span></div>
          <AnimatePresence mode="wait" initial={false}><motion.div key={bead.id} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: 0.22 }}>
            <div className="bead-feature-image"><img src={bead.img} alt={`${bead.name} Rudraksha from Rudralife`} data-testid="bead-display-image"/></div>
            <p className="eyebrow" data-testid="bead-display-theme">{bead.theme}</p><h3 className="bead-detail-name" data-testid="bead-display-name">{bead.name}<em> Rudraksha</em></h3>
            <p className="bead-deity" data-testid="bead-display-deity">{bead.deity} <span>·</span> {bead.qty} in the mala</p>
            <p className="bead-description" data-testid="bead-display-description">{bead.desc}</p>
            <a href={bead.source} target="_blank" rel="noopener noreferrer" className="text-link" data-testid="bead-source-link">Explore at Rudralife <ArrowUpRight size={15}/></a>
          </motion.div></AnimatePresence>
          <div className="bead-controls"><button onClick={() => next(-1)} className="icon-button" aria-label="Previous bead" title="Previous bead" data-testid="bead-previous"><ArrowLeft size={18}/></button><span>{bead.id <= 14 ? `${bead.id} MUKHI` : bead.name.toUpperCase()}</span><button onClick={() => next(1)} className="icon-button" aria-label="Next bead" title="Next bead" data-testid="bead-next"><ArrowRight size={18}/></button></div>
        </div>
      </div>
      <p className="belief-note">Traditional associations are based on spiritual beliefs. Individual experiences vary.</p>
    </div>
  </section>;
}