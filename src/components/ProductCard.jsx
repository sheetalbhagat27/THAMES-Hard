import { useState } from 'react';
import { Link } from 'react-router-dom';
import { wa } from '../config';
import { FinishSelector, Icon, ProductArt } from './ui';
import { useQuote } from '../context/QuoteContext';

export default function ProductCard({ p, art, catSlug, catName, full }) {
  const [selectedFinish, setSelectedFinish] = useState(p.finishes?.[0] || 'Standard');
  const { setActiveSpecProduct } = useQuote();

  const msg = `Hello Thames Hardware, I would like to enquire about ${p.name} (${p.code}) in ${selectedFinish} finish.`;

  return (
    <article className="luxury-pcard">
      <div className="luxury-pimg-wrap">
        <div className="luxury-pimg">
          {p.image ? (
            <img
              src={p.image}
              alt={`${p.name} – Thames Architectural Hardware`}
              loading="lazy"
              width="600"
              height="600"
            />
          ) : (
            <ProductArt kind={art} />
          )}
          <span className="badge-gold">{p.badge}</span>
          <button
            className="quick-spec-btn"
            onClick={() => setActiveSpecProduct(p)}
            title="View Engineering Blueprint & Specs"
          >
            <Icon n="ruler" s={14} /> Quick Specs
          </button>
        </div>
      </div>

      <div className="pbody">
        <div className="pcode-row">
          <span className="code">{p.code}</span>
          {catName && <span className="pcat-tag">{catName}</span>}
        </div>

        <h3 className="product-title">
          {catSlug && !full ? (
            <Link to={`/products/${catSlug}`}>{p.name}</Link>
          ) : (
            p.name
          )}
        </h3>

        <p className="product-desc">{p.desc}</p>

        {p.grade && (
          <div className="pgrade-pill">
            <Icon n="shield" s={13} /> <span>{p.grade}</span>
          </div>
        )}

        <ul className="luxury-specs">
          {p.specs.slice(0, full ? 6 : 3).map(([k, v]) => (
            <li key={k}>
              <span className="spec-label">{k}</span>
              <b className="spec-val">{v}</b>
            </li>
          ))}
        </ul>

        {full && p.sizes?.length > 0 && (
          <div className="chips">
            <small>Sizes:</small>
            {p.sizes.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        )}

        {p.finishes?.length > 0 && (
          <div className="pfoot-finish">
            <div className="finish-head">
              <span className="lbl">Selected Finish:</span>
              <b className="selected-finish-name">{selectedFinish}</b>
            </div>
            <FinishSelector
              list={p.finishes}
              active={selectedFinish}
              onSelect={setSelectedFinish}
            />
          </div>
        )}

        <div className="pcard-actions">
          <Link
            to={`/contact?product=${encodeURIComponent(`${p.name} (${p.code}) – ${selectedFinish} Finish`)}#inquiry-form`}
            className="btn btn-primary-gold"
          >
            <Icon n="mail" s={15} /> Enquire Now
          </Link>

          <a
            className="btn btn-ghost-luxury"
            href={wa(msg)}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat directly with Yamuna Nagar Trade Desk"
          >
            <Icon n="wa" s={16} /> WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
