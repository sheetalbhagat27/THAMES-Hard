import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import EnquiryForm from '../components/Forms';
import { Icon } from '../components/ui';
import { SITE, wa } from '../config';

const SPECIFIER_SERVICES = [
  {
    id: 'Product Guidance',
    title: 'Product Guidance',
    icon: 'fileText',
  },
  {
    id: 'Pricing & Quotation',
    title: 'Pricing & Quotation',
    icon: 'rupee',
  },
  {
    id: 'Dealership Enquiry',
    title: 'Dealership Enquiry',
    icon: 'network',
  },
  {
    id: 'Technical Support',
    title: 'Technical Support',
    icon: 'gear',
  },
];

export default function Contact() {
  const [q] = useSearchParams();
  const location = useLocation();
  const product = q.get('product');
  const [selectedCategory, setSelectedCategory] = useState(
    product ? 'Product Guidance' : 'Pricing & Quotation'
  );
  const sicon = { instagram: 'ig', facebook: 'fb', linkedin: 'li', youtube: 'yt' };

  useEffect(() => {
    if (location.hash === '#inquiry-form' || product) {
      const el = document.getElementById('inquiry-form');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    }
  }, [location, product]);

  const handleServiceClick = (catId) => {
    setSelectedCategory(catId);
    const formElement = document.getElementById('inquiry-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | Thames Architectural Hardware & Plywood"
        description="Get in touch with Thames. Direct specifier desk for architects, dealers, OEMs, and contractors. Call, WhatsApp, email, or visit our Yamuna Nagar facility."
      />

      {/* =========================================================================
          1. EXACT HERO SECTION FROM REFERENCE SCREENSHOT
          Dark luxury showroom aesthetic with architectural lighting,
          executive portrait, gold brand typography and organic wave bottom divider.
          ========================================================================= */}
      <section className="contact-hero-exact">
        <div className="container contact-hero-container">
          {/* Left Text Column */}
          <div className="contact-hero-text-col">
            <div className="contact-eyebrow-container">
              <span className="contact-eyebrow-text">CONTACT US</span>
              <span className="contact-eyebrow-line" />
            </div>

            <h1 className="contact-display-title">
              Get in Touch <br />
              with <span className="title-gold-highlight">Thames</span>
            </h1>

            <p className="contact-display-sub">
              We're here to help — for product enquiries, dealership opportunities, project support or technical assistance.
            </p>
          </div>

          {/* Right Visual Column: Executive & Showroom Wall */}
          <div className="contact-hero-visual-col">
            <div className="hero-executive-card">
              <img
                src="/images/contact-hero-executive.png"
                alt="Thames Executive & Showroom - Built for Better Spaces"
                className="hero-executive-img"
              />
              <div className="hero-executive-overlay" />
            </div>
          </div>
        </div>

        {/* Organic Curved Wave Divider at the bottom */}
        <div className="contact-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" fill="none">
            <path
              d="M0,25 C320,60 880,70 1440,15 L1440,70 L0,70 Z"
              fill="#FDFBF7"
            />
          </svg>
        </div>
      </section>

      {/* =========================================================================
          2. SPECIFIER ASSISTANCE & DIRECT MESSAGE SPLIT SECTION
          Exact 2-column layout from reference screenshot
          ========================================================================= */}
      <section className="contact-split-section">
        <div className="container contact-split-grid">
          {/* Left Column: Specifier Assistance */}
          <div className="specifier-assistance-col">
            <div className="specifier-header">
              <span className="specifier-eyebrow">SPECIFIER ASSISTANCE</span>
              <h2 className="specifier-title">Send us a direct project enquiry</h2>
              <p className="specifier-desc">
                Our Yamuna Nagar trade sales and engineering team is available Monday to Saturday to provide instant bill-of-material estimates, wholesale discounts, and CAD documentation.
              </p>
            </div>

            {/* 4 Interactive Category Cards */}
            <div className="specifier-cards-grid">
              {SPECIFIER_SERVICES.map((srv) => {
                const isActive = selectedCategory === srv.id;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => handleServiceClick(srv.id)}
                    className={`specifier-service-card ${isActive ? 'active' : ''}`}
                    aria-label={`Select ${srv.title}`}
                  >
                    <div className="specifier-card-icon-wrap">
                      {srv.icon === 'rupee' ? (
                        <span className="rupee-icon-text">₹</span>
                      ) : (
                        <Icon n={srv.icon} s={20} />
                      )}
                    </div>
                    <span className="specifier-card-label">{srv.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Modern Yamuna Nagar Facility Card */}
            <div className="facility-banner-card">
              <img
                src="/images/yamuna-nagar-facility.png"
                alt="Thames Yamuna Nagar Facility - Modern Manufacturing Unit"
                className="facility-banner-img"
              />
              <div className="facility-badge-glass">
                <span className="facility-pin-icon">
                  <Icon n="pin" s={16} />
                </span>
                <div className="facility-badge-texts">
                  <span className="facility-badge-title">Yamuna Nagar Facility</span>
                  <span className="facility-badge-sub">Modern Manufacturing Unit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send Us a Direct Message Card */}
          <div className="direct-message-col" id="inquiry-form">
            <div className="direct-message-card">
              <div className="dmf-card-header">
                <h2 className="dmf-card-title">Send Us a Direct Message</h2>
                <p className="dmf-card-sub">
                  Submit your project specifications or question below. We respond to all trade inquiries promptly.
                </p>
              </div>

              <EnquiryForm
                kind="contact"
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                defaultMessage={
                  product
                    ? `Hello Thames, I would like to enquire about: ${product}\n\nQuantity / Project requirement: `
                    : ''
                }
                key={product || selectedCategory || 'contact-form'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. DIRECT REACH & REGIONAL CONTACT DESKS
          Direct telephone, email, and live WhatsApp desks + Facility Location
          ========================================================================= */}
      <section className="contact-secondary-channels">
        <div className="container">
          <div className="contact-ref-cards-grid">
            {/* Card 1: Call Us */}
            <a href={`tel:${SITE.phoneRaw}`} className="contact-ref-card">
              <div className="ref-card-header">
                <div className="ref-card-icon-box">
                  <Icon n="phone" s={20} />
                </div>
                <span className="ref-card-arrow">
                  <Icon n="external" s={16} />
                </span>
              </div>
              <div className="ref-card-body">
                <span className="ref-card-label">CALL US</span>
                <span className="ref-card-value">{SITE.phone}</span>
              </div>
            </a>

            {/* Card 2: Email Us */}
            <a href={`mailto:${SITE.email}`} className="contact-ref-card">
              <div className="ref-card-header">
                <div className="ref-card-icon-box">
                  <Icon n="mail" s={20} />
                </div>
                <span className="ref-card-arrow">
                  <Icon n="external" s={16} />
                </span>
              </div>
              <div className="ref-card-body">
                <span className="ref-card-label">EMAIL US</span>
                <span className="ref-card-value">{SITE.email}</span>
              </div>
            </a>

            {/* Card 3: Visit Us */}
            <div className="contact-ref-card">
              <div className="ref-card-header">
                <div className="ref-card-icon-box">
                  <Icon n="pin" s={20} />
                </div>
                <span className="ref-card-arrow">
                  <Icon n="external" s={16} />
                </span>
              </div>
              <div className="ref-card-body">
                <span className="ref-card-label">VISIT US</span>
                <span className="ref-card-value text-small">{SITE.address}</span>
              </div>
            </div>
          </div>

          {/* Map and Socials Row */}
          <div className="contact-bottom-tools-grid mt-5">
            <div className="contact-location-preview">
              <div className="location-box-header">
                <h4>
                  <Icon n="pin" s={18} /> Yamuna Nagar Manufacturing &amp; Logistics Hub
                </h4>
                <p>Bamboli Industrial Area, Yamuna Nagar, Haryana 135001</p>
              </div>
              <div className="map-frame-refined">
                <iframe
                  title="Thames Hardware Yamuna Nagar Location"
                  className="map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Bamboli+Yamuna+Nagar+Haryana+India&output=embed"
                />
              </div>
            </div>

            <div className="contact-fast-help-card">
              <h3>Need instant assistance or urgent CAD files?</h3>
              <p>
                Our technical support engineers provide instant guidance via WhatsApp during factory hours (Mon–Sat, 9 AM – 7 PM IST).
              </p>

              <a
                className="btn btn-gold-luxury w-full"
                href={wa('Hello Thames Hardware, I would like to enquire regarding hardware pricing and catalog.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon n="wa" s={18} /> Chat Directly on WhatsApp
              </a>

              <div className="social-row mt-4">
                <span className="social-lbl">Follow Thames Brand:</span>
                <div className="social dark">
                  {Object.entries(SITE.social)
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <a key={k} href={v} target="_blank" rel="noopener noreferrer" aria-label={k}>
                        <Icon n={sicon[k]} s={18} />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
