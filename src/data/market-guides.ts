// Extra, market-specific content for a /locations/<slug>/ page, keyed by markets[].slug.
// Each guide answers what buyers in that country search for (Google suggestions and
// results saved in docs/market-research-2026-11-04/, 4 November 2026). It describes a
// remote team in New Delhi: never an office, address or staff in the market.
// Only facts already true of how AR Medias works go here; nothing about rates, team size
// or minimum project size.

export interface MarketGuide {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Business-hours table: each row is a US time zone with its offset from New Delhi. */
  hours?: {
    heading: string;
    lead: string;
    zones: { name: string; example: string; standard: string; daylight: string }[];
    note: string;
  };
  checklist: { eyebrow: string; heading: string; lead: string; items: { t: string; d: string }[] };
  requirements: { heading: string; items: { t: string; d: string }[] };
  faqs: { q: string; a: string }[];
}

export const marketGuides: Record<string, MarketGuide> = {
  usa: {
    metaTitle: 'Software Development for US Businesses, from India | AR Medias',
    metaDescription: 'Custom software, mobile apps and AI automation for US companies, built by a founder-led team in New Delhi. Fixed USD quotes, calls in US hours, you own the code.',
    h1: 'Software, app & AI development for US businesses, from India',
    hours: {
      heading: 'Your working day, in New Delhi time.',
      lead: 'New Delhi does not change its clocks, so the gap to each US time zone shifts by an hour when US daylight saving time starts and ends. Pick a regular call time that suits both sides.',
      zones: [
        { name: 'Eastern', example: 'New York, Boston, Miami', standard: '10 h 30 min', daylight: '9 h 30 min' },
        { name: 'Central', example: 'Chicago, Dallas, Houston, Austin', standard: '11 h 30 min', daylight: '10 h 30 min' },
        { name: 'Mountain', example: 'Denver', standard: '12 h 30 min', daylight: '11 h 30 min' },
        { name: 'Pacific', example: 'Los Angeles, San Francisco, Seattle', standard: '13 h 30 min', daylight: '12 h 30 min' },
      ],
      note: 'Standard time runs from early November to mid-March; daylight saving time covers the rest of the year. Arizona and Hawaii do not change their clocks.',
    },
    checklist: {
      eyebrow: 'Hiring an offshore team',
      heading: 'Hiring developers in India? What US companies should check first.',
      lead: 'Most offshore projects that go wrong fail on the same few points. Ask any team, including us, about each one before you sign.',
      items: [
        { t: 'Working-hours overlap', d: 'Agree when calls happen and how quickly messages get answered. We reply within one business day and hold calls in your working hours on Google Meet.' },
        { t: 'A written scope and a fixed price', d: 'A scope that lists features, screens and integrations, with a fixed price in USD and milestone payments, protects both sides from a budget that keeps growing.' },
        { t: 'Who owns the code', d: 'Make sure the source code, designs, domains and accounts are yours. With us they are yours from day one, in repositories and accounts you control.' },
        { t: 'How you see progress', d: 'Ask how often you will see working software, not just status reports. We hold regular update meetings with a live demo of what is done and what is next.' },
        { t: 'What happens after launch', d: 'Ask who fixes bugs, applies updates and monitors the app once it is live. We offer monthly maintenance and support, or a clean handover to your own team.' },
        { t: 'A clear way out', d: 'Because the code and accounts are already yours, you can move the project to another team at any point without asking anyone for access.' },
      ],
    },
    requirements: {
      heading: 'Built for how US businesses work.',
      items: [
        { t: 'Accessibility (ADA and WCAG)', d: 'Interfaces built with WCAG guidelines in mind: keyboard navigation, readable contrast, alt text and form labels, so more customers can use your site and app.' },
        { t: 'Privacy (CCPA/CPRA and state laws)', d: 'Consent, data storage and access controls planned around California and other state privacy laws, with data hosted in the US region you choose.' },
        { t: 'Payments and subscriptions', d: 'Stripe checkouts, subscriptions and invoicing, with QuickBooks sync for your accounts team.' },
        { t: 'Your existing SaaS stack', d: 'Integrations with Salesforce, HubSpot, Shopify, Twilio, Zapier and AWS, so new software fits the tools your team already uses.' },
      ],
    },
    faqs: [
      { q: 'How much does custom software development cost?', a: 'It depends on what the software has to do: the number of screens and user roles, the integrations, how much data it handles and whether you need web, mobile or both. We quote each project separately. After a free 30-minute call we send a written scope with a fixed price in USD and milestone payments, so the cost does not change midway.' },
      { q: 'How much does it cost to develop a mobile app?', a: 'The main drivers are the platforms (iOS, Android or both; Flutter and React Native cover both from one codebase), the features, the backend and admin panel behind the app, and the integrations such as payments or maps. We send a fixed USD quote once the scope is written down.' },
      { q: 'Do you charge by the hour?', a: 'No. Projects have a fixed price agreed before work starts. If you want developers working only on your product, you can hire dedicated developers billed monthly instead.' },
      { q: 'Can we hire offshore developers in India through you?', a: 'Yes. Our dedicated developers and designers work only on your product, inside your tools and sprint process, and are billed monthly. See Hire dedicated developers for how it works.' },
    ],
  },
};
