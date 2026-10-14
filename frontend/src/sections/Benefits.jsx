import { motion } from "framer-motion";
import { BENEFITS } from "../data/content";

export default function Benefits() {
  return (
    <section data-testid="benefits-section" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">The Promise of the Mala</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold max-w-3xl mx-auto leading-tight">
            Why the World's Achievers, Healers & Seekers <span className="text-gold italic">Wear It</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">
            Eight transformations the Siddha Mala has been gifting souls — for thousands of years.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              data-testid={`benefit-card-${i}`}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
              className={`card-lift glass rounded-2xl p-7 ${i === 0 || i === 7 ? "sm:col-span-2" : ""}`}
            >
              <span className="font-display text-4xl text-gold gold-glow block mb-4">{b.icon}</span>
              <h3 className="font-display text-xl font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
