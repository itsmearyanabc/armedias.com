# armedias.com SEO plan

What is already built into the site, the keywords each page targets, and the off-site work
that decides rankings. Work through "Launch week" first, then the monthly routine.

## Already done on the site

- Unique title (≤ 60 characters) and description (70–160 characters) on every page
- One H1 per page, breadcrumbs, clean URLs with trailing slashes, canonical tags
- Structured data: Organization/ProfessionalService (address, GSTIN, contact point,
  founder, areas served), WebSite, Service, FAQ, BreadcrumbList, BlogPosting, Person
- XML sitemap (`/sitemap-index.xml`) with real dates for blog posts; robots.txt
- RSS feed (`/rss.xml`) and `llms.txt` for AI search engines
- A share image for every main page and blog post (`/og/*.png`)
- Old `.php` URLs redirected (301) in `deploy/nginx.conf`
- Fast pages: static HTML, self-hosted fonts preloaded, links prefetched on hover

## Keyword map

| Page | Main keywords | Supporting keywords |
|---|---|---|
| `/` | IT company in Delhi, software development company | web, app, CRM, AI automation company India |
| `/services/website-development/` | website development company | business website design, website redesign, SEO-friendly website |
| `/services/mobile-app-development/` | mobile app development company | Flutter app development, iOS Android app developers |
| `/services/ecommerce-development/` | e-commerce website development | Shopify developer, WooCommerce development |
| `/services/ui-ux-design/` | UI UX design services | app design agency, Figma design |
| `/services/crm-development/` | custom CRM development | CRM software company, WhatsApp CRM, Zoho/HubSpot setup |
| `/services/erp-development/` | custom ERP software development | Odoo implementation, ERPNext, Tally integration |
| `/services/custom-software-development/` | custom software development company | SaaS development, web app development |
| `/services/ai-automation/` | AI automation agency | WhatsApp chatbot, n8n automation, AI agents for business |
| `/services/maintenance-support/` | website maintenance services | website support, app maintenance |
| `/services/ai-machine-learning/` | AI and machine learning development | custom AI models, RAG apps, computer vision |
| `/services/blockchain-development/` | blockchain development company | smart contract development, dApp development |
| `/services/cybersecurity/` | cybersecurity services | security audit, vulnerability testing, server hardening |
| `/industries/real-estate/` | real estate CRM | property website, real estate lead management |
| `/industries/healthcare/` | clinic management software | appointment booking system, hospital software |
| `/industries/education/` | education CRM | school ERP, coaching institute software, LMS development |
| `/industries/retail-ecommerce/` | retail software | Shopify store development, inventory management |
| `/industries/software-companies/` | software development partner | outsourced development team, SaaS development partner |
| `/industries/ai-ml/` | AI product development | AI SaaS development, MLOps |
| `/industries/blockchain-web3/` | Web3 development company | dApp and smart contract partner |
| `/industries/cybersecurity/` | software for cybersecurity companies | security dashboards, client portals |
| `/locations/india/` | software company in Delhi / India | app development company Delhi NCR |
| `/locations/uae/` | software company in Dubai / UAE | app developers Dubai, CRM Dubai |
| `/locations/usa/` | offshore software development USA | app development company for US startups |
| `/locations/canada/` | software development company Canada | Toronto app developers |
| `/locations/australia/` | software development company Australia | Sydney app developers, Xero integration |
| `/locations/japan/` | software development company Japan | offshore development Japan |
| `/locations/china/` | software development Shanghai | WeChat mini program development |
| `/locations/russia/` | software development company Russia / Moscow | Telegram bot development, Bitrix24 integration |
| `/pricing/` | website/app/CRM development cost | software development pricing India |

Rule of thumb: one page per keyword group. Don't create a second page that targets the
same main keyword; improve the existing one instead.

## City pages outside India (4 November 2026)

Research: Google suggestions per city × service (US, Canada, Australia, UAE, UK, Japanese
Google) and Yandex suggestions (Russia), saved in
`docs/market-research-2026-11-04/city-suggest.json`. A city counts as searched when Google
or Yandex completes "<service> <city>" with that city; "crowded" means agency brand names
already appear in those suggestions. Suggestions show what people type, not how many times,
so there are no volumes here.

Pick rule: every tier-1 hub with demand (high competition, bigger prize) plus the cities with
real demand but few agencies in the suggestions (lower competition, faster wins).

| Market | High competition (hubs) | Lower competition (faster wins) | H1 follows |
|---|---|---|---|
| USA | New York, Los Angeles, Dallas, Austin, Chicago, Houston | Boston, Denver, Columbus, Raleigh | "software / custom software / app development company in <city>" |
| Canada | Toronto, Vancouver | Calgary, Ottawa, Edmonton | "software development company in <city>"; Ottawa leads with bilingual web design |
| Australia | Sydney, Melbourne | Brisbane, Adelaide, Perth | "software development company in <city>"; Melbourne "custom software development services" |
| UAE | Dubai, Abu Dhabi | Sharjah, Ajman | "software development company in <city>"; Abu Dhabi "web/app development" |
| Russia (pages in Russian) | Moscow, Saint Petersburg | Kazan, Novosibirsk, Yekaterinburg | "разработка сайтов <город> (под ключ)", "создание сайтов спб" |

