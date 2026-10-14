import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import { IMAGES } from "../data/content";

export default function Celebrity() {
  return (
    <section data-testid="celebrity-section" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1"
        >
          <div className="absolute -inset-4 rounded-[2rem] border border-primary/20 rotate-2" />
          <div className="relative rounded-[2rem] overflow-hidden border border-primary/30 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <img
              src={IMAGES.milind}
              alt="Milind Soman wearing Siddha Mala"
              data-testid="milind-image"
              className="w-full h-[440px] sm:h-[560px] object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display text-2xl sm:text-3xl font-bold">Milind Soman</p>
              <p className="text-sm text-primary mt-1">Supermodel · Ironman · Philosopher of Discipline</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-2"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
            <Medal size={14} /> A Legend's Choice
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
            Trusted by <span className="text-gold italic">Milind Soman</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
            India's iconic supermodel and fitness legend, Milind Soman — a man who has conquered Ironman
            triathlons, run barefoot across continents, and redefined what it means to live with discipline
            and purpose — chose the Siddha Mala from Rudralife® as his sacred companion.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
            Just as he trains his body to perform at its absolute peak, he wears the Siddha Mala to align his
            energy, sharpen his focus, and stay grounded in purpose — because even legends seek divine support
            on their journey.
          </p>
          <p className="mt-6 font-display text-lg italic text-foreground/90">
            "If Milind Soman trusts the sacred power of Siddha Mala, perhaps it is time you discovered what it
            can do for yours."
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-primary">
            — Rudralife®, Trusted by India's Most Inspiring Souls
          </p>
        </motion.div>
      </div>
    </section>
  );
}
