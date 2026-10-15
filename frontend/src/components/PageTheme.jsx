import { useEffect } from 'react';
import { usePage } from '../context/PageContext';
export function PageTheme() {
  const {appearance}=usePage();
  useEffect(()=>{const root=document.documentElement;const mapping={background:'--peach',alternate:'--peach-deep',surface:'--peach-light',heading:'--wine',body:'--warm-text',accent:'--copper',muted:'--warm-muted',border:'--warm-border'};Object.entries(mapping).forEach(([key,variable])=>{if(/^#[0-9a-f]{6}$/i.test(appearance[key]))root.style.setProperty(variable,appearance[key]);});},[appearance]);
  return null;
}