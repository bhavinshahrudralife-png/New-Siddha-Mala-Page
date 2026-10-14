import { MessageCircle } from 'lucide-react';
export default function WhatsAppFloat({ number }) {
  return <a data-testid="whatsapp-float" href={`https://wa.me/${number}?text=${encodeURIComponent('Namaste, I would like a free Siddha Mala consultation.')}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with Rudralife on WhatsApp" title="Chat on WhatsApp" className="whatsapp-float"><MessageCircle size={22} strokeWidth={1.5}/></a>;
}