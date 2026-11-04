// Indian city pages at /locations/india/<slug>/. Each answers the "<service> company in
// <city>" searches Google suggests for that city, with copy about what businesses there
// need. These are service-area pages: they never claim an office in the city. In-person
// meetings are offered only for Delhi NCR cities (`ncr: true`).

export interface IndiaCity {
  slug: string; // the spelling people search ("bangalore", "gurgaon")
  name: string; // name used in headings
  alsoKnownAs?: string; // official or alternate name
  region: string;
  area: string; // the wider area served
  ncr: boolean;
  coords: readonly [number, number]; // [lon, lat]
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  fits: string[];
  needs: { t: string; d: string }[];
  industries: string[]; // industry names; linked when an industry page exists
  faqs: { q: string; a: string }[];
}

const meetRemote = 'Projects run on Google Meet with regular project update meetings and timely follow-ups, with a fixed quote in INR and GST invoices.';

/** The city page for a place name, matching either spelling ("Bengaluru" finds Bangalore). */
export const cityPageFor = (place: string) => indiaCities.find((c) => c.name === place || c.alsoKnownAs === place);

export const indiaCities: IndiaCity[] = [
  {
    slug: 'mumbai',
    name: 'Mumbai',
    region: 'Maharashtra',
    area: 'Mumbai, Navi Mumbai and Thane',
    ncr: false,
    coords: [72.88, 19.08],
    metaTitle: 'Software Development Company in Mumbai | AR Medias',
    metaDescription: 'Software, website, app, CRM, ERP and AI automation development for businesses in Mumbai, Navi Mumbai and Thane. Google Meet calls, regular updates and fixed INR quotes.',
    h1: 'Software development company in Mumbai',
    lead: 'We build websites, mobile apps, CRM and ERP software and AI automation for businesses across Mumbai, Navi Mumbai and Thane, from real estate developers and D2C brands to traders, finance teams and media companies.',
    fits: ['Real estate developers and channel partners', 'D2C and retail brands', 'Importers, traders and distributors', 'Finance, media and service firms'],
    needs: [
      { t: 'Real estate CRM', d: 'Site visit scheduling, inventory, bookings and channel partner tracking, with WhatsApp follow-ups for every enquiry.' },
      { t: 'D2C online stores', d: 'Shopify or custom stores with UPI and Razorpay payments, Shiprocket shipping and abandoned-cart reminders on WhatsApp.' },
      { t: 'ERP for traders and importers', d: 'Purchase, stock across godowns, multi-currency invoices and GST, synced with Tally for your accountant.' },
      { t: 'Secure client portals', d: 'Portals with role-based access and audit trails for firms that share documents and reports with clients.' },
      { t: 'WhatsApp and AI automation', d: 'Instant replies, catalogues, order updates and AI chatbots that answer from your own information.' },
      { t: 'Fast, search-ready websites', d: 'Corporate and brand websites that load fast on mobile networks and rank for the searches your buyers make.' },
    ],
    industries: ['Real Estate', 'Retail & E-commerce', 'Healthcare', 'Media and entertainment', 'Logistics and trading'],
    faqs: [
      { q: 'Do you work with businesses in Mumbai?', a: `Yes. We work with businesses across Mumbai, Navi Mumbai and Thane. ${meetRemote}` },
      { q: 'Can you build a CRM for real estate developers and channel partners?', a: 'Yes. We build CRMs with site visit scheduling, unit inventory, bookings and channel partner tracking, and bring in leads from your website, property portals and WhatsApp.' },
      { q: 'Do you build online stores for D2C brands?', a: 'Yes. We build Shopify and custom stores with UPI and Razorpay payments, Shiprocket shipping and WhatsApp order updates.' },
      { q: 'How much does software development cost for a Mumbai business?', a: 'It depends on the scope, features and integrations. After a free call we send a written scope with a fixed price in INR, so the cost does not change midway.' },
    ],
  },
  {
    slug: 'bangalore',
    name: 'Bangalore',
    alsoKnownAs: 'Bengaluru',
    region: 'Karnataka',
    area: 'Bengaluru',
    ncr: false,
    coords: [77.59, 12.97],
    metaTitle: 'Software Development Company in Bangalore | AR Medias',
    metaDescription: 'Software, SaaS, app and AI development for startups and businesses in Bangalore (Bengaluru). MVPs, product builds and AI features with regular demos and fixed INR quotes.',
    h1: 'Software development company in Bangalore',
    lead: 'We build SaaS products, web and mobile apps, AI features and internal tools for startups and growing businesses in Bengaluru, with regular demos so founders and product teams always see progress.',
    fits: ['Funded and early-stage startups', 'SaaS and product companies', 'AI and deep-tech teams', 'SMEs modernising their tools'],
    needs: [
      { t: 'MVPs for startups', d: 'A focused first version to test your idea with real users, built on a codebase that can grow instead of being thrown away.' },
      { t: 'SaaS products', d: 'Multi-tenant apps with subscriptions, roles, admin panels and billing, ready for your first paying customers.' },
      { t: 'AI features in your product', d: 'Chat assistants on your own data, AI agents and document processing added to the software you already run.' },
      { t: 'UI/UX for product teams', d: 'Research-led UX and polished UI design for web and mobile products, handed over in Figma.' },
      { t: 'Mobile apps', d: 'Android and iOS apps from one codebase with Flutter or React Native, with test builds on your phone as we go.' },
      { t: 'Cloud and DevOps', d: 'Deployments on AWS or your cloud, monitoring and backups, so a small team does not lose nights to servers.' },
    ],
    industries: ['Software Companies', 'AI & ML Companies', 'Retail & E-commerce', 'Healthcare', 'Education'],
    faqs: [
      { q: 'Do you work with startups in Bangalore?', a: `Yes. We build MVPs, SaaS products and AI features for founders and product teams in Bengaluru. ${meetRemote}` },
      { q: 'Can you build an MVP for our startup?', a: 'Yes. We scope a focused first version with you, build it in short milestones with demos, and hand over the source code. You own everything.' },
      { q: 'Can you add AI features to our existing product?', a: 'Yes. We add chat assistants trained on your own content, AI agents for back-office tasks and document processing, with clear limits on what the AI answers.' },
      { q: 'How much does it cost to build a software product?', a: 'It depends on the features, integrations and platforms. After a free call we send a written scope with a fixed price in INR and a milestone plan.' },
    ],
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    region: 'Telangana',
    area: 'Hyderabad and Secunderabad',
    ncr: false,
    coords: [78.49, 17.39],
    metaTitle: 'Software Development Company in Hyderabad | AR Medias',
    metaDescription: 'Custom software, apps, CRM and AI automation for businesses in Hyderabad and Secunderabad: healthcare, real estate, IT services and more. Fixed INR quotes and regular updates.',
    h1: 'Software development company in Hyderabad',
    lead: 'We build custom software, apps, CRM systems and AI automation for businesses across Hyderabad and Secunderabad, from clinics and hospitals to real estate firms, IT services companies and growing SMEs.',
    fits: ['Clinics, hospitals and diagnostic centres', 'Real estate developers', 'IT services and consulting firms', 'Manufacturers and distributors'],
    needs: [
      { t: 'Clinic and hospital software', d: 'Appointment booking, patient records, billing and WhatsApp reminders that reduce front-desk work.' },
      { t: 'CRM for sales teams', d: 'Leads from every source in one place, with follow-up reminders and reports on which source brings business.' },
      { t: 'AI document processing', d: 'AI that reads invoices, forms and reports and fills your systems, with your team approving the results.' },
      { t: 'Internal tools for IT firms', d: 'Project, timesheet, resourcing and client-reporting tools built around how your delivery team works.' },
      { t: 'Real estate websites and CRM', d: 'Project websites with enquiry capture, and a CRM for site visits, bookings and payments.' },
      { t: 'Dashboards for owners', d: 'Live dashboards for sales, operations and finance, pulled from the tools you already use.' },
    ],
    industries: ['Healthcare', 'Real Estate', 'Software Companies', 'Education', 'Pharma and life sciences'],
    faqs: [
      { q: 'Do you work with businesses in Hyderabad?', a: `Yes. We work with businesses across Hyderabad and Secunderabad. ${meetRemote}` },
      { q: 'Do you build software for clinics and hospitals?', a: 'Yes. We build appointment booking, patient records, billing and reminder systems, with access controls so the right staff see the right data.' },
      { q: 'Can you automate document-heavy work with AI?', a: 'Yes. We build AI workflows that read documents such as invoices and forms, extract the details and update your systems for a person to approve.' },
      { q: 'How much does custom software cost?', a: 'It depends on the scope and integrations. After a free call we send a written scope with a fixed price in INR, so the cost does not change midway.' },
    ],
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    region: 'Tamil Nadu',
    area: 'Chennai',
    ncr: false,
    coords: [80.27, 13.08],
    metaTitle: 'Software Development Company in Chennai | AR Medias',
    metaDescription: 'ERP, custom software, apps and automation for Chennai businesses: manufacturers, auto component suppliers, healthcare and exporters. Fixed INR quotes and regular demos.',
    h1: 'Software development company in Chennai',
    lead: 'We build ERP systems, custom software, dealer portals and apps for Chennai businesses, with a strong fit for manufacturers, automotive suppliers, healthcare providers and exporters.',
    fits: ['Manufacturers and auto component suppliers', 'Exporters and logistics firms', 'Hospitals and clinics', 'Distributors and dealer networks'],
    needs: [
      { t: 'Manufacturing ERP', d: 'Bills of materials, production planning, job work, inventory and dispatch connected to accounts and GST.' },
      { t: 'Dealer and distributor portals', d: 'Dealers place orders, track dispatch and download invoices without calling your team.' },
      { t: 'Quality and inspection apps', d: 'Mobile checklists for inspections and audits, with photos and reports that reach managers instantly.' },
      { t: 'Export documentation', d: 'Invoices, packing lists and shipment tracking with multi-currency pricing for overseas buyers.' },
      { t: 'Hospital and clinic systems', d: 'Appointments, records, billing and patient reminders on WhatsApp.' },
      { t: 'Websites for B2B buyers', d: 'Fast catalogue websites with enquiry forms on every product, built for overseas and domestic buyers.' },
    ],
    industries: ['Manufacturing', 'Healthcare', 'Logistics and trading', 'Software Companies', 'Education'],
    faqs: [
      { q: 'Do you work with businesses in Chennai?', a: `Yes. We work with businesses across Chennai. ${meetRemote}` },
      { q: 'Do you build ERP for manufacturers and auto component suppliers?', a: 'Yes. We build production planning, bills of materials, inventory, purchase and dispatch modules, and connect them with accounts and GST.' },
      { q: 'Can our dealers order through a portal?', a: 'Yes. We build dealer and distributor portals for orders, dispatch tracking, invoices and payment status, connected to your ERP or accounts.' },
      { q: 'How much does an ERP cost?', a: 'It depends on the modules, users and integrations, and on whether a platform such as Odoo or ERPNext fits. After a free call we send a fixed quote in INR.' },
    ],
  },
  {
    slug: 'pune',
    name: 'Pune',
    region: 'Maharashtra',
    area: 'Pune and Pimpri-Chinchwad',
    ncr: false,
    coords: [73.86, 18.52],
    metaTitle: 'Software Development Company in Pune | AR Medias',
    metaDescription: 'ERP, custom software, apps and education CRM for Pune and Pimpri-Chinchwad businesses: engineering manufacturers, IT firms and institutes. Fixed INR quotes and regular demos.',
    h1: 'Software development company in Pune',
    lead: 'We build ERP and custom software, apps and admission CRMs for businesses across Pune and Pimpri-Chinchwad, from engineering and automotive manufacturers to IT firms, startups and education institutes.',
    fits: ['Engineering and automotive manufacturers', 'Job-work and fabrication units', 'Coaching institutes and colleges', 'IT firms and startups'],
    needs: [
      { t: 'ERP for engineering units', d: 'Job work, bills of materials, production, inventory and dispatch, with GST and Tally sync.' },
      { t: 'Vendor and supplier portals', d: 'Suppliers see purchase orders, confirm dates and upload invoices in one place.' },
      { t: 'Admission CRM and LMS', d: 'Enquiry-to-enrolment tracking, fee reminders, attendance and online classes for institutes.' },
      { t: 'Field service apps', d: 'Apps for service engineers with job cards, photos, signatures and spare-part tracking.' },
      { t: 'Startup products', d: 'MVPs and SaaS products built in milestones with demos, with the source code handed over.' },
      { t: 'Workflow automation', d: 'Approvals, reports and reminders that move between your tools automatically.' },
    ],
    industries: ['Manufacturing', 'Education', 'Software Companies', 'Real Estate', 'Healthcare'],
    faqs: [
      { q: 'Do you work with businesses in Pune?', a: `Yes. We work with businesses across Pune and Pimpri-Chinchwad. ${meetRemote}` },
      { q: 'Do you build ERP for job-work and engineering manufacturers?', a: 'Yes. We handle job work, bills of materials, production planning, inventory and dispatch, with GST invoices and Tally sync.' },
      { q: 'Do you build admission CRMs for institutes?', a: 'Yes. We build admission CRMs, fee and attendance systems and learning platforms for coaching institutes, schools and colleges.' },
      { q: 'How much does custom software cost?', a: 'It depends on the scope and integrations. After a free call we send a written scope with a fixed price in INR, so the cost does not change midway.' },
    ],
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    region: 'West Bengal',
    area: 'Kolkata and Howrah',
    ncr: false,
    coords: [88.36, 22.57],
    metaTitle: 'Software Development Company in Kolkata | AR Medias',
    metaDescription: 'Distribution, billing and ERP software, apps and websites for Kolkata and Howrah businesses: distributors, traders, exporters and institutes. Tally sync, GST and fixed INR quotes.',
    h1: 'Software development company in Kolkata',
    lead: 'We build distribution and ERP software, ordering apps and websites for businesses across Kolkata and Howrah, with a strong fit for distributors, traders, exporters and education institutes.',
    fits: ['FMCG and pharma distributors', 'Traders and wholesalers', 'Exporters', 'Schools, colleges and institutes'],
    needs: [
      { t: 'Distributor management', d: 'Orders, schemes, stock and collections across salespeople and retailers in one system.' },
      { t: 'Retailer ordering apps', d: 'Retailers order from their phone, see schemes and track deliveries, so salespeople spend less time on calls.' },
      { t: 'Billing, GST and Tally sync', d: 'GST invoices, e-way bills and ledgers that sync with Tally, so accounts are never re-entered.' },
      { t: 'Inventory across godowns', d: 'Stock, batches and expiry dates across godowns and branches, with reorder alerts.' },
      { t: 'Export websites and catalogues', d: 'Product catalogues for overseas buyers with enquiry forms and multi-currency price lists.' },
      { t: 'Admission CRM', d: 'Enquiries, admissions, fees and attendance for schools, colleges and coaching institutes.' },
    ],
    industries: ['Retail & E-commerce', 'Education', 'Healthcare', 'Logistics and trading', 'Manufacturing'],
    faqs: [
      { q: 'Do you work with businesses in Kolkata?', a: `Yes. We work with businesses across Kolkata and Howrah. ${meetRemote}` },
      { q: 'Do you build distributor management software?', a: 'Yes. We build systems for orders, schemes, stock, collections and salesperson tracking, with apps for retailers and field staff.' },
      { q: 'Can the software work with Tally?', a: 'Yes. We can sync invoices, payments and ledgers with Tally so your accountant keeps using it.' },
      { q: 'How much does distribution software cost?', a: 'It depends on the modules, users and integrations. After a free call we send a written scope with a fixed price in INR.' },
    ],
  },
  {
    slug: 'ahmedabad',
    name: 'Ahmedabad',
    region: 'Gujarat',
    area: 'Ahmedabad and Gandhinagar',
    ncr: false,
    coords: [72.57, 23.02],
    metaTitle: 'Software Development Company in Ahmedabad | AR Medias',
    metaDescription: 'ERP, B2B e-commerce, dealer apps and custom software for Ahmedabad and Gandhinagar businesses: textile, chemical and pharma manufacturers and exporters. Fixed INR quotes.',
    h1: 'Software development company in Ahmedabad',
    lead: 'We build ERP systems, B2B e-commerce, dealer apps and custom software for businesses across Ahmedabad and Gandhinagar, with a strong fit for textile, chemical and pharma manufacturers and exporters.',
    fits: ['Textile and garment manufacturers', 'Chemical and pharma manufacturers', 'Exporters', 'Startups and SMEs'],
    needs: [
      { t: 'Manufacturing ERP with batches', d: 'Batch and lot tracking, quality checks, production and inventory, connected to accounts and GST.' },
      { t: 'Export documentation', d: 'Proforma invoices, packing lists, shipment tracking and multi-currency pricing for overseas buyers.' },
      { t: 'B2B e-commerce', d: 'Online ordering for dealers and bulk buyers, with customer-specific prices, credit limits and order history.' },
      { t: 'Dealer and sales apps', d: 'Apps for dealers and salespeople to place orders, check stock and track payments.' },
      { t: 'Quality and lab records', d: 'Digital records for inspections and tests, with reports that reach managers and buyers quickly.' },
      { t: 'Websites for buyers abroad', d: 'Fast product websites that rank for export searches and turn visitors into enquiries.' },
    ],
    industries: ['Manufacturing', 'Retail & E-commerce', 'Logistics and trading', 'Healthcare', 'Software Companies'],
    faqs: [
      { q: 'Do you work with businesses in Ahmedabad?', a: `Yes. We work with businesses across Ahmedabad and Gandhinagar. ${meetRemote}` },
      { q: 'Do you build ERP for textile, chemical and pharma manufacturers?', a: 'Yes. We build batch and lot tracking, quality checks, production planning and inventory, connected with accounts and GST.' },
      { q: 'Can you build B2B ordering for our dealers?', a: 'Yes. We build B2B stores and dealer apps with customer-specific prices, credit limits, order history and payment status.' },
      { q: 'How much does an ERP cost?', a: 'It depends on the modules, users and integrations. After a free call we send a written scope with a fixed price in INR.' },
    ],
  },
  {
    slug: 'noida',
    name: 'Noida',
    region: 'Uttar Pradesh · Delhi NCR',
    area: 'Noida and Greater Noida',
    ncr: true,
    coords: [77.39, 28.54],
    metaTitle: 'IT & Software Company in Noida | AR Medias',
    metaDescription: 'IT and software company serving Noida and Greater Noida: websites, apps, CRM, ERP and AI automation, with in-person meetings across Delhi NCR and fixed INR quotes.',
    h1: 'IT and software company in Noida',
    lead: 'We build websites, mobile apps, CRM and ERP software and AI automation for businesses across Noida and Greater Noida, and we meet you in person at your office anywhere in Delhi NCR.',
    fits: ['Startups and product teams', 'Electronics and MSME manufacturers', 'Real estate developers', 'Education institutes'],
    needs: [
      { t: 'Product builds for startups', d: 'MVPs, SaaS products and mobile apps built in milestones, with demos at your office or on Google Meet.' },
      { t: 'ERP for manufacturers', d: 'Purchase, production, inventory and dispatch for electronics and MSME manufacturers, with GST and Tally sync.' },
      { t: 'Real estate CRM', d: 'Site visits, unit inventory, bookings and channel partners for builders, with WhatsApp follow-ups.' },
      { t: 'Admission CRM and LMS', d: 'Enquiries, admissions, fees and online classes for schools, colleges and coaching institutes.' },
      { t: 'AI and WhatsApp automation', d: 'Instant replies, lead follow-ups and AI chatbots that take repetitive work off your team.' },
      { t: 'Corporate websites', d: 'Fast company websites that rank for the searches your customers make.' },
    ],
    industries: ['Software Companies', 'Real Estate', 'Education', 'Manufacturing', 'Healthcare'],
    faqs: [
      { q: 'Do you meet clients in Noida in person?', a: 'Yes. We meet clients at their office anywhere in Delhi NCR, including Noida and Greater Noida, and use Google Meet for quick calls and regular project update meetings.' },
      { q: 'Do you build products for startups in Noida?', a: 'Yes. We build MVPs, SaaS products and mobile apps in short milestones with demos, and hand over the source code. You own everything.' },
      { q: 'Do you build ERP for manufacturers?', a: 'Yes. We build purchase, production, inventory and dispatch modules with GST invoices and Tally sync, and visit your unit to map the process.' },
      { q: 'How much does software development cost?', a: 'It depends on the scope and integrations. After a free call we send a written scope with a fixed price in INR, so the cost does not change midway.' },
    ],
  },
  {
    slug: 'gurgaon',
    name: 'Gurgaon',
    alsoKnownAs: 'Gurugram',
    region: 'Haryana · Delhi NCR',
    area: 'Gurugram and Manesar',
    ncr: true,
    coords: [77.03, 28.46],
    metaTitle: 'IT & Software Company in Gurgaon | AR Medias',
    metaDescription: 'IT and software company serving Gurgaon (Gurugram) and Manesar: internal tools, apps, CRM, ERP and AI automation, with in-person meetings across Delhi NCR and fixed INR quotes.',
    h1: 'IT and software company in Gurgaon',
    lead: 'We build internal tools, apps, CRM and ERP software and AI automation for businesses across Gurugram and Manesar, from corporate teams and startups to real estate firms and automotive suppliers, and we meet you in person anywhere in Delhi NCR.',
    fits: ['Corporate and regional offices', 'Startups', 'Real estate developers and brokers', 'Automotive suppliers in Manesar'],
    needs: [
      { t: 'Internal tools and dashboards', d: 'Approval workflows, reporting dashboards and team tools that replace spreadsheets and email chains.' },
      { t: 'AI for back-office teams', d: 'AI agents that read documents, sort emails and update records for your team to approve.' },
      { t: 'Real estate CRM', d: 'Site visits, inventory, bookings and channel partner tracking, with WhatsApp follow-ups.' },
      { t: 'ERP for automotive suppliers', d: 'Production planning, bills of materials, inventory and dispatch for component manufacturers.' },
      { t: 'Startup products', d: 'MVPs and mobile apps built in milestones with demos, with the source code handed over.' },
      { t: 'Websites for B2B brands', d: 'Fast, search-ready company websites with clear calls to action and CRM-connected forms.' },
    ],
    industries: ['Real Estate', 'Software Companies', 'Manufacturing', 'Healthcare', 'AI & ML Companies'],
    faqs: [
      { q: 'Do you meet clients in Gurgaon in person?', a: 'Yes. We meet clients at their office anywhere in Delhi NCR, including Gurugram and Manesar, and use Google Meet for quick calls and regular project update meetings.' },
      { q: 'Can you build internal tools for our corporate team?', a: 'Yes. We build approval workflows, dashboards and team tools around your process, with role-based access for each team.' },
      { q: 'Do you build ERP for automotive suppliers?', a: 'Yes. We build production planning, bills of materials, inventory and dispatch modules, connected with accounts and GST.' },
      { q: 'How much does software development cost?', a: 'It depends on the scope and integrations. After a free call we send a written scope with a fixed price in INR, so the cost does not change midway.' },
    ],
  },
];
