// The "In detail" section for India city pages (/locations/india/<slug>/), keyed by slug.
// Each covers the work businesses in that city search for, in wording unique to the page.
// Projects outside Delhi NCR run remotely from New Delhi with Google Meet calls; only the
// Noida and Gurgaon guides offer in-person meetings, which the office is close enough for.
export interface CityGuide { title: string; sections: { h: string; p: string; href?: string }[] }

const crm = '/services/crm-development/';
const erp = '/services/erp-development/';
const custom = '/services/custom-software-development/';
const apps = '/services/mobile-app-development/';
const shop = '/services/ecommerce-development/';
const ai = '/services/ai-automation/';
const ml = '/services/ai-machine-learning/';
const web = '/services/website-development/';

export const indiaCityGuides: Record<string, CityGuide> = {
  mumbai: {
    title: 'Software for Mumbai developers, brands and traders.',
    sections: [
      { h: 'CRM for real estate projects', href: crm, p: 'Enquiries from 99acres, MagicBricks, Housing.com, ads and walk-ins land in one CRM and are assigned to sales by project. Site visits, unit holds, bookings and channel partner payouts are tracked against each lead, so the sales head sees which campaign actually sold flats.' },
      { h: 'D2C stores that keep customers coming back', href: shop, p: 'Shopify or custom stores with UPI and card checkout, COD rules by pin code, shipping integration and WhatsApp order updates. Repeat-purchase reminders and loyalty run on the same customer data, not a separate tool.' },
      { h: 'ERP for importers and distributors', href: erp, p: 'Import costing with duty and freight, stock by warehouse, party-wise rates, credit limits and outstanding follow-ups, with GST invoices and Tally sync for the accounts team in the back office.' },
    ],
  },
  bangalore: {
    title: 'Product engineering for Bangalore startups.',
    sections: [
      { h: 'From MVP to a product that scales', href: custom, p: 'We help founders cut the first version down to one core workflow, ship it in milestones with demos, and keep the architecture clean enough that the next hires can build on it rather than rewrite it.' },
      { h: 'AI features inside your product', href: ml, p: 'Search that understands questions, summaries, document extraction and assistants grounded in your own data. Each feature is tested on real examples before release, with clear limits on what the model may answer.' },
      { h: 'Extra capacity for product teams', href: '/hire-dedicated-developers/', p: 'Developers who join your sprint planning and code reviews, work in your repository and follow your standards, when the roadmap is bigger than the team you can hire this quarter.' },
    ],
  },
  hyderabad: {
    title: 'Software for Hyderabad clinics, developers and IT firms.',
    sections: [
      { h: 'Clinic and hospital software', href: custom, p: 'Appointments, patient records, billing, pharmacy and lab reports in one system, with access by role so staff see only what their work needs. Patients get booking confirmations and reports on WhatsApp.' },
      { h: 'AI for document-heavy work', href: ai, p: 'AI that reads prescriptions, claims, invoices and KYC documents, pulls out the fields and flags anything unusual for a person to check. Staff review results instead of typing them.' },
      { h: 'Internal tools for IT and consulting firms', p: 'Resource planning, timesheets, project billing and client dashboards that replace the spreadsheets passed around every month-end, with numbers that match what goes on the invoice.' },
    ],
  },
  chennai: {
    title: 'ERP and portals for Chennai manufacturers and exporters.',
    sections: [
      { h: 'Manufacturing ERP for auto components', href: erp, p: 'Bills of materials, production planning, job work, batch traceability and dispatch against customer schedules, with quality checks recorded at each stage so a part can be traced back when a customer asks.' },
      { h: 'Dealer and distributor portals', href: custom, p: 'Dealers log in to place orders, check stock and schemes, download invoices and see their ledger. Orders flow straight into the ERP, and the sales team stops taking orders over the phone.' },
      { h: 'Export documentation', p: 'Commercial invoices, packing lists, certificates of origin and shipping documents generated from the order record, so the same details are not retyped for every shipment and buyer.' },
    ],
  },
  pune: {
    title: 'Software for Pune manufacturers and institutes.',
    sections: [
      { h: 'ERP for engineering and job-work units', href: erp, p: 'Job work challans in and out, material reconciliation with principals, production by machine and shift, and rejection tracking, with GST and e-way bills generated from the same records.' },
      { h: 'Admission CRM and learning platforms', href: crm, p: 'Enquiries from ads and portals assigned to counsellors, follow-ups on WhatsApp, applications, fee instalments and batch allocation, plus an LMS for lectures, tests and attendance.' },
      { h: 'Vendor portals and field service apps', href: apps, p: 'Suppliers see purchase orders and upload invoices themselves; service engineers log visits, parts used and customer sign-off on a phone, even where the network is weak.' },
    ],
  },
  kolkata: {
    title: 'Distribution software for Kolkata businesses.',
    sections: [
      { h: 'Distributor management software', href: erp, p: 'Beat plans, retailer orders, schemes, stock at distributors and claims in one system, for FMCG and pharma companies selling through distributors across eastern India.' },
      { h: 'Ordering apps for retailers and salesmen', href: apps, p: 'Retailers reorder from a simple app in Bengali or English, and salesmen book orders on their route with offline support. Orders reach the distributor and the billing system without being written down twice.' },
      { h: 'Billing with GST and Tally sync', p: 'Fast counter billing, godown-wise stock, batch and expiry tracking for pharma, and automatic sync of sales and purchases to Tally so the accountant keeps the books as before.' },
    ],
  },
  ahmedabad: {
    title: 'ERP and B2B ordering for Ahmedabad manufacturers.',
    sections: [
      { h: 'ERP for textile, chemical and pharma units', href: erp, p: 'Batch-wise production, lot and shade tracking for textiles, formulation and QC records for chemicals and pharma, and costing per batch, with GST invoicing and Tally sync built in.' },
      { h: 'B2B ordering for dealers and buyers', href: shop, p: 'A trade portal with customer-specific prices, minimum order quantities, credit limits and order tracking, so dealers order online at any hour and your team only handles exceptions.' },
      { h: 'Websites for buyers abroad', href: web, p: 'Export-focused websites with product catalogues, certifications and enquiry forms, written for overseas buyers and built to load quickly from any country.' },
    ],
  },
  noida: {
    title: 'IT and software services for Noida businesses.',
    sections: [
      { h: 'Meet in person, close to our Delhi office', p: 'Noida is a short trip from our Kirti Nagar office, so scoping meetings, demos and training sessions can happen at your office. Day-to-day updates continue on Google Meet.' },
      { h: 'Products for startups in Noida', href: custom, p: 'MVPs and SaaS products with accounts, roles, billing and admin panels, built in milestones with a working demo at each, and handed over with full source code and documentation.' },
      { h: 'ERP for MSME and electronics manufacturers', href: erp, p: 'Component stock, bills of materials, production orders, serial number tracking and warranty records, with GST invoicing and e-way bills generated from the same system.' },
    ],
  },
  gurgaon: {
    title: 'Software for Gurgaon corporates and suppliers.',
    sections: [
      { h: 'Internal tools for corporate teams', href: custom, p: 'Approval workflows, MIS dashboards, vendor onboarding and team portals that replace email chains and shared spreadsheets, with single sign-on and access by role.' },
      { h: 'AI for back-office work', href: ai, p: 'AI that reads invoices, contracts and emails, routes them to the right person and drafts replies or entries for approval, so back-office teams spend their time on exceptions.' },
      { h: 'ERP for Manesar automotive suppliers', href: erp, p: 'Production against OEM schedules, bills of materials, batch traceability, rejection tracking and dispatch, with in-person process mapping at your plant before the scope is written.' },
    ],
  },
};
