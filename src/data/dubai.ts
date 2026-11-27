// Dubai service pages at /locations/uae/dubai/<slug>/ (Dubai SEO project, Nov 2026). Each page
// targets one group of searches found in the keyword research (docs/dubai-seo-2026-11-24/),
// so pages never compete with each other. The hub stays at /locations/uae/dubai/.
//
// Content rules (agreed with Aryan):
// - Every heading is a question a Dubai buyer asks; the first sentence answers it.
// - Only real facts: our real projects and clients, and published prices with their source
//   and date. No invented numbers, reviews or offices. We work remotely from New Delhi.
// - Prices sit in a closed "published ranges" panel, not in the main text: the page talks
//   budget and scope first.

export interface DubaiSource { publisher: string; title: string; url: string; date: string }

export interface DubaiService {
  slug: string;
  /** services.ts slug this page belongs to; empty for Dubai-only offers with no main-site service */
  service: string;
  /** Short label for links between Dubai pages */
  name: string;
  /** industries.ts slugs whose pages link here */
  industries?: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Word or phrase in the H1 that gets the orange underline */
  accent: string;
  /** The direct answer under the H1: what we build, for whom, how we work, how pricing works */
  answer: string;
  /** "What Dubai businesses ask us to build" */
  builds: { t: string; d: string }[];
  /** Question-led sections: h is the buyer's question, the first paragraph answers it */
  sections: { h: string; p: string[]; list?: string[] }[];
  /** Case study slugs from projects.ts shown as proof */
  projects: string[];
  /** Extra proof written from facts Aryan supplied (shown with the case studies) */
  proofNotes?: { client: string; text: string }[];
  /** Published Dubai price ranges, shown in a closed panel */
  prices?: { intro: string; rows: { label: string; range: string }[]; drivers: string[]; sources: DubaiSource[]; guide?: string };
  faqs: { q: string; a: string }[];
  /** Fixed-price offer shown as the hero card (lead generation trial) */
  offer?: { label: string; price: string; priceNote: string; promise: string; includes: string[]; cta: string };
  /** Guarantee terms, shown in full as a numbered list */
  guarantee?: { title: string; intro: string; terms: { t: string; d: string }[] };
  /** Lead calculator: published cost-per-lead ranges by industry, in AED */
  calculator?: { intro: string; industries: { name: string; low: number; high: number; source: string }[]; sources: DubaiSource[] };
}

const element8Web: DubaiSource = { publisher: 'Element8', title: 'Website Development Cost in Dubai: Complete 2026 Guide', url: 'https://www.element8.ae/blogs/website-development-cost-dubai', date: '10 Apr 2026' };
const dxbWeb: DubaiSource = { publisher: 'DXB Apps', title: 'Website Development Cost in Dubai, UAE [2026 Edition]', url: 'https://dxbapps.com/blog/website-development-cost-in-dubai', date: '23 Dec 2025' };
const apptunixApp: DubaiSource = { publisher: 'Apptunix', title: 'Mobile App Development Cost in Dubai, UAE', url: 'https://www.apptunix.com/blog/mobile-app-development-cost-dubai-uae/', date: 'updated 15 Apr 2026' };
const techugoApp: DubaiSource = { publisher: 'Techugo', title: 'How Much Does App Development Cost in Dubai in 2026?', url: 'https://www.techugo.com/blog/how-much-does-app-development-cost-in-dubai-in-2026/', date: 'updated 19 Nov 2026' };
const apptunixErp: DubaiSource = { publisher: 'Apptunix', title: 'ERP Software Development Cost in Dubai', url: 'https://www.apptunix.com/blog/erp-software-development-cost-in-dubai/', date: 'updated 18 Sep 2026' };
const codingclaveUae: DubaiSource = { publisher: 'Codingclave', title: 'AI & WhatsApp Chatbot Development Dubai: Cost & Monthly Fees (price list)', url: 'https://codingclave.com/uae/services/ai-chatbot-development', date: '8 Nov 2026' };

// Lead generation pricing benchmarks (vendor-published, collected 27 Nov 2026)
const clozerCpl: DubaiSource = { publisher: 'Clozer', title: 'Average Cost Per Lead by Industry in UAE: 2026 Benchmarks', url: 'https://clozer.pages.dev/blog/cpl-uae-2026.html', date: '2026' };
const prospeoDubai: DubaiSource = { publisher: 'Prospeo', title: 'Best Lead Generation Companies in Dubai (2026)', url: 'https://prospeo.io/s/lead-generation-company-in-dubai', date: '2026' };
const recdLeads: DubaiSource = { publisher: 'Real Estate Club Dubai', title: 'Lead Partnerships: Exclusive Dubai Property Leads', url: 'https://realestateclubdubai.com/lead-partnerships', date: '2026' };
const tombaDubai: DubaiSource = { publisher: 'Tomba', title: 'Lead Generation Company in Dubai: How to Pick One in 2026', url: 'https://tomba.io/blog/lead-generation-company-in-dubai', date: '21 Sep 2026' };

// The lead generation trial and its guarantee: one definition, used by every lead generation
// page so the terms can never differ between pages (Aryan, 27 Nov 2026: only the trial price
// is published; pricing after it is custom, agreed on a call).
const leadTrialOffer: NonNullable<DubaiService['offer']> = {
      label: 'One-month trial',
      price: '$399',
      priceNote: 'about AED 1,465, ad spend separate',
      promise: '100 qualified leads, or we keep working free until you have them',
      includes: ['Meta and Google campaigns', 'Landing page for your offer', 'WhatsApp reply in seconds', 'Live lead dashboard', 'Every industry we work with'],
      cta: 'Start the trial',
    };

const leadGuarantee: NonNullable<DubaiService['guarantee']> = {
      title: 'The 100-lead guarantee, in full',
      intro: 'Written before the trial starts and signed by both sides. Plain terms, no fine print hidden elsewhere.',
      terms: [
        { t: 'What counts', d: 'A real person who asked about your product or service through our campaigns, in your agreed area, with a phone or WhatsApp number we have confirmed reaches them. Duplicates, wrong numbers, competitors, job seekers, sellers and spam never count.' },
        { t: 'What we do not promise', d: 'Sales. We deliver qualified leads and the follow-up automation; closing them is your team\'s job. A lead that met the definition when we delivered it stays counted.' },
        { t: 'The ad budget', d: 'Agreed in writing before the trial, from your industry\'s cost per lead, and paid from your own Meta and Google ad accounts. The guarantee holds at that budget.' },
        { t: 'Your side', d: 'Someone replies to new leads within 30 minutes during working hours, or our WhatsApp automation replies for you.' },
        { t: 'Timing', d: 'The trial month runs from the day the first campaign goes live, which is usually within the first week.' },
        { t: 'If a lead is bad', d: 'Tell us within 7 days and we replace it.' },
        { t: 'If we miss 100', d: 'We keep running the campaigns with no management fee until you have 100 qualified leads. Ad spend during that time is still paid by you, from your own account.' },
        { t: 'Industries', d: 'Every industry we work with. Not covered: gambling, multi-level marketing, and products the ad platforms do not allow.' },
        { t: 'You own everything', d: 'Ad accounts, pages, landing pages, CRM and every lead. If you stop, nothing stays with us.' },
      ],
    };

// How Dubai clients pay us (Aryan, 24 Nov 2026)
const payment = 'We quote in AED or US dollars and accept Stripe, PayPal, USDT or another method you prefer.';

