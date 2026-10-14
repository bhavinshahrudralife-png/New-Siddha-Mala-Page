import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, LockKeyhole, Loader2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { submitEnquiry, formatApiError } from '../lib/api';

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel', placeholder: '+91', autoComplete: 'tel' },
  { name: 'city', label: 'City', type: 'text', placeholder: 'Your city', autoComplete: 'address-level2' },
  { name: 'profession', label: 'Profession', type: 'text', placeholder: 'What do you do?', autoComplete: 'organization-title' },
];
export default function Enquiry({ content }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', profession: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const onSubmit = async e => {
    e.preventDefault();
    if (loading) return;
    if (Object.entries(form).some(([key, val]) => key !== 'message' && !val.trim())) { setError('Please complete all required fields.'); return; }
    if (form.phone.replace(/\D/g, '').length < 7) { setError('Please enter a valid phone number.'); return; }
    setLoading(true); setError('');
    try { await submitEnquiry(Object.fromEntries(Object.entries(form).map(([key, val]) => [key, val.trim()]))); navigate('/thank-you', { state: { name: form.name.trim() } }); }
    catch (err) { setError(formatApiError(err)); }
    finally { setLoading(false); }
  };
  return <section id="enquiry" className="enquiry-section section-space" data-testid="enquiry-section"><div className="site-container enquiry-layout">
    <div className="enquiry-copy"><p className="eyebrow">YOUR JOURNEY IS PERSONAL</p><h2 className="editorial-title">Let’s find<br/><em>your connection.</em></h2><p>A conversation, not a commitment. Our expert panel is here to understand you and recommend the right Rudraksha for your journey.</p><span className="consultation-note" data-testid="consultation-free-note">Personalised guidance. Always complimentary.</span><a href={`https://wa.me/${content.whatsapp}?text=${encodeURIComponent('Namaste, I would like a Siddha Mala consultation.')}`} target="_blank" rel="noopener noreferrer" className="text-link whatsapp-link" data-testid="enquiry-whatsapp-button"><MessageCircle size={18}/> Prefer WhatsApp? <ArrowUpRight size={16}/></a></div>
    <form className="consultation-form" data-testid="enquiry-form" onSubmit={onSubmit}>
      <div className="form-fields">{FIELDS.map(field => <div key={field.name} className={`form-field field-${field.name}`}><Label htmlFor={`enquiry-${field.name}`}>{field.label} <span aria-hidden="true">*</span></Label><Input id={`enquiry-${field.name}`} data-testid={`enquiry-input-${field.name}`} type={field.type} placeholder={field.placeholder} required autoComplete={field.autoComplete} maxLength={field.name === 'phone' ? 24 : 150} value={form[field.name]} onChange={e => setForm({ ...form, [field.name]: e.target.value })}/></div>)}<div className="form-field field-message"><Label htmlFor="enquiry-message">Your message <span>(optional)</span></Label><Textarea id="enquiry-message" data-testid="enquiry-input-message" placeholder="What brings you to Rudraksha?" rows={3} maxLength={2000} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}/></div></div>
      {error && <p className="form-error" role="alert" data-testid="enquiry-error">{error}</p>}
      <button className="primary-button" type="submit" disabled={loading} data-testid="enquiry-submit-button">{loading ? 'Sending your enquiry' : 'Request a free consultation'} {loading ? <Loader2 className="animate-spin" size={18}/> : <ArrowUpRight size={18}/>}</button>
      <p className="form-privacy"><LockKeyhole size={12}/> Your details are used to respond to your enquiry.</p>
    </form>
  </div></section>;
}