import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE, wa } from '../config';
import { Icon, Logo } from './ui';
import { QuoteProvider } from '../context/QuoteContext';
import MegaMenu from './MegaMenu';
import SpecModal from './SpecModal';
import SearchModal from './SearchModal';
import Chatbot from './Chatbot';

function HeaderNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setIsMegaOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Click outside to close mega menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMegaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="thames-header-master" ref={navRef}>
      {/* Floating Glass Navbar Capsule */}
      <div className="floating-navbar-container">
        <div className="container-fluid navbar-fluid-wrap">
          <header className="thames-glass-navbar">
            {/* Logo on Left */}
            <Logo />

            {/* Center Capsule Pill Navigation */}
            <nav className="thames-capsule-nav" aria-label="Main Navigation">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? 'capsule-nav-item active' : 'capsule-nav-item'
                }
                onMouseEnter={() => setIsMegaOpen(false)}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'capsule-nav-item active' : 'capsule-nav-item'
                }
                onMouseEnter={() => setIsMegaOpen(false)}
              >
                About
              </NavLink>

              {/* Products with Dropdown */}
              <div
                className="capsule-products-dropdown"
                onMouseEnter={() => setIsMegaOpen(true)}
              >
                <button
                  type="button"
                  className={`capsule-nav-item dropdown-toggle ${
                    isMegaOpen || pathname.startsWith('/products') ? 'active' : ''
                  }`}
                  onClick={() => setIsMegaOpen(!isMegaOpen)}
                  aria-expanded={isMegaOpen}
                >
                  <span>Products</span>
                  <Icon n={isMegaOpen ? 'chevronUp' : 'chevronDown'} s={13} />
                </button>
              </div>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'capsule-nav-item active' : 'capsule-nav-item'
                }
                onMouseEnter={() => setIsMegaOpen(false)}
              >
                Contact
              </NavLink>
            </nav>

            {/* Right Action: Customer Care + Get a Quote Button */}
            <div className="thames-right-actions">
              {/* Customer Care Phone */}
              <a
                href="tel:+919899322322"
                className="nav-customer-care"
                title="Customer Care: +91-98-99-322-322"
              >
                <div className="care-icon-circle">
                  <Icon n="phone" s={15} />
                </div>
                <div className="care-text-stack">
                  <span className="care-label">CUSTOMER CARE</span>
                  <span className="care-number">+91-98-99-322-322</span>
                </div>
              </a>

              {/* Get a Quote Button */}
              <Link
                to="/contact"
                className="btn-get-quote"
                aria-label="Get a Quote"
              >
                <span>Get a Quote</span>
                <Icon n="arrow" s={15} />
              </Link>

              {/* Mobile Burger */}
              <button
                className="mobile-burger-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
              >
                <Icon n={mobileOpen ? 'close' : 'menu'} s={24} />
              </button>
            </div>
          </header>
        </div>

        {/* Mega-Menu Dropdown */}
        <MegaMenu isOpen={isMegaOpen} onClose={() => setIsMegaOpen(false)} />

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="mobile-nav-panel">
            <NavLink to="/" end className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Home</NavLink>
            <NavLink to="/about" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>About</NavLink>
            <div className="mobile-cat-group">
              <span className="mobile-group-title">Products</span>
              <Link to="/products/hydraulic-hinges" className="mobile-sublink" onClick={() => setMobileOpen(false)}>Hinges</Link>
              <Link to="/products/telescopic-drawer-channels" className="mobile-sublink" onClick={() => setMobileOpen(false)}>Telescopic Channels</Link>
              <Link to="/products/kitchen-drawer-systems" className="mobile-sublink" onClick={() => setMobileOpen(false)}>Tandem Boxes &amp; Baskets</Link>
              <Link to="/products/rolling-shutters" className="mobile-sublink" onClick={() => setMobileOpen(false)}>Aluminium Profiles &amp; Shutters</Link>
              <Link to="/products/butt-hinges" className="mobile-sublink" onClick={() => setMobileOpen(false)}>Door Closers &amp; Butt Hinges</Link>
              <Link to="/products/screws-and-fasteners" className="mobile-sublink" onClick={() => setMobileOpen(false)}>Screws &amp; Fasteners</Link>
              <Link to="/products" className="mobile-sublink highlight" onClick={() => setMobileOpen(false)}>Explore All (37 Products)</Link>
            </div>
            <NavLink to="/catalogue" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Catalogue</NavLink>
            <NavLink to="/contact" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Contact</NavLink>
            <div className="mobile-care-row mt-3">
              <a href="tel:+919899322322" className="nav-customer-care">
                <div className="care-icon-circle">
                  <Icon n="phone" s={15} />
                </div>
                <div className="care-text-stack">
                  <span className="care-label">CUSTOMER CARE</span>
                  <span className="care-number">+91-98-99-322-322</span>
                </div>
              </a>
            </div>
            <Link
              to="/contact"
              className="btn-get-quote w-full mt-3"
              style={{ justifyContent: 'center' }}
              onClick={() => setMobileOpen(false)}
            >
              <span>Get a Quote</span>
              <Icon n="arrow" s={15} />
            </Link>
          </div>
        )}
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

