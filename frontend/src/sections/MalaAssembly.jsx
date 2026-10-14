import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BEADS } from "../data/content";

const MALA_BEADS = Array.from({ length: 28 }, (_, i) => BEADS[i % BEADS.length]);

export default function MalaAssembly() {
  const ref = useRef(null);
  const [radius, setRadius] = useState(300);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-120, 60]);
  const mantraScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.05, 1]);
  const mantraOpacity = useTransform(scrollYProgress, [0, 0.15], [0.2, 1]);

  useEffect(() => {
    const fn = () => setRadius(Math.max(140, Math.min(window.innerWidth, window.innerHeight) * 0.31));
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <section ref={ref} data-testid="mala-assembly-section" className="relative h-[340vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute top-20 sm:top-24 left-0 right-0 text-center px-5 z-20 pointer-events-none">
          <div className="inline-block rounded-2xl bg-background/70 backdrop-blur-md px-6 py-4 border border-primary/10">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Rudralife's Sacred Signature</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold">The Siddha Mala</h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Scroll — and watch 28 sacred beads assemble into the rare Nakshatra pattern of 27+1.
            </p>
          </div>
        </div>

        {/* Rotating beej mantra aura */}
        <motion.div style={{ rotate: ringRotate }} className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full border border-primary/15 translate-y-[6vh]"
            style={{ width: radius * 2 + 120, height: radius * 2 + 120 }}
          />
        </motion.div>

        {/* Center Beej Mantra */}
        <motion.div
          style={{ scale: mantraScale, opacity: mantraOpacity }}
          className="relative z-10 text-center translate-y-[6vh]"
        >
          <div className="font-display text-5xl sm:text-7xl text-gold gold-glow">ॐ</div>
          <div className="font-display text-lg sm:text-2xl text-gold/80 mt-2 tracking-widest">नमः शिवाय</div>
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground mt-3">
            27 + 1 · Nakshatra Pattern
          </div>
        </motion.div>

        {/* Assembling beads */}
        {MALA_BEADS.map((b, i) => {
          const angle = (i / MALA_BEADS.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const start = (i / MALA_BEADS.length) * 0.75;
          const end = start + 0.18;
          return (
            <AssemblyBead key={i} bead={b} x={x} y={y} start={start} end={end} progress={scrollYProgress} index={i} />
          );
        })}
      </div>
    </section>
  );
}

function AssemblyBead({ bead, x, y, start, end, progress, index }) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.2, 1]);
  const dist = useTransform(progress, [start, end], [2.4, 1]);
  const tx = useTransform(dist, (d) => x * d);
  const ty = useTransform(dist, (d) => y * d);
  return (
    <motion.div
      data-testid={`assembly-bead-${index}`}
      style={{ opacity, scale, x: tx, y: ty }}
      className="absolute left-1/2 top-[56%] -ml-6 -mt-6 w-12 h-12 sm:-ml-8 sm:-mt-8 sm:w-16 sm:h-16"
    >
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary/60 shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-[#efe9dc]">
        <img src={bead.img} alt={bead.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
    </motion.div>
  );
}
