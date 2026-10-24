import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE, wa } from '../config';
import { FINISH } from '../data/products';

const P = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12l5 5L20 7',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  pin: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z',
  download: 'M12 4v11M7 11l5 5 5-5M5 20h14',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  wa: 'M3 21l1.6-4.8A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4-1L3 21z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  shieldCheck: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
  gauge: 'M4 16a8 8 0 1116 0M12 16l4-5',
  flask: 'M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3',
  ruler: 'M3 17L17 3l4 4L7 21zM8 12l2 2M11 9l2 2',
  cube: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  truck: 'M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z',
  store: 'M4 9l1-5h14l1 5M4 9v11h16V9M9 20v-6h6v6',
  trend: 'M3 17l6-6 4 4 8-9M15 6h6v6',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
  ig: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zM12 16a4 4 0 100-8 4 4 0 000 8z',
  fb: 'M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z',
  li: 'M4 9h4v11H4zM6 4a2 2 0 110 4 2 2 0 010-4zM10 9h4v2c1-2 6-3 6 2v7h-4v-6c0-3-3-2-3 0v6h-3z',
  yt: 'M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3zM10 9v6l5-3z',
  sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  cart: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
  sparkle: 'M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z',
  external: 'M7 17L17 7M7 7h10v10',
  chevronDown: 'M6 9l6 6 6-6',
  chevronUp: 'M18 15l-6-6-6 6',
  crown: 'M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  diamond: 'M6 3h12l4 6-10 12L2 9l4-6z',
  leaf: 'M11 20A7 7 0 014 13C4 7 11 3 20 3c0 9-4 16-11 17zM4 13c7 0 11-4 11-10',
  gear: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
  // Reference Mega Menu Icons
  hinge: 'M7 4v16M17 4v16M7 4h10M7 20h10M12 4v16',
  channel: 'M4 8h16M16 4l4 4-4 4M20 16H4M8 12l-4 4 4 4',
  drawer: 'M4 6h16v12H4zM4 12h16M10 9h4M10 15h4',
  pot: 'M4 10h16v8a4 4 0 01-4 4H8a4 4 0 01-4-4v-8zM2 10h20M9 6h6M12 2v4',
  profile: 'M4 4h16v16H4zM9 4v16M15 4v16M4 9h16M4 15h16',
  sliding: 'M4 4h16v16H4zM12 4v16M8 10v4M16 10v4',
  wrench: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
  door: 'M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4',
  clock: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-14v4l3 3',
  rupee: 'M6 3h12M6 8h12M6 13l7 8M6 8a4.5 4.5 0 000 5h2',
  message: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  fileText: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  network: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
};

export const Icon = ({ n, s = 20, className = '' }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d={P[n] || P.arrow} />
  </svg>
);

export const Logo = ({ showMotto = false }) => (
  <Link to="/" className="thames-navbar-brand" aria-label="Thames Hardware home">
    <div className="brand-logo-col">
      <span className="brand-title">THAMES</span>
      <span className="brand-sub">PLYWOOD | DECORATIVE | HARDWARE</span>
    </div>
    {showMotto && (
      <>
        <div className="brand-divider" />
        <div className="brand-motto">
          <span>BUILT</span>
          <span>FOR</span>
          <span>BETTER</span>
          <span>SPACES</span>
        </div>
      </>
    )}
  </Link>
);

export const Reveal = ({ children, className = '' }) => {
  const r = useRef(null);
  useEffect(() => {
    const el = r.current;
    if (!el || !('IntersectionObserver' in window)) return el?.classList.add('in');
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={r} className={'reveal ' + className}>{children}</div>;
};

export const Head = ({ eyebrow, title, text, center, dark }) => (
  <div className={'sec-head' + (center ? ' center' : '') + (dark ? ' dark' : '')}>
    {eyebrow && <span className="luxury-eyebrow">{eyebrow}</span>}
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
);

export const FinishSelector = ({ list, active, onSelect }) => (
  <div className="finish-selector" role="group" aria-label="Select finish">
    {list.map((f) => {
      const color = FINISH[f] || '#CCC';
      const isSelected = active === f;
      return (
        <button
          key={f}
          type="button"
          onClick={() => onSelect && onSelect(f)}
          className={'finish-disc-btn' + (isSelected ? ' selected' : '')}
          title={f}
        >
          <span className="finish-disc" style={{ background: color }} />
          {isSelected && <span className="finish-ring" />}
        </button>
      );
    })}
  </div>
);

export const Finish = ({ list }) => (
  <div className="finishes" aria-label="Available finishes">
    {list.map((f) => (
      <span
        key={f}
        className="disc"
        title={f}
        style={{ background: FINISH[f] || '#ccc' }}
      />
    ))}
  </div>
);

export function ProductArt({ kind, className = '' }) {
  return (
    <div className={'product-art-fallback ' + className}>
      <Icon n="cube" s={32} />
    </div>
  );
}

export function useReady() {
  const [t] = useState(() => Date.now());
  return t;
}
