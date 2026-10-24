import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import FeaturedMasterSystems from '../components/FeaturedMasterSystems';
import { Head, Icon, Reveal } from '../components/ui';
import { CATEGORIES } from '../data/products';
import { SITE, wa } from '../config';

const METRICS = [
  { val: '100,000+', lbl: 'Cycles Tested', sub: 'EN 15338 / DIN Durability Certified' },
  { val: 'SS 304 / Brass', lbl: 'Architectural Alloys', sub: 'Forged Solid Metals & Hardened Steel' },
  { val: '72H Salt Spray', lbl: 'Anti-Rust Coating', sub: 'ASTM B117 Coastal Tested Plating' },
  { val: 'Pan-India', lbl: 'Supply Network', sub: 'Direct from Yamuna Nagar, Haryana' },
];

const TRUST_PILLS = [
  { icon: 'diamond', label: 'Durable' },
  { icon: 'shieldCheck', label: 'Premium Quality' },
  { icon: 'leaf', label: 'Eco-Friendly' },
  { icon: 'gear', label: 'Trusted by Professionals' },
];

const HERO_FEATURE_CARDS = [
  {
    title: 'Drawer Slides',
    image: '/images/drawer-channel.jpg',
    link: '/products/telescopic-drawer-channels',
    tag: 'Quad-Bearing Glide',
  },
  {
    title: 'Concealed Hinges',
    image: '/images/hinge-mounted.jpg',
    link: '/products/hydraulic-hinges',
    tag: '3D Cam Clip-On',
  },
  {
    title: 'Architectural Fittings',
    image: '/images/card-arch-fittings.jpg',
    link: '/products/other-furniture-hardware',
    tag: 'Solid Brass & PVD',
  },
];

const APPLICATIONS = [
  {
    title: 'Modular Kitchen Suites',
    desc: 'Whisper-quiet tandem drawers, 165° wide-angle hinges and aluminium tambour shutters engineered for high-moisture kitchen environments.',
    tags: ['Tandem Box', '105° Hydraulic', 'Alu Shutter'],
    img: '/images/tandem-drawer.jpg',
    link: '/products/kitchen-drawer-systems',
  },
  {
    title: 'Designer Wardrobes & Dressers',
    desc: 'Heavy-duty 45kg telescopic slides and diamond-knurled brass architectural pulls for smooth daily wardrobe operation.',
    tags: ['45kg Telescopic', 'Knurled Brass', 'Push-to-Open'],
    img: '/images/architectural-handles.jpg',
    link: '/products/telescopic-drawer-channels',
  },
  {
    title: 'Architectural Entrance Doors',
    desc: 'Solid forged brass butt hinges with 4 sealed stainless steel ball bearings designed for massive solid timber and flush doors.',
    tags: ['Solid Brass', 'Grade 316 Pin', '120kg Rated'],
    img: '/images/butt-hinge.jpg',
    link: '/products/butt-hinges',
  },
  {
    title: 'Minimalist Push-to-Open Cabinets',
    desc: 'Handle-free motion hardware for clean handleless modern European cabinetry with integrated mechanical rebound triggers.',
    tags: ['Handle-Free', 'Mechanical Rebound', 'Zero Split Screws'],
    img: '/images/drawer-channel.jpg',
    link: '/products/telescopic-drawer-channels',
  },
];

const ENGINEERING_PILLARS = [
  {
    ico: 'gauge',
    title: '100,000 Cycle Testing',
    desc: 'Drawer slides and concealed hinges are tested continuously on automated robotic rigs to guarantee silent operation over 15+ years of daily use.',
  },
  {
    ico: 'flask',
    title: 'ASTM B117 Salt Spray Chamber',
    desc: 'Electro-galvanized zinc and vacuum PVD finishes endure rigorous humidity and salt spray exposure to withstand Indian monsoons and coastal air.',
  },
  {
    ico: 'ruler',
    title: '±0.02mm Precision Tolerances',
    desc: 'Cold-rolled carbon steel tracks undergo optical laser inspection to ensure uniform ball bearing alignment and zero drawer wobble.',
  },
  {
    ico: 'shield',
    title: '100% Pre-Dispatch Quality Gate',
    desc: 'Every production lot is verified for damper fluid resistance, spring return force, and torque retention before leaving our Yamuna Nagar depot.',
  },
];

