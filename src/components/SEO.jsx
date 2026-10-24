import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../config';

const setMeta = (sel, attr, key, val) => {
  let el = document.head.querySelector(sel);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', val);
};
export default function SEO({ title, description, keywords, schema }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const full = title.includes('Thames') ? title : `${title} | Thames Hardware`;
    const url = SITE.url + (pathname === '/' ? '' : pathname);
    document.title = full;
    setMeta('meta[name="description"]', 'name', 'description', description);
    if (keywords) setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    setMeta('meta[property="og:title"]', 'property', 'og:title', full);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    let c = document.head.querySelector('link[rel="canonical"]');
    if (!c) { c = document.createElement('link'); c.rel = 'canonical'; document.head.appendChild(c); }
    c.href = url;
    let s = document.getElementById('ld-json');
    if (!s) { s = document.createElement('script'); s.id = 'ld-json'; s.type = 'application/ld+json'; document.head.appendChild(s); }
    s.textContent = JSON.stringify([
      { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: SITE.name, url: SITE.url, telephone: SITE.phoneRaw, email: SITE.email, slogan: SITE.tagline, address: { '@type': 'PostalAddress', streetAddress: SITE.address, addressCountry: 'IN' } },
      ...(schema || []),
    ]);
    if (window.gtag && SITE.gaId) window.gtag('event', 'page_view', { page_path: pathname, page_title: full });
  }, [title, description, keywords, schema, pathname]);
  return null;
}
