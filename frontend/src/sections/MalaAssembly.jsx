import { motion, useTransform } from 'framer-motion';
import { usePage } from '../context/PageContext';
export default function MalaAssembly({ progress }) {
  const { hero } = usePage();
  const opacity = useTransform(progress,[0.38,0.64,1],[0,1,1]); const y = useTransform(progress,[0.38,0.7],[36,0]);
  return <motion.div className="mala-reveal" style={{opacity,y}} data-testid="mala-assembly-section"><div className="mala-reveal-heading"><p className="eyebrow">{hero.reveal_eyebrow}</p><h2 className="editorial-title multiline">{hero.reveal_title}</h2></div><div className="mala-note mala-note-left"><span className="small-index">{hero.reveal_left_label}</span><p className="multiline">{hero.reveal_left_text}</p><span className="annotation-line"/></div><div className="mala-note mala-note-right"><span className="small-index">{hero.reveal_right_label}</span><p className="multiline">{hero.reveal_right_text}</p><span className="annotation-line"/></div></motion.div>;
}