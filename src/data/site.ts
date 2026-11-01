import { services } from './services';

export const site = {
  name: 'AR Medias',
  legalName: 'AR Medias',
  url: 'https://armedias.com',
  founded: '2024-01-01',
  projectsDelivered: 200,
  founder: {
    name: 'Aryan Yadav',
    role: 'Founder',
    linkedin: 'https://in.linkedin.com/in/aryan-yadav-9b954a2a6',
  },
  email: 'info@armedias.com',
  phone: '+91 77018 97557',
  phoneE164: '+917701897557',
  whatsapp: 'https://wa.me/917701897557',
  address: {
    street: 'N-48, 1st Floor, Scooter Market, Kirti Nagar',
    locality: 'New Delhi',
    region: 'Delhi',
    country: 'IN',
    countryName: 'India',
  },
  tagline: 'Software, apps, CRM/ERP and AI automation for growing businesses.',
  sameAs: ['https://in.linkedin.com/in/aryan-yadav-9b954a2a6'],
};

// Each market gets its own /locations/<slug>/ page. These are distinct pages, not
// translations, so they carry no hreflang; market-specific fields keep each one unique.
export const markets = [
  { slug: 'india', area: 'Delhi NCR and pan-India', intro: 'Same time zone, in-person meetings in Delhi NCR, GST invoicing and INR pricing. We build for Indian startups, SMEs and enterprises, including Tally, Razorpay, WhatsApp Business and UPI integrations.', country: 'India', schemaName: 'India', city: 'New Delhi', code: 'IN', tz: 'Asia/Kolkata', currency: 'INR', privacyLaw: 'Digital Personal Data Protection Act 2023' },
  { slug: 'uae', area: 'Dubai, Abu Dhabi and Sharjah', intro: 'Only 1.5 hours behind Dubai, so your working day is ours too. We build bilingual English/Arabic websites and apps, CRM and ERP systems with VAT-ready invoicing, and WhatsApp automation that Gulf customers expect.', country: 'UAE', schemaName: 'United Arab Emirates', city: 'Dubai', code: 'AE', tz: 'Asia/Dubai', currency: 'AED', privacyLaw: 'UAE Personal Data Protection Law (PDPL)' },
  { slug: 'usa', area: 'New York, California, Texas and nationwide', intro: 'Overlap with US mornings for daily calls, US-standard contracts and USD billing. Agency-quality websites, SaaS products, CRMs and AI automation at a cost that leaves room in your budget for growth.', country: 'USA', schemaName: 'United States', city: 'New York', code: 'US', tz: 'America/New_York', currency: 'USD', privacyLaw: 'CCPA/CPRA and state privacy laws' },
  { slug: 'canada', area: 'Toronto, Vancouver, Calgary and Montreal', intro: 'Morning overlap with Eastern and Pacific time, CAD billing and PIPEDA-aware data handling. We build websites, apps and custom software for Canadian startups and growing SMEs.', country: 'Canada', schemaName: 'Canada', city: 'Toronto', code: 'CA', tz: 'America/Toronto', currency: 'CAD', privacyLaw: 'PIPEDA' },
  { slug: 'australia', area: 'Sydney, Melbourne, Brisbane and Perth', intro: 'Your afternoon is our working day, so feedback is turned around overnight. AUD billing, Privacy Act-aware builds, and integrations with Xero, MYOB and Shopify.', country: 'Australia', schemaName: 'Australia', city: 'Sydney', code: 'AU', tz: 'Australia/Sydney', currency: 'AUD', privacyLaw: 'Privacy Act 1988 (APPs)' },
  { slug: 'japan', area: 'Tokyo, Osaka and across Japan', intro: 'Only 3.5 hours apart, with detailed written specifications and careful QA. We build English and Japanese websites, apps and internal systems for Japanese firms and international teams in Japan.', country: 'Japan', schemaName: 'Japan', city: 'Tokyo', code: 'JP', tz: 'Asia/Tokyo', currency: 'JPY', privacyLaw: 'APPI' },
  { slug: 'china', area: 'Shanghai, Shenzhen and Beijing', intro: '2.5 hours apart. We design for China\'s ecosystem: WeChat mini-program-ready interfaces, Alipay/WeChat Pay flows, and sites built to load reliably behind the Great Firewall.', country: 'China', schemaName: 'China', city: 'Shanghai', code: 'CN', tz: 'Asia/Shanghai', currency: 'CNY', privacyLaw: 'PIPL' },
];

// Service names and links come from services.ts, which owns each service page.
const pillarDefs = [
  { key: 'build', title: 'Build', lead: 'Websites, web apps and mobile apps that load fast and convert.' },
  { key: 'systems', title: 'Systems', lead: 'Custom CRM, ERP and internal tools shaped around how your team works.' },
  { key: 'ai', title: 'AI & Automation', lead: 'AI agents, chatbots and workflow automation that remove repetitive work.' },
  { key: 'support', title: 'Support & Growth', lead: 'Hosting, maintenance, performance and SEO after launch.' },
] as const;

export const pillars = pillarDefs.map((p) => ({
  ...p,
  items: services.filter((s) => s.pillar === p.key).map((s) => ({ name: s.name, href: `/services/${s.slug}/` })),
}));

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/work/' },
  { label: 'Process', href: '/process/' },
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
];

export const tech = [
  'React', 'Next.js', 'Astro', 'Node.js', 'Laravel', 'Python', 'Flutter', 'React Native',
  'Swift', 'Kotlin', 'PostgreSQL', 'MongoDB', 'AWS', 'Firebase', 'OpenAI', 'Claude',
  'n8n', 'Make', 'Shopify', 'WordPress', 'Figma', 'Docker',
];
