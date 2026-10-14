import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BEADS } from "../data/content";

export default function BeadSelector() {
  const [active, setActive] = useState(BEADS[0]);

  return (
    <section id="collection" data-testid="bead-selector-section" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">The Sacred Composition</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold">
            1 to 14 Mukhi · <span className="text-gold italic">Gaurishankar · Ganesh</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Select a bead — each one is a deity, a planet, a power woven into the Siddha Mala.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Slots */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="glass rounded-2xl p-4 grid grid-cols-4 lg:grid-cols-2 gap-2.5 max-h-[480px] overflow-y-auto">
              {BEADS.map((b) => (
                <button
                  key={b.id}
                  data-testid={`bead-slot-${b.id}`}
                  onClick={() => setActive(b)}
                  className={`rounded-xl p-2.5 text-left transition-[background-color,border-color,transform] duration-300 border ${
                    active.id === b.id
                      ? "bg-primary/15 border-primary/60 shadow-[0_0_18px_rgba(212,175,55,0.2)]"
                      : "bg-card/60 border-border hover:border-primary/40 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-muted">
                    <img src={b.img} alt={b.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <p className="text-[11px] sm:text-xs font-semibold leading-tight">{b.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{b.deity}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Center display */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="glass rounded-3xl p-6 sm:p-10 h-full min-h-[420px] flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, rotateY: 70, scale: 0.85 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: -70, scale: 0.85 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="w-52 h-52 sm:w-72 sm:h-72 shrink-0 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_60px_rgba(212,175,55,0.25)] animate-float"
                >
                  <img
                    src={active.img}
                    alt={active.name}
                    data-testid="bead-display-image"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`t-${active.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45 }}
                  className="text-center sm:text-left"
                >
                  <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-primary border border-primary/40 rounded-full px-3 py-1 mb-4">
                    In the Mala {active.qty}
                  </span>
                  <h3 data-testid="bead-display-name" className="font-display text-3xl sm:text-4xl font-bold text-gold">
                    {active.name}
                  </h3>
                  <p className="mt-1.5 text-sm uppercase tracking-[0.2em] text-muted-foreground">{active.deity}</p>
                  <p className="mt-4 font-display text-xl text-primary/90 italic">{active.mantra}</p>
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
                    {active.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
