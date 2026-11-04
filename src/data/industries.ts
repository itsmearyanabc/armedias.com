// One entry per /industries/<slug>/ page. Each lists real problems in that sector and the
// systems we build for them, linking to the matching service pages.
export interface Industry {
  slug: string;
  name: string;
  scene: 'crm-development' | 'erp-development' | 'ai-automation' | 'ecommerce-development' | 'custom-software-development'
    | 'blockchain-development' | 'cybersecurity' | 'ai-machine-learning';
  metaTitle: string;
  metaDescription: string;
  headline: string; // big hero line; the page's H1 is the industry name
  lead: string;
  challenges: { t: string; d: string }[];
  builds: { t: string; d: string }[];
  tools: string[];
  services: string[];
  faqs: { q: string; a: string }[];
}

export const industries: Industry[] = [
  {
    slug: 'real-estate',
    name: 'Real Estate',
    scene: 'crm-development',
    metaTitle: 'Real Estate CRM, Websites & Lead Automation | AR Medias',
    metaDescription: 'Real estate CRM, property websites, WhatsApp lead automation and portal integrations for brokerages and builders in India, UAE and worldwide.',
    headline: 'Software that turns property enquiries into site visits.',
    lead: 'CRMs, property websites and WhatsApp automation for brokerages, builders and property managers, so no lead from a portal, ad or call is ever missed.',
    challenges: [
      { t: 'Leads from everywhere', d: 'Enquiries arrive from property portals, Facebook ads, WhatsApp, calls and walk-ins, and get lost between agents.' },
      { t: 'Slow follow-up', d: 'Buyers contact several agencies at once. The first to respond usually wins the site visit.' },
      { t: 'No inventory overview', d: 'Units, availability, pricing and bookings live in spreadsheets that are never up to date.' },
      { t: 'Channel partners', d: 'Tracking broker referrals, commissions and duplicate leads is manual and disputed.' },
    ],
    builds: [
      { t: 'Real estate CRM', d: 'Lead capture from portals, ads and WhatsApp, auto-assignment to agents, site-visit scheduling and pipeline tracking.' },
      { t: 'Property websites', d: 'Fast project and listing pages with search, floor plans, enquiry forms and SEO for local searches.' },
      { t: 'WhatsApp automation', d: 'Instant replies with brochures and prices, visit booking and follow-up reminders.' },
      { t: 'Inventory and booking system', d: 'Live unit availability, holds, bookings, payment schedules and channel-partner commissions.' },
    ],
    tools: ['WhatsApp Business API', 'Property portal lead feeds', 'Meta lead ads', 'Google Maps', 'Payment gateways'],
    services: ['crm-development', 'website-development', 'ai-automation'],
    faqs: [
      { q: 'Can leads from property portals go straight into the CRM?', a: 'Yes, wherever the portal offers an API, email alerts or lead export, we pull leads in automatically and tag them by source.' },
      { q: 'Can agents use it on their phones?', a: 'Yes. The CRM works on mobile, and agents can call, WhatsApp and update leads from the field.' },
      { q: 'Do you build for builders as well as brokers?', a: 'Yes. Builders usually need inventory, booking and payment-schedule features; brokers focus on leads, listings and follow-ups.' },
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    scene: 'ai-automation',
    metaTitle: 'Healthcare Software & Clinic Management | AR Medias',
    metaDescription: 'Clinic and hospital management software, appointment booking, patient apps and WhatsApp reminders built with privacy and security in mind.',
    headline: 'Less admin for your clinic, smoother care for patients.',
    lead: 'Appointment booking, clinic management systems, patient apps and automated reminders for clinics, hospitals, labs and healthcare startups.',
    challenges: [
      { t: 'Phone-only bookings', d: 'Reception spends the day answering calls, and patients can\'t book outside opening hours.' },
      { t: 'No-shows', d: 'Missed appointments waste doctor time and revenue.' },
      { t: 'Paper and scattered records', d: 'Patient history, prescriptions and billing sit in different places.' },
      { t: 'Sensitive data', d: 'Patient information needs careful access control and secure storage.' },
    ],
    builds: [
      { t: 'Online appointment booking', d: 'Doctor schedules, slot booking on web and WhatsApp, payments and confirmations.' },
      { t: 'Clinic management system', d: 'Patient records, prescriptions, billing, inventory and staff roles in one place.' },
      { t: 'Automated reminders', d: 'WhatsApp and SMS reminders, follow-up messages and feedback requests.' },
      { t: 'Patient and doctor apps', d: 'Mobile apps for bookings, reports, teleconsultation and notifications.' },
    ],
    tools: ['WhatsApp Business API', 'Video calling SDKs', 'Payment gateways', 'Lab and billing integrations'],
    services: ['custom-software-development', 'mobile-app-development', 'ai-automation'],
    faqs: [
      { q: 'How do you protect patient data?', a: 'Role-based access, encrypted connections, audit logs, regular backups and hosting in the region you choose. We design with your local health-data rules in mind.' },
      { q: 'Can patients book on WhatsApp?', a: 'Yes. Patients can see available slots, book, reschedule and get reminders without calling reception.' },
      { q: 'Can it connect to our existing lab or billing software?', a: 'Usually yes, through an API or data exports. We check this during the free discovery call.' },
    ],
  },
  {
    slug: 'education',
    name: 'Education',
    scene: 'crm-development',
    metaTitle: 'Education CRM, Admissions & LMS Development | AR Medias',
    metaDescription: 'Admissions CRMs, school and coaching management systems, learning platforms and student apps for schools, coaching institutes, universities and edtech.',
    headline: 'From enquiry to enrolment, all in one system.',
    lead: 'Admission CRMs, fee and attendance systems, learning platforms and apps for schools, coaching institutes, universities and edtech startups.',
    challenges: [
      { t: 'Admission leads slip away', d: 'Enquiries from ads, fairs and websites are followed up by hand during the busiest season.' },
      { t: 'Fees and attendance on paper', d: 'Tracking instalments, dues and attendance takes staff hours every week.' },
      { t: 'Parents want updates', d: 'Parents expect results, attendance and notices on their phones.' },
      { t: 'Online learning', d: 'Recorded classes, tests and materials are spread across apps that don\'t talk to each other.' },
    ],
    builds: [
      { t: 'Admissions CRM', d: 'Lead capture, counselling pipeline, follow-up automation and application tracking.' },
      { t: 'School or institute ERP', d: 'Students, fees, instalments, attendance, timetables, results and staff in one system.' },
      { t: 'Learning platform (LMS)', d: 'Courses, video lessons, tests, certificates and progress tracking.' },
      { t: 'Parent and student apps', d: 'Notices, homework, results, fee payments and attendance alerts.' },
    ],
    tools: ['WhatsApp Business API', 'Payment gateways', 'Video hosting', 'Google Workspace', 'Zoom'],
    services: ['crm-development', 'erp-development', 'mobile-app-development'],
    faqs: [
      { q: 'Can parents pay fees online?', a: 'Yes. We connect online payments, send automatic reminders for dues and issue receipts.' },
      { q: 'Do you build learning platforms?', a: 'Yes, from simple course portals to full LMS platforms with tests, certificates and progress tracking.' },
      { q: 'Can admissions counsellors track every enquiry?', a: 'Yes. Every enquiry is captured, assigned and followed up with reminders until it converts or closes.' },
    ],
  },
  {
    slug: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    scene: 'ecommerce-development',
    metaTitle: 'Retail & E-commerce Software, Shopify & POS | AR Medias',
    metaDescription: 'Online stores, Shopify development, inventory and POS integration, order automation and loyalty apps for retailers, D2C brands and distributors.',
    headline: 'Sell more online and in store, with less manual work.',
    lead: 'Online stores, inventory and order systems, POS integrations and customer apps for retailers, D2C brands, wholesalers and distributors.',
    challenges: [
      { t: 'Stock out of sync', d: 'Online store, shop counter and warehouse show different stock levels.' },
      { t: 'Manual order processing', d: 'Every order means copying details into invoices, shipping portals and spreadsheets.' },
      { t: 'Abandoned carts', d: 'Shoppers add items and leave, with no follow-up.' },
      { t: 'Repeat customers', d: 'No easy way to reward loyal customers or bring them back.' },
    ],
    builds: [
      { t: 'Online stores', d: 'Shopify, WooCommerce or custom stores with fast pages, local payments and shipping rules.' },
      { t: 'Inventory and order management', d: 'One stock count across store, website and warehouse, with automatic invoices and shipping labels.' },
      { t: 'Marketing automation', d: 'Abandoned-cart reminders, order updates and offers on WhatsApp and email.' },
      { t: 'B2B ordering portals', d: 'Wholesale catalogues, tiered pricing and repeat ordering for dealers and distributors.' },
    ],
    tools: ['Shopify', 'WooCommerce', 'Payment gateways', 'Shipping aggregators', 'POS and accounting software'],
    services: ['ecommerce-development', 'erp-development', 'ai-automation'],
    faqs: [
      { q: 'Can you connect our shop POS to the online store?', a: 'In most cases yes, so stock and orders stay in sync. We confirm your POS supports it during discovery.' },
      { q: 'Should we use Shopify or a custom store?', a: 'Shopify suits most retailers and launches fastest. Custom makes sense for complex B2B pricing, very large catalogues or unusual workflows.' },
      { q: 'Can order updates go out on WhatsApp?', a: 'Yes. Order confirmations, shipping updates and delivery messages can be sent automatically.' },
    ],
  },
  {
    slug: 'software-companies',
    name: 'Software Companies',
    scene: 'custom-software-development',
    metaTitle: 'Software Development Partner for SaaS Firms | AR Medias',
    metaDescription: 'An extra engineering team for software companies: SaaS products, features, integrations, internal tools and AI automation in your time zone.',
    headline: 'An extra engineering team for software companies.',
    lead: 'We help software and SaaS companies ship faster: building products and features, integrations, internal tools and automations alongside your own team.',
    challenges: [
      { t: 'Roadmap bigger than the team', d: 'Product ideas wait months because engineers are busy maintaining what already exists.' },
      { t: 'Hiring is slow', d: 'Recruiting, onboarding and retaining developers takes time you don\'t have.' },
      { t: 'Integrations pile up', d: 'Customers keep asking for connections to CRMs, payment providers and other tools.' },
      { t: 'Manual internal work', d: 'Support, billing and reporting run on copy-paste and spreadsheets.' },
    ],
    builds: [
      { t: 'SaaS products and MVPs', d: 'From idea to launch: architecture, web and mobile apps, admin panels and billing.' },
      { t: 'Feature development', d: 'Dedicated developers who work in your codebase, tools and sprint process.' },
      { t: 'Integrations and APIs', d: 'Connectors to CRMs, ERPs, payment gateways, messaging and AI platforms.' },
      { t: 'Internal tools and automation', d: 'Admin dashboards, support tooling and AI workflows that remove repetitive work.' },
    ],
    tools: ['GitHub', 'Jira', 'Slack', 'AWS', 'Docker', 'OpenAI', 'Claude'],
    services: ['custom-software-development', 'ai-automation', 'ui-ux-design'],
    faqs: [
      { q: 'Can you work inside our existing codebase?', a: 'Yes. We follow your code standards, pull-request reviews, tools and sprint rituals.' },
      { q: 'Do you sign NDAs and assign IP?', a: 'Yes. We sign an NDA before seeing your product, and all code and IP is assigned to you.' },
      { q: 'How do you handle time zones?', a: 'We overlap with your working hours for stand-ups and reviews, and share progress daily in your tools.' },
    ],
  },
  {
    slug: 'ai-ml',
    name: 'AI & ML Companies',
    scene: 'ai-machine-learning',
    metaTitle: 'Engineering for AI & ML Companies | AR Medias',
    metaDescription: 'Product engineering for AI and ML companies: AI SaaS apps, model APIs, data pipelines, labelling tools, dashboards and MLOps, built with your team.',
    headline: 'The product team behind your AI.',
    lead: 'Your models are only as useful as the product around them. We build the apps, APIs, data pipelines and dashboards that put AI and ML into customers\' hands.',
    challenges: [
      { t: 'Great model, rough product', d: 'Research prototypes need a polished interface, accounts, billing and onboarding to sell.' },
      { t: 'Data plumbing', d: 'Collecting, cleaning and versioning data takes engineers away from model work.' },
      { t: 'Serving at scale', d: 'Getting models into production with low latency, monitoring and cost control is hard.' },
      { t: 'Human review', d: 'Labelling and review tools are needed to keep accuracy high.' },
    ],
    builds: [
      { t: 'AI SaaS products', d: 'Web and mobile apps with auth, billing, usage limits and clean UX around your models.' },
      { t: 'Model APIs and serving', d: 'Scalable inference APIs with queues, caching, logging and cost monitoring.' },
      { t: 'Data pipelines', d: 'Ingestion, cleaning, labelling and dataset versioning workflows.' },
      { t: 'Evaluation dashboards', d: 'Accuracy, drift and usage dashboards for your team and customers.' },
    ],
    tools: ['Python', 'PyTorch', 'OpenAI', 'Claude', 'LangChain', 'AWS', 'Docker', 'Stripe'],
    services: ['ai-machine-learning', 'custom-software-development', 'ui-ux-design'],
    faqs: [
      { q: 'Do you work with our existing models?', a: 'Yes. We wrap, serve and integrate the models you already have, or help train new ones.' },
      { q: 'Can you handle usage-based billing?', a: 'Yes. We build metering, plans, limits and Stripe billing for AI products.' },
      { q: 'Who owns the code and data?', a: 'You do. All code, data and IP are yours, under NDA from the first conversation.' },
    ],
  },
  {
    slug: 'blockchain-web3',
    name: 'Blockchain & Web3',
    scene: 'blockchain-development',
    metaTitle: 'Blockchain & Web3 Development Partner | AR Medias',
    metaDescription: 'Engineering for blockchain and Web3 teams: smart contracts, dApps, wallets, indexers, dashboards and secure backends, fully tested and documented.',
    headline: 'Build Web3 products people can actually use.',
    lead: 'From smart contracts to the apps and dashboards around them, we help Web3 teams ship secure, well-tested products with a user experience that feels familiar.',
    challenges: [
      { t: 'Security first', d: 'Bugs in smart contracts can be irreversible, so every line needs testing and review.' },
      { t: 'Confusing UX', d: 'Wallets, gas and signatures scare off mainstream users.' },
      { t: 'On-chain data', d: 'Reading and indexing blockchain data for apps and analytics takes specialist work.' },
      { t: 'Shipping fast', d: 'Small teams need to move quickly without cutting corners on safety.' },
    ],
    builds: [
      { t: 'Smart contracts', d: 'Tokens, NFTs, staking, escrow and custom logic with full test coverage.' },
      { t: 'dApps', d: 'Web apps with wallet connection, clear transaction flows and mobile support.' },
      { t: 'Indexers and APIs', d: 'Backends that index chain events and serve fast, reliable data to your apps.' },
      { t: 'Admin and analytics', d: 'Dashboards for treasury, users, transactions and on-chain activity.' },
    ],
    tools: ['Solidity', 'Ethereum', 'Polygon', 'Hardhat', 'Foundry', 'ethers.js', 'The Graph', 'IPFS'],
    services: ['blockchain-development', 'cybersecurity', 'custom-software-development'],
    faqs: [
      { q: 'Do you build on Solana or other non-EVM chains?', a: 'Our focus is Ethereum and EVM chains. For other chains we will tell you honestly in the first call whether we are the right fit.' },
      { q: 'Do you provide audits?', a: 'We test and review all contracts, and recommend an independent audit before launching contracts that hold significant value.' },
      { q: 'Can you improve an existing dApp?', a: 'Yes. We review the code, fix issues and improve UX and performance.' },
    ],
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    scene: 'cybersecurity',
    metaTitle: 'Software for Cybersecurity Companies | AR Medias',
    metaDescription: 'Engineering for cybersecurity firms and MSSPs: client portals, security dashboards, alert automation, reporting and compliance tools, built securely.',
    headline: 'Software for teams that keep others secure.',
    lead: 'Security firms and managed service providers need portals, dashboards and automation that are as secure as the service they sell. We build them with you.',
    challenges: [
      { t: 'Alert overload', d: 'Analysts drown in alerts from many tools with no single view.' },
      { t: 'Manual reporting', d: 'Client reports are assembled by hand from screenshots and spreadsheets.' },
      { t: 'Client communication', d: 'Customers want a portal to see findings, status and evidence.' },
      { t: 'Compliance evidence', d: 'Collecting proof for audits takes weeks every cycle.' },
    ],
    builds: [
      { t: 'Client security portals', d: 'Findings, remediation status, reports and documents per client, with strict access control.' },
      { t: 'Unified dashboards', d: 'Alerts and metrics from your tools in one view, with filtering and assignment.' },
      { t: 'Alert and response automation', d: 'Triage, enrichment and notification workflows with human approval steps.' },
      { t: 'Reporting and compliance tools', d: 'Automatic report generation and evidence collection for audits.' },
    ],
    tools: ['Python', 'Elastic', 'Grafana', 'AWS', 'Cloudflare', 'Slack', 'Jira', 'Docker'],
    services: ['cybersecurity', 'custom-software-development', 'ai-automation'],
    faqs: [
      { q: 'How do you handle sensitive client data?', a: 'Least-privilege access, encryption, audit logs and hosting in the region you choose, all agreed in writing before we start.' },
      { q: 'Can you integrate with our security tools?', a: 'Usually yes, through their APIs or exports. We confirm each integration during discovery.' },
      { q: 'Do you sign NDAs?', a: 'Always, before any details are shared.' },
    ],
  },
];

export const industryBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
