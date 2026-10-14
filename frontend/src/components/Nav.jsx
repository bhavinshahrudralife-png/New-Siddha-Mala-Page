import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { IMAGES } from '../data/content';

const LINKS = [['The Mala', '#about'], ['Sacred Beads', '#collection'], ['Our Experts', '#experts']];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return <header className="site-header" data-testid="main-nav">
    <div className="nav-inner">
      <a href="#top" data-testid="nav-logo" aria-label="Rudralife home"><img src={IMAGES.logo} alt="Rudralife — Rudraksha power for you" className="brand-logo" /></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {LINKS.map(([label, href], i) => <a href={href} key={href} data-testid={`nav-link-${i}`}>{label}</a>)}
      </nav>
      <a href="#enquiry" className="nav-consult" data-testid="nav-cta-button">Free consultation <ArrowUpRight size={16}/></a>
      <button className="mobile-menu-button icon-button" data-testid="nav-mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav">{open ? <X size={22}/> : <Menu size={22}/>}</button>
    </div>
    {open && <nav id="mobile-nav" className="mobile-nav" data-testid="nav-mobile-menu" aria-label="Mobile navigation">
      {LINKS.map(([label, href], i) => <a href={href} key={href} onClick={() => setOpen(false)} data-testid={`mobile-nav-link-${i}`}>{label}<ArrowUpRight size={16}/></a>)}
      <a href="#enquiry" onClick={() => setOpen(false)} data-testid="mobile-nav-consult">Free consultation <ArrowUpRight size={16}/></a>
    </nav>}
  </header>;
}