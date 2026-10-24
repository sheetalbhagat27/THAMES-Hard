export const SITE = {
  name: 'Thames Hardware',
  fullName: 'Thames Architectural Hardware',
  parentBrand: 'Thamesply',
  tagline: 'Quality of India · Architectural Hardware',
  subTagline: 'Precision Hydraulic Hinges · Telescopic Channels · Tandem Systems · Fasteners',
  url: import.meta.env.VITE_SITE_URL || 'https://hardware.thamesply.com',
  gaId: import.meta.env.VITE_GA_ID || '',
  dealerFormKey: import.meta.env.VITE_DEALER_FORM_KEY || '',
  contactFormKey: import.meta.env.VITE_CONTACT_FORM_KEY || '',
  phone: '+91-98-99-322-322',
  phoneRaw: '+919899322322',
  whatsapp: '919899322322',
  email: 'info@thamesply.com',
  dealerEmail: 'hardware@thamesply.com',
  address: 'Landaura Mussimble, Kotar Khanna Road, Bamboli, Yamuna Nagar, Haryana',
  hours: 'Mon – Sat, 09:30 – 18:30 IST',
  catalogue: '/catalogue/Thames-Hardware-Master-Catalogue.pdf',
  social: {
    instagram: 'https://instagram.com/thamesply',
    facebook: 'https://facebook.com/thamesply',
    linkedin: 'https://linkedin.com/company/thamesply',
    youtube: 'https://youtube.com/@thamesply',
  },
};

export const wa = (msg) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

export const NAV = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/products', 'Products'],
  ['/contact', 'Contact'],
];

export const MEGA_MENU_CATEGORIES = [
  {
    title: 'Hinges',
    count: 9,
    desc: 'Precision motion, silent close',
    slug: 'hydraulic-hinges',
    icon: 'hinge',
  },
  {
    title: 'Telescopic Channels',
    count: 5,
    desc: 'Smooth-glide drawer systems',
    slug: 'telescopic-drawer-channels',
    icon: 'channel',
  },
  {
    title: 'Tandem Boxes & Baskets',
    count: 4,
    desc: 'Inotech storage systems',
    slug: 'kitchen-drawer-systems',
    icon: 'drawer',
  },
  {
    title: 'Kitchen Accessories',
    count: 23,
    desc: 'Everyday kitchen engineering',
    slug: 'kitchen-accessories',
    icon: 'pot',
  },
  {
    title: 'Aluminium Profiles',
    count: 9,
    desc: 'Kitchen & wardrobe shutters',
    slug: 'aluminium-profiles',
    icon: 'profile',
  },
  {
    title: 'Sliding Systems',
    count: 2,
    desc: 'Heavy-duty wardrobe tracks',
    slug: 'sliding-systems',
    icon: 'sliding',
  },
  {
    title: 'Door Closers',
    count: 6,
    desc: 'Controlled, silent closing',
    slug: 'door-closers',
    icon: 'door',
  },
  {
    title: 'Screws & Fasteners',
    count: 5,
    desc: 'Finished to match your hardware',
    slug: 'screws-and-fasteners',
    icon: 'wrench',
  },
];
