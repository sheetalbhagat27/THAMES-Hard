import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './ui';
import { CATEGORIES, FINISH, allProducts } from '../data/products';
import { useQuote } from '../context/QuoteContext';

// Custom badge overrides to match the exact reference UI
const BADGES = {
  'TH-HG105-3D': '100,000 CYCLES',
  'TH-TC45-SC': '45KG DYNAMIC LOAD',
  'TH-SB-13G': '13MM ULTRA-SLIM',
  'TH-BH40-4BB': 'GRADE 316 PIN',
  'TH-RS-80AL': 'GERMAN MECHANISM',
  'TH-SF-CS40': 'GRADE 304 STEEL',
  'TH-DC-EN80': 'UL LISTED 500K',
  'TH-AH-01': 'SOLID BRASS PVD',
};

// Mini SVG icons for technical specifications
function SpecMiniIcon({ kind }) {
  if (kind === 'angle' || kind === 'dims') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 21H3V3" /><path d="M7 17l10-10" />
      </svg>
    );
  }
  if (kind === 'diameter' || kind === 'bearings') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (kind === 'load' || kind === 'capacity') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    );
  }
  if (kind === 'extension' || kind === 'motion') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
      </svg>
    );
  }
  // Default thickness / gauge / pin
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function getSpecIconType(label) {
  const l = label.toLowerCase();
  if (l.includes('angle') || l.includes('dimension')) return 'angle';
  if (l.includes('diameter') || l.includes('bearing')) return 'diameter';
  if (l.includes('load') || l.includes('capacity') || l.includes('weight')) return 'load';
  if (l.includes('extension') || l.includes('motion')) return 'extension';
  return 'thickness';
}

