import { motion, useTransform } from 'framer-motion';

export default function MalaAssembly({ progress }) {
  const opacity = useTransform(progress, [0.38, 0.64, 1], [0, 1, 1]);
  const y = useTransform(progress, [0.38, 0.7], [36, 0]);
  return <motion.div className="mala-reveal" style={{ opacity, y }} data-testid="mala-assembly-section">
    <div className="mala-reveal-heading"><p className="eyebrow">MANY SACRED ENERGIES. ONE MALA.</p><h2 className="editorial-title">A connection<br/><em>like no other.</em></h2></div>
    <div className="mala-note mala-note-left"><span className="small-index">NATURALLY EXTRAORDINARY</span><p>Chosen with care.<br/>Joined by tradition.</p><span className="annotation-line"/></div>
    <div className="mala-note mala-note-right"><span className="small-index">THE COMPLETE SIDDHA MALA</span><p>1 to 14 Mukhi<br/>Gauri Shankar & Ganesh</p><span className="annotation-line"/></div>
  </motion.div>;
}