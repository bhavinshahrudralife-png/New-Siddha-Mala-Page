import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { usePage, mediaUrl } from '../context/PageContext';
import { useConsultation } from '../context/ConsultationContext';

export default function Nav() {
  const [open,setOpen] = useState(false); const page = usePage(); const { brand } = page;
  const { openConsultation } = useConsultation();
  const sections = { '#about':'signature','#collection':'gallery','#composition':'beads','#experts':'experts','#faq':'faq','#enquiry':'consultation' };
  const links = brand.nav.filter(l => !sections[l.href] || page[sections[l.href]].visible);
  return <header className="site-header" data-testid="main-nav">
    {brand.show_announcement && <div className="brand-announcement" data-testid="brand-announcement">{brand.announcement}</div>}
    <div className="nav-inner"><a href="#top" data-testid="nav-logo" aria-label={`${brand.name} home`}><img src={mediaUrl(brand.logo)} alt={brand.name} className="brand-logo"/></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map((l,i) => <a href={l.href} key={l.id} data-testid={`nav-link-${i}`}>{l.label}</a>)}</nav>
      <button className="nav-consult" data-testid="nav-cta-button" onClick={() => openConsultation()}>{brand.consultation_label}<ArrowUpRight size={16}/></button>
      <button className="mobile-menu-button icon-button" data-testid="nav-mobile-toggle" onClick={() => setOpen(!open)} aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-nav">{open?<X size={22}/>:<Menu size={22}/>}</button>
    </div>
    {open && <nav id="mobile-nav" className="mobile-nav" data-testid="nav-mobile-menu" aria-label="Mobile navigation">{links.map((l,i) => <a href={l.href} key={l.id} onClick={() => setOpen(false)} data-testid={`mobile-nav-link-${i}`}>{l.label}<ArrowUpRight size={16}/></a>)}<button onClick={() => {setOpen(false);openConsultation();}} data-testid="mobile-nav-consult">{brand.consultation_label}<ArrowUpRight size={16}/></button></nav>}
  </header>;
}