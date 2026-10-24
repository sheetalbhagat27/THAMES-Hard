import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './ui';
import { allProducts } from '../data/products';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? allProducts().filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.cat?.name.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-bar">
          <Icon n="search" s={20} className="search-modal-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search plywood, drawer slides, hinges, fittings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-modal-close" onClick={onClose} aria-label="Close search">
            <Icon n="close" s={18} />
          </button>
        </div>

        <div className="search-modal-body">
          {query.trim() && results.length === 0 && (
            <div className="search-no-results">
              <p>No products found matching "<b>{query}</b>"</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="search-results-list">
              {results.map((p) => (
                <Link
                  key={p.code}
                  to={`/products/${p.cat?.slug || 'telescopic-drawer-channels'}`}
                  className="search-result-item"
                  onClick={onClose}
                >
                  <img src={p.image} alt={p.name} className="search-thumb" />
                  <div className="search-info">
                    <span className="search-code">{p.code} · {p.cat?.name}</span>
                    <span className="search-title">{p.name}</span>
                    <small className="search-badge">{p.badge}</small>
                  </div>
                  <Icon n="arrow" s={16} className="search-arrow" />
                </Link>
              ))}
            </div>
          )}

          {!query.trim() && (
            <div className="search-quick-tags">
              <span className="quick-label">POPULAR ARCHITECTURAL SEARCHES:</span>
              <div className="quick-tags-row">
                {['Telescopic Channels', 'Hydraulic Hinges', 'Drawer Slides', 'Prime 710', 'Tandem Box', 'Solid Brass Butt Hinges'].map((t) => (
                  <button key={t} className="quick-tag-pill" onClick={() => setQuery(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
