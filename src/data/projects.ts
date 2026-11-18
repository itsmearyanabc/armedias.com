// Portfolio. Add real projects here; the Work page, homepage logo strip and service pages
// read from this list. Only list clients who agreed to be shown. For work under NDA,
// leave `client` empty and describe the business instead (e.g. "Real-estate brokerage").
//
// Images: put screenshots in src/assets/work/ and logos (SVG or PNG) in src/assets/clients/,
// then import them below. Example:
//
//   import acmeShot from '../assets/work/acme-crm.png';
//   import acmeLogo from '../assets/clients/acme.svg';
//   {
//     slug: 'acme-real-estate-crm',
//     client: 'Acme Realty',            // or '' to keep the client anonymous
//     business: 'Real-estate brokerage',
//     country: 'UAE',
//     year: 2025,
//     services: ['crm-development', 'ai-automation'],
//     title: 'A CRM that answers every property enquiry in seconds',
//     summary: 'Custom CRM with WhatsApp lead capture, agent routing and AI replies.',
//     challenge: 'Leads arrived from portals, WhatsApp and calls, and many were never followed up.',
//     solution: 'One pipeline for every lead source, automatic assignment and AI first replies.',
//     results: ['Every enquiry logged automatically', 'Replies in under a minute'],
//     tech: ['Laravel', 'React', 'WhatsApp Business API', 'OpenAI'],
//     url: 'https://example.com',
//     image: acmeShot,
//     logo: acmeLogo,
//   },
import type { ImageMetadata } from 'astro';
import type { CaseScene } from '../components/CaseVisual.astro';

export interface Project {
  slug: string;
  client: string;
  business: string;
  country: string;
  year: number;
  services: string[]; // slugs from services.ts
  title: string;
  /** Search-result description, 110-160 characters. */
  metaDescription?: string;
  summary: string;
  /** The real-world market need this answers, in plain words. No invented statistics. */
  need: string;
  challenge: string;
  solution: string;
  /** What was delivered and checked. Only facts from the build; never invented metrics. */
  results: string[];
  tech: string[];
  url?: string;
  image?: ImageMetadata;
  logo?: ImageMetadata;
  /** Interactive scene shown instead of a screenshot. */
  scene?: CaseScene;
  /** Main features, shown as a list. */
  features?: string[];
}

