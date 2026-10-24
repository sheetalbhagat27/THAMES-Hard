import SEO from '../components/SEO';
import { Head, Icon } from '../components/ui';
import { CATEGORIES } from '../data/products';
import { SITE, wa } from '../config';

export default function Catalogue() {
  const track = (n) => window.gtag && window.gtag('event', 'catalogue_download', { file: n });

  return (
    <>
      <SEO
        title="Download Architectural Hardware Catalogues & Spec Sheets | Thames Hardware"
        description="Download official Thames Hardware architectural catalogues (PDF), dimensional engineering drawings, and CAD sheets for drawer channels, hinges, tandem systems, and fasteners."
      />

      <section className="page-hero luxury-page-hero">
        <div className="container">
          <span className="luxury-eyebrow gold">Technical Resources</span>
          <h1>Product Catalogues &amp; Spec Sheets</h1>
          <p>
            Complete technical literature, dimensional diagrams, and installation tolerances for architects, interior specifiers, and dealers.
          </p>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container">
          {/* Master Catalog Hero Box */}
          <div className="master-catalogue-card">
            <div className="master-cat-content">
              <span className="tier-badge">2026 Edition</span>
              <h2>Thames Hardware Master Architectural Catalogue</h2>
              <p>
                Comprehensive 84-page manual encompassing our complete collection of hydraulic concealed hinges, heavy-duty telescopic slides, tandem drawer systems, architectural butt hinges, aluminium shutters, and precision fasteners.
              </p>
              <div className="cat-specs-chips">
                <span>PDF Format</span>
                <span>Includes Drilling Dimensions</span>
                <span>Load Charts &amp; Finish Codes</span>
              </div>
              <div className="master-cat-actions">
                <a
                  className="btn btn-gold-luxury"
                  href={SITE.catalogue}
                  download
                  onClick={() => track('master')}
                >
                  <Icon n="download" s={18} /> Download Master PDF
                </a>
                <a
                  className="btn btn-outline-white"
                  href={wa('Hello Thames Hardware, please share the 2026 Master Catalogue and Trade Price List on WhatsApp.')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon n="wa" s={18} /> Receive on WhatsApp
                </a>
              </div>
            </div>
            <div className="master-cat-graphic">
              <div className="book-mockup">
                <div className="book-cover">
                  <span className="book-logo">THAMES</span>
                  <span className="book-sub">ARCHITECTURAL HARDWARE</span>
                  <div className="book-art">
                    <Icon n="shield" s={48} />
                  </div>
                  <span className="book-year">MASTER CATALOGUE 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Category Brochures */}
          <Head
            eyebrow="Category Brochures"
            title="Individual System Specification Sheets"
            text="Download quick technical summaries dedicated to specific hardware systems."
          />

          <div className="grid-3">
            {CATEGORIES.map((c) => (
              <div key={c.slug} className="card dl-card-luxury">
                <div className="dl-card-top">
                  <div className="dl-icon-box">
                    <Icon n="download" s={22} />
                  </div>
                  <span className="dl-format-tag">PDF</span>
                </div>
                <h3>{c.name}</h3>
                <p>{c.short}</p>
                <div className="dl-card-footer">
                  <span className="dl-file-info">{c.products.length} Series · Tech Drawings</span>
                  <a
                    className="dl-link-btn"
                    href={`/catalogue/${c.slug}.pdf`}
                    download
                    onClick={() => track(c.slug)}
                  >
                    <span>Download</span>
                    <Icon n="arrow" s={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CAD & 3D BIM Support */}
          <div className="cad-support-box mt-4">
            <div className="cad-support-text">
              <span className="luxury-eyebrow gold">For Architects &amp; Interior Designers</span>
              <h3>Need 3D CAD (.DWG / .STEP) Models for Modular Software?</h3>
              <p>
                We supply ready-to-import 3D parametric models and drilling template files for AutoCAD, SketchUp, Pytha, and IMOS. Contact our engineering desk with your project requirements.
              </p>
            </div>
            <a
              className="btn btn-gold-luxury"
              href={wa('Hello Thames Hardware, I am an architect / interior designer and require 3D CAD / DWG models for hardware installation.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon n="wa" s={16} /> Request CAD Models
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
