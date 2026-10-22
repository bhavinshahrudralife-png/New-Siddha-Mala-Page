import { useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check,ArrowUpRight,ArrowLeft,MessageCircle } from 'lucide-react';
import { usePage,mediaUrl } from '../context/PageContext';
import { PageTheme } from '../components/PageTheme';
export default function ThankYou() {
  const {state}=useLocation(); const {thankyou:s,brand,footer}=usePage();
  useEffect(()=>{window.scrollTo(0,0);document.title=`${s.title} | ${brand.name}`;},[s.title,brand.name]);
  const rise=(d)=>({initial:{opacity:0,y:24},animate:{opacity:1,y:0},transition:{duration:.7,delay:d,ease:[.22,1,.36,1]}});
  return <main className="thanks-page peach-edition" data-testid="thankyou-page"><PageTheme/>
    <header className="thanks-header"><Link to="/" data-testid="thankyou-logo"><img src={mediaUrl(brand.logo)} alt={brand.name} className="brand-logo"/></Link></header>
    <div className="thanks-layout">
      <div className="thanks-copy">
        <motion.span className="thanks-check" initial={{scale:0,rotate:-30}} animate={{scale:1,rotate:0}} transition={{type:'spring',stiffness:220,damping:14,delay:.1}}><Check size={30}/></motion.span>
        <motion.p className="eyebrow" {...rise(.2)}>{s.eyebrow}</motion.p>
        <motion.h1 data-testid="thankyou-title" {...rise(.3)}>{s.title}{state?.name?`, ${state.name}`:''}.</motion.h1>
        <motion.p className="thanks-text" data-testid="thankyou-confirmation" {...rise(.4)}>{s.text}</motion.p>
        <motion.div className="thanks-steps" {...rise(.5)}><span className="small-index">{s.steps_title}</span>{s.steps.map((st,i)=><div className="thanks-step" key={st.id} data-testid={`thankyou-step-${st.id}`}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{st.title}</strong><p>{st.text}</p></div></div>)}</motion.div>
        <motion.div className="thanks-actions" {...rise(.6)}><a href={`https://wa.me/${footer.whatsapp}`} target="_blank" rel="noopener noreferrer" className="primary-button" data-testid="thankyou-whatsapp-button"><MessageCircle size={16}/>{s.whatsapp_label}<ArrowUpRight size={16}/></a><Link to="/" className="text-link" data-testid="thankyou-home-button"><ArrowLeft size={16}/>{s.home_label}</Link></motion.div>
      </div>
      <motion.div className="thanks-visual" initial={{opacity:0,y:-60,rotate:-6}} animate={{opacity:1,y:0,rotate:0}} transition={{duration:1.3,ease:[.22,1,.36,1]}}><div className="thanks-halo"/><img src={mediaUrl(s.image)} alt="The Siddha Mala" data-testid="thankyou-image"/></motion.div>
    </div>
  </main>;
}
