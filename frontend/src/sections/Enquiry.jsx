import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flower2, MessageCircle, Lock, Loader2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { submitEnquiry, formatApiError } from "../lib/api";
import { toast } from "sonner";

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Your full name", required: true },
  { name: "email", label: "Email ID", type: "email", placeholder: "you@example.com", required: true },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", required: true },
  { name: "city", label: "City", type: "text", placeholder: "Your city", required: true },
  { name: "profession", label: "Profession", type: "text", placeholder: "Your profession", required: true },
];

export default function Enquiry({ content }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", profession: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitEnquiry(form);
      navigate("/thank-you", { state: { name: form.name } });
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enquiry" data-testid="enquiry-section" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Begin Your Sacred Journey</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
            Get Your Personalised Siddha Mala Consultation —{" "}
            <span className="text-gold italic">Free</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Our panel of Vedic experts will guide you personally, authentically, and with complete transparency.
          </p>
          <a
            data-testid="enquiry-whatsapp-button"
            href={`https://wa.me/${content.whatsapp || "919820302028"}?text=${encodeURIComponent("Namaste, I would like a free Siddha Mala consultation.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-[#1faa53]/50 text-[#4ade80] hover:bg-[#1faa53]/10 transition-colors duration-300 font-semibold"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
          <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <Lock size={13} className="text-primary" />
            Your information is completely private. We never share your details. No spam, no pressure.
          </p>
        </motion.div>

        <motion.form
          data-testid="enquiry-form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl p-7 sm:p-9 space-y-5"
        >
          {FIELDS.map((f) => (
            <div key={f.name} className="space-y-2">
              <Label htmlFor={`enquiry-${f.name}`} className="text-sm text-foreground/90">{f.label}</Label>
              <Input
                id={`enquiry-${f.name}`}
                data-testid={`enquiry-input-${f.name}`}
                type={f.type}
                required={f.required}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                className="bg-background/60 border-input focus-visible:ring-primary h-12"
              />
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="enquiry-message" className="text-sm text-foreground/90">Message</Label>
            <Textarea
              id="enquiry-message"
              data-testid="enquiry-input-message"
              placeholder="Tell us what you seek..."
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-background/60 border-input focus-visible:ring-primary resize-none"
            />
          </div>
          <button
            data-testid="enquiry-submit-button"
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-[#e5c04a] transition-colors duration-300 disabled:opacity-60 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Flower2 size={18} />}
            {loading ? "Submitting..." : "Begin Consultation — Free"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
