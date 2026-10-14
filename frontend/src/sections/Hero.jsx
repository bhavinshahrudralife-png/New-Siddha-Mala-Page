import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

export default function Hero({ content }) {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[130vh] flex flex-col items-center justify-start pt-36 sm:pt-44 px-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-4xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 w-20 h-20 rounded-full border border-primary/40 bg-primary/5 flex items-center justify-center"
        >
          <span className="font-display text-4xl text-gold gold-glow">ॐ</span>
        </motion.div>
        <p className="text-sm uppercase tracking-[0.35em] text-primary mb-6 flex items-center justify-center gap-2">
          <Sparkles size={14} /> Rudralife® Presents <Sparkles size={14} />
        </p>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] gold-glow">
          The Sacred <span className="text-gold italic">Siddha Mala</span>
        </h1>
        <p className="mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {content.hero_title}
        </p>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
          {content.hero_subtitle}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#enquiry"
            data-testid="hero-enquiry-button"
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-[#e5c04a] transition-colors duration-300 shadow-[0_0_40px_rgba(212,175,55,0.25)]"
          >
            Enquiry Now
          </a>
          <a
            href="#about"
            data-testid="hero-discover-button"
            className="px-8 py-4 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors duration-300"
          >
            Discover the Sacred →
          </a>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-primary/60 z-10"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
