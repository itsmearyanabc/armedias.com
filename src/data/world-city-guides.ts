// The "In detail" section for city pages outside India, keyed by "<market>/<slug>".
// Each guide covers the work people in that city search for, in wording unique to the
// page. Like the rest of these pages, guides never claim an office, staff or clients in
// the city: projects run remotely from New Delhi.
import type { WorldCity } from './world-cities';

type Guide = NonNullable<WorldCity['guide']>;

const custom = '/services/custom-software-development/';
const apps = '/services/mobile-app-development/';
const web = '/services/website-development/';
const shop = '/services/ecommerce-development/';
const ai = '/services/ai-automation/';
const ml = '/services/ai-machine-learning/';
const crm = '/services/crm-development/';
const erp = '/services/erp-development/';
const design = '/services/ui-ux-design/';
const care = '/services/maintenance-support/';

export const cityGuides: Record<string, Guide> = {
  // ---------------- USA ----------------
  'usa/new-york': {
    title: 'Software for New York startups, agencies and finance teams.',
    sections: [
      { h: 'A first product for a New York startup', href: custom, p: 'Investors and early customers want something they can use. We scope the smallest product that proves your idea, build it in milestones with a working demo at each, and keep the code in your own repository from the first commit.' },
      { h: 'Development capacity for agencies', p: 'Agencies bring us the builds they have sold: websites, web apps and integrations delivered under your brand. Your team owns the client relationship, and ours works to your designs and deadlines.' },
      { h: 'Dashboards for finance and operations', p: 'We pull figures from your CRM, payment processor, accounting and ad accounts into one live view, with the access rules a finance team expects: named users, role-based permissions and a log of who changed what.' },
    ],
  },
  'usa/los-angeles': {
    title: 'Apps and websites for Los Angeles brands.',
    sections: [
      { h: 'Apps for creators and consumer brands', href: apps, p: 'Membership, content, booking and shopping apps where the first minute matters. We design the onboarding and the main screens first, test them as a prototype, and only then build for iPhone and Android.' },
      { h: 'CMS and website development', href: web, p: 'Websites on a content system your team can edit without a developer, whether that is WordPress or a headless CMS behind a faster custom front end. Pages are built to load quickly on phones and to turn visits into bookings.' },
      { h: 'Booking and intake for clinics and contractors', p: 'Online booking, intake forms, quote requests and reminders that cut phone calls. Requests arrive in one inbox or your CRM, tagged by service and location, so nothing waits in voicemail.' },
    ],
  },
  'usa/dallas': {
    title: 'Custom software for Dallas–Fort Worth operations.',
    sections: [
      { h: 'Software for logistics and distribution', href: custom, p: 'Dispatch boards, driver apps with proof of delivery, warehouse stock and customer tracking pages. Orders move from quote to invoice in one system, without retyping between tools.' },
      { h: 'Healthcare software built with care', p: 'Patient portals, scheduling and intake tools with role-based access, audit logs and encryption, the controls that health records need. We agree what data is stored and who can see it before writing code.' },
      { h: 'CRM for real estate and home services', href: crm, p: 'Leads from your website, ads and listing sites land in one CRM, are assigned by area or service, and get a reply in minutes. Managers see response times and which sources produce signed jobs.' },
    ],
  },
  'usa/austin': {
    title: 'Mobile apps and SaaS for Austin startups.',
    sections: [
      { h: 'An MVP you can put in front of users', href: apps, p: 'We help you choose the one workflow the first version must do well, design it, and ship it to TestFlight and Google Play testing early. Feedback from real users shapes the next milestone.' },
      { h: 'Building a SaaS product', href: custom, p: 'Accounts, teams, roles, subscription billing with Stripe, an admin panel and usage reporting. These are the parts every SaaS needs, and we build them on a structure that holds up as customers and features grow.' },
      { h: 'Extra engineers for your product team', href: '/hire-dedicated-developers/', p: 'When your roadmap is larger than your team, our developers join your standups, work in your repository and follow your review process. You direct the work; we add the hours.' },
    ],
  },
  'usa/chicago': {
    title: 'Custom software for Chicago businesses.',
    sections: [
      { h: 'Extending an existing SaaS product', href: custom, p: 'We pick up established codebases: new modules, integrations customers keep asking for, performance work and overdue upgrades. We start with a short review so estimates rest on the real state of the code.' },
      { h: 'ERP for manufacturers and distributors', href: erp, p: 'Purchasing, inventory across locations, production orders, shipping and invoicing in one system, connected to your accounting. Managers see stock, open orders and margins without waiting for a month-end spreadsheet.' },
      { h: 'Dashboards for trading and finance', p: 'Positions, exposure and performance views fed from your own data sources, refreshed as the numbers change. Access is limited by role, and every figure can be traced back to its source.' },
    ],
  },
  'usa/houston': {
    title: 'Custom software for Houston industry and healthcare.',
    sections: [
      { h: 'Field service software', href: custom, p: 'Work orders, crew scheduling, inspections with photos and signatures, and time on site, captured on a phone or tablet. The app keeps working without signal and syncs when the crew is back in range.' },
      { h: 'Inventory and ERP with QuickBooks', href: erp, p: 'Parts and equipment tracked by yard, truck and job, with purchase orders and reorder points. Invoices and payments sync with QuickBooks, so the office does not enter anything twice.' },
      { h: 'Portals for medical practices', p: 'Appointment requests, intake forms and document sharing behind a secure login, with role-based access and audit logs. AI can read incoming forms and referrals and file the details for staff to check.' },
    ],
  },
  'usa/boston': {
    title: 'Software and AI for Boston startups and research teams.',
    sections: [
      { h: 'Generative AI applications', href: ml, p: 'Assistants that answer from your own documents, tools that summarise and extract from papers and reports, and AI features inside an existing product. We set clear limits on what the model may answer and show its sources.' },
      { h: 'From research project to product', href: custom, p: 'Spin-outs often have a working prototype in a notebook. We turn it into a product with accounts, a proper interface, hosting and billing, while your team keeps ownership of the science.' },
      { h: 'E-learning and EdTech platforms', p: 'Course delivery, video lessons, quizzes, progress tracking and certificates, with roles for learners, instructors and administrators, and payments or institutional sign-up where you need them.' },
    ],
  },
  'usa/denver': {
    title: 'Websites, stores and apps for Denver businesses.',
    sections: [
      { h: 'Shopify and e-commerce for lifestyle brands', href: shop, p: 'Stores with clean product pages, subscriptions, bundles and fast checkout, connected to your inventory and shipping tools. We also move stores to Shopify with products, customers and redirects intact.' },
      { h: 'WordPress websites your team can run', href: web, p: 'A WordPress site built on a light theme of its own, without a stack of plugins slowing it down. Your staff edit pages and posts themselves, and we handle updates, backups and security.' },
      { h: 'AI automation for a small team', href: ai, p: 'An assistant that answers common customer questions, drafts replies, books appointments and moves form entries into your CRM. It hands over to a person whenever a question falls outside its brief.' },
    ],
  },
  'usa/columbus': {
    title: 'Software, websites and AI for Columbus businesses.',
    sections: [
      { h: 'What an AI automation project covers', href: ai, p: 'We pick one repetitive job, such as sorting inbound email, reading claims or invoices, or answering routine questions. We build it with a person approving the output at first, then widen it once the results are trusted.' },
      { h: 'Website redesigns that keep your rankings', href: web, p: 'A faster, clearer site with every old address redirected to its new page, so the search traffic you have built carries over. We measure speed and enquiries before and after launch.' },
      { h: 'CRM setup and integration', href: crm, p: 'HubSpot, Zoho or Salesforce configured around your sales stages and connected to your website forms, email and quoting. Where a platform falls short, we build the missing piece.' },
    ],
  },
  'usa/raleigh': {
    title: 'Software and AI for Research Triangle teams.',
    sections: [
      { h: 'AI built into your product', href: ml, p: 'Search that understands questions, document extraction, summaries and recommendations added to software you already sell. We evaluate the feature on your own data before it reaches customers.' },
      { h: 'MVPs for Triangle startups', href: custom, p: 'A first version scoped around one customer problem, built in milestones and demoed every step. You own the code and the cloud accounts, which makes later hiring and fundraising simpler.' },
      { h: 'Tools for life-science and health teams', p: 'Sample and study tracking, data-entry portals and reporting dashboards, with role-based access, audit trails and exports your quality team can review.' },
    ],
  },

  // ---------------- Canada ----------------
  'canada/toronto': {
    title: 'Software, apps and websites for Toronto and the GTA.',
    sections: [
      { h: 'Products for fintech and SaaS startups', href: custom, p: 'Onboarding flows, dashboards, subscription billing and admin tools, built with the audit logs and permission models that financial products are expected to have. Code and cloud accounts stay in your name.' },
      { h: 'Websites for dental and medical clinics', href: web, p: 'Service pages patients can understand, online booking requests, new-patient forms and reviews, set up for local search across the GTA. Forms collect only what the clinic needs.' },
      { h: 'Privacy handled from the start', p: 'We build with PIPEDA in mind: clear consent, minimal data collection, encryption and access controls. Hosting in a Canadian region is available when your clients or regulators expect it.' },
    ],
  },
  'canada/vancouver': {
    title: 'Software and booking platforms for Vancouver businesses.',
    sections: [
      { h: 'Booking platforms for tourism and hospitality', href: custom, p: 'Availability calendars, online payment, confirmations and reminders for tours, rentals and stays. Staff manage bookings from one screen, and seasonal pricing and capacity rules are built in.' },
      { h: 'Property and real estate platforms', p: 'Listing sites with search and maps, tenant and owner portals, maintenance requests and document sharing. Enquiries go straight to the right agent with the listing attached.' },
      { h: 'Mobile apps for startups', href: apps, p: 'iPhone and Android apps from one codebase, designed and tested as a prototype first. We handle App Store and Google Play releases and the backend behind the app.' },
    ],
  },
  'canada/calgary': {
    title: 'Custom software and field apps for Calgary businesses.',
    sections: [
      { h: 'Field apps for energy and trades crews', href: apps, p: 'Tickets, safety forms, equipment checks and time sheets filled in on a phone, with photos and signatures. Entries are stored offline on remote sites and sync once the device is back in coverage.' },
      { h: 'Connecting the office systems', href: custom, p: 'Field tickets flow into job costing, invoicing and payroll without retyping. We integrate with the accounting and scheduling software you already use, or replace the spreadsheet in between.' },
      { h: 'AI for paperwork', href: ai, p: 'AI reads tickets, invoices and reports, pulls out the figures and flags what looks wrong for a person to review. Office staff spend less time on data entry.' },
    ],
  },
  'canada/ottawa': {
    title: 'Bilingual, accessible websites and software for Ottawa.',
    sections: [
      { h: 'English and French, done properly', href: web, p: 'Every page, form, email and error message exists in both languages, with a language switch that keeps the visitor on the same page. Editors manage both versions side by side.' },
      { h: 'Accessible by design', p: 'We build to WCAG guidelines: keyboard navigation, screen-reader labels, colour contrast and captions. Accessibility is tested during the build and included in handover notes.' },
      { h: 'Capacity for Kanata product teams', href: '/hire-dedicated-developers/', p: 'Developers who work inside your repository and process on features, integrations or test coverage your own team has no room for this quarter.' },
    ],
  },
  'canada/edmonton': {
    title: 'Websites, online stores and software for Edmonton.',
    sections: [
      { h: 'Custom website design for local businesses', href: web, p: 'A site designed around your services and service area, with quote and booking forms, reviews and fast pages. It is built from scratch to your brand, not from a shared template.' },
      { h: 'Online stores', href: shop, p: 'Shopify or custom stores with Canadian taxes, shipping rules, local pickup and inventory sync. Product pages are written and structured so shoppers and search engines can both find them.' },
      { h: 'Software for trades and industrial services', href: custom, p: 'Job scheduling, quoting, work orders and invoicing in one place, with a simple mobile view for crews. Owners see job status and unpaid invoices at a glance.' },
    ],
  },

  // ---------------- Australia ----------------
  'australia/sydney': {
    title: 'Software, apps and websites for Sydney businesses.',
    sections: [
      { h: 'Custom software for professional services', href: custom, p: 'Client portals, matter and job tracking, time recording and reporting for firms in the CBD and beyond. Each client sees only their own documents, and partners see the whole practice.' },
      { h: 'Xero at the centre', p: 'Invoices, payments and contacts sync between your software and Xero, so billing follows the work without a second entry. We can also connect MYOB, Stripe and your CRM.' },
      { h: 'Looking after software you already have', href: care, p: 'We take on existing websites and applications: updates, security patches, backups, monitoring and small improvements each month, with a named contact for requests.' },
    ],
  },

  // ---------------- UAE ----------------
  'uae/dubai': {
    title: 'Software, ERP and apps for Dubai companies.',
    sections: [
      { h: 'ERP for trading and distribution', href: erp, p: 'Purchase, stock across warehouses, sales, landed cost and VAT-ready invoicing in one system, in English and Arabic. Owners see stock, receivables and margins by product and customer.' },
      { h: 'Logistics software', href: custom, p: 'Shipment and job tracking, driver apps with proof of delivery, customer tracking links and rate management. Documents are generated from the job record, so the same details are not typed twice.' },
      { h: 'Arabic and English, right to left', p: 'Websites and apps designed for both directions from the start, with Arabic typography, mirrored layouts and content your team can update in either language.' },
      { h: 'CRM for real estate brokers', href: crm, p: 'Leads from property portals, your website and WhatsApp in one CRM, assigned to agents by rule, with viewing schedules, follow-up reminders and reports on which sources close.' },
    ],
  },
  'uae/abu-dhabi': {
    title: 'Web and app development for Abu Dhabi organisations.',
    sections: [
      { h: 'Corporate websites in two languages', href: web, p: 'Arabic and English sites with clear structure, strong accessibility and a content system your communications team controls. Layouts are designed for right-to-left reading, not flipped afterwards.' },
      { h: 'Mobile apps for customers and staff', href: apps, p: 'Service request, booking and information apps for iPhone and Android, with Arabic and English interfaces and a web admin panel for your team.' },
      { h: 'Developers for your own team', href: '/hire-dedicated-developers/', p: 'Mobile and web developers who join your project, follow your standards and report to your manager, for the length of the project or as ongoing capacity.' },
    ],
  },
  'uae/sharjah': {
    title: 'Custom software for Sharjah trading and manufacturing.',
    sections: [
      { h: 'ERP and VAT invoicing', href: erp, p: 'Stock, purchasing, production and sales with VAT-ready tax invoices and reports. Free-zone and mainland entities can be kept as separate companies inside the same system.' },
      { h: 'WhatsApp in the sales process', href: ai, p: 'Enquiries on WhatsApp become leads automatically, customers receive quotes and order updates there, and your team answers from one shared inbox on the official Business API.' },
      { h: 'Online stores and catalogues', href: shop, p: 'Product catalogues and stores for wholesalers and retailers, with trade pricing after login, bulk order forms and delivery across the emirates.' },
    ],
  },
  'uae/ajman': {
    title: 'Practical software for Ajman businesses.',
    sections: [
      { h: 'Software for a small trading company', href: custom, p: 'Quotations, invoices, stock and customer balances in one simple system, in place of several spreadsheets. It runs in the browser and on a phone, with Arabic and English screens.' },
      { h: 'A website that brings enquiries', href: web, p: 'A clear bilingual website with your products or services, a WhatsApp button and enquiry forms, built to load quickly and be found in local searches.' },
      { h: 'Support after launch', href: care, p: 'Updates, backups and fixes handled each month, with new features added as the business grows. You deal with the same people who built it.' },
    ],
  },
};