export const dubaiServices: DubaiService[] = [
  {
    slug: 'lead-generation-company',
    // Dubai-only offer: no main-site service page links here, and only the trial price is shown
    // (Aryan, 27 Nov 2026: pricing after the trial is custom, agreed on a call)
    service: '',
    name: 'Lead generation',
    metaTitle: 'Lead Generation Company in Dubai | AR Medias',
    metaDescription: 'Lead generation in Dubai: Meta and Google ads, landing pages and WhatsApp follow-up. 1-month trial at $399, 100 qualified leads guaranteed.',
    h1: 'Lead generation company in Dubai',
    accent: 'Dubai',
    answer: 'We find customers for Dubai businesses: ads on Meta and Google, a landing page built for your offer, and WhatsApp follow-up that answers every enquiry in seconds. Start with a one-month trial for $399 (about AED 1,465). If we deliver fewer than 100 qualified leads in that month, we keep working without a fee until we do. Ad spend is separate and runs from your own account.',
    builds: [
      { t: 'Meta and Instagram lead campaigns', d: 'Ads to the people most likely to buy from you, with instant forms or a landing page, tested until the cost per lead comes down.' },
      { t: 'Google Search ads', d: 'Your offer in front of people already searching for it in Dubai, for the searches that bring enquiries rather than browsers.' },
      { t: 'A landing page for one offer', d: 'Built by us for the campaign, quick on mobile data, in English or Arabic, with the form and WhatsApp button where thumbs reach them.' },
      { t: 'WhatsApp reply in seconds', d: 'Every new lead gets a WhatsApp message straight away on the official Business API, with two or three questions that sort buyers from browsers.' },
      { t: 'Every lead in one dashboard', d: 'Name, number, source, time and status for each lead, in your CRM or ours, so you can see which ad brought which customer.' },
      { t: 'Follow-ups that send themselves', d: 'Reminders to people who did not answer, and retargeting ads to those who visited but did not enquire.' },
    ],
    sections: [
      {
        h: 'What counts as a qualified lead?',
        p: [
          'A qualified lead is a real person who asked about your product or service, in your area, with a phone or WhatsApp number that actually reaches them. That is the definition our guarantee uses, written down before the trial starts.',
          'Most disappointing lead generation comes from counting form fills instead of people. So we check every lead on WhatsApp or by phone, and these never count:',
        ],
        list: [
          'Duplicates of someone already in your list',
          'Wrong or unreachable numbers',
          'Competitors, job seekers and people selling to you',
          'Enquiries from outside the area you serve',
          'Spam and test entries',
        ],
      },
      {
        h: 'How does the 100-lead guarantee work?',
        p: [
          'You pay $399 for the first month, plus the ad budget we agree for your industry. If the month ends with fewer than 100 qualified leads, we keep the campaigns running and charge no management fee until you have 100.',
          'Lead counts mean nothing without rules, so the full terms are on this page, below. The two that matter most: you fund the ad budget we set together before starting, and someone on your side replies to leads quickly, or lets our WhatsApp automation reply for you.',
        ],
      },
      {
        h: 'What happens after the trial month?',
        p: [
          'You decide whether to continue. If you do, we agree the next step on a call, because no two businesses need the same thing: the number of offers, areas and channels, and the lead target you want, all change the work.',
          'That call starts from your trial results: what each lead cost, which channel brought the buyers and how quickly your team closed them. The fee and the monthly lead target are then written down before anything starts, and the ad spend stays in your own account as before.',
        ],
      },
      {
        h: 'How much does lead generation cost in Dubai?',
        p: [
          'Two costs add up: the agency fee and the ad spend. Published Dubai guides put agency fees at around AED 3,000 to 7,000 a month on top of ad spend, and full retainers at AED 8,000 to 35,000 a month. Our trial is $399 for the first month; after that, the fee is set on a call around your business.',
          'Ad spend depends on your industry. A lead for a real estate broker costs far less than a lead for a B2B software company, because fewer people search for the second and each one is worth more. The calculator below uses published UAE cost-per-lead ranges, so you can see what budget 100 leads needs in your field before you talk to anyone.',
        ],
      },
      {
        h: 'Which channels bring leads for Dubai businesses?',
        p: [
          'For most consumer businesses, Meta (Instagram and Facebook) brings the most leads for the money, Google Search brings fewer but readier buyers, and WhatsApp is where the conversation actually happens. We usually start with Meta and Google together and move budget to whichever produces cheaper qualified leads.',
          'Some industries need more. B2B companies usually do better with LinkedIn and Google than with Instagram. Real estate brokers also get enquiries from property portals; where your portal account forwards them by email or WhatsApp, they can join the same follow-up flow and dashboard as the ad leads.',
        ],
      },
      {
        h: 'How fast will the first leads arrive?',
        p: [
          'Usually within the first week. The first days go into the landing page, tracking and the first set of ads; once Meta and Google approve them, enquiries start the same day.',
          'The first two weeks are also when the cost per lead is highest, because the platforms are still learning who responds. We change audiences, ads and the offer wording every few days in that period, and you see every change and every lead in the dashboard as it happens.',
        ],
      },
      {
        h: 'How do you choose a lead generation agency in Dubai?',
        p: [
          'Ask questions that a weak agency cannot answer well. These are the ones we would ask ourselves:',
        ],
        list: [
          'How do you define a qualified lead, in writing?',
          'Whose ad account is the budget spent from, and who owns it if we stop?',
          'Can I see every lead, with its source, as it arrives?',
          'What happens if you miss the number you promised?',
          'Do you buy lists or cold call? (We do neither.)',
          'Is there a lock-in? (Our trial is one month, with no commitment after it.)',
        ],
      },
      {
        h: 'Is this kind of lead generation allowed in the UAE?',
        p: [
          'Yes, when every lead asks to be contacted. Ours come from people who filled in a form or messaged you first, so the follow-up is a reply, not a cold approach.',
          'We do not buy contact lists or make unsolicited calls. That keeps you clear of the UAE telemarketing rules and the personal data protection law, and WhatsApp messages go through the official Business API on your own number, within Meta\'s messaging rules.',
        ],
      },
    ],
    projects: ['ai-whatsapp-instagram-automation'],
    proofNotes: [
      { client: 'Goldmine Sanger', text: 'A gold mining company based in Dubai. We built their automated lead funnel, which captures every enquiry and follows it up, along with their website and the management software their team uses.' },
    ],
    offer: leadTrialOffer,
    guarantee: leadGuarantee,
    calculator: {
      intro: 'Pick your industry and a monthly ad budget. The range uses published UAE cost-per-lead figures, so treat it as a planning guide, not a quote.',
      industries: [
        { name: 'Real estate', low: 62, high: 500, source: 'Clozer (AED 62, client data); Prospeo (AED 100-500+)' },
        { name: 'Education and training', low: 80, high: 150, source: 'Clozer' },
        { name: 'Healthcare and clinics', low: 140, high: 140, source: 'Clozer (client data)' },
        { name: 'Legal and professional services', low: 200, high: 400, source: 'Clozer' },
        { name: 'B2B and high-value services', low: 500, high: 1000, source: 'Prospeo (qualified, Google Search)' },
        { name: 'Other industries (UAE average)', low: 85, high: 180, source: 'Clozer' },
      ],
      sources: [clozerCpl, prospeoDubai, tombaDubai],
    },
    faqs: [
      { q: 'Is the $399 trial really one month with no lock-in?', a: 'Yes. One month, then you decide. If you want to continue, we agree a plan for your business on a call, based on your trial results.' },
      { q: 'How much does it cost after the trial?', a: 'It depends on your business: how many offers, areas and channels, and how many leads a month you want. We set the fee on a call after the trial and put it in writing before the next month starts.' },
      { q: 'Does the $399 include ad spend?', a: 'No. Ad spend goes straight to Meta and Google from your own ad account, so you see every dirham. We agree the budget with you before starting, from your industry\'s cost per lead.' },
      { q: 'What if I get fewer than 100 qualified leads?', a: 'We keep the campaigns running with no management fee until you reach 100. Bad leads reported within 7 days are replaced.' },
      { q: 'Do you work with my industry?', a: 'The trial is open to every industry we work with, including real estate, healthcare, education, retail and e-commerce, software and B2B services. The ad budget is what changes from one industry to another.' },
      { q: 'Do you have an office in Dubai?', a: 'No. Our team works from New Delhi, 1.5 hours ahead of Dubai, with calls in your working day. Campaigns, dashboards and WhatsApp all run online, so location makes no difference to the leads.' },
      { q: 'Which currency do you charge in, and how do I pay?', a: `${payment}` },
      { q: 'Who owns the ad accounts and the leads?', a: 'You do. Campaigns run from your own Meta and Google accounts, and the leads, pages and CRM stay yours if you stop.' },
    ],
  },
  {
    slug: 'real-estate-lead-generation',
    service: '',
    name: 'Real estate lead generation',
    metaTitle: 'Real Estate Lead Generation in Dubai | AR Medias',
    metaDescription: 'Buyer, investor and tenant leads for Dubai brokers and developers, qualified on WhatsApp before your agents call. $399 one-month trial.',
    h1: 'Real estate lead generation in Dubai',
    accent: 'Dubai',
    answer: 'We bring Dubai brokers and developers buyer, investor and tenant enquiries from Meta and Google ads, ask each one about budget and timeline on WhatsApp within seconds, and pass the serious ones to your agents. The leads come from your own ad account, so they are yours alone and never resold. Start with a one-month trial for $399, with 100 qualified leads guaranteed; ad spend is separate.',
    builds: [
      { t: 'Off-plan launch campaigns', d: 'Ads timed to a project launch, aimed at buyers and investors in the UAE and abroad, with the payment plan up front so price-shoppers filter themselves out.' },
      { t: 'Ready and secondary listings', d: 'Campaigns for specific communities and unit types, so a lead for a two-bed in JVC reaches the agent who handles JVC.' },
      { t: 'Rental and tenant leads', d: 'Higher-volume campaigns for leasing teams, sorted by move-in date and budget before anyone picks up the phone.' },
      { t: 'Qualification on WhatsApp', d: 'Every enquiry is asked about budget, cash or mortgage, timeline and area within seconds, and the answers sit with the lead.' },
      { t: 'Routing to the right agent', d: 'Leads assigned by community, language or turn, with a reminder if nobody replies in time, so no enquiry waits overnight.' },
      { t: 'Landing pages per project', d: 'One page per project or community, quick on mobile, in English or Arabic, with the brochure and payment plan behind the form.' },
    ],
    sections: [
      {
        h: 'Where do Dubai real estate leads come from?',
        p: [
          'Most come from three places: the property portals, paid ads on Meta and Google, and referrals. Portals bring steady enquiries, but the same buyer often contacts several agencies about the same unit. Ads bring enquiries that come to you alone, because they come from your own campaign.',
          'Social platforms matter here more than in most markets. Instagram suits luxury and high-rise projects, and many overseas investors first meet a Dubai project in their feed rather than on a portal. We use the portals you already pay for and add campaigns that bring leads nobody else has.',
        ],
      },
      {
        h: 'Should you buy real estate leads in Dubai?',
        p: [
          'Be careful with leads you did not generate. Bought or shared lists are often sold to several agencies, go stale quickly, and contact data collected for someone else is a data protection risk for you.',
          'There are honest lead sellers who sell exclusive leads in bundles, which can work for a small team. The alternative is to own the source: campaigns in your own ad account, so every lead is fresh, yours alone and checked before it reaches an agent. That is how we work, and you keep the account if you stop.',
        ],
      },
      {
        h: 'How much does a real estate lead cost in Dubai?',
        p: [
          'It depends on the channel and the property. Published figures put a Meta-led real estate lead at around AED 62 for one Dubai campaign, AED 100 to 500 and more across the market, and blended Google Ads leads at about $70 to 110 (roughly AED 257 to 404), rising to $120 to 245 for search-only campaigns.',
          'Luxury and off-plan investor leads cost more than rental leads, and they are worth more. The calculator below shows what 100 leads need in ad budget for each route, so you can plan before you speak to us. Our trial fee is separate: $399 for the first month.',
        ],
      },
      {
        h: 'How do you qualify a property lead?',
        p: [
          'With a few direct questions, asked the same way every time. Property Finder\'s own guide for agents recommends frameworks such as BANT: budget, authority, need and timeline.',
        ],
        list: [
          'Budget, and whether it is cash or a mortgage, with pre-approval if there is one',
          'Who decides: the buyer alone, a partner or a company',
          'What they need: community, unit type, ready or off-plan, to live in or to rent out',
          'When: this month, this quarter or just looking',
        ],
      },
      {
        h: 'Off-plan, ready or rentals: what changes?',
        p: [
          'The audience and the timing. Off-plan campaigns run around a launch and often reach investors outside the UAE, so the follow-up has to work across time zones and on WhatsApp. Ready and secondary campaigns target specific communities and unit types. Rentals bring many more leads at a lower value, so the qualification questions do more of the work.',
          'We set up each as its own campaign with its own landing page and questions, so an investor asking about a payment plan never lands in the leasing team\'s queue.',
        ],
      },
      {
        h: 'How fast should an agent reply to a new lead?',
        p: [
          'As fast as possible. A buyer who enquires about a unit is usually comparing several at once, and the first useful reply often wins the viewing.',
          'That is why every lead gets a WhatsApp message from your number within seconds, day or night, with the brochure or the first qualification question. The agent then picks up a conversation that has already started instead of a cold number.',
        ],
      },
    ],
    projects: ['luxury-real-estate-website', 'ai-whatsapp-instagram-automation'],
    proofNotes: [
      { client: 'Goldmine Sanger', text: 'A Dubai company. We built their automated lead funnel, which captures every enquiry and follows it up, along with their website and management software.' },
    ],
    offer: leadTrialOffer,
    guarantee: leadGuarantee,
    calculator: {
      intro: 'Pick a route and a monthly ad budget. The ranges come from published Dubai real estate figures, so treat them as a planning guide, not a quote.',
      industries: [
        { name: 'Real estate, Meta-led campaigns', low: 62, high: 500, source: 'Clozer (AED 62, one Dubai campaign); Prospeo (AED 100-500+)' },
        { name: 'Real estate, blended Google Ads', low: 257, high: 404, source: 'Real Estate Club Dubai ($70-110 per lead)' },
        { name: 'Real estate, Google Search only', low: 441, high: 900, source: 'Real Estate Club Dubai ($120-245 per lead)' },
      ],
      sources: [clozerCpl, prospeoDubai, recdLeads],
    },
    faqs: [
      { q: 'Are the leads shared with other agencies?', a: 'No. They come from campaigns in your own ad account, so each lead is yours alone and is never resold.' },
      { q: 'Do you work with brokers and developers?', a: 'Both. Brokerages usually want steady buyer and tenant leads by community; developers usually want launch campaigns for one project at a time.' },
      { q: 'Do property ads in Dubai need a permit?', a: 'Yes. Property adverts in Dubai need an advertising permit (Trakheesi) from the Dubai Land Department, and the permit details must appear on the ad. You or the developer hold the permit; we put it on every ad and landing page.' },
      { q: 'Can the leads go into our CRM?', a: 'Yes. Leads can go straight into the CRM you use, or into a simple dashboard we set up, with the WhatsApp conversation attached.' },
      { q: 'Which languages can the campaigns run in?', a: 'English and Arabic as standard. Campaigns for overseas investors can run in their language if you supply the translated brochure and payment plan.' },
      { q: 'How does the $399 trial work for real estate?', a: 'One month of campaigns, landing pages, WhatsApp qualification and the dashboard for $399, with ad spend paid from your own account. If you get fewer than 100 qualified leads that month, we keep working without a fee until you do. After the trial, pricing is agreed on a call based on your business.' },
      { q: 'Do you have an office in Dubai?', a: 'No. Our team works from New Delhi, 1.5 hours ahead of Dubai, with calls in your working day. Campaigns, WhatsApp and the dashboard all run online.' },
    ],
  },
  {
    slug: 'website-development-company',
    service: 'website-development',
    name: 'Web design & development',
    metaTitle: 'Web Design & Development Company in Dubai | AR Medias',
    metaDescription: 'Web design and development for Dubai companies: fast websites and web apps built by hand. AED cost guide, fixed quote, no lock-in.',
    h1: 'Web design and development company in Dubai',
    accent: 'Dubai',
    answer: 'We design and build websites for Dubai companies: business sites, English and Arabic sites, and web apps behind a login. Our team works from New Delhi, 1.5 hours ahead of Dubai, so calls happen in your working day. You get a written scope and a fixed quote before any work starts, and the code, domain and hosting accounts are yours from day one.',
    builds: [
      { t: 'Company website', d: 'The pages that explain what you do, who it is for and how to reach you, with enquiry forms and WhatsApp that land in your inbox.' },
      { t: 'English and Arabic website', d: 'One site in two languages, with the Arabic version laid out right to left instead of Arabic text dropped into an English layout.' },
      { t: 'Campaign landing pages', d: 'One page per offer, quick on mobile data, with Google and Meta tracking so you can see which ad brought each enquiry.' },
      { t: 'Website with a lead funnel', d: 'Every enquiry goes to WhatsApp, your CRM and the right person within seconds, and the follow-ups send themselves.' },
      { t: 'Client portal or web app', d: 'Bookings, orders, documents or dashboards behind a login, built on the same code as the public site.' },
      { t: 'Redesign that keeps your rankings', d: 'Every old address is redirected to its new page, so the Google rankings and links you already have carry over.' },
    ],
    sections: [
      {
        h: 'How much does a website cost in Dubai?',
        p: [
          'It depends on three things: how many different page types you need, whether the site is in one language or two, and what it has to connect to, such as payments, a CRM or a booking system. A ten-page company site and a bilingual site with a client login are different projects, even if they look alike on the homepage.',
          'The quickest way to a real number is to tell us your budget and what the site must do. We send back a written scope that fits it, with a fixed price and milestones, and we say plainly if something does not fit so you can decide what waits for later.',
        ],
      },
      {
        h: 'WordPress or a custom-built website?',
        p: [
          'Choose WordPress when your team publishes often and wants an editor they already know. Choose a custom build when speed, security or an unusual feature matters more than a familiar dashboard.',
          'Either way, we do not use page builders. For Rian Cullet, a recycling company running since 1996, we wrote a WordPress theme from scratch with about 20 KB of JavaScript, so their team edits pages in normal WordPress while the site stays light. For TREZUH, a real estate and private wealth firm, we built in Next.js because the brief was all about precise typography and motion.',
        ],
      },
      {
        h: 'How long does it take to build a website?',
        p: [
          'A business website usually takes three to six weeks from approved design to launch. Design comes first, and nothing is built until you have approved how the pages look on a phone and a laptop.',
          'What slows projects down is rarely the code. It is waiting for text, photos and approvals, so it helps to start gathering them while the design is being made. A second language adds translation and a layout review of every page in right-to-left, so plan a little more time for it.',
        ],
      },
      {
        h: 'Can one website work in English and Arabic?',
        p: [
          'Yes. Arabic needs its own layout, not only a translation, so we plan both languages from the first sketch.',
        ],
        list: [
          'Right-to-left layout: menus, sliders, icons and forms mirror properly, while phone numbers and prices stay readable.',
          'An Arabic typeface that joins letters correctly at every size, checked on iPhone and Android.',
          'Separate addresses for each language, such as /ar/, with hreflang tags so Google shows Arabic speakers the Arabic page.',
          'One editor for both languages, so your team updates a page and its translation side by side.',
        ],
      },
      {
        h: 'Will the website be fast and easy to find on Google?',
        p: [
          'Speed and search are built in, not added at the end. Pages are generated ahead of time or on the server, images are served as AVIF or WebP, and fonts load from your own domain, so the first screen appears quickly even on mobile data.',
          'Each page gets its own title, description, clean address and structured data that tells Google what your business is and where it serves. This website, armedias.com, is built the same way.',
        ],
      },
      {
        h: 'What happens after the website goes live?',
        p: [
          'You get the logins to everything: code, domain, hosting, analytics and the CMS. Nothing is registered in our name.',
          'If you want us to stay on, a maintenance plan covers updates, backups, security patches and small changes each month. Before launch we also keep a staging copy hidden from search engines, so later changes can be reviewed there before they reach your live site.',
        ],
      },
    ],
    projects: ['glass-recycling-company-website', 'luxury-real-estate-website'],
    proofNotes: [
      { client: 'Goldmine Sanger', text: 'A gold mining company based in Dubai. We built their website, the automated funnel that captures and follows up every enquiry, and the management software their team runs the business on.' },
    ],
    prices: {
      intro: 'Planning ranges published by two Dubai agencies. Use them to sanity-check quotes; your own scope sets the real price.',
      rows: [
        { label: 'Basic business website', range: 'AED 3,500 – 8,000' },
        { label: 'Corporate or SME website', range: 'AED 12,000 – 55,000' },
        { label: 'Ecommerce website', range: 'AED 15,000 – 110,000+' },
        { label: 'Custom web application or enterprise platform', range: 'AED 50,000 – 275,000+' },
        { label: 'Yearly maintenance and support', range: 'AED 3,000 – 10,000' },
      ],
      drivers: ['Number of page types and templates', 'One language or English and Arabic', 'Integrations: payments, CRM, booking, WhatsApp', 'Who writes the text and supplies photos'],
      sources: [element8Web, dxbWeb],
      guide: '/pricing/website-development-cost/',
    },
    faqs: [
      { q: 'Do you work with businesses in Dubai?', a: 'Yes. Goldmine Sanger, a gold mining company in Dubai, runs its website, lead funnel and management software on our work. We work remotely from New Delhi, with calls on Google Meet inside Dubai business hours.' },
      { q: 'Do you have an office in Dubai?', a: 'No. Our office is in New Delhi and every Dubai project runs remotely. The time difference is 1.5 hours, so our working days overlap almost completely.' },
      { q: 'Which currency do you quote in, and how do we pay?', a: `${payment} Payments are split into milestones tied to work you have approved.` },
      { q: 'Do we own the website and the code?', a: 'Yes. The code, design files, domain and hosting accounts are in your name from day one, so you are free to change developers at any time.' },
      { q: 'Can you redesign our current website without losing Google rankings?', a: 'Yes. We list every existing address, redirect each one permanently to its new page and keep the content Google already ranks, so rankings carry over to the new design.' },
      { q: 'Can we update the website ourselves?', a: 'Yes. You get an editor for pages, blog posts and offers, in both languages if the site is bilingual, and we show your team how to use it before handover.' },
      { q: 'How do we start?', a: 'Book a free 30-minute call. Afterwards we send a written scope with a fixed price and timeline. Work starts only when you approve it.' },
    ],
  },
  {
    slug: 'mobile-app-development-company',
    service: 'mobile-app-development',
    name: 'Mobile app development',
    metaTitle: 'Mobile App Development Company in Dubai | AR Medias',
    metaDescription: 'iOS and Android apps for Dubai businesses, from first version to App Store launch. App cost explained, fixed AED quote, you own the app.',
    h1: 'Mobile app development company in Dubai',
    accent: 'Dubai',
    answer: 'We build iPhone and Android apps for Dubai businesses, from the first version you can put in front of customers to the App Store and Google Play launch. One codebase usually serves both phones, which keeps cost and upkeep down. You get a fixed quote before work starts, and the app is published under your own developer accounts, so it belongs to you.',
    builds: [
      { t: 'Customer app', d: 'Ordering, booking or loyalty in your brand, with push notifications that bring people back without paying for another ad.' },
      { t: 'First version (MVP)', d: 'The smallest app that proves people will use it, launched in weeks so real users can tell you what to build next.' },
      { t: 'Staff and field apps', d: 'Attendance, deliveries, site visits and inspections, with GPS, photos and offline mode for places with weak signal.' },
      { t: 'App with AI inside', d: 'Assistants that answer from your own content, photo or document reading, and replies in English or Arabic.' },
      { t: 'Marketplace or booking app', d: 'Two sides on one platform, such as customers and providers, with payments, ratings and an admin panel to run it.' },
      { t: 'Rescue of an existing app', d: 'An app another team left half-finished or crashing: we audit it, tell you what is worth keeping and fix or rebuild from there.' },
    ],
    sections: [
      {
        h: 'How much does it cost to build an app in Dubai?',
        p: [
          'The price is set by how many screens and user types the app has, what it connects to, and whether it needs an admin panel and a backend of its own. A booking app for one clinic and a two-sided marketplace are priced in different leagues, even though both are "an app".',
          'Published Dubai guides do not agree with each other, and the gap is wide: one puts a basic app from about AED 25,000, another starts simple apps at AED 73,000. That is why we ask for your budget first and scope the first version to fit it, rather than quote from a feature wish list.',
        ],
      },
      {
        h: 'Flutter, React Native or native apps?',
        p: [
          'For most business apps, one cross-platform codebase in Flutter or React Native is the right call: one team builds both the iPhone and Android versions, and every fix ships to both at once.',
          'Fully native apps make sense when the app leans hard on the phone itself, such as heavy camera work, Bluetooth hardware or demanding graphics. Our own running game, which tracks GPS live and draws territory on a map, is built in Flutter and runs on both platforms from one codebase.',
        ],
      },
      {
        h: 'How long until the app is on the App Store and Google Play?',
        p: [
          'A focused first version usually takes 8 to 12 weeks. Larger apps are planned in releases, so something useful reaches users early instead of everything arriving at once.',
          'Store review is outside anyone\'s control. Google is usually quick; Apple can take a few days and sometimes asks for changes. We prepare the store listing, privacy details and test accounts in advance so review goes as smoothly as possible.',
        ],
      },
      {
        h: 'Can the app work in Arabic?',
        p: [
          'Yes. An Arabic version needs right-to-left screens, not just translated words, so we design both directions from the start.',
        ],
        list: [
          'Screens, navigation and icons that mirror correctly for right-to-left reading.',
          'An Arabic typeface that stays readable at small sizes on cheaper phones.',
          'The app follows the phone\'s language setting, with a switch inside the app for people who want the other language.',
          'Push notifications and store listings written in both languages.',
        ],
      },
      {
        h: 'Do you need an app at all, or would a web app do?',
        p: [
          'Not always. If your users only need it now and then, an installable web app can do the job without an app store listing, updates go live instantly, and it costs less to keep running.',
          'Our attendance and payroll platform works exactly like that: staff install it from the browser, punch in with a live camera check and GPS, and nobody waits for an app review. A store app is worth it when you need push notifications at scale, deep phone features or a place in the App Store where customers search.',
        ],
      },
      {
        h: 'Who owns the app and its accounts?',
        p: [
          'You do. The app is published under your own Apple and Google developer accounts, and the source code, designs and backend accounts are in your company\'s name.',
          'That matters later: if you ever change developers, the app, its reviews and its users stay with you, and the new team picks up the code without starting over.',
        ],
      },
    ],
    projects: ['gps-territory-running-game', 'attendance-payroll-saas'],
    prices: {
      intro: 'Two published Dubai guides, and how far apart they are. Your own scope sets the real price.',
      rows: [
        { label: 'Basic app (Apptunix)', range: 'AED 25,000 – 40,000+' },
        { label: 'Medium app (Apptunix)', range: 'AED 40,000 – 80,000+' },
        { label: 'Complex app (Apptunix)', range: 'AED 80,000 – 200,000+' },
        { label: 'Simple or MVP app (Techugo)', range: 'AED 73,000 – 220,000' },
        { label: 'Mid-level app (Techugo)', range: 'AED 220,000 – 440,000' },
        { label: 'Enterprise app (Techugo)', range: 'AED 440,000 – 735,000+' },
      ],
      drivers: ['Number of screens and user types', 'Backend and admin panel', 'Payments, maps and other integrations', 'One language or English and Arabic'],
      sources: [apptunixApp, techugoApp],
      guide: '/pricing/app-development-cost/',
    },
    faqs: [
      { q: 'Do you build apps for businesses in Dubai?', a: 'Yes. We work remotely from New Delhi, 1.5 hours ahead of Dubai, with Google Meet calls in your working day and a test build on your phone after each milestone.' },
      { q: 'Will we see the app before it launches?', a: 'Yes. You install test versions on your own phone through TestFlight on iPhone and an internal test track on Android, and give feedback before anything goes public.' },
      { q: 'Which currency do you quote in, and how do we pay?', a: `${payment} Payments are split into milestones tied to work you have approved.` },
      { q: 'Can you take over an app another company built?', a: 'Yes. We start with an audit of the code, store accounts and backend, tell you plainly what is worth keeping, and then fix or rebuild in stages.' },
      { q: 'Do you look after the app after launch?', a: 'Yes, if you want us to. A monthly plan covers updates for new iOS and Android versions, crash monitoring, fixes and small features.' },
      { q: 'Do you have an office in Dubai?', a: 'No. Our office is in New Delhi and Dubai projects run remotely. Our working days overlap almost completely.' },
    ],
  },
  {
    slug: 'ecommerce-website-development',
    industries: ['retail-ecommerce'],
    service: 'ecommerce-development',
    name: 'Ecommerce development',
    metaTitle: 'Ecommerce Website Development in Dubai | AR Medias',
    metaDescription: 'Ecommerce websites for Dubai and UAE brands: Shopify, WooCommerce or custom, UAE payments, VAT invoices and delivery. Fixed AED quote.',
    h1: 'Ecommerce website development in Dubai',
    accent: 'Dubai',
    answer: 'We build online stores for Dubai and UAE brands on Shopify, WooCommerce or fully custom code, chosen by how you sell rather than by habit. Stores take payments through the gateways you pick, issue VAT invoices and connect to your delivery partners. You get a fixed quote before work starts and own the store, its data and every account.',
    builds: [
      { t: 'Shopify store', d: 'The fastest route to selling: a theme designed for your brand, your products set up and apps chosen only where they earn their monthly fee.' },
      { t: 'WooCommerce store', d: 'Selling inside a WordPress site you already have, or when you want full control of hosting and plugins.' },
      { t: 'Custom store', d: 'For catalogues, pricing or checkout rules that off-the-shelf platforms fight against, such as B2B price lists or made-to-order products.' },
      { t: 'English and Arabic store', d: 'Product pages, checkout and emails in both languages, with Arabic laid out right to left.' },
      { t: 'WhatsApp ordering', d: 'Orders and order updates on WhatsApp, the channel most UAE customers already use to ask questions before they buy.' },
      { t: 'Store migration', d: 'Moving products, customers and order history to a new platform, with redirects so search rankings follow.' },
    ],
    sections: [
      {
        h: 'Shopify, WooCommerce or custom for a UAE store?',
        p: [
          'Start with Shopify if you want to sell quickly and keep running costs predictable. Choose WooCommerce if you already have a WordPress site or want your own hosting. Go custom only when your pricing, catalogue or checkout genuinely does not fit either.',
          'The wrong choice usually shows up a year later as a pile of paid apps and workarounds. We look at how you sell today, how many products and orders you expect, and what your team will manage, then recommend one platform and explain why. A Shopify store typically launches in three to six weeks; a custom platform takes two to four months.',
        ],
      },
      {
        h: 'Which payment gateways work for a store in the UAE?',
        p: [
          'The store connects to whichever gateway your business account is approved with. UAE stores commonly use card gateways such as Stripe or Telr, and buy-now-pay-later options such as Tabby or Tamara, which many shoppers here look for at checkout.',
          'Gateway approval is between you and the provider, and it can take a while, so apply early. We handle the technical side: checkout, refunds, failed payment handling and making sure every order reaches your dashboard exactly once.',
        ],
      },
      {
        h: 'Does the store handle UAE VAT?',
        p: [
          'Yes. UAE VAT is 5%, and the store can show prices with VAT included, add it at checkout and issue tax invoices that carry your Tax Registration Number.',
          'If you sell to customers outside the UAE, tax rules differ by destination, so we set them up per region and test an order for each before launch.',
        ],
      },
      {
        h: 'How do delivery and cash on delivery work?',
        p: [
          'Shipping rates, delivery zones and cash on delivery are set up to match how you actually deliver, whether that is your own drivers or a courier partner.',
          'Where a courier offers an API, orders can create shipments automatically and tracking links go to the customer by email or WhatsApp. Where it does not, your team gets a clean daily list instead of copying addresses by hand.',
        ],
      },
      {
        h: 'How much does an online store cost in Dubai?',
        p: [
          'It depends on the platform, the number of products and variants, how many languages, and the integrations: payments, delivery, accounting and stock. A Shopify store with a few hundred products and a custom B2B ordering system are very different budgets.',
          'Tell us your budget and launch date, and we will scope a store that fits them, with a fixed price and a plan for what can come in a second phase.',
        ],
      },
      {
        h: 'Who owns the store, the customers and the data?',
        p: [
          'You do. The store, the domain, the gateway and courier accounts and every customer record are in your company\'s name. Nothing runs through an account of ours.',
        ],
      },
    ],
    projects: ['ivr-broadcast-order-portal'],
    prices: {
      intro: 'Planning ranges published by two Dubai agencies. Your own scope sets the real price.',
      rows: [
        { label: 'Ecommerce website (Element8)', range: 'AED 15,000 – 110,000+' },
        { label: 'Most Dubai ecommerce sites (DXB Apps)', range: 'AED 18,000 – 60,000' },
        { label: 'Yearly maintenance and support (DXB Apps)', range: 'AED 3,000 – 10,000' },
      ],
      drivers: ['Platform: Shopify, WooCommerce or custom', 'Products and variants', 'Payments, delivery and accounting integrations', 'One language or English and Arabic'],
      sources: [element8Web, dxbWeb],
      guide: '/pricing/ecommerce-website-cost/',
    },
    faqs: [
      { q: 'Do you build ecommerce websites for Dubai businesses?', a: 'Yes. We work remotely from New Delhi, 1.5 hours ahead of Dubai, with calls in your working day and a test store you can order from before launch.' },
      { q: 'Can customers pay with Tabby or Tamara?', a: 'Yes, once your business is approved by them. We add their checkout option and test it end to end, including refunds.' },
      { q: 'Can the store be in English and Arabic?', a: 'Yes. Product pages, checkout and order emails work in both languages, with Arabic laid out right to left.' },
      { q: 'Which currency do you quote in, and how do we pay?', a: `${payment} Payments are split into milestones tied to work you have approved.` },
      { q: 'Can you move our store from another platform?', a: 'Yes. We move products, customers and order history, and redirect old product addresses so your search rankings follow.' },
      { q: 'Can our team add products themselves?', a: 'Yes. Your team manages products, prices, stock and offers from the store dashboard, and we show them how before handover.' },
    ],
  },
  {
    slug: 'real-estate-software-development',
    industries: ['real-estate'],
    service: 'crm-development',
    name: 'Real estate CRM & software',
    metaTitle: 'Real Estate CRM Software Development in Dubai | AR Medias',
    metaDescription: 'Custom real estate CRM and property software for Dubai brokers and developers: portal leads, WhatsApp follow-up, listings and deals in one place.',
    h1: 'Real estate CRM and software development in Dubai',
    accent: 'Dubai',
    answer: 'We build custom CRMs and property software for Dubai brokerages, developers and property managers: one place for portal and website leads, WhatsApp follow-up, listings, viewings and deals. It is built around how your agents actually work, instead of bending your process to a generic CRM. You get a fixed quote first and own the system and its data.',
    builds: [
      { t: 'Brokerage CRM', d: 'Leads from portals, your website, ads and WhatsApp in one pipeline, assigned to agents by rule, with reminders so no enquiry waits overnight.' },
      { t: 'Off-plan sales system', d: 'Projects, units, availability, payment plans and broker commissions, so sales and finance see the same numbers.' },
      { t: 'Property management software', d: 'Tenancies, renewals, rent schedules, maintenance requests and owner statements for the units you manage.' },
      { t: 'Real estate website', d: 'Listings that update from your CRM, fast property pages and enquiry forms that land straight in the pipeline.' },
      { t: 'WhatsApp follow-up', d: 'New leads greeted in seconds, viewing reminders sent automatically and every conversation logged against the lead.' },
      { t: 'Management dashboards', d: 'Which sources bring leads that close, how fast agents respond and where deals stall, updated live.' },
    ],
    sections: [
      {
        h: 'Why do Dubai brokers outgrow generic CRMs?',
        p: [
          'Because generic CRMs were built for B2B sales, not property. They have no idea what a unit, a viewing, an off-plan payment plan or a broker split is, so teams end up running the real work in spreadsheets and WhatsApp next to the CRM.',
          'A real estate CRM starts from the property side: listings, units, viewings, offers and commissions are built in, and the lead pipeline follows the stages your agents already use. That is the difference between a CRM people fill in because they are told to and one they open because it saves them time.',
        ],
      },
      {
        h: 'Can leads from property portals land in one pipeline?',
        p: [
          'Yes, as far as your portal accounts allow. Portal leads usually arrive as notification emails or through the portal\'s own lead tools, and the CRM can read them, create the lead and assign it to the right agent within seconds.',
          'Website forms, ad campaigns and WhatsApp messages join the same pipeline, so every lead is in one list with its source attached, and you can see which channel actually produces deals.',
        ],
      },
      {
        h: 'Custom real estate CRM or a ready-made product?',
        p: [
          'A ready-made property CRM is the right choice if it fits your process today and you are happy to work its way. You pay per user, get updates and start in days.',
          'Custom makes sense when your process is your advantage: a specific off-plan workflow, your own commission rules, several companies under one group, or data you want to own outright rather than rent. A custom system costs more up front, has no per-user fees and changes when your business does.',
        ],
      },
      {
        h: 'Can the CRM handle off-plan projects and payment plans?',
        p: [
          'Yes. Each project holds its units with type, size, view, price and status, so availability is always current for every agent.',
          'When a unit is sold, the buyer\'s payment plan becomes a schedule with due dates and reminders, and the broker\'s commission is calculated from the deal, so sales, finance and partners work from one record.',
        ],
      },
      {
        h: 'What about contracts and paperwork?',
        p: [
          'Documents your team fills in by hand today can be generated from the deal record instead, using the templates you already use, such as agreements, forms and receipts. Details are typed once and stay consistent everywhere.',
          'Files stay attached to the lead, unit or deal they belong to, with access limited by role, so an agent sees their deals and management sees everything.',
        ],
      },
      {
        h: 'How much does a real estate CRM cost?',
        p: [
          'It depends on how much of the business it runs: a lead pipeline with WhatsApp is a smaller project than a full off-plan sales and property management system. Data migration from your current tools and the number of integrations also move the price.',
          'We usually start with the part that loses you the most money today, often slow lead response, and add modules in phases. Tell us your budget and we will show what fits in the first phase.',
        ],
      },
    ],
    projects: ['luxury-real-estate-website', 'ai-whatsapp-instagram-automation'],
    prices: {
      intro: 'One published UAE price list for comparison. Your own scope sets the real price.',
      rows: [
        { label: 'Real estate website + CRM, with portal leads and agent assignment', range: 'AED 13,500 – 98,000' },
        { label: 'Custom CRM', range: 'AED 12,500 – 88,000' },
      ],
      drivers: ['Pipeline only, or listings, off-plan and property management too', 'Lead sources and integrations', 'Data moved from current tools', 'Number of companies and user roles'],
      sources: [codingclaveUae],
      guide: '/pricing/crm-development-cost/',
    },
    faqs: [
      { q: 'Do you build CRMs for real estate companies in Dubai?', a: 'Yes. We work remotely from New Delhi, 1.5 hours ahead of Dubai, with calls in your working day and a working version to test after each milestone.' },
      { q: 'Can agents use the CRM on their phones?', a: 'Yes. The CRM works in the phone browser and can be installed like an app, so agents log calls, viewings and notes on the move.' },
      { q: 'Can you move our data from our current CRM or spreadsheets?', a: 'Yes. We import leads, contacts, listings and history, check the import with your team and keep the old system available until you are happy.' },
      { q: 'Can the CRM be in English and Arabic?', a: 'Yes. Screens can work in both languages, and client names and messages in Arabic are stored and searched correctly.' },
      { q: 'Which currency do you quote in, and how do we pay?', a: `${payment} Payments are split into milestones tied to work you have approved.` },
      { q: 'Who owns the CRM and the client data?', a: 'You do. The code, database and hosting are in your company\'s name, and there are no per-user licence fees to us.' },
    ],
  },
  {
    slug: 'crm-software-development-company',
    service: 'crm-development',
    name: 'CRM software development',
    metaTitle: 'CRM Software Development Company in Dubai | AR Medias',
    metaDescription: 'Custom CRM for Dubai businesses that outgrew spreadsheets or Zoho: WhatsApp, sales pipeline and reports built around your process.',
    h1: 'CRM software development company in Dubai',
    accent: 'Dubai',
    answer: 'We build custom CRMs for Dubai businesses that have outgrown spreadsheets, shared inboxes or a generic CRM nobody updates. Leads, WhatsApp conversations, quotes, follow-ups and reports live in one system shaped around your sales process. You get a fixed quote before work starts, there are no per-user fees to us, and the system and data are yours.',
    builds: [
      { t: 'Sales pipeline', d: 'Leads from every source in one place, assigned by rule, with stages that match how you sell and reminders that keep deals moving.' },
      { t: 'WhatsApp inside the CRM', d: 'Messages on the official WhatsApp Business API logged against each contact, so the conversation history stays with the company, not one phone.' },
      { t: 'Quotes and invoices', d: 'Quotes built from your price list, sent for approval and turned into invoices with VAT, without retyping.' },
      { t: 'Customer and order portal', d: 'A login where customers place orders, track them and raise requests, while your team works the same records inside the CRM.' },
      { t: 'Service and support desk', d: 'Tickets, service visits and renewals tracked per customer, with response times you can measure.' },
      { t: 'Reports the owner actually reads', d: 'Sales by source, agent and product, response times and forecast, on one screen.' },
    ],
    sections: [
      {
        h: 'When is a custom CRM better than Zoho or HubSpot?',
        p: [
          'When you spend more effort working around the CRM than working in it. Signs: half the team still uses spreadsheets, key steps live in WhatsApp, and per-user fees keep rising while adoption keeps falling.',
          'If a ready-made CRM fits your process with light setup, use it; it will be cheaper to start. A custom CRM earns its cost when your process is specific, when you need it joined to your own systems, or when per-user licences for a growing team cost more each year than owning the software would.',
        ],
      },
      {
        h: 'Can the CRM work with WhatsApp?',
        p: [
          'Yes, through the official WhatsApp Business API, which is the only way to connect WhatsApp to software without risking the number. Conversations are stored against the contact, so when a salesperson leaves, the history stays.',
          'Meta has rules on who you may message first and when, and charges for some message types, such as marketing messages. We build within those rules: approved templates for first messages, and replies inside the 24-hour window that opens when a customer writes to you.',
        ],
      },
      {
        h: 'Where is the CRM data stored?',
        p: [
          'In hosting your company owns. We can host the database in a UAE or nearby cloud region if your customers or sector expect data to stay close to home.',
          'Access is set by role, actions are logged, and backups run automatically, so you can see who changed what and recover from mistakes.',
        ],
      },
      {
        h: 'How long does it take to build a CRM?',
        p: [
          'A CRM core, meaning contacts, pipeline, tasks and basic reports, typically goes live in six to ten weeks. Further modules such as quotes, a customer portal or service tickets follow in phases.',
          'Going live in phases is deliberate: your team uses the core early, tells us what is missing, and the next phase is built from that rather than from guesses.',
        ],
      },
      {
        h: 'Can you move our data from our current CRM?',
        p: [
          'Yes. We export contacts, companies, deals and history from your current CRM or spreadsheets, clean duplicates, import them and check the result with your team before switching over.',
        ],
      },
      {
        h: 'How much does a custom CRM cost in Dubai?',
        p: [
          'It depends on the number of modules, integrations and user roles, and on how much data is moved in. A pipeline with WhatsApp is a much smaller build than sales, quoting, service and a customer portal together.',
          'Tell us your budget and the problem that costs you most today; we will scope a first phase that fixes it, with a fixed price.',
        ],
      },
    ],
    projects: ['ivr-broadcast-order-portal', 'ai-whatsapp-instagram-automation'],
    prices: {
      intro: 'One published UAE price list for comparison. Your own scope sets the real price.',
      rows: [{ label: 'Custom CRM', range: 'AED 12,500 – 88,000' }],
      drivers: ['Modules: pipeline, quotes, service, portal', 'WhatsApp and other integrations', 'Data moved from current tools', 'User roles and approval steps'],
      sources: [codingclaveUae],
      guide: '/pricing/crm-development-cost/',
    },
    faqs: [
      { q: 'Do you build CRMs for companies in Dubai?', a: 'Yes. We work remotely from New Delhi, 1.5 hours ahead of Dubai, with calls in your working day and a working version to test after each milestone.' },
      { q: 'Are there per-user fees?', a: 'Not to us. You pay for the build and, if you choose, a monthly support plan. Hosting and WhatsApp API costs are billed to your own accounts.' },
      { q: 'Can the CRM be in English and Arabic?', a: 'Yes. Screens can work in both languages, and Arabic names and messages are stored and searched correctly.' },
      { q: 'Can it connect to our accounting software?', a: 'Usually, yes. If your accounting tool has an API, customers, invoices and payments can sync both ways; we confirm this during scoping.' },
      { q: 'Which currency do you quote in, and how do we pay?', a: `${payment} Payments are split into milestones tied to work you have approved.` },
      { q: 'Who owns the CRM and the data?', a: 'You do. Code, database, hosting and WhatsApp accounts are in your company\'s name from day one.' },
    ],
  },
  {
    slug: 'erp-software-development-company',
    industries: ['manufacturing'],
    service: 'erp-development',
    name: 'ERP software development',
    metaTitle: 'ERP Software Development Company in Dubai | AR Medias',
    metaDescription: 'Custom ERP for UAE SMEs: inventory, sales, purchasing, HR and VAT-ready invoices in one system, built around how your Dubai business runs.',
    h1: 'ERP software development company in Dubai',
    accent: 'Dubai',
    answer: 'We build custom ERP systems for Dubai SMEs and trading companies: stock, sales, purchasing, HR and payroll, and VAT-ready invoicing in one system instead of five tools that never agree. It is delivered in phases, so the first modules are in use within weeks. You get a fixed quote per phase and own the software outright.',
    builds: [
      { t: 'Inventory and warehouses', d: 'Stock by location and batch, transfers between warehouses and a ledger that shows every movement, not just today\'s total.' },
      { t: 'Sales and purchasing', d: 'Quotes, orders, deliveries and supplier purchases linked, so a sale reserves stock and a low level triggers a purchase.' },
      { t: 'VAT-ready invoicing', d: 'Tax invoices with your TRN and 5% VAT calculated per line, and reports your accountant can use for filing.' },
      { t: 'HR, attendance and payroll', d: 'Attendance from phones with GPS, leave, salary structures and payroll that runs from approved records.' },
      { t: 'Multi-company setup', d: 'Mainland and free-zone companies, or several brands, in one system with separate books and shared reporting.' },
      { t: 'Owner dashboards', d: 'Stock value, receivables, margins by product and customer, and cash position, live rather than at month end.' },
    ],
    sections: [
      {
        h: 'Custom ERP or Odoo and Zoho for a UAE SME?',
        p: [
          'If a standard ERP covers your work with configuration alone, use it; it is cheaper to start. Custom ERP pays off when your operation is the thing that makes you money and off-the-shelf modules keep forcing workarounds, such as trading with landed costs, made-to-order production or rules that differ by company.',
          'There is a middle road too: keep accounting in the tool your accountant already uses and build only the operational part custom, joined to it through its API. We often recommend that for SMEs.',
        ],
      },
      {
        h: 'Does the ERP handle UAE VAT?',
        p: [
          'Yes. Invoices carry your Tax Registration Number, VAT at 5% is calculated per line, and zero-rated or exempt items are marked as such.',
          'VAT reports are built from the same transactions, so the figures your accountant files match the invoices customers received. We do not replace your tax adviser; we make sure the data they get is clean.',
        ],
      },
      {
        h: 'Can one ERP run mainland and free-zone companies?',
        p: [
          'Yes. Each company keeps its own records, numbering and invoices, while owners see consolidated reports across all of them.',
          'Stock and services moving between your companies are recorded as transactions on both sides, so inter-company balances stay correct without manual adjustments.',
        ],
      },
      {
        h: 'How long does an ERP project take?',
        p: [
          'ERP is delivered in phases. The first modules, usually inventory and sales or whichever hurts most today, go live within 8 to 14 weeks, and the rest follow one at a time.',
          'Phasing keeps risk small: your team learns one part at a time, data is moved in manageable pieces, and each phase is priced and approved on its own.',
        ],
      },
      {
        h: 'What have you built that is ERP-like?',
        p: [
          'For Goldmine Sanger, a gold mining company in Dubai, we built the management software their team runs the business on, alongside their website and lead funnel.',
          'Our own products include a multi-company attendance and payroll platform, where payroll runs from attendance records that can no longer change, and a supply-chain platform with warehouses, a stock ledger and shipments. Both are linked below.',
        ],
      },
      {
        h: 'How much does custom ERP cost in Dubai?',
        p: [
          'It depends on the number of modules, companies and users, the integrations, and how much historical data moves in. A stock and invoicing system for one company is a fraction of a multi-company ERP with production and HR.',
          'We price ERP per phase, so you commit to the first useful part, see it working, and decide on the next. Tell us your budget and we will show what the first phase can cover.',
        ],
      },
    ],
    projects: ['attendance-payroll-saas', 'digital-product-passport-blockchain'],
    proofNotes: [
      { client: 'Goldmine Sanger', text: 'A gold mining company based in Dubai. We built the management software their team runs the business on, together with their website and automated lead funnel.' },
    ],
    prices: {
      intro: 'One published Dubai guide for comparison. Your own scope sets the real price.',
      rows: [
        { label: 'Small business: HR, payroll, finance, inventory', range: 'AED 36,000 – 92,000' },
        { label: 'Mid-sized: adds CRM, reporting, mobile access', range: 'AED 92,000 – 183,000' },
        { label: 'Enterprise: fully custom modules and integrations', range: 'AED 183,000 – 367,000+' },
        { label: 'Each additional module', range: 'AED 11,000 – 36,500+' },
      ],
      drivers: ['Number of modules', 'Companies, branches and warehouses', 'Integrations with accounting and e-commerce', 'Historical data to move in'],
      sources: [apptunixErp],
      guide: '/pricing/erp-development-cost/',
    },
    faqs: [
      { q: 'Do you build ERP software for companies in Dubai?', a: 'Yes. Goldmine Sanger in Dubai runs on management software we built. We work remotely from New Delhi, 1.5 hours ahead, with calls in your working day.' },
      { q: 'Can you extend Odoo instead of building from scratch?', a: 'Yes, when Odoo already covers most of your work. We add custom modules and integrations rather than rebuild what it does well.' },
      { q: 'Can the ERP be in English and Arabic?', a: 'Yes. Screens and printed documents such as invoices can be in both languages.' },
      { q: 'Which currency do you quote in, and how do we pay?', a: `${payment} Each phase has its own fixed price and milestones.` },
      { q: 'What happens to our data from current tools?', a: 'We move it in stages with each phase, check it with your team, and keep the old tools available until the new module is trusted.' },
      { q: 'Who owns the ERP?', a: 'You do: code, database and hosting are in your company\'s name, with no per-user licence fees to us.' },
    ],
  },
  {
    slug: 'ai-development-company',
    industries: ['ai-ml'],
    service: 'ai-automation',
    name: 'AI development & automation',
    metaTitle: 'AI Development & Automation Company in Dubai | AR Medias',
    metaDescription: 'AI development for Dubai businesses: WhatsApp chatbots on the official API, AI agents and automation. Build and monthly costs explained.',
    h1: 'AI development and automation company in Dubai',
    accent: 'Dubai',
    answer: 'We build AI and automation for Dubai businesses: WhatsApp and website chatbots that answer from your own information, AI agents that work inside your systems, and lead funnels that capture and follow up every enquiry automatically. We start with one workflow that saves real hours, show it working, then extend it. You get a fixed build price, clear monthly running costs and ownership of every account.',
    builds: [
      { t: 'WhatsApp AI chatbot', d: 'Answers customer questions on the official WhatsApp Business API from your own content, in English and Arabic, and hands over to a person when it should.' },
      { t: 'Lead funnel automation', d: 'Every enquiry from ads, forms, WhatsApp and Instagram captured, greeted in seconds, qualified and followed up until it books or says no.' },
      { t: 'AI agents in your systems', d: 'Agents that read emails or documents, update the CRM, draft quotes or prepare reports, with a person approving anything that matters.' },
      { t: 'Instagram and website chat', d: 'AI replies to DMs and website chat at any hour, with every conversation logged for your team.' },
      { t: 'Document and data extraction', d: 'Invoices, forms and IDs read automatically into your system, with a check step before anything is saved.' },
      { t: 'Internal knowledge assistant', d: 'Staff ask questions in plain language and get answers from your policies, price lists and past work, with the source shown.' },
    ],
    sections: [
      {
        h: 'What can AI actually take off your team?',
        p: [
          'The repetitive, text-heavy work: answering the same twenty customer questions, greeting and qualifying new leads, copying details from emails and PDFs into systems, and chasing follow-ups. These are tasks with a clear right answer and a lot of volume.',
          'Judgement calls, negotiations and anything risky stay with people. A good automation hands those over cleanly, with the context attached, instead of guessing.',
        ],
      },
      {
        h: 'How does a WhatsApp chatbot work, and what does Meta charge?',
        p: [
          'It runs on the official WhatsApp Business API, connected to your business number and your own Meta account. The bot answers from content you approve, and anything it cannot answer goes to your team inside the same conversation.',
          'Meta charges per message for some message types, such as marketing and some utility templates, and the AI model adds a small cost per conversation. Both are billed to your accounts, and we estimate them for your volume before you commit, so the monthly cost is known in advance.',
        ],
      },
      {
        h: 'Can it reply in Arabic?',
        p: [
          'Yes. The bot can detect the language of each message and answer in English or Arabic, from content approved in both.',
          'We test it with real questions from your customers in both languages before launch, and keep a log so wrong or weak answers are spotted and fixed.',
        ],
      },
      {
        h: 'What is lead funnel automation?',
        p: [
          'It is the system that makes sure no enquiry is lost. Every lead from ads, website forms, WhatsApp and Instagram is captured in one place, greeted within seconds, asked the questions that qualify it, and followed up on a schedule until it books a call, buys or opts out.',
          'Your team sees each lead\'s source and stage, and you see which channel produces paying customers. For Goldmine Sanger in Dubai we built exactly this alongside their website and management software.',
        ],
      },
      {
        h: 'Is our data safe with AI?',
        p: [
          'Your data stays in accounts you own, and we use AI providers whose business terms say they do not train their models on your data. Access to customer records is limited to what each workflow needs.',
          'For sensitive work, the AI drafts and a person approves. Every message and action is logged, so you can always see what the system did and why.',
        ],
      },
      {
        h: 'How long does it take, and what does it cost?',
        p: [
          'A single workflow, such as a WhatsApp greeting and FAQ bot, typically goes live in one to three weeks. AI agents and larger automation programmes take four to eight weeks.',
          'Cost has two parts: a fixed build price, and monthly running costs for messaging, AI usage and hosting, billed to your own accounts. We estimate both before you start, so there are no surprises in month two.',
        ],
      },
    ],
    projects: ['ai-whatsapp-instagram-automation', 'ai-legal-research-assistant'],
    proofNotes: [
      { client: 'Goldmine Sanger', text: 'A gold mining company based in Dubai. We built their automated lead funnel, which captures and follows up every enquiry, along with their website and management software.' },
    ],
    prices: {
      intro: 'One published UAE price list for comparison. It excludes Meta fees, AI usage and hosting, which are billed monthly. Your own scope sets the real price.',
      rows: [
        { label: 'AI chatbot, website or WhatsApp (excl. VAT)', range: 'AED 4,900 – 59,000' },
        { label: 'Custom software, portal or AI web app', range: 'AED 24,500 – 245,000' },
      ],
      drivers: ['How many workflows and channels', 'Systems the AI must read from or write to', 'English only or English and Arabic', 'Monthly volume of conversations'],
      sources: [codingclaveUae],
      guide: '/pricing/ai-chatbot-cost/',
    },
    faqs: [
      { q: 'Do you build AI chatbots for businesses in Dubai?', a: 'Yes. Goldmine Sanger in Dubai uses a lead funnel we built. We work remotely from New Delhi, 1.5 hours ahead of Dubai, with calls in your working day.' },
      { q: 'Will the chatbot use our own WhatsApp number?', a: 'Yes. It runs on the official WhatsApp Business API under your Meta business account and your number.' },
      { q: 'What if the AI gives a wrong answer?', a: 'It answers only from content you approve, hands uncertain questions to your team, and every conversation is logged so mistakes are found and fixed quickly.' },
      { q: 'What are the monthly costs?', a: 'Meta messaging fees, AI usage and hosting, all billed to your accounts. We estimate them for your volume before you commit.' },
      { q: 'Which currency do you quote in, and how do we pay?', a: `${payment} The build is a fixed price, paid in milestones.` },
      { q: 'Who owns the automation?', a: 'You do. The code, the Meta and AI accounts, and all conversation data are in your company\'s name.' },
    ],
  },
];

export const dubaiServiceBySlug = Object.fromEntries(dubaiServices.map((d) => [d.slug, d]));

/** Dubai pages for a services.ts slug (CRM has two: CRM and real estate CRM). */
export const dubaiPagesForService = (service: string) => dubaiServices.filter((d) => d.service === service);
/** Dubai pages an industry page should link to. */
export const dubaiPagesForIndustry = (industry: string) => dubaiServices.filter((d) => d.industries?.includes(industry));
export const dubaiPath = (d: DubaiService) => `/locations/uae/dubai/${d.slug}/`;
