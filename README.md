# THAMES-Hard

Thames Hardware – Official Website (React + Vite + Express AI Chatbot)


Static, SEO-ready showcase & enquiry website. Pages: Home, Products (+6 category pages), About, Become a Dealer, Catalogue, Contact.

## Run
```bash
npm install
cp .env.example .env     # fill values
npm run dev              # local
npm run build            # outputs /dist (upload anywhere)
```

## Before launch – edit these
| What | Where |
|---|---|
| Phone, WhatsApp, emails, address, social links | `src/config.js` |
| Products, specs, sizes, finishes | `src/data/products.js` (**sample specs – verify**) |
| Product photos | put in `public/images/`, set `image: '/images/x.webp'` per product |
| Logo | `src/components/ui.jsx` → `Logo` (swap for `<img src="/logo.svg">`), also `public/favicon.svg` |
| Catalogue PDF | replace `public/catalogue/Thames-Hardware-Catalogue.pdf`; category PDFs: `public/catalogue/<category-slug>.pdf` |
| Domain | `.env` `VITE_SITE_URL`, plus `public/sitemap.xml` and `public/robots.txt` |
| Google Analytics 4 | `.env` `VITE_GA_ID` |
| Page copy / claims | `src/pages/*.jsx` (About & Home claims are draft – client to approve) |

## Enquiry forms (spam-protected)
Uses [Web3Forms](https://web3forms.com) (free, no backend). Create two access keys – one with the dealer email, one with the general email – and put them in `.env` (`VITE_DEALER_FORM_KEY`, `VITE_CONTACT_FORM_KEY`). Spam protection: honeypot + minimum-fill-time; enable Web3Forms hCaptcha for extra safety. Without keys, forms fall back to opening the user's email app (dev only).

## Deploy (HTTPS)
Netlify / Vercel / Cloudflare Pages: build `npm run build`, publish `dist`. SPA rewrites are included (`public/_redirects`, `vercel.json`); HTTPS is automatic. Then add the site to Google Search Console and submit `/sitemap.xml`.

## Still needed from client
Official logo, product photos, approved specs/claims, catalogue PDF, WhatsApp number, address, dealer email, social links, privacy policy text (add a `/privacy-policy` page and link in footer).
