import SEO from '../components/SEO';
import EnquiryForm from '../components/Forms';
import { Head, Icon } from '../components/ui';
import { wa } from '../config';

const TIERS = [
  {
    title: 'Authorized Retailer',
    badge: 'Hardware Stores & Studios',
    desc: 'For premium hardware showrooms and modular studio retail partners looking for high-margin, reliable inventory with custom display boards.',
    features: ['High retail markup & trade margins', 'Modular branded display board setup', 'Marketing sample catalogs & swatches', 'Low MOQ starter packages'],
  },
  {
    title: 'Regional Master Distributor',
    badge: 'District & State Level',
    desc: 'For established distributors with wholesale channels and warehouse infrastructure seeking exclusive territorial rights.',
    features: ['Exclusive territorial pricing tiers', 'Priority dispatch from Yamuna Nagar depot', 'Quarterly rebate & incentive programs', 'Dedicated account manager'],
  },
  {
    title: 'OEM & Project Specifier',
    badge: 'Modular Factories & Builders',
    desc: 'For modular kitchen manufacturers, wardrobe OEMs, and commercial interior contractors requiring bulk recurring volume.',
    features: ['Direct factory carton / bulk master packaging', 'Tested CAD / technical drawing support', 'Custom finish & specification batches', 'Predictable delivery schedules'],
  },
];

const BENEFITS = [
  ['trend', 'Competitive Trade Margins', 'Earn predictable, profitable returns with clear trade price structures and volume incentives.'],
  ['store', 'Display & Studio Collaterals', 'We provide physical demonstration units, sample finish rings, and architectural wall display stands.'],
  ['truck', 'Consistent Bulk Dispatch', 'Backed by extensive central inventory in Yamuna Nagar to eliminate project delays and out-of-stock hurdles.'],
  ['shield', 'Zero-Defect Quality Backing', '100% factory replacement guarantee on any manufacturing anomaly to safeguard your client goodwill.'],
];

export default function Dealer() {
  return (
    <>
      <SEO
        title="Become a Dealer / Distributor | Thames Architectural Hardware"
        description="Join the Thames Hardware trade network. Enjoy competitive trade margins, showroom display collaterals, and reliable dispatch from Yamuna Nagar. Apply online today."
        keywords="furniture hardware dealer, hardware distributor, dealership enquiry, Thames Hardware dealership, architectural hardware distributor"
      />

      <section className="page-hero luxury-page-hero">
        <div className="container">
          <span className="luxury-eyebrow gold">Trade Partnership</span>
          <h1>Join the Thames Hardware Network</h1>
          <p>
            Grow your business alongside an established, precision-driven brand trusted across India.
          </p>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="section bg-ivory">
        <div className="container">
          <Head
            eyebrow="Partnership Programs"
            title="Choose Your Business Model"
            text="Tailored programs designed to support your sales volume, showroom capabilities, and distribution reach."
            center
          />

          <div className="grid-3">
            {TIERS.map((tier) => (
              <div key={tier.title} className="card tier-card">
                <span className="tier-badge">{tier.badge}</span>
                <h3>{tier.title}</h3>
                <p className="tier-desc">{tier.desc}</p>
                <ul className="tier-features">
                  {tier.features.map((f) => (
                    <li key={f}>
                      <Icon n="check" s={16} /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application & Form */}
      <section className="section bg-alabaster border-top">
        <div className="container split top">
          <div>
            <Head
              eyebrow="Why Partner With Thames"
              title="A brand that prioritizes long-term dealer prosperity."
            />
            <div className="benefits-luxury">
              {BENEFITS.map(([i, t, d]) => (
                <div key={t} className="benefit-row">
                  <span className="benefit-ico"><Icon n={i} s={22} /></span>
                  <div>
                    <h4>{t}</h4>
                    <p>{d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="dealer-fast-track">
              <h4>Need immediate onboarding?</h4>
              <p>Chat directly with our Head of Trade Distribution for urgent inquiries or territory availability.</p>
              <a
                className="btn btn-gold-luxury"
                href={wa('Hello Thames Hardware, I want to discuss dealership / distributorship opportunities for my city.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon n="wa" s={18} /> WhatsApp Trade Head
              </a>
            </div>
          </div>

          <div className="form-card-wrap">
            <h2 className="form-title">Dealership Application Form</h2>
            <p className="form-sub">Please fill in your business information. Our regional trade manager will contact you within 24 business hours.</p>
            <EnquiryForm kind="dealer" />
          </div>
        </div>
      </section>
    </>
  );
}
