import { useState, useEffect } from "react";
import { Flower2, Menu, X } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Collection", href: "#collection" },
  { label: "Experts", href: "#experts" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      data-testid="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled ? "glass" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
            <Flower2 className="w-4.5 h-4.5 text-primary" size={18} />
          </span>
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight">
            Rudra<span className="text-gold">life</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#enquiry"
            data-testid="nav-cta-button"
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-[#e5c04a] transition-colors duration-300"
          >
            Get Free Recommendation
          </a>
        </nav>
        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div data-testid="nav-mobile-menu" className="md:hidden glass border-t border-primary/10">
          <div className="px-6 py-5 flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#enquiry"
              onClick={() => setOpen(false)}
              className="text-center font-semibold px-5 py-3 rounded-full bg-primary text-primary-foreground"
            >
              Get Free Recommendation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
