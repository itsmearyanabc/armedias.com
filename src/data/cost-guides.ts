// Cost guides at /pricing/<slug>/. Every price is a market figure copied from the published
// guide named in `sources` (checked on the guide's `checked` date). None of them is an
// AR Medias price: every project gets a fixed quote after a free call, so the pages always
// invite visitors to share their budget instead of quoting ours.

/** Which kind of project a row describes; the planner matches the visitor's choice to it. */
export type TierKey = 'diy' | 'landing' | 'basic' | 'business' | 'pro' | 'integrated' | 'store' | 'custom';

export interface CostTier {
  key: TierKey;
  label: string;
  detail: string;
  min: number;
  /** Omitted when the source gives only a starting figure ("and up"). */
  max?: number;
  /** The source writes the top of the range with a plus ("₹4,00,000+"). */
  plus?: boolean;
  /** Recurring price, for example a website builder plan. */
  per?: 'year' | 'month';
  /** Index into the market's `sources`. */
  source: number;
}

export interface MarketCost {
  /** Matches `markets[].slug` in site.ts (country name, flag code and currency come from there). */
  slug: string;
  /** Locale used to format this market's prices. */
  locale: string;
  /** Omitted when no reliable public figures were found; the page then shows `notes` only. */
  currency?: string;
  intro: string;
  tiers: CostTier[];
  ongoing: { label: string; value: string; source: number }[];
  timeline?: { text: string; source: number };
  highlight?: { text: string; source: number };
  notes?: string[];
  sources: { publisher: string; title: string; url: string; date: string }[];
}

export interface PlannerOption { id: string; label: string }

/** Names accepted by AnimatedIcon.astro. */
export type IconName = 'layers' | 'founder' | 'receipt' | 'key' | 'clock' | 'bolt' | 'target' | 'chat' | 'sparkle' | 'handshake' | 'demo' | 'board' | 'lock' | 'rocket' | 'stack' | 'mentor' | 'home';

export interface CostGuide {
  slug: string;
  /** services.ts slug of the service this guide prices. */
  service: string;
  /** What is being priced, for link text such as "What a website costs in USA". */
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h1Accent: string;
  lead: string;
  quickAnswer: string;
  checked: string;
  markets: MarketCost[];
  planner: {
    types: { id: string; label: string; detail: string; tiers: TierKey[] }[];
    features: PlannerOption[];
  };
  factors: { t: string; d: string; icon: IconName }[];
  faqs: { q: string; a: string }[];
}

const fuzen = { publisher: 'Fuzen', title: 'Website Development Cost in India 2026', url: 'https://www.fuzen.io/posts/website-development-cost-in-india', date: '10 Aug 2026' };

