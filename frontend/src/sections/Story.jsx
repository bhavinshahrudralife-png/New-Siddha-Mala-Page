import { motion } from "framer-motion";
import { Mountain, Quote } from "lucide-react";

const PARAS = [
  "In a quiet village at the foothills of the Himalayas, there lived a young man named Aarav. Despite having everything he needed, he often felt lost, restless, and disconnected from life.",
  "One day, while traveling, Aarav met a wise sage who noticed his troubled mind. The sage handed him a sacred bead necklace and said, \"This is the Siddha Mala — crafted with powerful Rudraksha beads, each carrying divine energy. Wear it with faith, and it will guide you.\"",
  "The Siddha Mala was not ordinary. It was believed to be made according to ancient scriptures, combining multiple Rudraksha beads, each symbolizing different energies of Lord Shiva and the universe.",
  "Aarav wore the mala every day. Slowly, things began to change. His mind became calm, his decisions clearer, and his life more meaningful. Opportunities came naturally, and his fears started fading away.",
  "But the biggest transformation was within — Aarav discovered peace, purpose, and a deeper connection with himself.",
];

export default function Story() {
  return (
    <section data-testid="story-section" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3 flex items-center justify-center gap-2">
            <Mountain size={14} /> The Sacred Journey
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold">The Story of the Siddha Mala</h2>
        </div>
        <div className="relative pl-8 sm:pl-12 border-l border-primary/25 space-y-10">
          {PARAS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted-foreground leading-relaxed relative"
            >
              <span className="absolute -left-[41px] sm:-left-[57px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_12px_rgba(212,175,55,0.5)]" />
              {p}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 glass rounded-2xl p-8 sm:p-10 text-center"
        >
          <Quote className="mx-auto text-primary mb-4" size={28} />
          <p className="font-display text-xl sm:text-2xl italic leading-relaxed text-foreground/95">
            "It's not just the Siddha Mala — it's the faith, balance, and energy it awakens within you."
          </p>
          <p className="mt-4 text-sm text-primary tracking-widest uppercase">— Aarav</p>
        </motion.div>
      </div>
    </section>
  );
}
