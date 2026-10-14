import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { FAQS } from "../data/content";

export default function FAQ() {
  return (
    <section id="faq" data-testid="faq-section" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Your Questions Answered</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold">Frequently Asked Questions</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                data-testid={`faq-item-${i}`}
                className="glass rounded-xl border-primary/15 px-5 sm:px-6"
              >
                <AccordionTrigger data-testid={`faq-trigger-${i}`} className="text-left font-display text-base sm:text-lg hover:text-primary hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent data-testid={`faq-content-${i}`} className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
