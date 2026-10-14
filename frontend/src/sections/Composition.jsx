import { motion } from "framer-motion";
import { BEADS } from "../data/content";

export default function Composition({ content }) {
  const stats = [
    { value: content.stat_certified || "100%", label: "Lab-Certified" },
    { value: content.stat_years || "25+", label: "Years Of Trust" },
    { value: content.stat_souls || "5,00,000+", label: "Happy Souls" },
    { value: "FREE", label: "Expert Consultation" },
  ];
  return (
    <section data-testid="composition-section" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">The Sacred Composition</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold">28 Beads · 28 Divine Energies</h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Each bead in the Siddha Mala is a deity, a planet, a power — woven into one sacred whole.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {BEADS.map((b, i) => (
            <motion.div
              key={b.id}
              data-testid={`composition-bead-${b.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
              className="card-lift relative glass rounded-xl p-3 text-center"
            >
              <span className="absolute top-2 right-2 text-[10px] font-bold text-primary bg-primary/10 border border-primary/30 rounded-full px-1.5 py-0.5">
                {b.qty}
              </span>
              <div className="w-14 h-14 mx-auto rounded-full overflow-hidden border border-primary/40 mb-2.5">
                <img src={b.img} alt={b.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-xs font-semibold leading-tight">{b.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{b.deity}</p>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-14 max-w-3xl mx-auto text-center font-display text-xl sm:text-2xl italic text-foreground/90 leading-relaxed"
        >
          "No other mala carries the complete spectrum of Rudraksha energies. The Siddha Mala is the crown
          jewel of all Rudraksha treasures — a gift reserved for the destined few."
        </motion.blockquote>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              data-testid={`stat-${i}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center glass rounded-2xl py-8 px-4"
            >
              <p className="font-display text-3xl sm:text-4xl font-bold text-gold gold-glow">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
