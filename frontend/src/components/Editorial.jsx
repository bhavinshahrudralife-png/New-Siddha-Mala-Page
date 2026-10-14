import { motion, useReducedMotion } from 'framer-motion';
import { usePage, mediaUrl } from '../context/PageContext';

export function Reveal({ children, className = '', delay = 0, ...props }) {
  const page = usePage(); const reduce = useReducedMotion();
  const animate = page.motion.enabled && page.motion.section_reveals && !reduce;
  return <motion.div className={className} initial={animate ? { opacity:0, y:32 } : false} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.12 }} transition={{ duration:0.85, delay, ease:[0.22,1,0.36,1] }} {...props}>{children}</motion.div>;
}

export function SectionHeading({ section, id, children }) {
  return <Reveal className="section-heading"><div><p className="eyebrow">{section.eyebrow}</p><h2 className="editorial-title multiline" data-testid={`${id}-heading`}>{section.title}</h2></div>{children || (section.text && <p className="section-caption">{section.text}</p>)}</Reveal>;
}

export function ProductImage({ src, alt, ...props }) {
  return <img src={mediaUrl(src)} alt={alt || ''} {...props}/>;
}