function MainFooter() {
  const soc = Object.entries(SITE.social).filter(([, v]) => v);
  const sicon = { instagram: 'ig', facebook: 'fb', linkedin: 'li', youtube: 'yt' };

  return (
    <>
      <footer className="luxury-footer">
        <div className="container">
          <div className="foot-grid">
            <div className="foot-brand">
              <Logo />
              <p className="foot-desc">
                Architectural grade plywood &amp; precision hardware manufactured in Yamuna Nagar, Haryana. Built for stronger, smarter, and more beautiful spaces.
              </p>
              <div className="heritage-badge">
                <span className="heritage-icon"><Icon n="shield" s={16} /></span>
                <span>Division of <b>{SITE.parentBrand}</b> · Yamuna Nagar, Haryana</span>
              </div>
              <div className="social">
                {soc.map(([k, v]) => (
                  <a key={k} href={v} target="_blank" rel="noopener noreferrer" aria-label={k}>
                    <Icon n={sicon[k]} s={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="foot-col">
              <h4>Architectural Hardware</h4>
              <Link to="/products/hydraulic-hinges">Hinges &amp; Concealed Systems</Link>
              <Link to="/products/telescopic-drawer-channels">Drawer Slides &amp; Channels</Link>
              <Link to="/products/kitchen-drawer-systems">Tandem Boxes &amp; Baskets</Link>
              <Link to="/products/butt-hinges">Door Closers &amp; Butt Hinges</Link>
              <Link to="/products/rolling-shutters">Aluminium Profiles &amp; Shutters</Link>
              <Link to="/products/screws-and-fasteners">Screws &amp; Fasteners</Link>
            </div>

            <div className="foot-col">
              <h4>Quick Links</h4>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/products">All Products</Link>
              <Link to="/catalogue">Master Catalogue</Link>
              <Link to="/become-a-dealer">Dealer Network</Link>
              <Link to="/contact">Contact Desk</Link>
            </div>

            <div className="foot-col">
              <h4>Yamuna Nagar Facility</h4>
              <p className="contact-line">
                <Icon n="pin" s={16} />
                <span>{SITE.address}</span>
              </p>
              <a href={`tel:${SITE.phoneRaw}`} className="contact-line">
                <Icon n="phone" s={16} />
                <span>{SITE.phone}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="contact-line">
                <Icon n="mail" s={16} />
                <span>{SITE.email}</span>
              </a>
              <a
                href={wa('Hello Thames, I would like to enquire about dealership / products.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-gold mt-2"
              >
                <Icon n="wa" s={16} /> Live WhatsApp Desk
              </a>
            </div>
          </div>

          <div className="legal">
            <div className="legal-left">
              © {new Date().getFullYear()} {SITE.fullName}. All rights reserved. Quality of India.
            </div>
            <div className="legal-right">
              <Link to="/contact">Privacy Policy</Link>
              <Link to="/contact">Terms of Supply</Link>
              <Link to="/catalogue">Technical CADs</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <a
        className="floating-call-btn"
        href={`tel:${SITE.phoneRaw}`}
        aria-label="Call Customer Care"
        title="Call Thames: +91 98120 44550"
      >
        <Icon n="phone" s={20} />
      </a>

      <a
        className="floating-whatsapp-btn"
        href={wa('Hello Thames, I am looking for architectural hardware specifications & pricing.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat with Thames on WhatsApp"
      >
        <Icon n="wa" s={24} />
      </a>

      <SpecModal />
    </>
  );
}

export default function Layout() {
  return (
    <QuoteProvider>
      <HeaderNav />
      <main id="main-content">
        <Outlet />
      </main>
      <MainFooter />
      <Chatbot />
    </QuoteProvider>
  );
}
