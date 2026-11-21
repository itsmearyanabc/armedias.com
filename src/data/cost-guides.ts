// Cost guides at /pricing/<slug>/. Every price is a market figure copied from the published
// guide named in `sources` (checked on the guide's `checked` date). None of them is an
// AR Medias price: every project gets a fixed quote after a free call, so the pages always
// invite visitors to share their budget instead of quoting ours.

/** Which kind of project a row describes; the planner matches the visitor's choice to it. */
export type TierKey = 'diy' | 'landing' | 'basic' | 'business' | 'pro' | 'integrated' | 'store' | 'custom'
  | 'mvp' | 'simple' | 'medium' | 'complex' | 'enterprise';

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
  /** "Start smart, then grow" steps; the website wording is used when omitted. */
  startSmall?: { t: string; d: string }[];
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
  {
    slug: 'app-development-cost',
    service: 'mobile-app-development',
    short: 'mobile app',
    metaTitle: 'App Development Cost 2026: India, USA & More | AR Medias',
    metaDescription: 'Mobile app development costs in 2026 across India, the USA, UAE, Canada, Australia, Japan, China and Russia, from published guides. Share your budget.',
    h1: 'How much does an app cost',
    h1Accent: 'in 2026?',
    lead: 'What shapes the cost of a mobile app in eight countries, from a first MVP to a large platform. Whatever your budget, there is a sensible first version: tell us what you have and we will plan what fits.',
    quickAnswer: 'It depends on the features, the platforms and who builds it. Most apps start as a small first version with the few features users need most. Tell us your budget and we will plan that version, then grow it.',
    checked: '22 November 2026',
    markets: [
      {
        slug: 'india',
        locale: 'en-IN',
        currency: 'INR',
        intro: 'India has app teams at every size and price, so a focused first version is within reach of most small businesses and startups.',
        tiers: [
          { key: 'simple', label: 'Basic app', detail: 'Login, a few core screens, simple backend', min: 760000, max: 1900000, source: 0 },
          { key: 'medium', label: 'Mid-complexity app', detail: 'Payments, integrations, admin panel', min: 1900000, max: 5700000, source: 0 },
          { key: 'complex', label: 'Complex or enterprise app', detail: 'Real-time features, AI, large user base', min: 5700000, max: 14300000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Maintenance', value: '15–25% of the build cost a year', source: 0 },
          { label: 'Apple Developer Program', value: '$99 a year', source: 1 },
          { label: 'Google Play registration', value: '$25 once', source: 1 },
        ],
        timeline: { text: 'Basic apps take 1–3 months; mid-complexity apps 3–7 months.', source: 0 },
        highlight: { text: 'A second 2026 guide says an MVP with 3–5 core features can be built for ₹3–5 lakh.', source: 1 },
        sources: [
          { publisher: 'SolGuruz', title: 'How Much Does App Development Cost in India in 2026?', url: 'https://solguruz.com/blog/app-development-cost-in-india/', date: '17 Aug 2026' },
          { publisher: 'Zartek', title: 'App Development Cost in India 2026: Detailed Breakdown by Type and Complexity', url: 'https://www.zartek.in/app-development-cost-in-india-2026/', date: '2026' },
        ],
      },
      {
        slug: 'usa',
        locale: 'en-US',
        currency: 'USD',
        intro: 'US app builds are among the most expensive in this guide, which is why many American founders build their first version with a team abroad.',
        tiers: [
          { key: 'simple', label: 'Simple app', detail: 'Traditional development', min: 5000, max: 50000, source: 0 },
          { key: 'medium', label: 'Medium-complexity app', detail: 'Traditional development', min: 50000, max: 120000, source: 0 },
          { key: 'complex', label: 'Complex app', detail: 'Traditional development', min: 120000, max: 300000, plus: true, source: 0 },
          { key: 'enterprise', label: 'Enterprise or advanced app', detail: 'Agency build', min: 300000, max: 400000, plus: true, source: 1 },
        ],
        ongoing: [
          { label: 'Maintenance', value: '15–20% of the build cost a year', source: 1 },
        ],
        timeline: { text: 'Simple apps and MVPs take 2–4 months.', source: 1 },
        sources: [
          { publisher: 'Bubble', title: 'How Much Does It Cost to Create an App in 2026?', url: 'https://bubble.io/blog/how-much-does-it-cost-to-create-an-app/', date: '17 Aug 2026' },
          { publisher: 'Designveloper', title: 'How Much Does It Cost to Build an App? 2026 Breakdown', url: 'https://www.designveloper.com/blog/how-much-does-it-cost-to-make-an-app/', date: '23 Apr 2026' },
        ],
      },
      {
        slug: 'uae',
        locale: 'en-AE',
        currency: 'AED',
        intro: 'UAE apps are often bilingual English and Arabic, and larger agencies in Dubai charge well above the ranges below.',
        tiers: [
          { key: 'simple', label: 'Simple app', detail: 'Core screens and a basic backend', min: 25000, max: 80000, source: 0 },
          { key: 'medium', label: 'Moderate app', detail: 'More features and integrations', min: 40000, max: 80000, plus: true, source: 0 },
          { key: 'complex', label: 'Complex app', detail: 'Advanced features and integrations', min: 80600, max: 200000, plus: true, source: 0 },
          { key: 'enterprise', label: 'Enterprise platform', detail: 'Large organisations', min: 1100000, max: 1800000, plus: true, source: 0 },
        ],
        ongoing: [],
        timeline: { text: 'Simple apps take 2–3 months; moderate apps 3–5 months.', source: 0 },
        sources: [
          { publisher: 'Netguru', title: 'Mobile App Development Cost In Dubai, UAE for 2026', url: 'https://www.netguru.com/blog/mobile-development-cost-dubai-uae', date: '5 Dec 2025' },
        ],
      },
      {
        slug: 'canada',
        locale: 'en-CA',
        currency: 'CAD',
        intro: 'In Canada the biggest difference in price is who builds the app: a freelancer, a small studio or a large agency.',
        tiers: [
          { key: 'simple', label: 'Freelancer build', detail: 'Custom business app', min: 15000, max: 50000, source: 0 },
          { key: 'medium', label: 'Small studio build', detail: 'Custom business app', min: 25000, max: 100000, source: 0 },
          { key: 'complex', label: 'Large agency build', detail: 'Custom business app', min: 75000, max: 250000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Hosting', value: 'Often under $200 a month at small-business scale', source: 0 },
        ],
        timeline: { text: 'Most builds ship in 6 to 12 weeks.', source: 0 },
        sources: [
          { publisher: 'Clear', title: 'How Much Does a Custom App Cost in Canada? (2026 Guide)', url: 'https://getclear.ca/guides/custom-app-cost-canada', date: 'Jul 2026' },
        ],
      },
      {
        slug: 'australia',
        locale: 'en-AU',
        currency: 'AUD',
        intro: 'Australian agencies price most small apps as an MVP first, then grow them; enterprise and regulated builds cost far more.',
        tiers: [
          { key: 'mvp', label: 'Simple app or MVP', detail: 'Focused first version', min: 15000, max: 40000, source: 0 },
          { key: 'medium', label: 'Mid-range business app', detail: 'Integrations and admin tools', min: 40000, max: 150000, source: 0 },
          { key: 'complex', label: 'Complex or enterprise app', detail: 'Large or regulated platforms', min: 150000, max: 500000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Maintenance', value: 'Around 15–20% of the build cost a year', source: 0 },
        ],
        timeline: { text: 'A simple app or MVP takes 4–8 weeks; a mid-range app 8–16 weeks.', source: 0 },
        sources: [
          { publisher: 'Expeed Technology', title: 'How Much Does It Cost to Build an App in Australia? (2026 Prices)', url: 'https://expeed.com.au/articles/app-development-cost-australia', date: '9 Aug 2026' },
        ],
      },
      {
        slug: 'japan',
        locale: 'ja-JP',
        currency: 'JPY',
        intro: 'Japanese app projects come with detailed specifications and careful testing, and the type of app changes the price more than anything else.',
        tiers: [
          { key: 'simple', label: 'Business app', detail: '業務アプリ', min: 500000, max: 8000000, plus: true, source: 0 },
          { key: 'medium', label: 'Matching app', detail: 'マッチングアプリ', min: 2000000, max: 8000000, plus: true, source: 0 },
          { key: 'store', label: 'E-commerce app', detail: 'ECアプリ', min: 3000000, max: 10000000, plus: true, source: 0 },
          { key: 'complex', label: 'Game app', detail: 'ゲームアプリ', min: 5000000, max: 20000000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Maintenance', value: 'About 15% of the development cost a year', source: 0 },
          { label: 'Apple Developer Program', value: '$99 a year', source: 0 },
        ],
        timeline: { text: 'App projects take 4–6 months on average.', source: 0 },
        highlight: { text: 'On PRONIアイミツ, app projects averaged about ¥4.2 million, with a median of ¥2.9 million (January 2019 to November 2025).', source: 0 },
        sources: [
          { publisher: 'PRONIアイミツ', title: 'アプリ開発の費用はいくら？実際の取引データを根拠とした料金相場を公開', url: 'https://imitsu.jp/cost/app-developer/', date: '16 Jun 2026' },
        ],
      },
      {
        slug: 'china',
        locale: 'zh-CN',
        intro: 'We could not find a reliable, current public price list for app projects in mainland China, so we show what drives the cost instead of guessing.',
        tiers: [],
        ongoing: [],
        notes: [
          'Google Play is not available in mainland China, so Android apps are published on Chinese stores such as Huawei AppGallery, Xiaomi and Tencent MyApp.',
          'Apps offered in mainland China need a government app filing, so plan time for it.',
          'Many brands also build a WeChat Mini Program, which users open without installing an app.',
          'Payments usually mean WeChat Pay and Alipay, and Google services such as Maps and Firebase need Chinese alternatives.',
        ],
        sources: [],
      },
      {
        slug: 'russia',
        locale: 'ru-RU',
        currency: 'RUB',
        intro: 'Russian studios estimate apps from a written brief (техническое задание), and many apps are now also published in RuStore.',
        tiers: [
          { key: 'mvp', label: 'MVP or simple app', detail: 'Studio rate about 3,900 ₽ an hour', min: 2100000, max: 4400000, source: 0 },
          { key: 'medium', label: 'Medium-complexity app', detail: 'Studio build', min: 4000000, max: 12000000, source: 0 },
          { key: 'complex', label: 'Complex system', detail: 'Studio build', min: 15000000, source: 0 },
        ],
        ongoing: [
          { label: 'Support with new features', value: 'About 50% of the build cost in year one, 25% or less after', source: 0 },
        ],
        timeline: { text: 'Simple apps take 3–4 months; medium apps 4–6 months.', source: 0 },
        sources: [
          { publisher: 'Purrweb', title: 'Сколько стоит разработка мобильного приложения', url: 'https://www.purrweb.com/ru/blog/skolko-stoit-razrabotka-prilozheniya/', date: '20 Oct 2026' },
        ],
      },
    ],
    planner: {
      types: [
        { id: 'mvp', label: 'First version (MVP)', detail: 'The few features users need most', tiers: ['mvp', 'simple'] },
        { id: 'business', label: 'Business app', detail: 'Orders, bookings or a customer portal', tiers: ['simple', 'medium'] },
        { id: 'store', label: 'Shopping or delivery app', detail: 'Catalogue, cart, payments, tracking', tiers: ['store', 'medium', 'complex'] },
        { id: 'platform', label: 'Marketplace or platform', detail: 'Two sides, real-time, admin tools', tiers: ['complex', 'enterprise'] },
      ],
      features: [
        { id: 'both', label: 'iPhone and Android' },
        { id: 'login', label: 'Logins and profiles' },
        { id: 'payments', label: 'In-app payments' },
        { id: 'admin', label: 'Admin panel' },
        { id: 'notifications', label: 'Push notifications' },
        { id: 'maps', label: 'Maps or live location' },
        { id: 'chat', label: 'Chat or WhatsApp' },
        { id: 'ai', label: 'AI features' },
      ],
    },
    factors: [
      { icon: 'stack', t: 'Platforms', d: 'One cross-platform app for iPhone and Android usually costs less than two separate native apps.' },
      { icon: 'bolt', t: 'Features', d: 'Payments, live location, chat and AI each add design, build and testing work.' },
      { icon: 'layers', t: 'Backend and admin', d: 'Most apps need a server, a database and an admin panel, which is often a large share of the work.' },
      { icon: 'founder', t: 'Who builds it', d: 'A freelancer, a small studio or a large agency can quote very different prices for a similar app.' },
      { icon: 'rocket', t: 'Start with an MVP', d: 'Launching the few features users need most first keeps the first budget small and shows what to build next.' },
      { icon: 'clock', t: 'After launch', d: 'Store fees, hosting, updates for new phone versions and fixes are ongoing costs to plan for.' },
    ],
    startSmall: [
      { t: 'The core features', d: 'Launch with the few screens users need to get value: sign-up, the main task and contact.' },
      { t: 'One codebase', d: 'A single cross-platform app for iPhone and Android costs less than two native apps.' },
      { t: 'Add features later', d: 'Payments, chat or AI can come in the next version, once real users show what they want.' },
    ],
    faqs: [
      { q: 'How much does a simple app cost?', a: 'Published 2026 guides put a simple app at roughly ₹7.6–19 lakh in India and $5,000–$50,000 in the USA. A focused first version can cost less. Tell us your budget and we will plan what fits.' },
      { q: 'Is it cheaper to build one app for iPhone and Android?', a: 'Usually yes. A cross-platform framework such as Flutter or React Native shares one codebase between both stores, which saves build and maintenance time.' },
      { q: 'What does an app cost after launch?', a: 'Plan for store fees, hosting and maintenance. Guides in this page put yearly maintenance at about 15–25% of the build cost.' },
      { q: 'How long does it take to build an app?', a: 'A focused first version often takes 1–3 months; bigger apps take 3–7 months or more, depending on features.' },
      { q: 'Do you share your own prices here?', a: 'No. These are published market figures. Every AR Medias project gets a fixed quote after a free call, based on your scope and budget.' },
    ],
  },
  {
    slug: 'ecommerce-website-cost',
    service: 'ecommerce-development',
    short: 'online store',
    metaTitle: 'Online Store Cost 2026: India, USA, UAE & More | AR Medias',
    metaDescription: 'Online store costs in 2026 across India, the USA, UAE, Canada, Australia, Japan, China and Russia, from published guides. Share your budget for a quote.',
    h1: 'How much does an online store cost',
    h1Accent: 'in 2026?',
    lead: 'What shapes the cost of an e-commerce website in eight countries, from a hosted store to a custom platform. Whatever your budget, there is a sensible way to start selling online: tell us what you have and we will plan what fits.',
    quickAnswer: 'It depends on the platform, the number of products and the integrations you need. Many stores start on a hosted platform and add custom features as sales grow. Tell us your budget and we will plan that path.',
    checked: '22 November 2026',
    markets: [
      {
        slug: 'india', locale: 'en-IN', currency: 'INR',
        intro: 'Indian stores range from template shops on a monthly plan to custom platforms with ERP and logistics links, so there is a starting point for most budgets.',
        tiers: [
          { key: 'basic', label: 'Template-built store', detail: 'Ready theme, standard checkout', min: 15000, max: 50000, source: 0 },
          { key: 'pro', label: 'Mid-level store', detail: 'Custom design and integrations', min: 100000, max: 500000, source: 0 },
          { key: 'enterprise', label: 'Enterprise store', detail: 'Large catalogues and custom systems', min: 1000000, source: 0 },
        ],
        ongoing: [
          { label: 'Store builder plans', value: '₹1,000–₹10,000 a month for small and medium stores', source: 0 },
          { label: 'Shopify', value: '₹2,400–₹24,000 a month', source: 0 },
        ],
        sources: [
          { publisher: 'Hostinger', title: 'Ecommerce website cost: a 2026 breakdown', url: 'https://www.hostinger.com/in/tutorials/ecommerce-website-cost/', date: '5 Mar 2026' },
        ],
      },
      {
        slug: 'usa', locale: 'en-US', currency: 'USD',
        intro: 'Most US small businesses start on a hosted platform; custom builds and enterprise stores cost far more.',
        tiers: [
          { key: 'basic', label: 'Small business store', detail: 'Hosted platform with a theme', min: 2000, max: 10000, source: 0 },
          { key: 'pro', label: 'Mid-size brand', detail: 'Custom design and apps', min: 10000, max: 50000, source: 0 },
          { key: 'enterprise', label: 'Enterprise store', detail: 'Custom platform and integrations', min: 100000, max: 500000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Running costs, small store', value: '$30–$500 a month', source: 0 },
          { label: 'Domain', value: '$10–$50 a year', source: 0 },
        ],
        sources: [
          { publisher: 'Zoho Commerce', title: 'Ecommerce website costs: Breakdown, pricing & tips for 2026', url: 'https://www.zoho.com/commerce/academy/ecommerce-website-cost.html', date: '3 Feb 2026' },
        ],
      },
      {
        slug: 'uae', locale: 'en-AE', currency: 'AED',
        intro: 'UAE stores are often bilingual English and Arabic and connect to local gateways and buy-now-pay-later services.',
        tiers: [
          { key: 'basic', label: 'Basic store', detail: 'Shopify or WooCommerce', min: 5000, max: 15000, source: 0 },
          { key: 'pro', label: 'Mid-level custom store', detail: 'Custom design and features', min: 15000, max: 50000, source: 0 },
          { key: 'enterprise', label: 'Enterprise e-commerce platform', detail: 'Large catalogues and integrations', min: 100000, max: 200000, plus: true, source: 0 },
          { key: 'custom', label: 'Multivendor marketplace', detail: 'Sellers, commissions, payouts', min: 180000, max: 300000, plus: true, source: 1 },
        ],
        ongoing: [
          { label: 'Maintenance, small store', value: 'AED 500–1,500 a month', source: 1 },
        ],
        timeline: { text: 'Basic stores take 2–4 weeks; mid-level stores 4–8 weeks.', source: 0 },
        sources: [
          { publisher: 'Element8', title: 'Ecommerce Website Design UAE: Cost, Features & Process Guide', url: 'https://www.element8.ae/blogs/ecommerce-website-design-uae-cost-features', date: '22 Apr 2026' },
          { publisher: 'Cubix', title: 'How Much Does Ecommerce Development Cost in Dubai? (2026 Guide)', url: 'https://www.cubix.co/ae/blog/ecommerce-development-cost-in-dubai/', date: '30 Apr 2026' },
        ],
      },
      {
        slug: 'canada', locale: 'en-CA', currency: 'CAD',
        intro: 'Canadian stores often need English and French content and province-by-province tax handling at checkout.',
        tiers: [
          { key: 'basic', label: 'Basic Shopify store', detail: 'Theme setup and products', min: 3000, max: 10000, source: 0 },
          { key: 'pro', label: 'Mid-level custom store', detail: 'Custom design and apps', min: 10000, max: 40000, source: 0 },
          { key: 'enterprise', label: 'Advanced or enterprise store', detail: 'Custom build and integrations', min: 40000, max: 150000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Shopify subscription', value: '$39–$399+ a month', source: 0 },
          { label: 'Apps and tools', value: '$50–$500 a month', source: 0 },
        ],
        timeline: { text: 'Basic stores take 2–4 weeks; mid-level stores 1–3 months.', source: 0 },
        highlight: { text: 'A second 2026 guide puts basic stores at CAD 5,000–20,000 and mid-level stores at CAD 20,000–60,000.', source: 1 },
        sources: [
          { publisher: 'CartCoders', title: 'How Much Does It Cost to Build an eCommerce Website in Canada (2026)', url: 'https://cartcoders.com/blog/ecommerce/ecommerce-website-development-cost-canada/', date: '17 Mar 2026' },
          { publisher: 'Netclues', title: 'A Complete Breakdown Of E-Commerce Website Cost In Canada In 2026', url: 'https://www.netclues.com/blog/e-commerce-website-cost-canada', date: '19 Jan 2026' },
        ],
      },
      {
        slug: 'australia', locale: 'en-AU', currency: 'AUD',
        intro: 'Australian custom stores usually start in the low five figures; portals, B2B features and integrations push the price up.',
        tiers: [
          { key: 'store', label: 'Custom e-commerce website', detail: 'Catalogue, cart and checkout', min: 10000, max: 30000, source: 0 },
          { key: 'integrated', label: 'Integrations', detail: 'Payments, inventory, ERP, accounting, shipping', min: 5000, max: 25000, source: 0 },
          { key: 'custom', label: 'Commerce as software', detail: 'Portals, accounts, multi-warehouse, B2B', min: 25000, max: 100000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Upkeep', value: '10–25% of the build cost a year', source: 0 },
        ],
        sources: [
          { publisher: "What's The Damage?", title: 'Ecommerce Website Cost in Melbourne (2026)', url: 'https://whatsthedamage.com.au/web-development-cost-melbourne/ecommerce-website-cost/', date: 'Nov 2026' },
        ],
      },
      {
        slug: 'japan', locale: 'ja-JP', currency: 'JPY',
        intro: 'In Japan the build method changes the price most: a hosted shop, an open-source store, a package or a full custom system.',
        tiers: [
          { key: 'pro', label: 'Open-source store', detail: 'EC-CUBE or WooCommerce', min: 1000000, max: 5000000, source: 0 },
          { key: 'custom', label: 'Full custom build', detail: 'フルスクラッチ', min: 5000000, source: 0 },
        ],
        ongoing: [],
        timeline: { text: 'Full custom stores take 4–8 months; package builds 2–5 months.', source: 0 },
        highlight: { text: 'On PRONIアイミツ, e-commerce site builds averaged about ¥1.33 million, with a median of about ¥710,000 (2020 to 2025). Hosted shops such as Shopify or BASE start from free.', source: 0 },
        sources: [
          { publisher: 'PRONIアイミツ', title: 'ECサイト構築費用の平均相場は133万', url: 'https://imitsu.jp/cost/hp-design/article/ecsite', date: '9 Oct 2025' },
        ],
      },
      {
        slug: 'china', locale: 'zh-CN',
        intro: 'We could not find a reliable, current public price list for online stores in mainland China, so we show what drives the cost instead of guessing.',
        tiers: [], ongoing: [],
        notes: [
          'Many brands sell through marketplaces such as Tmall and JD.com as well as, or instead of, their own site.',
          'A store hosted in mainland China needs an ICP filing for its domain.',
          'Checkout means WeChat Pay and Alipay, and many shops also run inside a WeChat Mini Program.',
          'Chinese-language product content, written for Baidu and the marketplaces rather than Google.',
        ],
        sources: [],
      },
      {
        slug: 'russia', locale: 'ru-RU', currency: 'RUB',
        intro: 'Russian stores are often built on 1C-Bitrix or a SaaS builder and connect to 1C for stock and accounting.',
        tiers: [
          { key: 'basic', label: 'Store builder or SaaS', detail: 'Конструктор', min: 15000, max: 80000, source: 0 },
          { key: 'pro', label: 'Store on a CMS', detail: 'For example 1C-Bitrix', min: 80000, max: 500000, source: 0 },
          { key: 'custom', label: 'Custom development', detail: 'Own architecture', min: 300000, max: 1000000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'SaaS subscription', value: '750–9,800 ₽ a month', source: 0 },
          { label: 'Technical support', value: '10,000–80,000 ₽ a month', source: 0 },
          { label: '1C-Bitrix licence', value: 'From 47,000 ₽ once', source: 0 },
        ],
        sources: [
          { publisher: 'Яндекс Пэй', title: 'Стоимость интернет-магазина: разработка, сервисы и поддержка', url: 'https://pay.yandex.ru/blog/articles/stoimost-internet-magazina', date: '21 Aug 2026' },
        ],
      },
    ],
    planner: {
      types: [
        { id: 'starter', label: 'First store', detail: 'A hosted store with your products', tiers: ['basic', 'diy'] },
        { id: 'brand', label: 'Branded store', detail: 'Custom design, apps, marketing tools', tiers: ['pro', 'store'] },
        { id: 'integrated', label: 'Store with ERP or stock links', detail: 'Inventory, accounting and shipping sync', tiers: ['integrated', 'pro', 'custom'] },
        { id: 'marketplace', label: 'Marketplace or B2B portal', detail: 'Many sellers or business buyers', tiers: ['custom', 'enterprise'] },
      ],
      features: [
        { id: 'products', label: 'Large product catalogue' },
        { id: 'payments', label: 'Local payment methods' },
        { id: 'shipping', label: 'Shipping and courier links' },
        { id: 'stock', label: 'Stock or ERP sync' },
        { id: 'whatsapp', label: 'WhatsApp orders or updates' },
        { id: 'languages', label: 'Two or more languages' },
        { id: 'app', label: 'Mobile app too' },
        { id: 'seo', label: 'SEO setup' },
      ],
    },
    factors: [
      { icon: 'stack', t: 'Platform', d: 'A hosted platform is quickest to start; open-source and custom builds cost more but give full control.' },
      { icon: 'layers', t: 'Catalogue size', d: 'Hundreds of products with variants need more setup, filters and data work than a small range.' },
      { icon: 'bolt', t: 'Integrations', d: 'Payment gateways, couriers, ERP and accounting links each add build and testing work.' },
      { icon: 'receipt', t: 'Running costs', d: 'Platform plans, apps, hosting and payment fees continue every month after launch.' },
      { icon: 'chat', t: 'Languages and markets', d: 'Extra languages, currencies and tax rules add translation and checkout work.' },
      { icon: 'rocket', t: 'Start, then grow', d: 'Launching with your best sellers on a simple store keeps the first budget small.' },
    ],
    startSmall: [
      { t: 'Your best sellers', d: 'Launch with the products that sell most, with good photos and clear prices.' },
      { t: 'A hosted platform', d: 'A ready platform with a branded theme costs far less than a custom build at the start.' },
      { t: 'Add features later', d: 'Loyalty, B2B pricing or ERP sync can follow once the store is selling.' },
    ],
    faqs: [
      { q: 'How much does a small online store cost?', a: 'Published 2026 guides put template-built stores at roughly ₹15,000–₹50,000 in India and small business stores at $2,000–$10,000 in the USA, plus monthly platform costs. Tell us your budget and we will plan what fits.' },
      { q: 'Shopify, WooCommerce or custom?', a: 'Shopify is quickest to launch, WooCommerce gives more control on your own hosting, and a custom build suits complex catalogues, B2B pricing or deep ERP links.' },
      { q: 'What are the monthly costs of an online store?', a: 'Platform plan, apps, hosting, payment gateway fees and maintenance. This page lists the published figures for each country.' },
      { q: 'Do you share your own prices here?', a: 'No. These are published market figures. Every AR Medias project gets a fixed quote after a free call, based on your scope and budget.' },
    ],
  },
  {
    slug: 'crm-development-cost',
    service: 'crm-development',
    short: 'custom CRM',
    metaTitle: 'Custom CRM Cost 2026: India, USA & UAE | AR Medias',
    metaDescription: 'What a custom CRM costs to build in 2026 in India, the USA and the UAE, from published guides, plus yearly running costs. Share your budget for a quote.',
    h1: 'How much does a custom CRM cost',
    h1Accent: 'in 2026?',
    lead: 'What shapes the cost of a custom CRM in India, the USA and the UAE, from a focused sales pipeline to an enterprise system. Tell us what you have to spend and we will plan the first version that fits.',
    quickAnswer: 'It depends on the number of users, the modules and the systems it has to connect to. Most businesses start with a lead pipeline and follow-ups, then add the rest. Tell us your budget and we will plan that first version.',
    checked: '22 November 2026',
    markets: [
      {
        slug: 'india', locale: 'en-IN', currency: 'INR',
        intro: 'Indian custom CRMs often pull leads from IndiaMART, Justdial and WhatsApp and need GST-ready invoices, so integrations shape the price.',
        tiers: [
          { key: 'simple', label: 'Basic CRM', detail: 'Leads, pipeline, follow-ups', min: 300000, max: 800000, source: 0 },
          { key: 'enterprise', label: 'Enterprise CRM', detail: 'Multiple teams and integrations', min: 700000, max: 1500000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Hosting, maintenance and improvements', value: '₹3,00,000–₹5,00,000 a year', source: 0 },
        ],
        timeline: { text: 'A basic CRM takes 8–12 weeks; an enterprise CRM with many integrations 4–6 months.', source: 0 },
        sources: [
          { publisher: 'CloudHouse Technologies', title: 'Custom CRM Development Cost in India (2026): Complete Pricing Guide', url: 'https://cloudhousetechnologies.com/blog/custom-crm-development-cost-india-2026', date: '4 Oct 2026' },
        ],
      },
      {
        slug: 'usa', locale: 'en-US', currency: 'USD',
        intro: 'US guides price custom CRMs by scope, and many American companies compare them against years of per-seat SaaS fees.',
        tiers: [
          { key: 'mvp', label: 'Basic CRM or MVP', detail: 'Offshore team rates', min: 25000, max: 50000, source: 0 },
          { key: 'medium', label: 'Mid-level CRM', detail: 'Automation and integrations', min: 50000, max: 150000, source: 0 },
          { key: 'enterprise', label: 'Advanced or enterprise CRM', detail: 'Large teams, complex workflows', min: 150000, max: 300000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Maintenance', value: '15–20% of the build cost a year', source: 0 },
        ],
        timeline: { text: 'A basic CRM takes 2–4 months; a mid-level CRM 4–8 months.', source: 0 },
        highlight: { text: 'A second guide puts a simple CRM or MVP at $15,000–$40,000.', source: 1 },
        sources: [
          { publisher: 'CISIN', title: 'What is the Average Cost of Developing a Custom CRM? A 2026 Cost Breakdown', url: 'https://www.cisin.com/coffee-break/what-is-the-average-cost-of-developing-a-custom-crm.html', date: '25 Dec 2025' },
          { publisher: 'Galaxy Weblinks', title: 'Custom CRM Development Cost in 2026: A Complete Pricing Breakdown', url: 'https://www.galaxyweblinks.com/blog/custom-crm-development-cost', date: '19 Nov 2025' },
        ],
      },
      {
        slug: 'uae', locale: 'en-AE', currency: 'AED',
        intro: 'UAE CRMs often need English and Arabic, WhatsApp lead handling and links to accounting or ERP, which add to the build.',
        tiers: [
          { key: 'simple', label: 'Basic CRM', detail: 'Leads, contacts, pipeline', min: 15000, max: 40000, source: 0 },
          { key: 'medium', label: 'Mid-level CRM', detail: 'Automation and integrations', min: 40000, max: 120000, source: 0 },
          { key: 'enterprise', label: 'Enterprise CRM', detail: 'Large teams and systems', min: 120000, max: 500000, plus: true, source: 0 },
        ],
        ongoing: [],
        highlight: { text: 'The same guide puts WhatsApp, SMS or VoIP integration at AED 1,100–73,000+, depending on depth.', source: 0 },
        sources: [
          { publisher: 'Dynamologic', title: 'Cost to Build a Custom CRM System in the UAE', url: 'https://www.dynamologic.ae/blog/cost-to-build-a-custom-crm-system-in-the-uae/', date: '22 Jun 2026' },
        ],
      },
    ],
    planner: {
      types: [
        { id: 'pipeline', label: 'Lead pipeline', detail: 'Capture, assign and follow up leads', tiers: ['simple', 'mvp'] },
        { id: 'sales', label: 'Sales and service CRM', detail: 'Quotes, tickets, reports', tiers: ['medium', 'simple'] },
        { id: 'industry', label: 'Industry CRM', detail: 'Real estate, education, clinics…', tiers: ['medium', 'enterprise'] },
        { id: 'enterprise', label: 'Company-wide CRM', detail: 'Many teams, branches and systems', tiers: ['enterprise'] },
      ],
      features: [
        { id: 'leads', label: 'Leads from portals and ads' },
        { id: 'whatsapp', label: 'WhatsApp follow-ups' },
        { id: 'calls', label: 'Calling and call logs' },
        { id: 'quotes', label: 'Quotes and invoices' },
        { id: 'mobile', label: 'Mobile app for the team' },
        { id: 'accounting', label: 'Accounting or ERP link' },
        { id: 'reports', label: 'Dashboards and reports' },
        { id: 'ai', label: 'AI replies or scoring' },
      ],
    },
    factors: [
      { icon: 'founder', t: 'Users and roles', d: 'More teams, branches and permission levels mean more screens, rules and testing.' },
      { icon: 'stack', t: 'Modules', d: 'Leads, quotes, tickets, inventory or projects each add their own build work.' },
      { icon: 'bolt', t: 'Integrations', d: 'Lead portals, WhatsApp, telephony and accounting links are often the largest single cost.' },
      { icon: 'board', t: 'Reports', d: 'Custom dashboards and exports for managers add design and data work.' },
      { icon: 'key', t: 'You own it', d: 'A custom CRM has no per-seat fee, so the cost compares well with SaaS as your team grows.' },
      { icon: 'clock', t: 'After launch', d: 'Hosting, updates and new features are yearly costs to plan for.' },
    ],
    startSmall: [
      { t: 'One pipeline first', d: 'Start with lead capture, assignment and follow-ups, the part that brings in revenue.' },
      { t: 'Your key integration', d: 'Connect the one lead source or WhatsApp number that matters most before the rest.' },
      { t: 'Add modules later', d: 'Quotes, tickets or inventory can follow once the team uses the CRM every day.' },
    ],
    faqs: [
      { q: 'How much does a custom CRM cost?', a: 'Published 2026 guides put a basic custom CRM at roughly ₹3–8 lakh in India, $25,000–$50,000 in the USA and AED 15,000–40,000 in the UAE. Tell us your budget and we will plan what fits.' },
      { q: 'Is a custom CRM cheaper than Zoho, HubSpot or Salesforce?', a: 'Often over a few years for larger teams, because a custom CRM has no per-user fee. For a small team with a standard process, a ready-made CRM can be the better start.' },
      { q: 'What does a CRM cost to run each year?', a: 'Hosting, maintenance and improvements. Guides on this page put yearly maintenance at about 15–20% of the build cost.' },
      { q: 'Do you share your own prices here?', a: 'No. These are published market figures. Every AR Medias project gets a fixed quote after a free call, based on your scope and budget.' },
    ],
  },
  {
    slug: 'erp-development-cost',
    service: 'erp-development',
    short: 'ERP',
    metaTitle: 'ERP Cost 2026: Custom ERP vs Tally, Zoho, SAP | AR Medias',
    metaDescription: 'ERP costs in 2026: custom ERP builds in the USA and UAE, and what Indian SMBs pay for Tally, Zoho One and SAP Business One, from published guides.',
    h1: 'How much does an ERP cost',
    h1Accent: 'in 2026?',
    lead: 'What a custom ERP costs to build in the USA and the UAE, and what Indian businesses pay for ready-made ERP. Tell us your budget and modules, and we will plan the first phase that fits.',
    quickAnswer: 'It depends on the modules, users, locations and integrations. Most businesses start with one or two modules, such as inventory and sales, and add the rest in phases. Tell us your budget and we will plan the first phase.',
    checked: '22 November 2026',
    markets: [
      {
        slug: 'india', locale: 'en-IN', currency: 'INR',
        intro: 'Many Indian SMBs compare a custom ERP with ready-made software. These are published prices for popular ready-made options; a custom ERP is quoted on your modules and users.',
        tiers: [
          { key: 'diy', label: 'Tally Prime', detail: 'Licence, ready-made software', min: 18000, max: 54000, per: 'year', source: 0 },
          { key: 'simple', label: 'Zoho One', detail: 'Per user, ready-made suite', min: 1500, max: 4500, per: 'month', source: 0 },
          { key: 'enterprise', label: 'SAP Business One, first year', detail: 'Software plus implementation', min: 1500000, max: 4000000, source: 0 },
        ],
        ongoing: [
          { label: 'Implementation partner consulting', value: '₹2,500–₹6,000 an hour', source: 0 },
        ],
        highlight: { text: 'The same guide says a 50-user first year runs from about ₹5 lakh with Zoho to over ₹25 lakh with SAP Business One.', source: 0 },
        sources: [
          { publisher: 'Fuzen', title: 'How Much Does ERP Software Cost for Indian SMBs?', url: 'https://www.fuzen.io/posts/how-much-does-erp-software-cost-for-indian-smbs', date: '18 May 2026' },
        ],
      },
      {
        slug: 'usa', locale: 'en-US', currency: 'USD',
        intro: 'US guides price custom ERP by the number of departments and locations it serves, with implementation and training on top of the build.',
        tiers: [
          { key: 'mvp', label: 'Starter ERP', detail: 'Small business, one location', min: 40000, max: 100000, source: 0 },
          { key: 'medium', label: 'Mid-market ERP', detail: 'Several departments', min: 100000, max: 250000, source: 0 },
          { key: 'enterprise', label: 'Enterprise ERP', detail: 'Multiple locations', min: 250000, max: 600000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Maintenance', value: '15–25% of the build cost a year', source: 0 },
        ],
        timeline: { text: 'A starter ERP takes 3–6 months; a mid-market ERP 6–12 months.', source: 0 },
        highlight: { text: 'A second guide puts a single custom ERP module at $30,000–$80,000.', source: 1 },
        sources: [
          { publisher: 'CMARIX', title: 'How Much Does ERP Software Development Cost in 2026?', url: 'https://www.cmarix.com/blog/erp-software-development-cost/', date: '28 Oct 2026' },
          { publisher: 'RaftLabs', title: 'How Much Does Custom ERP Development Cost in 2026?', url: 'https://www.raftlabs.com/blog/erp-development-cost', date: '4 Sep 2025' },
        ],
      },
      {
        slug: 'uae', locale: 'en-AE', currency: 'AED',
        intro: 'UAE ERPs need VAT-ready invoicing and often Arabic and WPS payroll, and many firms compare a custom build with Odoo or Zoho.',
        tiers: [
          { key: 'simple', label: 'Small business ERP', detail: 'HR, payroll, finance, inventory', min: 36000, max: 92000, source: 0 },
          { key: 'medium', label: 'Mid-sized business ERP', detail: 'Adds CRM, reports, mobile, workflows', min: 92000, max: 183000, source: 0 },
          { key: 'enterprise', label: 'Enterprise ERP', detail: 'Large, multi-department systems', min: 183000, max: 367000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Maintenance', value: '15–20% of the build cost a year', source: 1 },
          { label: 'Hosting', value: 'AED 200–600 a month', source: 1 },
        ],
        highlight: { text: 'A second 2026 guide puts a small-business custom ERP at AED 24,500–245,000 excluding VAT, built in 6–16 weeks.', source: 1 },
        sources: [
          { publisher: 'Apptunix', title: 'Custom ERP Software Development Cost in Dubai (2026 Guide)', url: 'https://www.apptunix.com/blog/erp-software-development-cost-in-dubai/', date: '18 Sep 2026' },
          { publisher: 'Codingclave', title: 'ERP Software Price for UAE Small Business: 3-Year Cost 2026', url: 'https://codingclave.com/blog/erp-software-small-business-uae-price-2026', date: '12 Oct 2026' },
        ],
      },
    ],
    planner: {
      types: [
        { id: 'module', label: 'One module first', detail: 'For example inventory or billing', tiers: ['simple', 'mvp'] },
        { id: 'core', label: 'Core ERP', detail: 'Inventory, sales, purchase, accounts', tiers: ['medium', 'simple'] },
        { id: 'manufacturing', label: 'Manufacturing ERP', detail: 'Production, batches, quality', tiers: ['medium', 'enterprise'] },
        { id: 'enterprise', label: 'Multi-location ERP', detail: 'Branches, warehouses, approvals', tiers: ['enterprise'] },
      ],
      features: [
        { id: 'inventory', label: 'Inventory and warehouses' },
        { id: 'production', label: 'Production tracking' },
        { id: 'accounts', label: 'Accounts or Tally link' },
        { id: 'tax', label: 'GST or VAT invoicing' },
        { id: 'hr', label: 'HR and payroll' },
        { id: 'dealers', label: 'Dealer or B2B portal' },
        { id: 'mobile', label: 'Mobile app' },
        { id: 'reports', label: 'Dashboards and reports' },
      ],
    },
    factors: [
      { icon: 'stack', t: 'Modules', d: 'Each module, such as inventory, production or payroll, adds its own screens, rules and testing.' },
      { icon: 'founder', t: 'Users and locations', d: 'More branches, warehouses and approval levels make the system larger.' },
      { icon: 'bolt', t: 'Integrations', d: 'Accounting software, e-invoicing, banks and couriers each need their own connection.' },
      { icon: 'board', t: 'Data migration', d: 'Moving old items, customers and balances in cleanly takes planning and checks.' },
      { icon: 'key', t: 'Build or buy', d: 'Ready-made ERP has licence fees every year; a custom ERP has a build cost and no per-user fee.' },
      { icon: 'clock', t: 'Training and support', d: 'Teams need training, and the system needs updates as the business changes.' },
    ],
    startSmall: [
      { t: 'The painful module first', d: 'Start where errors cost most, often inventory or order tracking.' },
      { t: 'Keep your accounts', d: 'Export to the accounting software you already use instead of replacing it on day one.' },
      { t: 'Add phases later', d: 'Production, HR or dealer portals can follow once the first module is in daily use.' },
    ],
    faqs: [
      { q: 'How much does a custom ERP cost?', a: 'Published 2026 guides put a starter custom ERP at $40,000–$100,000 in the USA and a small-business ERP at AED 36,000–92,000 in the UAE. Indian businesses often compare this with Tally, Zoho One or SAP Business One. Tell us your budget and we will plan what fits.' },
      { q: 'Custom ERP or Odoo, ERPNext or Tally?', a: 'Ready-made systems are quicker to start when your process matches theirs. A custom ERP suits a process they cannot follow without workarounds, and you own the code.' },
      { q: 'Can we build an ERP in phases?', a: 'Yes. Most ERPs start with one or two modules and grow, which keeps the first budget and the risk small.' },
      { q: 'Do you share your own prices here?', a: 'No. These are published market figures. Every AR Medias project gets a fixed quote after a free call, based on your scope and budget.' },
    ],
  },
  {
    slug: 'ai-chatbot-cost',
    service: 'ai-automation',
    short: 'AI chatbot',
    metaTitle: 'AI Chatbot & WhatsApp Automation Cost 2026 | AR Medias',
    metaDescription: 'What an AI chatbot or WhatsApp automation costs in 2026 in India and the USA: build ranges, monthly running costs and WhatsApp message fees.',
    h1: 'How much does an AI chatbot cost',
    h1Accent: 'in 2026?',
    lead: 'What AI chatbots and WhatsApp automation cost to build and run in India and the USA, from a simple FAQ bot to an AI assistant that answers from your own documents. Tell us your budget and we will plan the bot that fits.',
    quickAnswer: 'It depends on what the bot must answer, where it runs (website, WhatsApp, Instagram) and how many conversations it handles. Running costs matter as much as the build. Tell us your budget and we will plan both.',
    checked: '22 November 2026',
    markets: [
      {
        slug: 'india', locale: 'en-IN', currency: 'INR',
        intro: 'In India most business chatbots run on WhatsApp, so Meta’s per-message fees and the provider’s platform fee are part of the monthly cost.',
        tiers: [
          { key: 'simple', label: 'Rule-based FAQ bot', detail: 'Menus and fixed answers', min: 35000, max: 125000, source: 0 },
          { key: 'medium', label: 'Intent-based bot', detail: 'Dialogflow or Rasa', min: 125000, max: 300000, source: 0 },
          { key: 'integrated', label: 'WhatsApp AI chatbot', detail: 'AI replies on WhatsApp', min: 200000, max: 550000, source: 0 },
          { key: 'complex', label: 'AI chatbot', detail: 'GPT or Claude with your content', min: 250000, max: 600000, source: 0 },
          { key: 'enterprise', label: 'Enterprise AI assistant', detail: 'Many systems and teams', min: 550000, max: 1500000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'AI chatbot running cost', value: '₹8,000–₹40,000 a month', source: 0 },
          { label: 'WhatsApp marketing message (Meta)', value: '₹0.8631 each', source: 1 },
          { label: 'WhatsApp utility or authentication message (Meta)', value: '₹0.115 each', source: 1 },
          { label: 'WhatsApp provider platform fee', value: '₹999–₹9,999 a month', source: 1 },
        ],
        timeline: { text: 'A rule-based bot takes 2–3 weeks; an AI chatbot 6–10 weeks.', source: 0 },
        highlight: { text: 'From 1 October 2026, Meta gives 1,000 free service messages per business number each month. GST of 18% applies to Meta and provider charges.', source: 1 },
        sources: [
          { publisher: 'Codingclave', title: 'Chatbot Price in India 2026', url: 'https://codingclave.com/blog/ai-chatbot-development-cost-india-2026', date: '29 Oct 2026' },
          { publisher: 'MyOperator', title: "WhatsApp Business API Pricing in India: What You're Actually Paying For in 2026", url: 'https://myoperator.com/blog/whatsapp-business-api-pricing-india-2026', date: '17 Nov 2026' },
        ],
      },
      {
        slug: 'usa', locale: 'en-US', currency: 'USD',
        intro: 'US guides price chatbots by how they understand questions, from fixed menus to AI that searches your documents, and running costs grow with conversations.',
        tiers: [
          { key: 'simple', label: 'Rule-based chatbot', detail: 'Fixed flows and answers', min: 3000, max: 15000, source: 0 },
          { key: 'medium', label: 'NLP chatbot', detail: 'Understands intents', min: 15000, max: 50000, source: 0 },
          { key: 'complex', label: 'LLM-powered chatbot', detail: 'Generative AI answers', min: 30000, max: 100000, source: 0 },
          { key: 'integrated', label: 'RAG chatbot', detail: 'Answers from your own documents', min: 50000, max: 150000, source: 0 },
          { key: 'enterprise', label: 'Voice or multimodal assistant', detail: 'Speech, images and text', min: 80000, max: 300000, plus: true, source: 0 },
        ],
        ongoing: [
          { label: 'Total running costs', value: '$400–$6,000 a month', source: 1 },
          { label: 'WhatsApp marketing message, North America (Meta)', value: 'About $0.025 each', source: 2 },
          { label: 'WhatsApp utility message, North America (Meta)', value: 'About $0.0034 each', source: 2 },
        ],
        timeline: { text: 'A rule-based bot takes 2–4 weeks; an LLM-powered bot 8–16 weeks.', source: 0 },
        sources: [
          { publisher: 'Space-O Technologies', title: 'AI Chatbot Development Cost in 2026: Pricing, Factors, and ROI', url: 'https://www.spaceotechnologies.com/blog/ai-chatbot-development-cost/', date: '21 Nov 2026' },
          { publisher: 'RaftLabs', title: 'AI Chatbot Development Services: 2026 Cost Guide', url: 'https://www.raftlabs.com/blog/chatbot-development-cost', date: '14 Jun 2026' },
          { publisher: 'Zernio', title: "WhatsApp Business API Pricing: How It Works & What's Better", url: 'https://zernio.com/blog/whatsapp-business-api-pricing', date: '12 Oct 2026' },
        ],
      },
    ],
    planner: {
      types: [
        { id: 'faq', label: 'FAQ or lead bot', detail: 'Answers common questions, collects leads', tiers: ['simple', 'medium'] },
        { id: 'whatsapp', label: 'WhatsApp automation', detail: 'Greetings, replies, reminders, broadcasts', tiers: ['integrated', 'medium'] },
        { id: 'ai', label: 'AI assistant on your content', detail: 'Answers from your documents and website', tiers: ['complex', 'integrated'] },
        { id: 'enterprise', label: 'AI agent with your systems', detail: 'Bookings, orders, CRM actions', tiers: ['enterprise', 'complex'] },
      ],
      features: [
        { id: 'whatsapp', label: 'WhatsApp' },
        { id: 'website', label: 'Website chat' },
        { id: 'instagram', label: 'Instagram DMs' },
        { id: 'crm', label: 'Saves leads to a CRM' },
        { id: 'booking', label: 'Bookings or orders' },
        { id: 'documents', label: 'Answers from documents' },
        { id: 'languages', label: 'Hindi or other languages' },
        { id: 'handover', label: 'Hand-over to a human' },
      ],
    },
    factors: [
      { icon: 'chat', t: 'How smart it is', d: 'Fixed menus cost least; AI that understands free text and searches your documents costs more.' },
      { icon: 'stack', t: 'Channels', d: 'Website chat, WhatsApp and Instagram each need their own setup and approvals.' },
      { icon: 'bolt', t: 'Integrations', d: 'Saving leads to a CRM, booking slots or checking orders adds build work.' },
      { icon: 'receipt', t: 'Running costs', d: 'AI model fees, hosting and WhatsApp message fees grow with the number of conversations.' },
      { icon: 'lock', t: 'Accuracy and safety', d: 'Testing answers, limiting what the bot may say and handing over to a person take care.' },
      { icon: 'rocket', t: 'Start narrow', d: 'A bot that answers your top questions well beats a bot that tries everything.' },
    ],
    startSmall: [
      { t: 'Your top questions', d: 'Launch with the 10–20 questions customers ask most and a clear hand-over to your team.' },
      { t: 'One channel first', d: 'Start where your customers already message you, often WhatsApp or website chat.' },
      { t: 'Add AI later', d: 'Free-text AI answers, bookings and CRM actions can follow once the basics work.' },
    ],
    faqs: [
      { q: 'How much does an AI chatbot cost?', a: 'Published 2026 guides put a rule-based bot at roughly ₹35,000–₹1,25,000 in India and $3,000–$15,000 in the USA, and AI chatbots higher. Running costs come on top. Tell us your budget and we will plan what fits.' },
      { q: 'What does WhatsApp automation cost each month?', a: 'Meta charges per message by category and country, the provider charges a platform fee, and AI replies add model costs. This page lists the published figures.' },
      { q: 'Can the bot answer from our own documents?', a: 'Yes. A retrieval-based (RAG) chatbot searches your documents and website before answering, which keeps answers specific to your business.' },
      { q: 'Do you share your own prices here?', a: 'No. These are published market figures. Every AR Medias project gets a fixed quote after a free call, based on your scope and budget.' },
    ],
  },
];