// Case studies of products built by AR Medias, written from each project's own source and
// documentation. Client businesses are described, not named, until they approve being shown.
export const projects: Project[] = [
  {
    slug: 'attendance-payroll-saas',
    metaDescription: 'Case study: an attendance and payroll SaaS by AR Medias, with camera and GPS punch-in and payroll run from frozen, auditable attendance records.',
    client: '',
    business: 'AR Medias product · Workforce SaaS',
    country: 'India',
    year: 2026,
    services: ['custom-software-development', 'mobile-app-development'],
    title: 'Attendance and payroll that staff cannot fake',
    summary: 'A multi-company attendance and payroll platform: staff punch in from their phone with a live camera check and GPS, and payroll runs from attendance that can no longer change.',
    need: 'Many small and mid-sized companies still track attendance on paper registers, shared spreadsheets or WhatsApp messages. That makes proxy punching easy, late marks get argued over at month-end, and payroll is recalculated by hand each time a record changes. Owners need attendance they can trust and payroll that adds up the same way every time, without buying biometric machines for every site.',
    challenge: 'Build one platform that many companies can sign up to on their own, where each company sees only its own staff, employees punch in from any phone without installing an app from a store, and payroll can be audited line by line.',
    solution: 'Employees use an installable web app that checks a live camera image and their GPS location when they punch in. Company admins set up their workforce, attendance policy and salary structures. When a month closes, attendance is frozen and payroll is calculated from that frozen record into a salary ledger. One admin prepares a payroll run and a different admin approves it, and an approved run can only be reversed or supplemented, never edited.',
    features: [
      'Punch-in with a live camera check and GPS location',
      'Installs from the browser as an app, with no app store listing needed',
      'Many companies on one platform, each fully separated from the others',
      'Workforce, attendance policy and salary structures set per company',
      'Payroll calculated from a frozen attendance record into a salary ledger',
      'Maker and approver kept separate for every payroll run',
    ],
    results: [
      'Every attendance and payroll decision checked again on the server',
      'Approved payroll can never be edited, only reversed or supplemented',
      'Amounts calculated as exact decimals, never rounded floats',
      'Work dates follow each company’s own time zone',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'PWA'],
    scene: 'punch',
  },
  {
    slug: 'ai-legal-research-assistant',
    metaDescription: 'Case study: an AI legal assistant on WhatsApp and the web for Indian advocates, with IPC to BNS mapping and every citation checked before sending.',
    client: '',
    business: 'Legal-tech product for Indian advocates',
    country: 'India',
    year: 2026,
    services: ['ai-machine-learning', 'ai-automation', 'custom-software-development'],
    title: 'An AI legal assistant that never invents a citation',
    summary: 'AI legal research for Indian advocates on WhatsApp and the web: questions in English, Hindi or Hinglish, answered with precedents, IPC to BNS mappings and case status, with every citation checked before it is sent.',
    need: 'Advocates spend hours searching precedents and, since the new criminal laws replaced the IPC, keep mapping old sections to the Bharatiya Nyaya Sanhita. General AI chatbots can invent case citations, and an advocate who repeats a made-up citation in court has a serious professional problem. Lawyers need fast research in the language they actually think in, on the phone they already use, with answers they can rely on.',
    challenge: 'Answer legal questions quickly on WhatsApp, where Meta expects every message to be acknowledged within moments, and on the web, while making it impossible for a fabricated citation to reach the advocate.',
    solution: 'One answering pipeline serves both WhatsApp and the web app. WhatsApp messages are verified, de-duplicated and queued so Meta gets an instant acknowledgement, while web questions are answered live with progress shown. Questions are routed by intent: legal research goes through hybrid search that combines meaning-based and keyword search over the legal library, and case-status questions go to an eCourts lookup by CNR number. Before any answer is sent, every case citation and section number in it is checked against the database. Anything that cannot be verified is removed and marked as unverified, and the advocate is told.',
    features: [
      'Works on WhatsApp and in a web app, from one pipeline',
      'Questions in English, Hindi or Hinglish',
      'IPC to BNS section mapping',
      'Case status by CNR number through eCourts',
      'Hybrid search: meaning-based and keyword search combined',
      'Citation guardrail that strikes anything not in the database',
      'Credit-based usage, refunded when an answer cannot be given',
    ],
    results: [
      '523 automated tests passing',
      'Web app verified end to end, from sign-up to a live answer',
      'Every citation checked against the database before sending',
      'Features not yet switched on say so plainly, instead of pretending',
    ],
    tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'pgvector', 'Supabase', 'WhatsApp Cloud API', 'Railway'],
    scene: 'chat',
  },
  {
    slug: 'ivr-broadcast-order-portal',
    metaDescription: 'Case study: customer and admin portals for an IVR broadcast business, with campaign orders, a prepaid wallet, an urgent queue and activity logs.',
    client: '',
    business: 'IVR and voice broadcast service provider',
    country: 'India',
    year: 2026,
    services: ['custom-software-development', 'ui-ux-design'],
    title: 'A self-service portal for voice broadcast orders',
    summary: 'Customer and admin portals for an IVR broadcast business: customers submit campaigns and top up a prepaid wallet, and the team works through a live order queue.',
    need: 'Businesses use recorded voice calls for offers, payment reminders and event invitations, and the companies that run these campaigns often take orders over WhatsApp and email and track customer balances by hand. Orders get missed, balances get disputed and customers keep asking for status. Providers need customers to place and track orders themselves, with every payment and approval on record.',
    challenge: 'Give customers a clear place to submit campaigns, add funds and follow progress, and give the provider’s team one command centre for approvals, urgent orders and support, all on desktop, tablet and phone.',
    solution: 'Customers get a dashboard with campaign metrics, a searchable history of every broadcast with status badges, an activity feed and a step-by-step campaign submission flow. Payments go into a prepaid wallet, and every top-up is approved or rejected by the team. The admin command centre shows live workload, an urgent order queue, customer and support operations and the processing pipeline. Every action is written to an activity log that cannot be edited.',
    features: [
      'Customer dashboard with campaign metrics and broadcast history',
      'Step-by-step campaign submission',
      'Prepaid wallet with approved or rejected top-ups',
      'Admin command centre with an urgent order queue',
      'Categories and services managed by the team',
      'Support tickets and messages',
      'Activity log of every action',
      'Responsive on desktop, tablet and mobile',
    ],
    results: [
      'Customers can place and track orders themselves',
      'Every wallet top-up approved or rejected on record',
      'One queue for urgent and routine orders',
      'Database designed in third normal form for clean reporting',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Render', 'Docker'],
    scene: 'queue',
  },
  {
    slug: 'glass-recycling-company-website',
    metaDescription: 'Case study: a bespoke WordPress theme for a Delhi glass recycling company, hand-built with no page builder and about 20 KB of JavaScript.',
    client: '',
    business: 'Glass cullet recycling company, Delhi (since 1996)',
    country: 'India',
    year: 2026,
    services: ['website-development', 'ui-ux-design'],
    title: 'A fast, hand-built website for a heritage recycling business',
    summary: 'A bespoke WordPress theme for a Delhi glass cullet collection, sorting, processing and recycling company that supplies across India: no page builder, no CSS framework and no JavaScript libraries.',
    need: 'Established industrial suppliers often have decades of trust with buyers but little to show for it online, or a slow template site that buries what they actually do. Buyers often look at a supplier’s website before they pick up the phone. A recycling business needs a site that explains its process clearly, loads quickly on any connection and turns visits into enquiries, while staying easy for its own team to update in WordPress.',
    challenge: 'Tell the story of a company running since 1996 and explain how recovered glass becomes usable cullet, in a site that is quick, accessible and simple to set up and edit, without the weight of page builders or frameworks.',
    solution: 'We designed and built a custom WordPress theme from scratch. Every page is a template in the theme, so it looks exactly like the approved design the moment it is activated, and a single admin button creates the pages and menus. The homepage walks through the company’s heritage, its four-stage process from collection to supply, its products, its sustainability work and an enquiry form that validates, stores and emails each enquiry. SEO titles, meta tags, canonical links and business structured data are built in, fonts are self-hosted, and images are served as AVIF or WebP when available.',
    features: [
      'Custom WordPress theme with no page builder or CSS framework',
      'About 20 KB of JavaScript for navigation, reveals, counters and the process section',
      'One-click setup that creates every page and menu',
      'Enquiry form with validation, storage and email',
      'Built-in SEO tags and Organization and LocalBusiness structured data',
      'Self-hosted fonts and AVIF or WebP images',
      'Colour contrast checked against accessibility guidelines',
    ],
    results: [
      'Looks exactly like the approved design from the first activation',
      'No page builder or plugin needed to edit the pages',
      'A missing photo shows a labelled placeholder, never a broken image',
      'A shareable staging copy that is hidden from search engines',
    ],
    tech: ['WordPress', 'PHP', 'CSS', 'JavaScript', 'Docker', 'Render'],
    scene: 'recycle',
  },
  {
    slug: 'luxury-real-estate-website',
    metaDescription: 'Case study: a monochrome, fast single-page website for a real estate and private wealth firm, built on typography, space and restrained motion.',
    client: '',
    business: 'Real estate, developments and private wealth firm',
    country: 'India',
    year: 2026,
    services: ['website-development', 'ui-ux-design'],
    title: 'Quiet luxury for a real estate and private wealth brand',
    summary: 'A monochrome, single-page website for a firm working across estates, developments and private wealth, where typography, space and restrained motion do the work of decoration.',
    need: 'High-value property buyers and investors judge a firm on presentation long before a first meeting. Many real estate websites rely on loud banners, stock templates and pop-ups that undercut a premium brand. A firm in this space needs a site that feels considered and calm, loads fast on any device and makes it easy to start a private conversation.',
    challenge: 'Express a “quiet luxury” brief with restraint rather than ornament, reproduce a hand-drawn wordmark exactly in every browser, and give mobile, tablet and desktop each their own composition instead of a squeezed desktop layout.',
    solution: 'We built the site on three rules: monochrome only, with every photograph graded to the same tone; typography as the layout, with no boxes, shadows or fills; and generous space as a material in itself. The wordmark was traced from the supplied artwork into lightweight vector outlines, so it renders identically everywhere with no web font dependency. The header measures the section beneath it and inverts itself, the three business pillars invert on hover or keyboard focus, and motion is limited to three gentle gestures that switch off for visitors who prefer reduced motion. A floating WhatsApp button appears once the reader leaves the opening section and steps aside over the footer.',
    features: [
      'Single-page site, statically prerendered for speed',
      'Hand-traced wordmark as vector outlines, about 2.4 KB',
      'Header that adapts to light and dark sections',
      'Business pillars that invert on hover and keyboard focus',
      'Separate layouts for mobile, tablet and desktop',
      'Floating WhatsApp button that appears at the right moment',
      'All copy kept in one file for easy editing',
    ],
    results: [
      'No horizontal scrolling from 320 px to 2560 px wide',
      'All text contrast checked at 4.5:1 or better',
      'Motion respects the visitor’s reduced-motion setting',
      'The same brand outlines generate the favicon and share image',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    scene: 'luxury',
  },
  {
    slug: 'ai-whatsapp-instagram-automation',
    metaDescription: 'Case study: instant WhatsApp greetings for website leads and AI-run Instagram DM conversations, added alongside an existing PHP website.',
    client: '',
    business: 'Service business with a PHP website',
    country: 'India',
    year: 2026,
    services: ['ai-automation', 'ai-machine-learning'],
    title: 'Instant WhatsApp greetings and AI replies on Instagram',
    summary: 'An automation service that greets every website lead on WhatsApp within seconds and lets AI hold Instagram DM conversations, added alongside an existing PHP website without rebuilding it.',
    need: 'Customers expect a reply in minutes, not the next working day, and many enquiries arrive outside office hours. Small teams cannot watch a website inbox, WhatsApp and Instagram all day, so leads go cold. Businesses need instant first replies and round-the-clock answers on the channels customers already use, without replacing the website they already have.',
    challenge: 'Connect a working PHP and MySQL website to WhatsApp and Instagram, follow Meta’s rules on who can be messaged and when, keep the AI from talking over the team’s own WhatsApp conversations, and make credential problems easy to diagnose.',
    solution: 'When a visitor submits the website’s contact form, the site saves the lead as before and notifies the new service, which stores the lead and sends an approved WhatsApp greeting template, as Meta requires for a first message. The ongoing WhatsApp conversation stays with the business’s own team, while incoming messages are still logged in the admin panel. On Instagram, the AI handles the entire DM conversation using Google Gemini. A “Run checks” button asks Google and Meta whether each credential works right now and reports the exact error and the fix.',
    features: [
      'Website form leads greeted on WhatsApp with an approved template',
      'AI conversations on Instagram DMs using Google Gemini',
      'AI replies on WhatsApp available as a switch, off by default',
      'All incoming WhatsApp messages logged in the admin panel',
      'One-click “Run checks” for live credential diagnosis',
      'Works alongside the existing PHP and MySQL website',
    ],
    results: [
      'Every website lead gets a WhatsApp greeting automatically',
      'Instagram enquiries answered at any hour',
      'Built within Meta’s 24-hour messaging rules',
      'Runs around the clock on low-cost hosting',
    ],
    tech: ['Node.js', 'TypeScript', 'Google Gemini', 'WhatsApp Cloud API', 'Instagram Messaging API', 'PHP', 'MySQL', 'Render'],
    scene: 'flow',
  },
  {
    slug: 'digital-product-passport-blockchain',
    metaDescription: 'Case study: digital product passports with a hash-linked history anchored on a blockchain, so anyone can verify a product by scanning its QR.',
    client: '',
    business: 'AR Medias product · Supply-chain SaaS',
    country: 'India',
    year: 2026,
    services: ['blockchain-development', 'custom-software-development'],
    title: 'Digital product passports anyone can verify with a scan',
    summary: 'A multi-company platform that gives every product a digital passport and a tamper-evident history anchored on a blockchain, so a customer can confirm a product is genuine by scanning its QR code.',
    need: 'Counterfeit goods, grey-market resale and slow recalls cost brands money and customer trust, and many buyers want proof of where a product came from. Paper certificates and printed labels are easy to copy. Manufacturers and distributors need a product identity that cannot be quietly edited, that partners along the supply chain can update, and that a customer can check in seconds.',
    challenge: 'Make every step in a product’s life impossible to alter without detection, prove it independently on a blockchain, and still give brands everyday tools for inventory, shipments and recalls.',
    solution: 'Each product or batch gets a digital passport. Every lifecycle event, from manufacture to shipment and receipt, is linked to the one before it with a SHA-256 hash, so edits, deletions or re-hashing are detected. Identities, events and recall statuses are anchored on an EVM blockchain and verified by reading the chain back; if the chain is unavailable, the status shows as pending rather than being faked. Custody moves between companies only when both sides confirm. On top sit trust scores, incident handling, recalls that quarantine stock across every holder, counterfeit and cloned-QR detection, and an inventory layer with warehouses, an append-only stock ledger and shipments between companies.',
    features: [
      'Digital product passport with a QR code for every product or batch',
      'Hash-linked event chain that reveals any edit or deletion',
      'Proofs anchored on an EVM blockchain and read back to verify',
      'Two-party custody transfers between supply-chain partners',
      'Counterfeit, identity-collision and cloned-QR detection',
      'Recalls that quarantine stock wherever it is held',
      'Inventory with warehouses, a stock ledger and shipments',
      'Admin console, company panel and public verification page',
    ],
    results: [
      '82 automated tests run against a real database and a real chain',
      'Records enforced as unchangeable by the database itself',
      'Never shows a proof as verified unless the chain confirms it',
      'Ready to deploy with Docker, nginx and Cloudflare',
    ],
    tech: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Supabase', 'Solidity', 'EVM', 'Docker'],
    scene: 'passport',
  },
  {
    slug: 'gps-territory-running-game',
    metaDescription: 'Case study: a Flutter running game for iPhone and Android where players capture hexagon territories on a live map by running through them.',
    client: '',
    business: 'AR Medias product · Fitness game app',
    country: 'India',
    year: 2026,
    services: ['mobile-app-development', 'ui-ux-design'],
    title: 'A running game where your city becomes the board',
    summary: 'A location-based mobile game for iPhone and Android: players capture hexagonal territories on a real map by running through them, and compete on XP and territory.',
    need: 'Many people who take up running find that tracking distance alone gets repetitive. Fitness apps that add a game, a goal on the map and friendly competition give people a reason to go out again tomorrow. Founders building in this space need an app that tracks real movement accurately, makes the map feel alive and keeps scores fair.',
    challenge: 'Turn real-world GPS runs into a fair territory game on a live map, keep the map responsive while tracking location, and work on both iPhone and Android from one codebase.',
    solution: 'We built the app in Flutter so one codebase serves iPhone and Android. The world is divided into hexagonal cells using Uber’s H3 geospatial index and drawn as an overlay on an interactive Mapbox map. During a run the app tracks GPS in real time, and every hex the player passes through is claimed as their territory. Players earn XP, climb a leaderboard by XP and territory count, and follow their level and run history on their profile. Firebase handles sign-in, the game data and server-side functions, with security rules guarding the database.',
    features: [
      'Interactive Mapbox map with a hexagon territory overlay',
      'H3 hexagon grid for consistent cells anywhere in the world',
      'Real-time GPS tracking during runs',
      'Territory captured by running through hexes',
      'Leaderboard by XP and territory count',
      'Profile with level, stats and run history',
    ],
    results: [
      'One Flutter codebase for iPhone and Android',
      'Game logic organised by feature for easy growth',
      'Database protected by Firestore security rules',
      'Server-side logic in Firebase Cloud Functions',
    ],
    tech: ['Flutter', 'Dart', 'Riverpod', 'Mapbox', 'H3', 'Firebase', 'Cloud Functions'],
    scene: 'hex',
  },
  {
    slug: 'certificate-verification-portal',
    metaDescription: 'Case study: an internship certificate portal with permanent QR codes, collision-free codes and an authenticity score anyone can check.',
    client: '',
    business: 'AR Medias internal platform',
    country: 'India',
    year: 2026,
    services: ['custom-software-development', 'website-development'],
    title: 'Internship certificates anyone can verify in seconds',
    summary: 'A public verification portal and issuing console for internship certificates: every certificate carries a permanent QR code and a unique code that resolves to one credential page, checked against the issuing register.',
    need: 'Fake certificates and edited PDFs are easy to make, and employers, recruiters and colleges often have no quick way to check that an internship really happened. Phoning or emailing the issuer takes days. Organisations that issue certificates need a way for anyone to confirm one instantly, without an account, while the issuer keeps full control of the register.',
    challenge: 'Issue certificate codes that can never collide or change, make each one resolve permanently to a verification page, and show more than a bare “verified” stamp so a checker can see why a certificate is genuine.',
    solution: 'Administrators create an intern and their project in a secure console. The next code in the form ARM-INT-YY-XXXXXX is allocated by atomically incrementing a per-year counter inside a database transaction, so two certificates issued at the same moment never collide, and the code and QR target are never regenerated. Each certificate page runs five weighted checks against the stored record, never against what the visitor typed, and shows a Certificate Authenticity Score. A code that does not exist goes straight to a “Certificate not found” page.',
    features: [
      'Public verification by QR code or certificate code, with no account needed',
      'Collision-free code allocation inside a database transaction',
      'Permanent QR codes that are never regenerated',
      'Certificate Authenticity Score from five weighted checks',
      'Admin console to issue and manage certificates',
      'Row-level security on the database, with files in Supabase Storage',
    ],
    results: [
      'Forged codes fail every check, because no record exists',
      'Revoked or expired certificates show their true status',
      'Checks run against the register, never the visitor’s input',
      'Admin sign-in with hashed passwords and secure session cookies',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    scene: 'certificate',
  },
];