export default function FeaturedMasterSystems() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlisted, setWishlisted] = useState({});
  const { setActiveSpecProduct } = useQuote();

  // Initial finishes map
  const [selectedFinishes, setSelectedFinishes] = useState({
    'TH-HG105-3D': 'Brushed Nickel',
    'TH-TC45-SC': 'Zinc Plated',
    'TH-SB-13G': 'Anthracite Grey',
    'TH-BH40-4BB': 'Satin Brass',
  });

  // Base featured 4 products
  const baseFeatured = useMemo(() => {
    return CATEGORIES.slice(0, 4).map((c) => ({
      ...c.products[0],
      cat: c,
      catSlug: c.slug,
      catName: c.name,
    }));
  }, []);

  // All products for filtering
  const allList = useMemo(() => allProducts(), []);

  // Filtered products based on category tab & search
  const displayedProducts = useMemo(() => {
    let list = activeTab === 'all' ? baseFeatured : allList.filter((p) => p.cat.slug === activeTab);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = allList.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.cat.name.toLowerCase().includes(q)
      );
    }
    return list.slice(0, 4);
  }, [activeTab, searchTerm, baseFeatured, allList]);

  const toggleWishlist = (code) => {
    setWishlisted((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  const setFinish = (code, finish) => {
    setSelectedFinishes((prev) => ({ ...prev, [code]: finish }));
  };

  return (
    <section className="section master-systems-section">
      <div className="container">
        {/* =====================================================================
            1. TOP LUXURY HERO BANNER WITH STAT PILLS & KITCHEN SYSTEM VISUAL
            ===================================================================== */}
        <div className="master-systems-banner">
          <div className="banner-bg-overlay" />

          {/* Kitchen Backdrop on Right with subtle dark blend */}
          <div className="banner-kitchen-img-wrap">
            <img
              src="/images/hero-showcase.jpg"
              alt="Thames architectural luxury kitchen drawer system"
              loading="lazy"
            />
            <div className="banner-kitchen-gradient" />
          </div>

          <div className="banner-content">
            <div className="banner-left">
              <div className="precision-eyebrow-row">
                <span className="precision-eyebrow">PRECISION RANGE</span>
                <span className="precision-line" />
              </div>

              <h2 className="master-banner-title">
                Featured Master <span className="gold-serif">Systems</span>
              </h2>

              <p className="master-banner-sub">
                Tested for 100,000 cycles with zero performance loss. Click swatches to inspect architectural finishes.
              </p>
            </div>

            {/* 3 Stacked Stat Badges */}
            <div className="banner-stats-column">
              <div className="banner-stat-pill">
                <div className="stat-pill-icon">
                  <Icon n="gear" s={18} />
                </div>
                <div className="stat-pill-text">
                  <b>100,000</b>
                  <span>Cycle Tested</span>
                </div>
              </div>

              <div className="banner-stat-pill">
                <div className="stat-pill-icon">
                  <Icon n="shield" s={18} />
                </div>
                <div className="stat-pill-text">
                  <b>45kg</b>
                  <span>Dynamic Load</span>
                </div>
              </div>

              <div className="banner-stat-pill">
                <div className="stat-pill-icon">
                  <Icon n="sparkle" s={18} />
                </div>
                <div className="stat-pill-text">
                  <b>Premium</b>
                  <span>Finishes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            2. FLOATING CATEGORY FILTER & SEARCH BAR
            ===================================================================== */}
        <div className="systems-filter-bar">
          <div className="systems-filter-pills">
            <button
              type="button"
              className={`cat-pill-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <Icon n="cube" s={15} />
              <span>All Products</span>
            </button>

            <button
              type="button"
              className={`cat-pill-btn ${activeTab === 'hydraulic-hinges' ? 'active' : ''}`}
              onClick={() => setActiveTab('hydraulic-hinges')}
            >
              <Icon n="hinge" s={15} />
              <span>Hinges</span>
            </button>

            <button
              type="button"
              className={`cat-pill-btn ${activeTab === 'telescopic-drawer-channels' ? 'active' : ''}`}
              onClick={() => setActiveTab('telescopic-drawer-channels')}
            >
              <Icon n="channel" s={15} />
              <span>Drawer Slides</span>
            </button>

            <button
              type="button"
              className={`cat-pill-btn ${activeTab === 'kitchen-drawer-systems' ? 'active' : ''}`}
              onClick={() => setActiveTab('kitchen-drawer-systems')}
            >
              <Icon n="drawer" s={15} />
              <span>Drawer Systems</span>
            </button>

            <button
              type="button"
              className={`cat-pill-btn ${activeTab === 'other-furniture-hardware' || activeTab === 'butt-hinges' ? 'active' : ''}`}
              onClick={() => setActiveTab('butt-hinges')}
            >
              <Icon n="door" s={15} />
              <span>Architectural Fittings</span>
            </button>
          </div>

          <div className="systems-filter-actions">
            <div className="systems-search-input-wrap">
              <Icon n="search" s={15} className="search-inp-icon" />
              <input
                type="text"
                placeholder="Search products, e.g. hinges, slim box..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="systems-search-inp"
                aria-label="Search master products"
              />
            </div>

            <button
              type="button"
              className="systems-filter-btn"
              onClick={() => {
                // Clear filter on click if active
                if (activeTab !== 'all' || searchTerm) {
                  setActiveTab('all');
                  setSearchTerm('');
                }
              }}
              title="Reset or toggle filters"
            >
              <Icon n="sliders" s={15} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* =====================================================================
            3. PRODUCT CARDS GRID (EXACT 4 CARDS AS IN SCREENSHOT)
            ===================================================================== */}
        <div className="master-cards-grid">
          {displayedProducts.map((p) => {
            const currentFinish = selectedFinishes[p.code] || p.finishes?.[0] || 'Standard';
            const isFav = wishlisted[p.code] || false;
            const badge = BADGES[p.code] || p.badge || 'GRADE 304';
            const catSlug = p.cat?.slug || p.catSlug || 'products';
            const catName = p.cat?.name || p.catName || 'Architectural Hardware';

            return (
              <article key={p.code} className="master-product-card">
                {/* Image Box with Top Badge & Wishlist Button */}
                <div className="mp-img-box">
                  <img src={p.image} alt={`${p.name} – Thames Hardware`} loading="lazy" />
                  <span className="mp-badge-tag">{badge}</span>

                  <button
                    type="button"
                    className={`mp-wishlist-btn ${isFav ? 'active' : ''}`}
                    onClick={() => toggleWishlist(p.code)}
                    aria-label={`Save ${p.name} to favorites`}
                    title="Save to favorites"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={isFav ? '#E5B869' : 'none'}
                      stroke={isFav ? '#E5B869' : '#FFFFFF'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* Card Body */}
                <div className="mp-body">
                  {/* Meta: Code (Gold) + Category */}
                  <div className="mp-meta-row">
                    <span className="mp-code-gold">{p.code}</span>
                    <span className="mp-cat-name">{catName}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mp-title">
                    <Link to={`/products/${catSlug}`} title={p.name}>
                      {p.name}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="mp-desc">{p.desc}</p>

                  {/* 3 Technical Specifications with Mini Icons */}
                  <div className="mp-specs-list">
                    {p.specs.slice(0, 3).map(([k, v]) => {
                      const iconKind = getSpecIconType(k);
                      return (
                        <div key={k} className="mp-spec-item">
                          <span className="mp-spec-left">
                            <span className="mp-spec-ico">
                              <SpecMiniIcon kind={iconKind} />
                            </span>
                            <span className="mp-spec-key">{k}</span>
                          </span>
                          <span className="mp-spec-val">{v}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Finish Row with Interactive Swatches */}
                  {p.finishes?.length > 0 && (
                    <div className="mp-finish-section">
                      <div className="mp-finish-head">
                        <span className="mp-finish-label">Selected Finish</span>
                        <span className="mp-finish-name">
                          {currentFinish} <span className="mp-finish-arrow">›</span>
                        </span>
                      </div>

                      <div className="mp-swatches-row">
                        {p.finishes.map((f) => {
                          const hex = FINISH[f] || '#BEC4C8';
                          const isAct = currentFinish === f;
                          return (
                            <button
                              key={f}
                              type="button"
                              className={`mp-swatch-circle ${isAct ? 'active' : ''}`}
                              style={{ backgroundColor: hex }}
                              title={`Select ${f} finish`}
                              onClick={() => setFinish(p.code, f)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Bottom Actions: Enquire Now (Navigates to Contact Us Form) & Quick Specs */}
                  <div className="mp-card-actions">
                    <Link
                      to={`/contact?product=${encodeURIComponent(`${p.name} (${p.code}) – ${currentFinish} Finish`)}#inquiry-form`}
                      className="btn-mp-quote btn-mp-enquire"
                      title={`Send enquiry for ${p.name}`}
                    >
                      <Icon n="mail" s={14} />
                      <span>Enquire Now</span>
                      <Icon n="arrow" s={12} />
                    </Link>

                    <button
                      type="button"
                      className="btn-mp-specs"
                      onClick={() => setActiveSpecProduct(p)}
                    >
                      <Icon n="clipboard" s={14} />
                      <span>Quick Specs</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* =====================================================================
            4. BOTTOM EXPLORE STRIP (EXACT SCREENSHOT MATCH)
            ===================================================================== */}
        <div className="master-explore-strip">
          <div className="explore-strip-left">
            <div className="explore-strip-emblem">
              <Icon n="cube" s={22} />
            </div>
            <div className="explore-strip-text">
              <h3>Explore All 9 Master Products</h3>
              <p>Discover our complete range of architectural hardware for modern spaces.</p>
            </div>
          </div>

          <Link to="/products" className="btn-strip-view">
            <span>View Full Range</span>
            <Icon n="arrow" s={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
