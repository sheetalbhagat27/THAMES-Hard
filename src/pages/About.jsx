import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Head, Icon, Reveal } from '../components/ui';
import { SITE } from '../config';

const MILESTONES = [
  { year: '2005', title: 'Foundations in Yamuna Nagar', desc: 'Thamesply established in Yamuna Nagar, Haryana — the timber & building materials capital of Northern India.' },
  { year: '2014', title: 'Architectural Hardware Division', desc: 'Launched dedicated precision hardware lines for modular kitchens, wardrobes, and commercial interiors.' },
  { year: '2020', title: 'Automated Endurance Testing', desc: 'Installed computerized 100,000 cycle testing rigs and ASTM B117 salt spray chambers for zero-defect standards.' },
  { year: '2026', title: 'Pan-India Distribution & Specifier Support', desc: 'Supplying leading architects, interior designers, and 500+ authorized dealers across India.' },
];

const STRENGTHS = [
  { ico: 'cube', title: 'Unified Hardware Portfolio', desc: 'Hydraulic hinges, telescopic slides, slim tandem boxes, and precision fasteners under one trusted brand.' },
  { ico: 'gauge', title: '100K Cycle Guarantee', desc: 'Continuous mechanical testing ensures silent, fluid damping without oil leaks or sagging over time.' },
  { ico: 'truck', title: 'Prompt Factory Dispatch', desc: 'Centralized warehousing in Yamuna Nagar guarantees consistent batch stock and rapid trade logistics.' },
  { ico: 'user', title: 'Dedicated Specifier Desk', desc: 'Direct engineering assistance for architects, interior contractors, and modular furniture OEMs.' },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Thames Hardware | Yamuna Nagar Heritage & Precision Engineering"
        description="Learn about Thames Hardware: our Yamuna Nagar manufacturing roots, precision quality standards, and commitment to architectural excellence. Every Turn Earns Trust."
      />

      <section className="page-hero luxury-page-hero">
        <div className="container">
          <span className="luxury-eyebrow gold">Our Heritage &amp; Mission</span>
          <h1>Precision Hardware. Unbroken Trust.</h1>
          <p>
            Rooted in Yamuna Nagar, Haryana — building fittings that outlast the furniture around them.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="section bg-ivory">
        <div className="container split">
          <div>
            <span className="luxury-eyebrow">Our Philosophy</span>
            <h2>Hardware that earns trust with every single turn.</h2>
            <p className="lead-text">
              Thames Hardware was born from an uncompromising standard: the mechanical components touched dozens of times daily — hinges, drawer slides, and architectural pulls — must feel substantial, glide silently, and endure without failure.
            </p>
            <p>
              As a dedicated architectural division under the respected <b>{SITE.parentBrand}</b> umbrella, we supply premium hardware to trade partners, modular OEMs, and luxury architects who build spaces where performance cannot be compromised.
            </p>
            <div className="location-pill">
              <Icon n="pin" s={18} />
              <span>Engineered &amp; Distributed from <b>Yamuna Nagar, Haryana, India</b></span>
            </div>
          </div>

          <div className="quote-box-luxury">
            <div className="quote-glow" />
            <span className="quote-mark">“</span>
            <p className="quote-text">
              We do not manufacture disposable hardware. Every channel, hinge, and screw is engineered so that five, ten, and fifteen years later, the motion remains as smooth and quiet as the day it was installed.
            </p>
            <div className="quote-author">
              <b>The Thames Engineering Team</b>
              <small>Yamuna Nagar, India</small>
            </div>
          </div>
        </div>
      </section>

      {/* Precision Facility Visual */}
      <section className="section bg-luxury-dark">
        <div className="container">
          <div className="factory-feature-grid">
            <div className="factory-feature-img">
              <img
                src="/images/factory-precision.jpg"
                alt="Thames Hardware precision automated engineering facility"
              />
            </div>
            <div className="factory-feature-text">
              <span className="luxury-eyebrow gold">Manufacturing Excellence</span>
              <h2>State-of-the-Art Quality Control</h2>
              <p>
                Our Yamuna Nagar facility utilizes advanced laser-cutting tooling, robotic cycle test stations, and computerized salt spray testing chambers.
              </p>
              <ul className="factory-points">
                <li>
                  <Icon n="check" s={18} />
                  <div>
                    <b>Computerized 100K Cycle Rigs:</b> Rigorous open-close simulations under full dynamic payload.
                  </div>
                </li>
                <li>
                  <Icon n="check" s={18} />
                  <div>
                    <b>ASTM B117 Anti-Rust Testing:</b> Protection against coastal salt air and monsoon humidity.
                  </div>
                </li>
                <li>
                  <Icon n="check" s={18} />
                  <div>
                    <b>Calibrated Damping Fluid:</b> High-viscosity silicone hydraulic oil that remains stable from 0°C to 50°C.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Milestones */}
      <section className="section bg-alabaster">
        <div className="container">
          <Head
            eyebrow="Milestones"
            title="The Journey of Thames"
            text="Decades of manufacturing trust and architectural relationships."
            center
          />

          <div className="timeline-grid">
            {MILESTONES.map((m) => (
              <div key={m.year} className="timeline-card">
                <span className="timeline-year">{m.year}</span>
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Strengths */}
      <section className="section bg-ivory">
        <div className="container">
          <Head
            eyebrow="Why Partner With Us"
            title="Built for the Trade & Specifier Community"
            center
          />

          <div className="grid-4">
            {STRENGTHS.map((s) => (
              <Reveal key={s.title}>
                <div className="card feat luxury-feat">
                  <span className="ico"><Icon n={s.ico} s={24} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="luxury-band">
        <div className="container band-inner">
          <div>
            <span className="luxury-eyebrow gold">Get in Touch</span>
            <h2>Let’s engineer something exceptional together.</h2>
            <p>Connect with our Yamuna Nagar engineering desk for project consultations or dealership onboarding.</p>
          </div>
          <div className="band-actions">
            <Link className="btn btn-gold-luxury" to="/contact">Contact Our Team</Link>
            <Link className="btn btn-outline-white" to="/become-a-dealer">Trade Dealership</Link>
          </div>
        </div>
      </section>
    </>
  );
}
