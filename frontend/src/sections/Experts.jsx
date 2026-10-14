import { useState } from "react";
import { motion } from "framer-motion";
import { EXPERTS } from "../data/content";

export default function Experts() {
  return (
    <section id="experts" data-testid="experts-section" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Guided by Masters</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold">Panel Experts of Rudralife</h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Meet the guiding minds behind Rudralife's mission — a panel of Vedic experts bringing together
            ancient knowledge and deep compassion.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-primary/70">Tap a card to reveal more</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {EXPERTS.map((e, i) => (
            <ExpertCard key={e.name} expert={e} index={i} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertCard({ expert, index, featured }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.button
      data-testid={`expert-card-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      onClick={() => setFlipped(!flipped)}
      className={`relative text-left rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-[border-color] duration-300 min-h-[300px] sm:min-h-[360px] ${featured ? "lg:col-span-2" : ""}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        {/* Front */}
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          <img src={expert.img} alt={expert.name} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <p className="font-display text-lg sm:text-xl font-bold leading-tight">{expert.name}</p>
            <p className="text-[11px] sm:text-xs text-primary mt-1">{expert.role}</p>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{expert.years}</span>
              <span className="text-[10px] uppercase tracking-widest text-primary border border-primary/40 rounded-full px-2 py-0.5">Tap</span>
            </div>
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 glass p-5 sm:p-6 flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="font-display text-3xl text-gold mb-3">ॐ</span>
          <p className="font-display text-lg font-bold">{expert.name}</p>
          <p className="text-xs text-primary mt-0.5 mb-3">{expert.title}</p>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{expert.desc}</p>
        </div>
      </motion.div>
    </motion.button>
  );
}
