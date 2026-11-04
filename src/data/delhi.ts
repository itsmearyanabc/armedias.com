// Delhi pages: /locations/delhi/ and one page per service at /locations/delhi/<slug>/.
// Each page answers a "<service> company in Delhi" search with Delhi-specific copy;
// the full service details stay on /services/<service>/, which each page links to.

export interface DelhiService {
  slug: string;
  service: string; // slug in services.ts
  name: string; // short label for links
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  builds: { t: string; d: string }[];
  fits: string[];
  faqs: { q: string; a: string }[];
}

export const delhiAreas = ['Delhi', 'Gurugram', 'Noida', 'Faridabad', 'Ghaziabad'];

export const delhiServices: DelhiService[] = [
  {
    slug: 'website-development-company',
    service: 'website-development',
    name: 'Website development',
    metaTitle: 'Website Development Company in Delhi | AR Medias',
    metaDescription: 'Website development and designing company in Kirti Nagar, New Delhi. Fast, SEO-ready business websites, offline meetings in Delhi NCR, fixed INR quotes.',
    h1: 'Website development company in Delhi',
    lead: 'We design and build fast, search-ready business websites from our office in Kirti Nagar, New Delhi. Meet us in person, see progress in regular update meetings, and get a fixed quote in INR before work starts.',
    builds: [
      { t: 'Business and corporate websites', d: 'Company websites that explain what you do clearly and turn visitors into calls, WhatsApp messages and enquiries.' },
      { t: 'Website redesigns', d: 'A modern redesign of a slow or dated site, with every old URL redirected so your Google rankings carry over.' },
      { t: 'Landing pages for ads', d: 'Fast pages for Google and Meta ad campaigns, with lead forms connected to your CRM or WhatsApp.' },
      { t: 'Catalogue and product websites', d: 'Product catalogues for manufacturers, traders and wholesalers, with enquiry buttons on every product.' },
      { t: 'Multilingual websites', d: 'English and Hindi versions, or other languages for export markets, with proper SEO for each.' },
      { t: 'SEO-ready from day one', d: 'Clean code, fast loading, structured data and local SEO so customers in Delhi NCR can find you.' },
    ],
    fits: ['Businesses with a dated or slow website', 'Manufacturers and traders who need a product catalogue', 'Clinics, schools and real estate firms', 'Startups launching a new brand'],
    faqs: [
      { q: 'How much does website development cost in Delhi?', a: 'It depends on the number of pages, the design work and features such as a blog, catalogue, payments or CRM integration. After a free call we send a written scope with a fixed price in INR, so the cost does not change midway.' },
      { q: 'Can we meet you in person in Delhi?', a: 'Yes. You can visit our office in Kirti Nagar, New Delhi, or we can come to your office anywhere in Delhi NCR. Many clients start with an in-person meeting and continue with Google Meet calls.' },
      { q: 'How long does it take to build a business website?', a: 'A typical business website takes 3 to 6 weeks from approved design to launch. You see progress in regular update meetings on a staging link.' },
      { q: 'Will my website show up on Google?', a: 'Every site is built with technical SEO, fast loading, structured data and a sitemap. We also help you set up Google Search Console and your Google Business Profile for local searches in Delhi.' },
    ],
  },
  {
    slug: 'software-development-company',
    service: 'custom-software-development',
    name: 'Software development',
    metaTitle: 'Software Development Company in Delhi | AR Medias',
    metaDescription: 'Custom software development company in New Delhi. Web apps, portals, dashboards and internal tools for Delhi NCR businesses. Offline meetings, fixed INR quotes.',
    h1: 'Software development company in Delhi',
    lead: 'We build custom software for Delhi NCR businesses that have outgrown spreadsheets and off-the-shelf tools: web applications, client portals, dashboards and internal systems, built around how your team actually works.',
    builds: [
      { t: 'Web applications and portals', d: 'Customer, dealer and vendor portals where people log in, place orders, track status and download documents.' },
      { t: 'Internal business tools', d: 'Replace spreadsheets and paper registers with one system for orders, stock, approvals or field teams.' },
      { t: 'Dashboards and reports', d: 'Live dashboards that pull data from your existing tools, so owners see sales, stock and cash flow at a glance.' },
      { t: 'SaaS products', d: 'Multi-tenant products with subscriptions, roles and admin panels for founders building a software business.' },
      { t: 'Integrations', d: 'Connect Tally, Zoho, Razorpay, WhatsApp, GST e-invoicing and other tools so data is entered once.' },
      { t: 'Modernising old software', d: 'Rebuild legacy desktop or PHP systems as fast, secure web software without losing your data.' },
    ],
    fits: ['SMEs running on spreadsheets and WhatsApp groups', 'Manufacturers, distributors and traders', 'Founders building a SaaS product', 'Enterprises that need a custom internal tool'],
    faqs: [
      { q: 'What kind of software do you build for Delhi businesses?', a: 'Custom web applications, portals, dashboards, internal tools and SaaS products. If your team does the same work every day in spreadsheets, there is usually a simpler way to do it with custom software.' },
      { q: 'Do you build software from scratch or customise existing products?', a: 'Both. Sometimes a configured product such as Zoho or Odoo is the right choice; sometimes custom software costs less over time. We recommend the option that fits your budget and process.' },
      { q: 'Who owns the source code?', a: 'You do. You receive the source code, documentation and all account access at handover.' },
      { q: 'How do you keep us updated during the project?', a: 'Regular project update meetings in person or on Google Meet, a staging link where you can try the software, and timely follow-ups with next steps after every meeting.' },
    ],
  },
  {
    slug: 'mobile-app-development-company',
    service: 'mobile-app-development',
    name: 'Mobile app development',
    metaTitle: 'Mobile App Development Company in Delhi | AR Medias',
    metaDescription: 'Mobile app development company in New Delhi building Android and iOS apps for Delhi NCR businesses and startups. Offline meetings and fixed INR quotes.',
    h1: 'Mobile app development company in Delhi',
    lead: 'We design and build Android and iOS apps for businesses and startups across Delhi NCR, from customer apps to field-team and ordering apps, with demos you can try on your own phone as the work progresses.',
    builds: [
      { t: 'Android and iOS apps', d: 'One codebase for both platforms with Flutter or React Native, or fully native apps when performance demands it.' },
      { t: 'Customer and ordering apps', d: 'Apps for orders, bookings, loyalty and repeat purchases, with UPI and Razorpay payments built in.' },
      { t: 'Field and sales team apps', d: 'Apps for sales visits, attendance, deliveries and service calls, synced with your CRM or ERP.' },
      { t: 'Startup MVPs', d: 'A focused first version to test your idea with real users, built to grow rather than be thrown away.' },
      { t: 'Admin panels and backends', d: 'The web dashboard and server behind your app, so your team can manage users, content and orders.' },
      { t: 'Play Store and App Store launch', d: 'Store listings, review submissions and release management, handled for you.' },
    ],
    fits: ['Startups launching an app idea', 'Retailers, restaurants and service businesses', 'Companies with sales or field teams', 'Businesses moving customers from calls to an app'],
    faqs: [
      { q: 'How much does it cost to make an app in Delhi?', a: 'The cost depends on the screens, features, integrations and whether you need Android, iOS or both. After a free call we send a written scope with a fixed price in INR.' },
      { q: 'Do you build for both Android and iOS?', a: 'Yes. Most clients choose one cross-platform app for both stores, which keeps the cost and maintenance lower.' },
      { q: 'Can we test the app before launch?', a: 'Yes. We share test builds you can install on your own phone, and we review them together in project update meetings.' },
      { q: 'Do you publish the app on the Play Store and App Store?', a: 'Yes. We prepare the store listings and handle submission and review. The apps are published under your own developer accounts.' },
    ],
  },
  {
    slug: 'crm-software-development-company',
    service: 'crm-development',
    name: 'CRM software development',
    metaTitle: 'CRM Software Development Company in Delhi | AR Medias',
    metaDescription: 'CRM software development company in New Delhi. Custom CRM or Zoho and HubSpot setup for Delhi NCR sales teams, with WhatsApp lead capture and fixed INR quotes.',
    h1: 'CRM software development company in Delhi',
    lead: 'We build custom CRM software and set up Zoho, HubSpot or Salesforce for sales teams across Delhi NCR, so every enquiry from your website, WhatsApp, calls and portals lands in one place and gets followed up.',
    builds: [
      { t: 'Custom CRM software', d: 'A CRM shaped around your sales stages, approvals and reports, with no per-user licence fees.' },
      { t: 'Zoho, HubSpot and Salesforce setup', d: 'Configuration, data migration and training when an existing platform is the better fit.' },
      { t: 'Lead capture from every source', d: 'Leads from your website, WhatsApp, IndiaMART, JustDial, 99acres, MagicBricks and ads flow straight into the CRM.' },
      { t: 'WhatsApp follow-ups', d: 'Automatic WhatsApp replies, reminders and follow-up messages so no lead goes cold.' },
      { t: 'Real estate and channel partner CRM', d: 'Site visit scheduling, inventory, bookings and channel partner tracking for builders and brokers.' },
      { t: 'Sales reports and dashboards', d: 'See which source brings leads, who is following up and where deals get stuck.' },
    ],
    fits: ['Real estate developers, brokers and channel partners', 'Education institutes handling admissions', 'Distributors and B2B sales teams', 'Clinics and service businesses with many enquiries'],
    faqs: [
      { q: 'Should we build a custom CRM or use Zoho or HubSpot?', a: 'If a ready platform fits your process, setting it up is faster and cheaper. If you are paying for many licences or bending your process to fit the tool, a custom CRM often costs less over time. We explain both options on the first call.' },
      { q: 'Can the CRM capture leads from IndiaMART and WhatsApp?', a: 'Yes. We connect your website forms, WhatsApp Business, IndiaMART, JustDial, property portals and ad campaigns so leads arrive in the CRM automatically.' },
      { q: 'Can you migrate our data from Excel or another CRM?', a: 'Yes. We clean and import your existing contacts, leads and history so your team starts with complete records.' },
      { q: 'Do you train our sales team?', a: 'Yes. We run training sessions at your office in Delhi NCR or on Google Meet, and follow up after launch to answer questions.' },
    ],
  },
  {
    slug: 'erp-software-company',
    service: 'erp-development',
    name: 'ERP software',
    metaTitle: 'ERP Software Company in Delhi | Custom ERP | AR Medias',
    metaDescription: 'ERP software company in New Delhi. Custom ERP or Odoo and ERPNext setup for Delhi NCR manufacturers, traders and distributors, with GST and Tally sync.',
    h1: 'ERP software company in Delhi',
    lead: 'We build custom ERP software and implement Odoo and ERPNext for manufacturers, traders and distributors across Delhi NCR, connecting purchase, stock, production, sales and accounts in one system with GST built in.',
    builds: [
      { t: 'Custom ERP software', d: 'An ERP built around your workflow, from purchase orders to dispatch, without paying for modules you never use.' },
      { t: 'Odoo and ERPNext implementation', d: 'Setup, customisation, data migration and training on open-source ERP platforms.' },
      { t: 'Manufacturing and production', d: 'Bills of materials, production planning, job work, batches and wastage tracking for factories.' },
      { t: 'Inventory and warehouse', d: 'Stock across godowns and branches, reorder levels, barcodes and stock valuation.' },
      { t: 'GST, e-way bills and Tally sync', d: 'GST-ready invoices, e-way bills and e-invoicing, with sync to Tally or Zoho Books for your accountant.' },
      { t: 'Owner dashboards', d: 'Sales, stock, receivables and production on one screen, on desktop or phone.' },
    ],
    fits: ['Manufacturers and factories in Delhi NCR', 'Traders, wholesalers and distributors', 'Businesses with multiple godowns or branches', 'Companies outgrowing Tally and spreadsheets'],
    faqs: [
      { q: 'Do you build ERP software for manufacturing companies?', a: 'Yes. We build production planning, bills of materials, inventory, purchase and dispatch modules for manufacturers, and connect them with accounts and GST.' },
      { q: 'Can the ERP work with Tally?', a: 'Yes. We can sync sales, purchases and ledgers with Tally so your accountant keeps using it, or move accounting into the ERP if you prefer.' },
      { q: 'Is a custom ERP better than Odoo or ERPNext?', a: 'Not always. Odoo and ERPNext cover a lot out of the box. A custom ERP makes sense when your process is unusual or licence costs keep growing. We recommend the right option after understanding your operations.' },
      { q: 'Can you visit our factory to understand the process?', a: 'Yes. For ERP projects in Delhi NCR we visit your factory or office to map the workflow before writing the scope.' },
    ],
  },
  {
    slug: 'ai-automation-agency',
    service: 'ai-automation',
    name: 'AI & WhatsApp automation',
    metaTitle: 'AI & WhatsApp Automation Agency in Delhi | AR Medias',
    metaDescription: 'AI automation agency in New Delhi. WhatsApp automation, AI chatbots and workflow automation for Delhi NCR businesses. Offline meetings, fixed INR quotes.',
    h1: 'AI and WhatsApp automation agency in Delhi',
    lead: 'We automate the repetitive work that slows Delhi NCR businesses down: WhatsApp replies and follow-ups, AI chatbots that answer customers, and workflows that move data between your tools without anyone copying it by hand.',
    builds: [
      { t: 'WhatsApp Business API automation', d: 'Instant replies, catalogues, order updates, payment reminders and broadcast campaigns on the official WhatsApp API.' },
      { t: 'AI chatbots', d: 'Chatbots on your website and WhatsApp that answer questions from your own documents and hand over to your team when needed.' },
      { t: 'Lead follow-up automation', d: 'Every new lead gets a reply in seconds, is added to your CRM and receives timely follow-ups.' },
      { t: 'Workflow automation', d: 'n8n, Make and Zapier workflows that connect forms, sheets, CRM, accounts and email.' },
      { t: 'AI agents for back-office work', d: 'Agents that read invoices, sort emails, draft replies and update records for your team to approve.' },
      { t: 'Reports on autopilot', d: 'Daily and weekly reports sent to owners on WhatsApp or email, with no manual compiling.' },
    ],
    fits: ['Businesses replying to the same WhatsApp questions every day', 'Sales teams losing leads to slow follow-up', 'Clinics, institutes and service businesses with bookings', 'Back offices drowning in manual data entry'],
    faqs: [
      { q: 'What can be automated on WhatsApp?', a: 'Welcome replies, FAQs, catalogues, order and delivery updates, appointment reminders, payment reminders and lead follow-ups. We use the official WhatsApp Business API so your number stays safe.' },
      { q: 'Will an AI chatbot give wrong answers to customers?', a: 'We train the chatbot only on your approved information, set clear limits on what it answers, and hand over to a person when it is unsure.' },
      { q: 'How much does WhatsApp automation cost?', a: 'It depends on the flows and integrations you need. We send a fixed quote in INR after a free call. WhatsApp message charges from Meta are separate and paid directly by you.' },
      { q: 'Do you work with businesses outside Delhi?', a: 'Yes. We work across India and in six other countries. Delhi NCR clients can also meet us in person at our Kirti Nagar office.' },
    ],
  },
];

export const delhiBySlug = Object.fromEntries(delhiServices.map((d) => [d.slug, d]));
