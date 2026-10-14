import Marquee from "react-fast-marquee";
import { CELEBS_ROW1, CELEBS_ROW2 } from "../data/content";

function Row({ items, reverse }) {
  return (
    <Marquee speed={45} reverse={reverse} gradient gradientColor="#0a0a09" gradientWidth={80} className="py-3">
      {items.map((c, i) => (
        <div
          key={`${c.name}-${i}`}
          data-testid={`trusted-${reverse ? "leader" : "celeb"}-${i}`}
          className="mx-3 glass rounded-full pl-4 pr-6 py-3 flex items-center gap-3 min-w-[220px]"
        >
          <span className="w-9 h-9 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center font-display text-gold text-sm font-bold">
            {c.name.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">{c.name}</p>
            <p className="text-[11px] text-muted-foreground">{c.role}</p>
          </div>
        </div>
      ))}
    </Marquee>
  );
}

export default function Trusted() {
  return (
    <section data-testid="trusted-section" className="relative py-24 sm:py-28 overflow-hidden">
      <div className="text-center mb-12 px-5">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Seekers Worldwide</p>
        <h2 className="font-display text-3xl sm:text-5xl font-bold">Trusted by Seekers Worldwide</h2>
        <p className="mt-4 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          From spiritual practitioners to professionals and leaders, Rudralife serves a diverse global community.
        </p>
      </div>
      <Row items={CELEBS_ROW1} />
      <Row items={CELEBS_ROW2} reverse />
    </section>
  );
}
