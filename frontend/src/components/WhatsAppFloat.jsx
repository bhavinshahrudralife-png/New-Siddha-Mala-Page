import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat({ number = "919820302028" }) {
  return (
    <a
      data-testid="whatsapp-float"
      href={`https://wa.me/${number}?text=${encodeURIComponent("Namaste, I would like a free Siddha Mala consultation.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1faa53] flex items-center justify-center animate-pulse-gold shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform duration-300"
    >
      <MessageCircle className="text-white" size={26} />
    </a>
  );
}
