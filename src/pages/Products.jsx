import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { Head, Icon } from '../components/ui';
import { CATEGORIES, allProducts } from '../data/products';

export default function Products() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const all = useMemo(() => allProducts(), []);

  const filtered = useMemo(() => {
    return all.filter((p) => {
      const matchCat = selectedCat === 'all' || p.cat.slug === selectedCat;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.cat.name.toLowerCase().includes(q) ||
        p.finishes.some((f) => f.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [all, selectedCat, searchQuery]);

  return (
    <>
      <SEO
        title="Architectural Hardware Products | Telescopic Channels, Hinges, Tandem Systems"
        description="Browse Thames Hardware's full architectural catalog: telescopic drawer channels, 3D hydraulic hinges, slim tandem drawer systems, solid brass butt hinges, and screws."
        keywords="architectural hardware, telescopic drawer channels, hydraulic hinges, butt hinges, screws and fasteners, kitchen drawer systems, rolling shutters"
      />

      <section className="page-hero luxury-page-hero">
        <div className="container">
          <span className="luxury-eyebrow gold">Product Catalog</span>
          <h1>Architectural &amp; Cabinetry Hardware</h1>
          <p>
            Precision-engineered furniture fittings for architects, interior designers, modular kitchen manufacturers, and retail partners.
          </p>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container">
          {/* Search & Filter Bar */}
          <div className="catalog-toolbar">
            <div className="catalog-search">
              <Icon n="ruler" s={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by code (e.g. TH-TC45), name, or finish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <Icon n="close" s={14} />
                </button>
              )}
            </div>

            <div className="catalog-toolbar-actions">
              <Link
                to="/contact"
                className="btn btn-primary-gold btn-sm"
              >
                <Icon n="mail" s={16} /> Direct Trade Enquiry
              </Link>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="luxury-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={selectedCat === 'all'}
              className={`luxury-tab-btn ${selectedCat === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCat('all')}
            >
              All Hardware <span className="tab-count">{all.length}</span>
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                role="tab"
                aria-selected={selectedCat === c.slug}
                className={`luxury-tab-btn ${selectedCat === c.slug ? 'active' : ''}`}
                onClick={() => setSelectedCat(c.slug)}
              >
                {c.name} <span className="tab-count">{c.products.length}</span>
              </button>
            ))}
          </div>

          {/* Active Filter Summary */}
          {(selectedCat !== 'all' || searchQuery) && (
            <div className="filter-summary">
              <span>Showing {filtered.length} of {all.length} products</span>
              {selectedCat !== 'all' && (
                <span className="filter-chip">
                  Category: {CATEGORIES.find((c) => c.slug === selectedCat)?.name}
                  <button onClick={() => setSelectedCat('all')}><Icon n="close" s={12} /></button>
                </span>
              )}
              {searchQuery && (
                <span className="filter-chip">
                  Keyword: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}><Icon n="close" s={12} /></button>
                </span>
              )}
              <button
                className="reset-filters-link"
                onClick={() => {
                  setSelectedCat('all');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filtered.length === 0 ? (
            <div className="no-results-box">
              <div className="no-results-ico"><Icon n="cube" s={36} /></div>
              <h3>No matching products found</h3>
              <p>We couldn't find any hardware matching your filter criteria. Try searching with a different SKU or browse all categories.</p>
              <button
                className="btn btn-gold-luxury"
                onClick={() => {
                  setSelectedCat('all');
                  setSearchQuery('');
                }}
              >
                View Full Catalog
              </button>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map((p) => (
                <ProductCard
                  key={p.code}
                  p={p}
                  art={p.cat.art}
                  catSlug={p.cat.slug}
                  catName={p.cat.name}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
