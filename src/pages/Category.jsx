import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import NotFound from './NotFound';
import { CATEGORIES } from '../data/products';
import { SITE, wa } from '../config';
import { Icon } from '../components/ui';

export default function Category() {
  const { slug } = useParams();
  const c = CATEGORIES.find((x) => x.slug === slug);
  if (!c) return <NotFound />;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: c.name,
      itemListElement: c.products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: p.name,
          sku: p.code,
          description: p.desc,
          brand: { '@type': 'Brand', name: SITE.name },
        },
      })),
    },
  ];

  return (
    <>
      <SEO
        title={`${c.name} Manufacturer | Thames Architectural Hardware`}
        description={`${c.name} engineered by Thames Hardware. ${c.intro}`}
        keywords={c.keywords}
        schema={schema}
      />

      <section className="category-hero">
        <div className="container category-hero-grid">
          <div className="category-hero-text">
            <nav className="crumbs">
              <Link to="/">Home</Link> <span className="sep">/</span>{' '}
              <Link to="/products">Products</Link> <span className="sep">/</span>{' '}
              <span className="current">{c.name}</span>
            </nav>
            <span className="luxury-eyebrow gold">{c.tagline}</span>
            <h1>{c.name}</h1>
            <p className="category-intro-lead">{c.intro}</p>
            <div className="category-hero-actions">
              <a
                className="btn btn-gold-luxury"
                href={wa(`Hello Thames Hardware, I am looking for architectural specifications & bulk trade pricing for ${c.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon n="wa" s={16} /> Enquire on WhatsApp
              </a>
              <Link className="btn btn-outline-white" to="/catalogue">
                <Icon n="download" s={16} /> Download Specs
              </Link>
            </div>
          </div>

          <div className="category-hero-media">
            <div className="category-hero-frame">
              <img src={c.image} alt={c.name} />
              <div className="category-hero-badge">
                <Icon n="shield" s={18} />
                <span>Quality of India · {SITE.parentBrand} Division</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container">
          <div className="category-crosslink-block">
            <h3>Explore Other Architectural Systems</h3>
            <div className="luxury-pills">
              {CATEGORIES.filter((x) => x.slug !== slug).map((x) => (
                <Link key={x.slug} to={`/products/${x.slug}`} className="luxury-pill-btn">
                  <span>{x.name}</span>
                  <Icon n="arrow" s={14} />
                </Link>
              ))}
            </div>
          </div>

          <div className="category-sec-head">
            <div>
              <span className="luxury-eyebrow">Production Series</span>
              <h2>Available Models &amp; Configurations</h2>
            </div>
            <p className="category-sec-desc">
              All models in this series are precision-calibrated and available for direct bulk distribution across India.
            </p>
          </div>

          <div className="grid-2">
            {c.products.map((p) => (
              <ProductCard
                key={p.code}
                p={p}
                art={c.art}
                full
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