export const costGuides: CostGuide[] = [
  {
    slug: 'website-development-cost',
    service: 'website-development',
    short: 'website',
    metaTitle: 'Website Cost 2026: India, USA, UAE, Japan & More | AR Medias',
    metaDescription: 'Website costs in 2026 across India, the USA, UAE, Canada, Australia, Japan, China and Russia, from published market guides. Share your budget for a quote.',
    h1: 'How much does a website cost',
    h1Accent: 'in 2026?',
    lead: 'What shapes the cost of a website in eight countries, from simple builder sites to custom platforms. Whatever your budget, there is a sensible way to start: tell us what you have and we will plan what fits.',
    quickAnswer: 'It depends on what your website needs to do and who builds it. Tell us your budget and we will plan a version that fits it, then grow it as your business grows.',
    checked: '7 November 2026',
    markets: [
      {
        slug: 'india',
        locale: 'en-IN',
        currency: 'INR',
        intro: 'India has website builders at every price, from freelancers to large agencies, so even small budgets can get a professional site.',
        tiers: [
          { key: 'diy', label: 'Website builder, do it yourself', detail: 'Hosting, templates and security in one yearly plan', min: 2000, max: 6000, per: 'year', source: 0 },
          { key: 'landing', label: 'Simple site, 1–5 pages', detail: 'Static or template-based site', min: 5000, max: 50000, source: 0 },
          { key: 'business', label: 'Small business site, 5–15 pages', detail: 'Freelancer or agency build', min: 10000, max: 80000, source: 0 },
          { key: 'pro', label: 'Professional business site, 10–20 pages', detail: 'Custom design', min: 80000, max: 150000, source: 0 },
          { key: 'store', label: 'Online store', detail: 'Built by an agency', min: 150000, max: 400000, plus: true, source: 0 },
          { key: 'custom', label: 'Custom web platform', detail: 'Enterprise sites and web apps', min: 250000, max: 1000000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Domain', value: '₹500–₹1,500 a year', source: 0 },
          { label: 'Hosting', value: '₹2,000–₹8,000 a year', source: 0 },
          { label: 'Payment gateway fees', value: '2–3% per transaction', source: 0 },
        ],
        highlight: { text: 'Agency-built business websites with a CMS: ₹50,000 to ₹2,00,000 in a second 2026 guide.', source: 1 },
        sources: [
          { publisher: 'Hostinger', title: 'How much does a website cost in India in 2026?', url: 'https://www.hostinger.com/in/tutorials/website-cost/', date: '26 Feb 2026' },
          fuzen,
        ],
      },
      {
        slug: 'usa',
        locale: 'en-US',
        currency: 'USD',
        intro: 'US prices are among the highest in this guide, which is why some American companies hire a team abroad for the build.',
        tiers: [
          { key: 'diy', label: 'Website builder, do it yourself', detail: 'Business plan billed yearly', min: 204, max: 1440, per: 'year', source: 0 },
          { key: 'landing', label: 'Freelancer website', detail: 'Simple site', min: 500, max: 3000, source: 1 },
          { key: 'business', label: 'Small business site by a freelancer', detail: 'Typical small business build', min: 2000, max: 7600, source: 0 },
          { key: 'pro', label: 'Small business site by an agency', detail: 'Full-service agency', min: 5000, max: 15000, source: 0 },
          { key: 'store', label: 'Online store', detail: 'Ecommerce website', min: 5000, max: 40000, source: 1 },
          { key: 'custom', label: 'Custom web application', detail: 'Agency build', min: 15000, max: 150000, plus: true, source: 1 },
        ],
        ongoing: [
          { label: 'Domain', value: '$12–$25 a year', source: 0 },
          { label: 'Hosting', value: '$40–$250 a year', source: 0 },
          { label: 'Maintenance (self-managed WordPress)', value: '$60–$150 a year', source: 0 },
        ],
        timeline: { text: 'Hired builds take 4–8 weeks on average.', source: 0 },
        sources: [
          { publisher: 'WebsiteSetup', title: 'Small Business Website Costs (What to Expect in 2026)', url: 'https://websitesetup.org/how-much-does-a-website-cost/', date: '22 Nov 2025' },
          fuzen,
        ],
      },
      {
        slug: 'uae',
        locale: 'en-AE',
        currency: 'AED',
        intro: 'Many UAE business sites are built in English and Arabic, which adds design and content work to the price.',
        tiers: [
          { key: 'landing', label: 'Landing page', detail: 'For a launch or campaign', min: 3000, max: 7000, source: 1 },
          { key: 'business', label: 'Basic business website, 3–5 pages', detail: 'Home, About, Services, Contact', min: 3500, max: 8000, source: 0 },
          { key: 'pro', label: 'Corporate or SME website, 10–20 pages', detail: 'Blog, careers, English and Arabic', min: 12000, max: 55000, source: 0 },
          { key: 'store', label: 'E-commerce website', detail: 'Online store', min: 15000, max: 110000, plus: true, source: 0 },
          { key: 'custom', label: 'Custom web app or enterprise platform', detail: 'Integrations and high traffic', min: 50000, max: 275000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Hosting, maintenance and SEO', value: 'Listed as separate ongoing costs', source: 0 },
        ],
        timeline: { text: 'Simpler corporate websites launch in 6–12 weeks with a clear scope.', source: 0 },
        sources: [
          { publisher: 'Element8', title: 'Website Development Cost in Dubai: Complete 2026 Guide', url: 'https://www.element8.ae/blogs/website-development-cost-dubai', date: '10 Apr 2026' },
          { publisher: 'RedBerries', title: 'How Much Does Web Design Cost in Dubai? A 2026 Pricing Guide', url: 'https://redberries.ae/web-design-dubai-price/', date: '2026' },
        ],
      },
      {
        slug: 'canada',
        locale: 'en-CA',
        currency: 'CAD',
        intro: 'Who builds the site matters most in Canada, and bilingual English and French sites add translation and testing.',
        tiers: [
          { key: 'diy', label: 'Website builder, do it yourself', detail: 'Platform and domain, total per year', min: 300, max: 1200, per: 'year', source: 0 },
          { key: 'landing', label: 'Freelancer website', detail: 'Typical freelancer build', min: 1500, max: 7000, source: 0 },
          { key: 'business', label: 'Agency website', detail: 'A 5–10 page site is typically $5,000–$8,000', min: 5000, max: 12000, source: 0 },
          { key: 'pro', label: 'Custom agency build', detail: 'A typical 15–25 page build is $12,000–$22,000', min: 12000, max: 30000, source: 0 },
          { key: 'store', label: 'E-commerce website', detail: 'Standard store to marketplace', min: 5000, max: 40000, plus: true, source: 0 },
          { key: 'custom', label: 'Enterprise or custom build', detail: 'Platforms and multi-location sites', min: 30000, max: 150000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Domain', value: '$15–$25 a year', source: 0 },
          { label: 'Hosting', value: '$150–$600 a year for a small business', source: 0 },
          { label: 'Maintenance plan', value: '$50–$300 a month', source: 0 },
        ],
        timeline: { text: 'Agency builds take 4–8 weeks; custom agency builds 8–12 weeks.', source: 0 },
        sources: [
          { publisher: 'Marvel Marketing', title: 'Website Design Cost Guide for 2026', url: 'https://marvelmarketing.ca/blog/website-design-cost-guide/', date: '27 Apr 2026' },
        ],
      },
      {
        slug: 'australia',
        locale: 'en-AU',
        currency: 'AUD',
        intro: 'Most Australian small business sites land in the low thousands of dollars; bookings, member areas and CRM links push the price up.',
        tiers: [
          { key: 'diy', label: 'Website builder, do it yourself', detail: 'Yearly plan', min: 500, max: 1500, per: 'year', source: 1 },
          { key: 'landing', label: 'Landing page', detail: 'One conversion-focused page', min: 800, max: 3000, source: 0 },
          { key: 'business', label: 'Small business site, 5–10 pages', detail: 'On a proven platform', min: 2000, max: 6000, source: 0 },
          { key: 'pro', label: 'Custom build', detail: 'Custom design, CMS and speed work', min: 6000, max: 15000, source: 0 },
          { key: 'integrated', label: 'Integrated or larger site', detail: 'Bookings, members, CRM integrations', min: 15000, max: 40000, source: 0 },
          { key: 'store', label: 'E-commerce website', detail: 'Store, payments and shipping', min: 5000, max: 60000, plus: true, source: 0 },
          { key: 'custom', label: 'Custom web application', detail: 'Built for your process', min: 30000, max: 150000, plus: true, source: 1 },
        ],
        ongoing: [
          { label: 'Domain', value: 'A$10–A$50 a year', source: 1 },
          { label: 'Shared hosting', value: 'A$20–A$50 a month', source: 1 },
          { label: 'Care plan', value: 'A$50–A$300 a month', source: 0 },
        ],
        timeline: { text: 'Most websites take around 4 to 8 weeks to build.', source: 1 },
        sources: [
          { publisher: "What's The Damage?", title: 'Web Design Cost Australia 2026', url: 'https://whatsthedamage.com.au/web-design-cost/', date: 'Nov 2026' },
          { publisher: 'WP Creative', title: 'How Much Does a Website Cost in Australia? Pricing Guide 2026', url: 'https://wpcreative.com.au/how-much-does-a-website-cost-in-australia/', date: '2026' },
        ],
      },
      {
        slug: 'japan',
        locale: 'ja-JP',
        currency: 'JPY',
        intro: 'Japanese projects usually come with detailed written specifications and careful QA, and prices rise quickly with the size of the vendor.',
        tiers: [
          { key: 'landing', label: 'Small site, 1–10 pages, from a template', detail: 'テンプレート利用', min: 50000, max: 150000, source: 0 },
          { key: 'business', label: 'Small site, 1–10 pages, original design', detail: 'オリジナルデザイン', min: 150000, max: 300000, source: 0 },
          { key: 'pro', label: 'Mid-size site, about 20 pages', detail: 'Can reach about ¥1,000,000 with more features', min: 300000, max: 700000, source: 0 },
          { key: 'custom', label: 'Larger vendors and large sites', detail: 'Mid-to-large agencies, 50+ pages', min: 1000000, source: 0 },
        ],
        ongoing: [
          { label: 'Server', value: '¥600–¥5,000 a month', source: 0 },
          { label: 'Domain', value: '¥1,000–¥5,000 a year', source: 0 },
          { label: 'Outsourced maintenance', value: '¥10,000–¥50,000 a month', source: 0 },
        ],
        highlight: { text: 'On PRONIアイミツ, the average website order was about ¥980,000 and the median ¥540,000 (January 2020 to March 2025).', source: 0 },
        sources: [
          { publisher: 'PRONIアイミツ', title: 'ホームページ制作の費用相場', url: 'https://imitsu.jp/cost/hp-design/', date: '10 Aug 2026' },
        ],
      },
      {
        slug: 'china',
        locale: 'zh-CN',
        intro: 'We could not find a reliable, current public price list for website projects in mainland China, so we show what drives the cost instead of guessing.',
        tiers: [],
        ongoing: [],
        notes: [
          'Sites hosted in mainland China need an ICP filing for the domain, so plan time for it.',
          'Google services such as Fonts, Maps and reCAPTCHA do not load in mainland China, so China-facing sites need alternatives.',
          'Payments usually mean WeChat Pay and Alipay, and many brands also want a WeChat Mini Program.',
          'Chinese-language content and design, written for Baidu rather than Google.',
        ],
        sources: [],
      },
      {
        slug: 'russia',
        locale: 'ru-RU',
        currency: 'RUB',
        intro: 'Russian studios price per project after a brief (техническое задание), and sites are usually built for Yandex search and Yandex Metrica.',
        tiers: [
          { key: 'landing', label: 'Landing page (лендинг)', detail: 'Freelancer 10,000–60,000 ₽; studio 50,000–300,000 ₽', min: 10000, max: 300000, source: 0 },
          { key: 'business', label: 'Business card site (сайт-визитка), 3–7 pages', detail: 'Freelancer or studio', min: 20000, max: 150000, source: 0 },
          { key: 'pro', label: 'Corporate site (корпоративный сайт)', detail: 'Studio build', min: 100000, max: 800000, source: 0 },
          { key: 'store', label: 'Online store (интернет-магазин)', detail: 'Agency build', min: 200000, max: 2500000, source: 0 },
        ],
        ongoing: [
          { label: 'Domain', value: '350–12,000 ₽ a year', source: 0 },
          { label: 'Hosting', value: '300–1,500 ₽ a month', source: 0 },
        ],
        highlight: { text: 'A second 2026 guide puts corporate sites at 150,000–800,000 ₽ and online stores from 400,000 ₽.', source: 1 },
        sources: [
          { publisher: 'Unisender', title: 'Сколько стоит сделать сайт в 2026 году', url: 'https://www.unisender.com/ru/blog/skolko-stoit-sdelat-sajt/', date: '1 Jun 2026' },
          { publisher: 'Timeweb Community (partner article)', title: 'Сколько стоит разработка сайта в 2026 году', url: 'https://timeweb.com/ru/community/articles/skolko-stoit-razrabotka-sayta-v-2026-godu', date: '27 Mar 2026' },
        ],
      },
    ],
    planner: {
      types: [
        { id: 'landing', label: 'Landing page', detail: 'One page for a launch, ad or event', tiers: ['landing', 'business'] },
        { id: 'business', label: 'Business website', detail: 'Home, about, services, contact and more', tiers: ['business', 'landing'] },
        { id: 'pro', label: 'Bigger business site', detail: 'Custom design, many pages, blog', tiers: ['pro', 'business'] },
        { id: 'store', label: 'Online store', detail: 'Products, cart and payments', tiers: ['store', 'pro'] },
        { id: 'custom', label: 'Custom web app or portal', detail: 'Logins, dashboards, integrations', tiers: ['custom', 'integrated', 'pro'] },
      ],
      features: [
        { id: 'design', label: 'Custom design' },
        { id: 'cms', label: 'Blog or easy editing' },
        { id: 'payments', label: 'Online payments' },
        { id: 'booking', label: 'Bookings or enquiry forms' },
        { id: 'whatsapp', label: 'WhatsApp chat or automation' },
        { id: 'languages', label: 'Two or more languages' },
        { id: 'seo', label: 'SEO setup' },
        { id: 'content', label: 'Content writing' },
      ],
    },
    factors: [
      { icon: 'founder', t: 'Who builds it', d: 'A website builder, a freelancer, a small studio or a large agency can quote very different prices for a similar site.' },
      { icon: 'layers', t: 'Design', d: 'A template is quicker and cheaper; a custom design takes more rounds and more time.' },
      { icon: 'stack', t: 'Pages and content', d: 'More pages mean more design, writing and testing. Having your text and photos ready keeps the cost down.' },
      { icon: 'bolt', t: 'Features', d: 'Payments, bookings, logins, CRM links and WhatsApp automation each add build and testing work.' },
      { icon: 'chat', t: 'Languages', d: 'Every extra language adds translation, layout checks and, for Arabic, right-to-left design.' },
      { icon: 'receipt', t: 'Running costs', d: 'Domain, hosting, maintenance and SEO continue after launch, so budget for them from day one.' },
    ],
    faqs: [
      { q: 'How much does a website cost in India?', a: 'Published 2026 guides put a simple 1–5 page site at about ₹5,000 to ₹50,000, a small business site at ₹10,000 to ₹80,000 and an agency-built online store from about ₹1,50,000. Builder plans cost ₹2,000 to ₹6,000 a year.' },
      { q: 'How much does a website cost in the USA?', a: 'A small business site costs about $2,000 to $7,600 from a freelancer and $5,000 to $15,000 from a full-service agency, according to 2026 guides. Custom web applications run from about $15,000 to $150,000 or more.' },
      { q: 'How much does a website cost in Dubai?', a: 'Dubai guides list basic business websites at AED 3,500 to 8,000, corporate sites at AED 12,000 to 55,000 and e-commerce sites from AED 15,000.' },
      { q: 'Can I get a website on a small budget?', a: 'Yes. Starting with fewer pages, a proven template and the features you need first keeps the first version affordable, and you can add more later. Tell us your budget and we will suggest what fits it.' },
      { q: 'Why do website quotes vary so much?', a: 'Quotes differ in who does the work, how much is custom, and what is included: design rounds, content, SEO, testing and support. Compare quotes for the same written scope.' },
      { q: 'Are these AR Medias prices?', a: 'No. They are market figures from the published guides listed on this page. Every AR Medias project gets a fixed quote after a free call, based on your scope and budget.' },
    ],
  },
];
