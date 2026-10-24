import { useRef, useState, useEffect } from 'react';
import { SITE } from '../config';
import { Icon } from './ui';

const ENQUIRY_TYPES = [
  'Product Guidance',
  'Pricing & Quotation',
  'Dealership Enquiry',
  'Technical Support',
  'Architect / Specifier BOM',
  'Other'
];

const DEALER_TYPES = [
  'Distributor',
  'Dealer / Retailer',
  'Architect / Interior Designer',
  'Furniture Manufacturer / OEM',
  'Contractor',
  'Other'
];

// Web3Forms: https://web3forms.com – submissions are emailed to the address registered for the access key.
export default function EnquiryForm({ kind, defaultMessage = '', selectedCategory = '', onCategoryChange }) {
  const dealer = kind === 'dealer';
  const key = dealer ? SITE.dealerFormKey : SITE.contactFormKey;
  const t0 = useRef(Date.now());
  const [state, setState] = useState('idle'); // idle | sending | done | error
  const [enquiryType, setEnquiryType] = useState(selectedCategory || '');
  const subject = dealer ? 'New Dealer / Distributor Enquiry – Thames Hardware' : 'New Website Enquiry – Thames Hardware';

  useEffect(() => {
    if (selectedCategory) {
      setEnquiryType(selectedCategory);
    }
  }, [selectedCategory]);

  const handleTypeChange = (e) => {
    setEnquiryType(e.target.value);
    if (onCategoryChange) {
      onCategoryChange(e.target.value);
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (fd.get('botcheck') || Date.now() - t0.current < 2500) return; // spam: honeypot + too-fast submit
    const data = Object.fromEntries(fd.entries());
    delete data.botcheck;
    if (!key) { // dev fallback so the form still "works" before a key is configured
      const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href = `mailto:${dealer ? SITE.dealerEmail : SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return setState('done');
    }
    setState('sending');
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: key, subject, from_name: 'Thames Hardware Website', ...data }),
      });
      const j = await r.json();
      if (!j.success) throw new Error();
      if (window.gtag) window.gtag('event', dealer ? 'dealer_enquiry' : 'contact_enquiry');
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="card success form-success-box">
        <span className="ok"><Icon n="check" s={28} /></span>
        <h3>Thank you — enquiry received</h3>
        <p>Our Yamuna Nagar sales and engineering team will get back to you promptly within 24 hours.</p>
        <button className="btn btn-ghost mt-3" onClick={() => { setState('idle'); t0.current = Date.now(); }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  // Exact Contact Page Form from Reference Screenshot
  if (!dealer) {
    return (
      <form className="direct-message-form" onSubmit={onSubmit}>
        <div className="dmf-grid">
          {/* Row 1: Full Name */}
          <div className="dmf-field">
            <label htmlFor="dmf-name" className="dmf-label">
              Full Name <span className="req">*</span>
            </label>
            <div className="dmf-input-wrap">
              <span className="dmf-icon"><Icon n="user" s={18} /></span>
              <input
                id="dmf-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Enter your name"
                className="dmf-input"
              />
            </div>
          </div>

          {/* Row 1: Phone Number */}
          <div className="dmf-field">
            <label htmlFor="dmf-phone" className="dmf-label">
              Phone Number <span className="req">*</span>
            </label>
            <div className="dmf-input-wrap">
              <span className="dmf-icon"><Icon n="phone" s={17} /></span>
              <span className="dmf-country-code">+91</span>
              <input
                id="dmf-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                pattern="[0-9+\s\-]{8,16}"
                title="Enter a valid phone number"
                placeholder="Enter your number"
                className="dmf-input with-prefix"
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="dmf-field">
            <label htmlFor="dmf-email" className="dmf-label">
              Email <span className="req">*</span>
            </label>
            <div className="dmf-input-wrap">
              <span className="dmf-icon"><Icon n="mail" s={18} /></span>
              <input
                id="dmf-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                className="dmf-input"
              />
            </div>
          </div>

          {/* Row 2: Enquiry Type */}
          <div className="dmf-field">
            <label htmlFor="dmf-type" className="dmf-label">
              Enquiry Type <span className="req">*</span>
            </label>
            <div className="dmf-input-wrap dmf-select-wrap">
              <span className="dmf-icon"><Icon n="sliders" s={18} /></span>
              <select
                id="dmf-type"
                name="enquiry_type"
                required
                value={enquiryType}
                onChange={handleTypeChange}
                className="dmf-select"
              >
                <option value="" disabled>Select enquiry type</option>
                {ENQUIRY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <span className="dmf-select-arrow"><Icon n="chevronDown" s={16} /></span>
            </div>
          </div>

          {/* Row 3: Message */}
          <div className="dmf-field dmf-full">
            <label htmlFor="dmf-message" className="dmf-label">
              Message <span className="req">*</span>
            </label>
            <div className="dmf-input-wrap dmf-textarea-wrap">
              <span className="dmf-icon dmf-icon-top"><Icon n="message" s={18} /></span>
              <textarea
                id="dmf-message"
                name="message"
                rows="3"
                required
                defaultValue={defaultMessage}
                placeholder="Tell us about your requirement..."
                className="dmf-textarea"
              />
            </div>
          </div>
        </div>

        <input type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} />

        {state === 'error' && (
          <p className="err mt-2" role="alert">
            Something went wrong. Please try again or reach us via WhatsApp directly.
          </p>
        )}

        {/* Footer Action Row */}
        <div className="dmf-footer">
          <div className="dmf-reply-pill">
            <Icon n="clock" s={16} className="clock-icon" />
            <span>We usually reply within 24 hours</span>
          </div>

          <button
            type="submit"
            className="dmf-submit-btn"
            disabled={state === 'sending'}
          >
            <span>{state === 'sending' ? 'Sending…' : 'Send Message'}</span>
            <Icon n="arrow" s={16} />
          </button>
        </div>
      </form>
    );
  }

  // Classic dealer form layout
  return (
    <form className="card form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>Full Name *<input name="name" required autoComplete="name" /></label>
        <label>Business Name *<input name="business_name" required autoComplete="organization" /></label>
        <label>City *<input name="city" required autoComplete="address-level2" /></label>
        <label>Phone Number *<input name="phone" type="tel" required autoComplete="tel" pattern="[0-9+\s\-]{8,16}" title="Enter a valid phone number" /></label>
        <label>Email *<input name="email" type="email" required autoComplete="email" /></label>
        <label>Business Type *<select name="business_type" required defaultValue="">
          <option value="" disabled>Select business type</option>{DEALER_TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className="full">Products of interest / notes
          <textarea name="message" rows="4" defaultValue={defaultMessage} /></label>
      </div>
      <input type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} />
      {state === 'error' && <p className="err" role="alert">Something went wrong. Please try again or contact us on WhatsApp.</p>}
      <button className="btn btn-primary" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Submit Application'} <Icon n="arrow" s={16} />
      </button>
      <small>We respect your privacy and use your details only to respond to your enquiry.</small>
    </form>
  );
}
