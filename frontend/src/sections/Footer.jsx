import { Flower2, Phone, Mail, Globe, MapPin, Clock } from "lucide-react";

export default function Footer({ content }) {
  return (
    <footer data-testid="footer" className="relative border-t border-primary/15 bg-card/40 px-5 sm:px-8 pt-16 pb-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-9 h-9 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
              <Flower2 className="text-primary" size={18} />
            </span>
            <span className="font-display text-2xl font-bold">Rudra<span className="text-gold">life</span></span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            At Rudralife, we believe that Rudraksha is not just a bead — it is a divine connection. For over 25
            years, we have guided thousands of seekers with authenticity, trust, and sacred knowledge.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3"><Phone size={15} className="text-primary shrink-0" />{content.phone}</li>
            <li className="flex items-center gap-3"><Mail size={15} className="text-primary shrink-0" />{content.email}</li>
            <li className="flex items-center gap-3"><Globe size={15} className="text-primary shrink-0" />{content.website}</li>
            <li className="flex items-center gap-3"><MapPin size={15} className="text-primary shrink-0" />{content.address}</li>
            <li className="flex items-center gap-3"><Clock size={15} className="text-primary shrink-0" />{content.hours}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#enquiry" data-testid="footer-link-recommendation" className="hover:text-primary transition-colors">Get FREE Recommendation</a></li>
            <li><a href="#experts" data-testid="footer-link-experts" className="hover:text-primary transition-colors">Meet Our Experts</a></li>
            <li><a href="#faq" data-testid="footer-link-faq" className="hover:text-primary transition-colors">FAQs</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">© 2025 Rudralife®. All rights reserved.</p>
        <p className="mt-3 text-[11px] text-muted-foreground/70 leading-relaxed text-center max-w-4xl mx-auto">
          Disclaimer: Wearing Rudraksha is a matter of faith and belief. All information provided is based on
          scriptures, published books, and individual experiences. Rudralife guarantees the quality of the beads
          and not the effects. Wearer discretion is advised.
        </p>
      </div>
    </footer>
  );
}
