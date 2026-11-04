import { services } from './services';

// The Google Business Profile listing for the Kirti Nagar office (named "ARMEDIAS" on Google)
const googleListing = 'https://www.google.com/maps?cid=17702723482862989545';

export const site = {
  name: 'AR Medias',
  // Other spellings people search for, so search engines connect them to this site
  alternateNames: ['ARMedias', 'Armedias', 'AR Medias IT Company'],
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
  gstin: '07BASPY7603N2ZN',
  phone: '+91 77018 97557',
  phoneE164: '+917701897557',
  // Every WhatsApp link goes through this redirect, so the destination can be changed in
  // /admin/ without rebuilding. The default applies until a link is saved there.
  whatsapp: '/api/whatsapp/',
  whatsappDefault: 'https://wa.me/917701897557',
  address: {
    street: 'N-48, 1st Floor, Scooter Market, Kirti Nagar',
    locality: 'New Delhi',
    region: 'Delhi',
    postalCode: '110015',
    country: 'IN',
    countryName: 'India',
  },
  tagline: 'Software, apps, CRM/ERP and AI automation for growing businesses.',
  sameAs: ['https://in.linkedin.com/in/aryan-yadav-9b954a2a6', googleListing],
};

// Google Maps links for the office. Directions open the listing itself (by its place ID),
// falling back to a search for the name and address.
const mapsQuery = encodeURIComponent(`${site.name}, ${site.address.street}, ${site.address.locality}, ${site.address.countryName}`);
export const maps = {
  listing: googleListing,
  directions: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}&query_place_id=ChIJGfhFKwjw3g0R6bAD8Ta1rPU`,
  embed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
};

// Each market gets its own /locations/<slug>/ page. These are distinct pages, not
// translations, so they carry no hreflang; market-specific fields (local needs,
// integrations, FAQ, privacy law, currency) keep each one unique. `cities` are the
// tier-1 cities buyers in that market pair with our services in search.
export const markets = [
  { slug: 'india', needs: ["GST-ready invoicing and e-way bills", "WhatsApp-first customer journeys", "Tally and Zoho Books sync", "UPI and Razorpay payments"], integrations: ["Razorpay", "UPI", "Paytm", "Tally", "Zoho", "WhatsApp Business API", "Shiprocket", "GST e-invoicing"], faq: {"q": "Can we meet in person in Delhi NCR?", "a": "Yes. Our office is in Kirti Nagar, New Delhi, and we regularly meet clients across Delhi NCR for discovery workshops and handovers."}, area: 'Delhi NCR and pan-India', intro: 'Same time zone, in-person meetings in Delhi NCR, GST invoicing and INR pricing. We build for Indian startups, SMEs and enterprises, including Tally, Razorpay, WhatsApp Business and UPI integrations.', country: 'India', schemaName: 'India', city: 'New Delhi', code: 'IN', tz: 'Asia/Kolkata', coords: [77.21, 28.61] as [number, number], cities: [{ name: 'Delhi NCR', tz: 'Asia/Kolkata' }, { name: 'Mumbai', tz: 'Asia/Kolkata' }, { name: 'Bengaluru', tz: 'Asia/Kolkata' }, { name: 'Hyderabad', tz: 'Asia/Kolkata' }, { name: 'Chennai', tz: 'Asia/Kolkata' }, { name: 'Pune', tz: 'Asia/Kolkata' }, { name: 'Kolkata', tz: 'Asia/Kolkata' }, { name: 'Ahmedabad', tz: 'Asia/Kolkata' }], currency: 'INR', privacyLaw: 'Digital Personal Data Protection Act 2023' },
  { slug: 'uae', titlePlace: 'Dubai, UAE', needs: ["English and Arabic (RTL) interfaces", "VAT-compliant invoicing", "WhatsApp lead handling for real estate and retail", "Local payment gateways and buy-now-pay-later"], integrations: ["Telr", "PayTabs", "Network International", "Tabby", "Tamara", "WhatsApp Business API", "Zoho", "Odoo"], faq: {"q": "Do you build Arabic websites and apps?", "a": "Yes. We design bilingual English and Arabic interfaces with full right-to-left layouts, so Arabic users get a natural experience."}, area: 'Dubai, Abu Dhabi and Sharjah', intro: 'Only 1.5 hours behind Dubai, so your working day is ours too. We build bilingual English/Arabic websites and apps, CRM and ERP systems with VAT-ready invoicing, and WhatsApp automation that Gulf customers expect.', country: 'UAE', schemaName: 'United Arab Emirates', city: 'Dubai', code: 'AE', tz: 'Asia/Dubai', coords: [55.27, 25.2] as [number, number], cities: [{ name: 'Dubai', tz: 'Asia/Dubai' }, { name: 'Abu Dhabi', tz: 'Asia/Dubai' }, { name: 'Sharjah', tz: 'Asia/Dubai' }], currency: 'AED', privacyLaw: 'UAE Personal Data Protection Law (PDPL)' },
  { slug: 'usa', needs: ["Fast-moving MVPs for startups", "Integrations with US SaaS tools", "Accessibility (ADA/WCAG) friendly builds", "Stripe billing and subscriptions"], integrations: ["Stripe", "QuickBooks", "Salesforce", "HubSpot", "Shopify", "Twilio", "Zapier", "AWS"], faq: {"q": "How do you work with US time zones?", "a": "We overlap with US mornings for calls and stand-ups, and progress continues overnight, so you often wake up to finished work."}, area: 'New York, California, Texas and nationwide', intro: 'Overlap with US mornings for daily calls, US-standard contracts and USD billing. Agency-quality websites, SaaS products, CRMs and AI automation at a cost that leaves room in your budget for growth.', country: 'USA', schemaName: 'United States', city: 'New York', code: 'US', tz: 'America/New_York', coords: [-74.01, 40.71] as [number, number], cities: [{ name: 'New York', tz: 'America/New_York' }, { name: 'Chicago', tz: 'America/Chicago' }, { name: 'Dallas', tz: 'America/Chicago' }, { name: 'Houston', tz: 'America/Chicago' }, { name: 'Austin', tz: 'America/Chicago' }, { name: 'Los Angeles', tz: 'America/Los_Angeles' }, { name: 'San Francisco', tz: 'America/Los_Angeles' }, { name: 'Miami', tz: 'America/New_York' }], currency: 'USD', privacyLaw: 'CCPA/CPRA and state privacy laws' },
  { slug: 'canada', needs: ["Bilingual English and French content", "PIPEDA-aware data handling", "Integrations with Canadian payments and accounting", "SaaS and e-commerce builds for SMEs"], integrations: ["Stripe", "Moneris", "Interac", "QuickBooks", "Shopify", "HubSpot", "Twilio", "AWS"], faq: {"q": "Can you build English and French versions?", "a": "Yes. We can build bilingual sites and apps with English and French content and language switching."}, area: 'Toronto, Vancouver, Calgary and Montreal', intro: 'Morning overlap with Eastern and Pacific time, CAD billing and PIPEDA-aware data handling. We build websites, apps and custom software for Canadian startups and growing SMEs.', country: 'Canada', schemaName: 'Canada', city: 'Toronto', code: 'CA', tz: 'America/Toronto', coords: [-79.38, 43.65] as [number, number], cities: [{ name: 'Toronto', tz: 'America/Toronto' }, { name: 'Montreal', tz: 'America/Toronto' }, { name: 'Calgary', tz: 'America/Edmonton' }, { name: 'Vancouver', tz: 'America/Vancouver' }], currency: 'CAD', privacyLaw: 'PIPEDA' },
  { slug: 'australia', needs: ["Xero and MYOB accounting sync", "Buy-now-pay-later at checkout", "Privacy Act-aware data handling", "Overnight turnaround on feedback"], integrations: ["Xero", "MYOB", "Stripe", "Afterpay", "Zip", "Shopify", "HubSpot", "Twilio"], faq: {"q": "Do you integrate with Xero or MYOB?", "a": "Yes. We sync invoices, payments and contacts between your website, CRM or ERP and Xero or MYOB."}, area: 'Sydney, Melbourne, Brisbane and Perth', intro: 'Your afternoon is our working day, so feedback is turned around overnight. AUD billing, Privacy Act-aware builds, and integrations with Xero, MYOB and Shopify.', country: 'Australia', schemaName: 'Australia', city: 'Sydney', code: 'AU', tz: 'Australia/Sydney', coords: [151.21, -33.87] as [number, number], cities: [{ name: 'Sydney', tz: 'Australia/Sydney' }, { name: 'Melbourne', tz: 'Australia/Melbourne' }, { name: 'Brisbane', tz: 'Australia/Brisbane' }, { name: 'Perth', tz: 'Australia/Perth' }], currency: 'AUD', privacyLaw: 'Privacy Act 1988 (APPs)' },
  { slug: 'japan', needs: ["Japanese-language interfaces", "Detailed written specifications and QA", "LINE messaging integration", "Japanese payment methods"], integrations: ["Stripe", "PayPay", "LINE", "Shopify", "Salesforce", "AWS", "Google Workspace", "Slack"], faq: {"q": "Can you deliver Japanese-language websites and apps?", "a": "Yes. We build Japanese-language interfaces and work from detailed written specifications, with careful review at every milestone."}, area: 'Tokyo, Osaka and across Japan', intro: 'Only 3.5 hours apart, with detailed written specifications and careful QA. We build English and Japanese websites, apps and internal systems for Japanese firms and international teams in Japan.', country: 'Japan', schemaName: 'Japan', city: 'Tokyo', code: 'JP', tz: 'Asia/Tokyo', coords: [139.69, 35.68] as [number, number], cities: [{ name: 'Tokyo', tz: 'Asia/Tokyo' }, { name: 'Osaka', tz: 'Asia/Tokyo' }, { name: 'Yokohama', tz: 'Asia/Tokyo' }, { name: 'Fukuoka', tz: 'Asia/Tokyo' }], currency: 'JPY', privacyLaw: 'APPI' },
  { slug: 'china', needs: ["WeChat and Alipay payments", "WeChat Mini Program-ready designs", "Pages that load reliably in mainland China", "Chinese-language content"], integrations: ["WeChat Pay", "Alipay", "WeChat Mini Programs", "Alibaba Cloud", "Baidu Maps", "Shopify", "Salesforce", "Slack"], faq: {"q": "Will our website load properly in mainland China?", "a": "We avoid services that are blocked in mainland China, such as Google Fonts and Google Maps, and can host on Alibaba Cloud for faster access."}, area: 'Shanghai, Shenzhen and Beijing', intro: '2.5 hours apart. We design for China\'s ecosystem: WeChat mini-program-ready interfaces, Alipay/WeChat Pay flows, and sites built to load reliably behind the Great Firewall.', country: 'China', schemaName: 'China', city: 'Shanghai', code: 'CN', tz: 'Asia/Shanghai', coords: [121.47, 31.23] as [number, number], cities: [{ name: 'Shanghai', tz: 'Asia/Shanghai' }, { name: 'Beijing', tz: 'Asia/Shanghai' }, { name: 'Shenzhen', tz: 'Asia/Shanghai' }, { name: 'Guangzhou', tz: 'Asia/Shanghai' }], currency: 'CNY', privacyLaw: 'PIPL' },
  { slug: 'russia', needs: ["Russian-language interfaces in Cyrillic", "Yandex-ready SEO and Yandex Metrica", "Telegram bots and Mini Apps", "Data storage planned around the 152-FZ localization rule"], integrations: ["Telegram Bot API", "Telegram Mini Apps", "Yandex Maps", "Yandex Metrica", "Bitrix24", "amoCRM", "1C", "VK"], faq: {"q": "Can you build Russian-language sites that rank on Yandex?", "a": "Yes. We build Russian-language interfaces in Cyrillic, set up Yandex Webmaster and Metrica, and plan data storage around Russia's personal data localization rule."}, area: 'Moscow, Saint Petersburg and across Russia', intro: 'Only 2.5 hours ahead of Moscow, so most of your working day is ours too. We build Russian and English websites, Telegram bots and Mini Apps, and CRM integrations with Bitrix24 and amoCRM, with data storage planned around 152-FZ.', country: 'Russia', schemaName: 'Russia', city: 'Moscow', code: 'RU', tz: 'Europe/Moscow', coords: [37.62, 55.76] as [number, number], cities: [{ name: 'Moscow', tz: 'Europe/Moscow' }, { name: 'Saint Petersburg', tz: 'Europe/Moscow' }, { name: 'Kazan', tz: 'Europe/Moscow' }, { name: 'Yekaterinburg', tz: 'Asia/Yekaterinburg' }, { name: 'Novosibirsk', tz: 'Asia/Novosibirsk' }], currency: 'USD', privacyLaw: 'Federal Law No. 152-FZ on Personal Data' },
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
  { label: 'Industries', href: '/industries/' },
  { label: 'Work', href: '/work/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Process', href: '/process/' },
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
];

export const tech = [
  'React', 'Next.js', 'Astro', 'Node.js', 'Laravel', 'Python', 'Flutter', 'React Native',
  'Swift', 'Kotlin', 'PostgreSQL', 'MongoDB', 'AWS', 'Firebase', 'OpenAI', 'Claude',
  'n8n', 'Make', 'Shopify', 'WordPress', 'Figma', 'Docker',
];
