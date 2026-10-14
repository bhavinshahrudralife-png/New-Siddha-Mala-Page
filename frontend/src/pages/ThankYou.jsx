import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { Flower2, Home, MessageCircle } from "lucide-react";

export default function ThankYou() {
  const { state } = useLocation();
  const name = state?.name;

  return (
    <div data-testid="thankyou-page" className="min-h-screen flex items-center justify-center px-5 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[520px] h-[520px] rounded-full bg-primary/10 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative glass rounded-3xl p-10 sm:p-14 text-center max-w-xl w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 w-20 h-20 rounded-full bg-primary/15 border border-primary/50 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.3)]"
        >
          <Flower2 className="text-primary" size={36} />
        </motion.div>
        <p className="font-display text-4xl text-gold gold-glow mb-3">ॐ</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">
          Thank You{name ? `, ${name}` : ""}
        </h1>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          Your sacred journey has begun. Our Vedic expert panel has received your enquiry and will personally
          reach out to you within 24 hours with your personalised Siddha Mala recommendation.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            data-testid="thankyou-home-button"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-[#e5c04a] transition-colors duration-300"
          >
            <Home size={16} /> Back to Home
          </Link>
          <a
            href="https://wa.me/919820302028"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="thankyou-whatsapp-button"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#1faa53]/50 text-[#4ade80] hover:bg-[#1faa53]/10 transition-colors duration-300 font-semibold"
          >
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}