What each city adds to the search (used in the page copy): healthcare software (Chicago,
Dallas, San Diego), AI app development (New York, Seattle), dental websites (Toronto),
NDIS websites (Brisbane), bilingual web design (Ottawa), ERP and logistics software (Dubai),
free zones (Sharjah). Russian buyers also search "разработка телеграм ботов",
"внедрение битрикс24" and "ии агенты для бизнеса".

Not built yet, on purpose:
- **Japan:** Japanese searches ("システム開発会社 東京", "アプリ開発会社 福岡") need Japanese pages
  and a native reviewer (T-51). Strongest cities: Fukuoka, Tokyo, Osaka, Nagoya.
- **China:** Baidu and Chinese-language hosting first (T-53).
- **English searches for Russian cities return no suggestions at all**, so Russia gets
  Russian pages only. Have a native speaker read them before pushing.
- **UK is not a site market yet**, but has real demand: London and Manchester are crowded;
  Liverpool, Birmingham, Leeds and Edinburgh show demand with few agencies.

Next for these pages: list on Clutch/GoodFirms per country, get real client reviews, and
add Yandex Webmaster and Yandex Business for the Russian pages.

## Launch week (only you can do these)

1. **Google Search Console**: add `armedias.com`, verify (DNS TXT record in Cloudflare),
   submit `https://armedias.com/sitemap-index.xml`, then request indexing for the homepage
   and service pages.
2. **Bing Webmaster Tools**: import from Search Console (covers Bing, DuckDuckGo, Yahoo and
   ChatGPT search).
3. **Google Business Profile**: "AR Medias", category *Software company* (secondary:
   *Website designer*, *Mobile app developer*), address N-48 Kirti Nagar, the same phone,
   website link, opening hours, logo and 10+ photos of the office and work. This matters
   most for "near me" and Delhi searches.
4. **Profiles with the exact same name, address and phone (NAP)**: LinkedIn company page,
   Clutch, GoodFirms, DesignRush, Crunchbase, Justdial, IndiaMART, Sulekha, Trustpilot,
   Instagram, Facebook, X. Then add those profile links in `/admin/` → Social links.
5. **Ask 5–10 past clients for Google reviews**, then Clutch reviews.

## Monthly routine

- **2 blog posts a month** from the topic list below, each linking to one service page.
- **1 case study a month** once projects are added to `src/data/projects.ts`.
- **3–5 quality backlinks**: guest articles, client "website by AR Medias" credits (with
  permission), podcast or interview mentions, startup and business directories.
- **Check Search Console**: pages with impressions but a low click rate need a better
  title and description; queries at positions 8–20 deserve a dedicated section or article.

## Blog topics to write next

| Topic | Supports |
|---|---|
| How much does a website cost in India in 2026? | Website development, Pricing |
| How much does a custom CRM cost? | CRM development |
| Odoo vs ERPNext vs custom ERP for small businesses | ERP development |
| Tally integration: connecting your ERP or online store | ERP, E-commerce |
| Flutter vs React Native for business apps | Mobile apps |
| Shopify vs WooCommerce in India | E-commerce |
| 10 business tasks you can automate with AI today | AI automation |
| Real estate CRM: features that actually close deals | Real estate, CRM |
| Clinic appointment software: what to look for | Healthcare |
| Hiring an offshore development team: a guide for US and UAE companies | Locations, Software companies |

## Per-country backlinks and listings

| Country | Where to be listed |
|---|---|
| India | Justdial, IndiaMART, Sulekha, Startup India (DPIIT), NASSCOM directories, local chambers |
| UAE | Yellow Pages UAE, Connect.ae, Dubai SME and chamber directories, Clutch UAE |
| USA | Clutch, GoodFirms, Upwork agency profile, Yelp, BBB (if eligible) |
| Canada | Clutch Canada, Yelp.ca, Canadian business directories |
| Australia | Clutch Australia, TrueLocal, Yellow Pages AU |
| Japan | Clutch, Japan Dev / international outsourcing directories (Japanese content needed for local search) |
| Russia | Yandex (most-used search engine there) needs Russian pages, Yandex Webmaster and Yandex Business; Google covers the rest |
| China | Baidu needs Chinese pages and ICP-licensed hosting to rank; English pages reach foreign companies in Shanghai |

## Don'ts

- Don't buy links, use link networks or post fake reviews; Google penalises them.
- Don't create near-duplicate city pages ("software company in Noida", "… in Gurgaon")
  unless each has real, unique content.
- Don't change URLs of pages that already rank; if you must, add a 301 redirect in
  `deploy/nginx.conf`.
