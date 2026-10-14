import { motion } from "framer-motion";
import { BadgeCheck, Orbit, Flame, Snowflake, Shirt, Microscope, Download } from "lucide-react";
import { IMAGES } from "../data/content";

const FEATURES = [
  { icon: Orbit, text: "Balances all seven chakras and strengthens all nine planets in your birth chart" },
  { icon: BadgeCheck, text: "Includes three rare 2-Mukhi Nepal beads — 95% procured by Rudralife every season" },
  { icon: Flame, text: "Aura-charged with Vedic energization through the sacred Beej mantras" },
  { icon: Snowflake, text: "Vacuum-sealed, refrigerated & non-human-touched for absolute purity" },
  { icon: Shirt, text: "Lightweight, adjustable and designed for daily wear" },
  { icon: Microscope, text: "Backed by 25+ years of research and lab certification" },
];

export default function SiddhaIntro() {
  return (
    <section id="about" data-testid="siddha-intro-section" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Trademark-Registered Creation</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
            A Divine Combination of <span className="text-gold italic">1 to 14 Mukhi</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            The Siddha Mala is Rudralife's trademark-registered creation — a divine combination of Rudraksha
            beads from 1 Mukhi to 14 Mukhi, along with the sacred Gaurishankar and Ganesh Rudraksha, arranged
            in a rare Nakshatra pattern of 27+1 beads.
          </p>
          <ul className="mt-8 space-y-4">
            {FEATURES.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex items-start gap-4"
              >
                <span className="mt-0.5 w-9 h-9 shrink-0 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <f.icon size={16} className="text-primary" />
                </span>
                <span className="text-sm sm:text-base text-foreground/90 leading-relaxed">{f.text}</span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-primary/90 italic font-display text-base">
            Wearing the Siddha Mala is your first step towards the divine Indra Mala — the highest Rudraksha
            combination known to mankind.
          </p>
          <button
            data-testid="brochure-download-button"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors duration-300 text-sm font-semibold"
          >
            <Download size={16} /> Download Siddha Mala Brochure
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-primary/5 border border-primary/15 animate-spin-slow" style={{ borderRadius: "42% 58% 55% 45% / 45% 42% 58% 55%" }} />
          <div className="relative rounded-[2rem] overflow-hidden border border-primary/25 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <img
              src={IMAGES.malaSatin}
              alt="Siddha Mala on red satin"
              data-testid="siddha-intro-image"
              className="w-full h-[420px] sm:h-[540px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 glass rounded-xl px-5 py-4">
              <p className="font-display text-lg text-gold">Siddha Mala</p>
              <p className="text-xs text-muted-foreground mt-1">27+1 Beads · Lab Certified · Vedic Energized</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
