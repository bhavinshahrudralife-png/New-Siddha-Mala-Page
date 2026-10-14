import { createContext, useContext, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { ConsultationForm } from '../components/ConsultationForm';
import { usePage } from './PageContext';

const Context = createContext(null);
export const useConsultation = () => useContext(Context);
export function ConsultationProvider({ children }) {
  const [open,setOpen] = useState(false); const [interest,setInterest] = useState(''); const opener = useRef(null);
  const page = usePage();
  const openConsultation = (value = '') => { opener.current = document.activeElement; setInterest(typeof value === 'string' ? value : ''); setOpen(true); };
  return <Context.Provider value={{ openConsultation }}>
    {children}
    <Dialog open={open} onOpenChange={setOpen}><DialogContent data-testid="consultation-modal" data-lenis-prevent className="consultation-dialog" onCloseAutoFocus={e => { e.preventDefault(); opener.current?.focus?.(); }}>
      <p className="eyebrow">{page.consultation.eyebrow}</p><DialogTitle className="dialog-editorial-title" data-testid="consultation-modal-title">{page.form.title}</DialogTitle><DialogDescription>{page.form.description}</DialogDescription>
      <ConsultationForm source="popup" interest={interest} onSuccess={() => setOpen(false)}/>
    </DialogContent></Dialog>
  </Context.Provider>;
}