import React from 'react';
import { Link } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import { Icon } from './ui';
import { SITE, wa } from '../config';

export default function SpecModal() {
  const { activeSpecProduct, setActiveSpecProduct } = useQuote();

  if (!activeSpecProduct) return null;
  const p = activeSpecProduct;

  const handleEnquire = () => {
    const msg = `Hello Thames Hardware, please share CAD files and detailed technical drawing for ${p.name} (${p.code}).`;
    window.open(wa(msg), '_blank');
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveSpecProduct(null)}>
      <div className="spec-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="spec-modal-header">
          <div>
            <span className="code">{p.code} · Architectural Specifications</span>
            <h2>{p.name}</h2>
          </div>
          <button
            className="drawer-close"
            onClick={() => setActiveSpecProduct(null)}
            aria-label="Close specification sheet"
          >
            <Icon n="close" s={20} />
          </button>
        </div>

        <div className="spec-modal-body">
          <div className="spec-modal-grid">
            <div className="spec-modal-visual">
              <div className="spec-modal-img">
                <img src={p.image} alt={p.name} />
                <span className="badge-eng">{p.badge}</span>
              </div>
              {p.grade && (
                <div className="grade-badge">
                  <Icon n="shield" s={16} /> <b>Material Standard:</b> {p.grade}
                </div>
              )}
            </div>

            <div className="spec-modal-details">
              <h4>Engineering Parameter Sheet</h4>
              <ul className="spec-table">
                {p.specs?.map(([k, v]) => (
                  <li key={k}>
                    <span className="spec-key">{k}</span>
                    <span className="spec-val">{v}</span>
                  </li>
                ))}
              </ul>

              {p.blueprint && (
                <div className="blueprint-box">
                  <div className="blueprint-title">
                    <Icon n="ruler" s={16} /> Architectural Installation Tolerances
                  </div>
                  <ul>
                    {Object.entries(p.blueprint).map(([k, v]) => (
                      <li key={k}>
                        <b>{k.replace(/([A-Z])/g, ' $1')}:</b> {v}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {p.sizes && p.sizes.length > 0 && (
                <div className="sizes-block">
                  <span className="spec-sub">Available Production Sizes:</span>
                  <div className="chips">
                    {p.sizes.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {p.finishes && p.finishes.length > 0 && (
                <div className="finishes-block">
                  <span className="spec-sub">Architectural Finishes:</span>
                  <div className="finish-tags">
                    {p.finishes.map((f) => (
                      <span key={f} className="finish-tag">{f}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="spec-modal-footer">
          <div className="spec-footer-info">
            <Icon n="check" s={16} /> All fittings factory tested and guaranteed against manufacturing defects.
          </div>
          <div className="spec-footer-actions">
            <Link
              to={`/contact?product=${encodeURIComponent(`${p.name} (${p.code})`)}#inquiry-form`}
              className="btn btn-gold-luxury"
              onClick={() => setActiveSpecProduct(null)}
            >
              <Icon n="mail" s={15} /> Enquire for Bulk Specs
            </Link>
            <button className="btn btn-outline-dark" onClick={handleEnquire}>
              <Icon n="wa" s={16} /> Request CAD / Tech Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
