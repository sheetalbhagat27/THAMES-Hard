import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './ui';
import { MEGA_MENU_CATEGORIES } from '../config';

export default function MegaMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="mega-menu-wrapper" onMouseLeave={onClose}>
      <div className="mega-menu-container">
        <div className="mega-menu-grid">
          {/* 8 Category Items in 4 columns x 2 rows */}
          <div className="mega-categories-col">
            {MEGA_MENU_CATEGORIES.map((cat) => (
              <Link
                key={cat.title}
                to={`/products/${cat.slug}`}
                className="mega-category-item"
                onClick={onClose}
              >
                <div className="mega-cat-icon">
                  <Icon n={cat.icon} s={20} />
                </div>
                <div className="mega-cat-text">
                  <div className="mega-cat-header">
                    <span className="mega-cat-title">{cat.title}</span>
                    <span className="mega-cat-count">{cat.count}</span>
                  </div>
                  <span className="mega-cat-desc">{cat.desc}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Featured Card */}
          <div className="mega-featured-col">
            <Link to="/products" className="mega-featured-card" onClick={onClose}>
              <div className="mega-featured-img">
                <img
                  src="/images/tandem-drawer.jpg"
                  alt="Thames Hardware full catalogue"
                />
                <span className="mega-featured-pill">Available Sizes</span>
              </div>
              <div className="mega-featured-overlay">
                <span className="mega-featured-eyebrow">FULL CATALOGUE</span>
                <h4 className="mega-featured-heading">37 products, one standard.</h4>
                <span className="mega-featured-link">
                  Explore all <Icon n="external" s={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
