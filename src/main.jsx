import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SITE } from './config';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Category from './pages/Category';
import About from './pages/About';
import Dealer from './pages/Dealer';
import Catalogue from './pages/Catalogue';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './styles.css';

if (SITE.gaId) { // Google Analytics 4
  const s = document.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`; document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date()); window.gtag('config', SITE.gaId, { send_page_view: false });
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:slug" element={<Category />} />
      <Route path="about" element={<About />} />
      <Route path="become-a-dealer" element={<Dealer />} />
      <Route path="catalogue" element={<Catalogue />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes></BrowserRouter></React.StrictMode>
);