export default function Home() {
  const [activeApp, setActiveApp] = useState(0);
  const featured = CATEGORIES.slice(0, 4).map((c) => ({ ...c.products[0], cat: c }));

  return (
    <>
      <SEO
        title="Thames | Built for Better Spaces – Plywood, Decorative & Architectural Hardware"
        description="Premium quality plywood & architectural hardware manufactured in Yamuna Nagar, Haryana. Built for stronger, smarter and more beautiful spaces. Every Turn Earns Trust."
        keywords="Thames plywood, Prime 710, architectural hardware, drawer slides, concealed hinges, Yamuna Nagar hardware manufacturer"
      />

      {/* =====================================================================
          EXACT REFERENCE HERO SECTION (FIRST PAGE)
          ===================================================================== */}
      <section className="thames-exact-hero">
        <div className="hero-backdrop-overlay" />

        <div className="container hero-container-inner">
          {/* Main Hero Upper Row: Left text content over dark marble vignette, showcasing background visual */}
          <div className="hero-main-row">
            <div className="hero-left-content">
              <div className="thames-eyebrow-wrap">
                <span className="thames-eyebrow-gold">THAMES PLYWOOD</span>
              </div>

              <h1 className="hero-big-headline">
                Built for <br />
                Better Spaces.
              </h1>

              <p className="hero-subtext">
                Premium quality plywood &amp; hardware for stronger, smarter and more beautiful spaces.
              </p>

              {/* Action Buttons */}
              <div className="hero-btn-row">
                <Link to="/products" className="btn-explore-products">
                  <span>Explore Products</span>
                  <Icon n="arrow" s={17} />
                </Link>

                <a href={SITE.catalogue} download className="btn-download-cat">
                  <Icon n="download" s={17} />
                  <span>Download Catalogue</span>
                </a>
              </div>

              {/* 4 Glass Trust Badges */}
              <div className="hero-trust-row">
                {TRUST_PILLS.map((pill) => (
                  <div key={pill.label} className="trust-pill-glass">
                    <span className="trust-pill-icon">
                      <Icon n={pill.icon} s={18} />
                    </span>
                    <span className="trust-pill-text">{pill.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom 3 Glassmorphic Feature Cards (Exact Screenshot Match) */}
          <div className="hero-bottom-cards-grid">
            {HERO_FEATURE_CARDS.map((card) => (
              <Link key={card.title} to={card.link} className="hero-feature-card">
                <div className="feature-card-info">
                  <h3 className="feature-card-title">{card.title}</h3>
                  <div className="feature-card-arrow-circle" aria-label={`View ${card.title}`}>
                    <Icon n="arrow" s={16} />
                  </div>
                </div>
                <div className="feature-card-image-wrap">
                  <img src={card.image} alt={card.title} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Certified Quality Metrics Strip */}
      <section className="metrics-strip">
        <div className="container">
          <div className="metrics-grid">
            {METRICS.map((m) => (
              <div key={m.lbl} className="metric-box">
                <b className="metric-val">{m.val}</b>
                <span className="metric-lbl">{m.lbl}</span>
                <small className="metric-sub">{m.sub}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Collections Bento Grid */}
      <section className="section bg-alabaster">
        <div className="container">
          <Head
            eyebrow="Architectural Catalog"
            title="Complete Engineering Range"
            text="Comprehensive solutions for modular kitchens, luxury wardrobes, and architectural timber doors — from one trusted manufacturer."
            center
          />

          <div className="luxury-bento-grid">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} className={`bento-card ${i === 0 ? 'bento-featured' : ''}`}>
                <Link to={`/products/${c.slug}`} className="bento-link">
                  <div className="bento-img-wrap">
                    <img src={c.image} alt={c.name} loading="lazy" />
                    <div className="bento-overlay" />
                    <span className="bento-tag">{c.tagline.split('·')[0]}</span>
                  </div>
                  <div className="bento-content">
                    <div className="bento-meta">
                      <span className="code">{c.products.length} Series Available</span>
                    </div>
                    <h3>{c.name}</h3>
                    <p>{c.short}</p>
                    <span className="bento-arrow">
                      Explore Series <Icon n="arrow" s={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Applications Showcase */}
      <section className="section bg-luxury-dark">
        <div className="container">
          <Head
            eyebrow="Architectural Applications"
            title="Tailored for Modern Interior Architecture"
            text="Discover how Thames hardware empowers seamless movement and structural integrity across diverse spaces."
            center
            dark
          />

          <div className="app-showcase-grid">
            <div className="app-tabs-col">
              {APPLICATIONS.map((app, idx) => (
                <button
                  key={app.title}
                  type="button"
                  onClick={() => setActiveApp(idx)}
                  className={`app-tab-btn ${activeApp === idx ? 'active' : ''}`}
                >
                  <div className="app-tab-num">0{idx + 1}</div>
                  <div className="app-tab-text">
                    <h4>{app.title}</h4>
                    <p>{app.desc}</p>
                    <div className="app-tags">
                      {app.tags.map((t) => (
                        <span key={t} className="app-tag-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="app-preview-col">
              <div className="app-preview-card">
                <img
                  src={APPLICATIONS[activeApp].img}
                  alt={APPLICATIONS[activeApp].title}
                  className="app-preview-img"
                />
                <div className="app-preview-floating">
                  <h3>{APPLICATIONS[activeApp].title}</h3>
                  <p>{APPLICATIONS[activeApp].desc}</p>
                  <Link to={APPLICATIONS[activeApp].link} className="btn btn-gold-luxury btn-sm">
                    View Compatible Products <Icon n="arrow" s={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Master Systems (Exact Reference UI) */}
      <FeaturedMasterSystems />

      {/* Manufacturing Heritage */}
      <section className="section bg-alabaster border-top">
        <div className="container">
          <div className="factory-split">
            <div className="factory-info">
              <span className="luxury-eyebrow">Manufacturing Heritage</span>
              <h2>Engineering Precision from Yamuna Nagar, Haryana.</h2>
              <p className="lead-text">
                Backed by the legacy of <b>Thamesply</b>, our architectural hardware and plywood manufacturing operates specialized automated tooling and testing facilities in Yamuna Nagar.
              </p>
              <p>
                From raw high-tensile cold-rolled steel and forged solid brass to precision computer-aided hydraulic dampers, every batch undergoes multi-stage inspections.
              </p>

              <div className="pillars-grid">
                {ENGINEERING_PILLARS.map((ep) => (
                  <div key={ep.title} className="pillar-item">
                    <span className="pillar-ico"><Icon n={ep.ico} s={22} /></span>
                    <div>
                      <h5>{ep.title}</h5>
                      <p>{ep.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="factory-media">
              <div className="factory-frame">
                <img
                  src="/images/factory-precision.jpg"
                  alt="Thames precision automated engineering plant"
                  className="factory-img"
                />
                <div className="factory-overlay-badge">
                  <Icon n="shield" s={20} />
                  <div>
                    <b>Zero-Defect Standard</b>
                    <small>DIN EN 15570 &amp; ISO Quality Protocol</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trade & Dealership Network CTA Banner */}
      <section className="luxury-band">
        <div className="container">
          <div className="band-inner">
            <div className="band-content">
              <span className="luxury-eyebrow gold">Trade &amp; Distribution</span>
              <h2>Expand Your Business with Thames</h2>
              <p>
                We partner with hardware dealers, distributors, modular kitchen manufacturers, and interior project contractors across India. Enjoy attractive trade margins, priority dispatch, and direct specifier support.
              </p>
            </div>
            <div className="band-actions">
              <Link className="btn btn-gold-luxury" to="/become-a-dealer">
                Apply for Dealership
              </Link>
              <a
                className="btn btn-outline-white"
                href={wa('Hello Thames, I am interested in dealership / wholesale distribution in my city.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon n="wa" s={18} /> WhatsApp Trade Desk
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
