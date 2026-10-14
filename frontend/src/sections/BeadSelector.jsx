import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { usePage, mediaUrl } from '../context/PageContext';
import { useConsultation } from '../context/ConsultationContext';
import { SectionHeading } from '../components/Editorial';

export default function BeadSelector() {
  const {beads:s} = usePage(); const BEADS = s.items;
  const {openConsultation} = useConsultation();
  const [selected, setSelected] = useState(0);
  const bead = BEADS[selected];
  const reduced = useReducedMotion();
  const next = delta => setSelected(i => (i + delta + BEADS.length) % BEADS.length);
  const onKey = e => {
    if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      const n = e.key === 'Home' ? 0 : e.key === 'End' ? 15 : (selected + (['ArrowRight','ArrowDown'].includes(e.key) ? 1 : 15)) % 16;
      setSelected(n); document.querySelector(`[data-testid="bead-slot-${BEADS[n].id}"]`)?.focus();
    }
  };
  return <section id="composition" className="collection-section section-space" data-testid="bead-selector-section">
    <div className="site-container">
      <SectionHeading section={s} id="beads"/>
      <div className="collection-layout">
        <div className="bead-dial" data-testid="bead-selector-dial" role="tablist" aria-label="Rudraksha beads" onKeyDown={onKey}>
          <div className="dial-orbit" aria-hidden="true"/><div className="dial-inner-orbit" aria-hidden="true"/>
          <div className="dial-centrepiece" aria-hidden="true"><img src={mediaUrl(s.image)} alt="" loading="lazy"/><span>{s.centre_label}</span></div>
          {BEADS.map((b, i) => {
            const a = i / 16 * Math.PI * 2 - Math.PI / 2;
            return <button key={b.id} id={`bead-tab-${b.id}`} role="tab" aria-selected={selected === i} aria-controls="bead-detail" tabIndex={selected === i ? 0 : -1} data-testid={`bead-slot-${b.id}`} className={`bead-node ${selected === i ? 'selected' : ''}`} style={{ left: `${50 + 42 * Math.cos(a)}%`, top: `${50 + 42 * Math.sin(a)}%` }} onClick={() => setSelected(i)}>
              <span className="node-photo"><img src={mediaUrl(b.img)} alt="" loading="lazy"/></span><span>{b.name}</span>
            </button>;
          })}
        </div>
        <div className="bead-detail" id="bead-detail" role="tabpanel" aria-labelledby={`bead-tab-${bead.id}`} data-testid="bead-detail-panel">
          <div className="bead-detail-top"><span className="small-index" data-testid="bead-counter">{String(selected+1).padStart(2, '0')} / 16</span><span className="detail-rule"/><span className="small-index">{s.description_label}</span></div>
          <AnimatePresence mode="wait" initial={false}><motion.div key={bead.id} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: 0.22 }}>
            <div className="bead-feature-image"><img src={mediaUrl(bead.img)} alt={`${bead.name} Rudraksha from Rudralife`} data-testid="bead-display-image"/></div>
            <p className="eyebrow" data-testid="bead-display-theme">{bead.theme}</p><h3 className="bead-detail-name" data-testid="bead-display-name">{bead.name}<em> Rudraksha</em></h3>
            <p className="bead-deity" data-testid="bead-display-deity">{bead.deity}<span>·</span>{bead.quantity} {bead.quantity === 1 ? 'bead' : 'beads'} in the mala</p>
            <p className="bead-description" data-testid="bead-display-description">{bead.desc}</p>
            <button className="text-link" onClick={()=>openConsultation(bead.name)} data-testid="bead-consult-button">{s.cta_label}<ArrowUpRight size={15}/></button>
            <a href={bead.source} target="_blank" rel="noopener noreferrer" className="bead-source-link" data-testid="bead-source-link">{s.source_label}<ArrowUpRight size={13}/></a>
          </motion.div></AnimatePresence>
          <div className="bead-controls"><button onClick={() => next(-1)} className="icon-button" aria-label="Previous bead" title="Previous bead" data-testid="bead-previous"><ArrowLeft size={18}/></button><span>{bead.id <= 14 ? `${bead.id} MUKHI` : bead.name.toUpperCase()}</span><button onClick={() => next(1)} className="icon-button" aria-label="Next bead" title="Next bead" data-testid="bead-next"><ArrowRight size={18}/></button></div>
        </div>
      </div>
      <div className="composition-breakdown" data-testid="composition-breakdown"><strong data-testid="composition-total">{BEADS.reduce((sum,b)=>sum+Number(b.quantity),0)} beads</strong><p>{s.breakdown}</p></div>
      <p className="belief-note">{s.note}</p>
    </div>
  </section>;
}