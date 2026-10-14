import { createElement, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Loader2, LockKeyhole } from 'lucide-react';
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js/max';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { usePage } from '../context/PageContext';
import { submitEnquiry, formatApiError } from '../lib/api';

const names = new Intl.DisplayNames(['en'], { type: 'region' });
const countries = getCountries().map(code => ({ code, name: names.of(code), dial: getCountryCallingCode(code) })).sort((a,b) => a.code === 'IN' ? -1 : b.code === 'IN' ? 1 : a.name.localeCompare(b.name));
const countryOptions = countries.map(c => createElement('option', {key:c.code,value:c.code}, `${c.name} (+${c.dial})`));
const TYPES = { email:'email', phone:'tel' };
const AUTOCOMPLETE = { name:'name', email:'email', phone:'tel-national', city:'address-level2', profession:'organization-title' };

export const ConsultationForm = ({ source = 'inline', interest = '', onSuccess }) => {
  const { form: config } = usePage(); const navigate = useNavigate();
  const prefix = source === 'inline' ? 'enquiry' : 'popup';
  const [form,setForm] = useState({ name:'',email:'',phone:'',country:'',city:'',profession:'',message:'' });
  const [error,setError] = useState(''); const [errors,setErrors] = useState({}); const [loading,setLoading] = useState(false);
  const submission = useRef(crypto.randomUUID()); const busy = useRef(false);
  const change = (key,value) => { setForm(f => ({...f,[key]:value})); setErrors(e => ({...e,[key]:''})); setError(''); };
  const submit = async e => {
    e.preventDefault(); if (busy.current) return;
    const issues = {};
    config.fields.forEach(f => { if (f.required && !form[f.key]?.trim()) issues[f.key] = `${f.label} is required.`; });
    if (form.name.trim().length < 2) issues.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) issues.email = 'Please enter a valid email address.';
    if (!form.country) issues.country = 'Please select your country code.';
    const phone = form.country ? parsePhoneNumberFromString(form.phone, form.country) : null;
    if (form.country && (!phone?.isValid() || phone.country !== form.country)) issues.phone = 'Enter a valid phone number for the selected country.';
    setErrors(issues); setError('');
    if (Object.keys(issues).length) { document.getElementById(`${prefix}-${Object.keys(issues)[0]}`)?.focus(); return; }
    busy.current = true; setLoading(true);
    try {
      await submitEnquiry({ ...Object.fromEntries(Object.entries(form).map(([k,v]) => [k,v.trim()])), phone:phone.number, country_code:`+${getCountryCallingCode(form.country)}`, source, interest, submission_id:submission.current });
      onSuccess?.(); navigate('/thank-you', { state:{ name:form.name.trim(), submitted:true } });
    } catch (err) { setError(formatApiError(err)); }
    finally { busy.current = false; setLoading(false); }
  };
  return <form className="consultation-form" data-testid={`${prefix}-form`} noValidate onSubmit={submit} aria-busy={loading}>
    {interest && <p className="form-interest" data-testid={`${prefix}-interest`}>{config.interest_label}: <strong>{interest}</strong></p>}
    <div className="form-fields">{config.fields.map(field => <div className={`form-field field-${field.key}`} key={field.key}>
      {field.key === 'phone' && <div className="country-field"><Label htmlFor={`${prefix}-country`}>{config.country_label} <span>*</span></Label><select id={`${prefix}-country`} data-testid={`${prefix}-country-code`} required value={form.country} onChange={e => change('country',e.target.value)} aria-invalid={!!errors.country} aria-describedby={errors.country ? `${prefix}-country-error` : undefined}>{createElement('option',{value:'',disabled:true},config.country_placeholder)}{countryOptions}</select>{errors.country && <span className="field-error" id={`${prefix}-country-error`} data-testid={`${prefix}-country-error`}>{errors.country}</span>}</div>}
      <Label htmlFor={`${prefix}-${field.key}`}>{field.label} <span>{field.required ? '*' : '(optional)'}</span></Label>
      {field.key === 'message' ? <Textarea id={`${prefix}-message`} data-testid={`${prefix}-input-message`} rows={3} value={form.message} placeholder={field.placeholder} onChange={e => change('message',e.target.value)} maxLength={4000} aria-invalid={!!errors.message}/> : <Input id={`${prefix}-${field.key}`} data-testid={`${prefix}-input-${field.key}`} type={TYPES[field.key] || 'text'} value={form[field.key] || ''} placeholder={field.placeholder} onChange={e => change(field.key,e.target.value)} autoComplete={AUTOCOMPLETE[field.key]} inputMode={field.key === 'phone' ? 'tel' : undefined} required={field.required} maxLength={field.key === 'phone' ? 30 : 150} aria-invalid={!!errors[field.key]} aria-describedby={errors[field.key] ? `${prefix}-${field.key}-error` : undefined}/>}
      {errors[field.key] && <span className="field-error" id={`${prefix}-${field.key}-error`} data-testid={`${prefix}-${field.key}-error`}>{errors[field.key]}</span>}
    </div>)}</div>
    {error && <p role="alert" className="form-error" data-testid={`${prefix}-error`}>{error}</p>}
    <button type="submit" className="primary-button" disabled={loading} data-testid={`${prefix}-submit-button`}>{loading ? config.sending_label : config.submit_label}{loading ? <Loader2 size={17} className="animate-spin"/> : <ArrowUpRight size={17}/>}</button>
    <p className="form-privacy"><LockKeyhole size={12}/>{config.privacy}</p>
  </form>;
};