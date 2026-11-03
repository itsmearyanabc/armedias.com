# Deploying armedias.com to a VPS

> **This VPS (Ubuntu 24.04, PM2) uses the PM2 flow below.** It installs Node 24 separately in
> `/opt/node24`, so the other PM2 apps keep their own Node version. `deploy/armedias.service`
> is only for servers that use systemd instead of PM2.

The site is static HTML served by **nginx**. One small **Node** process (Node 24+) handles
the contact form, the visitor counter and the admin panel at `/admin/`. Leads, visitor
stats and login lockouts are stored in a SQLite file in `/var/www/armedias/data`.

## One-time server setup (Ubuntu)

1. Install Node.js 24 LTS, nginx, git and certbot:
   ```bash
   sudo apt update && sudo apt install -y nginx git certbot python3-certbot-nginx
   curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash - && sudo apt install -y nodejs
   ```
2. Create the app folder and environment file:
   ```bash
   sudo mkdir -p /var/www/armedias/releases /var/www/armedias/data
   sudo chown -R $USER:www-data /var/www/armedias && sudo chmod 770 /var/www/armedias/data
   cp .env.example /var/www/armedias/.env   # fill in ADMIN_EMAIL, ADMIN_PASSWORD, SMTP_PASS
   chmod 640 /var/www/armedias/.env
   ```
3. Create the mailbox `noreply@armedias.com` in Hostinger email (or use any SMTP provider)
   and put its password in `SMTP_PASS`.
4. Point DNS: `A` records for `armedias.com` and `www.armedias.com` to the VPS IP.
5. Install the service and nginx site:
   ```bash
   sudo cp deploy/armedias.service /etc/systemd/system/ && sudo systemctl daemon-reload && sudo systemctl enable armedias
   sudo cp deploy/cloudflare-realip.conf /etc/nginx/snippets/
   sudo cp deploy/security-headers.conf /etc/nginx/snippets/armedias-security-headers.conf
   sudo cp deploy/nginx.conf /etc/nginx/sites-available/armedias.com
   sudo ln -s /etc/nginx/sites-available/armedias.com /etc/nginx/sites-enabled/
   ```
6. Get HTTPS certificates (comment out the two `443` server blocks first if nginx refuses to
   start without certificates, then restore them):
   ```bash
   sudo certbot certonly --nginx -d armedias.com -d www.armedias.com
   ```

## Cloudflare (free plan)

Cloudflare adds a CDN and sends each visitor's country to the server, which the admin
dashboard uses for "Visitors by country". Email stays on Hostinger Mail, so its records
must be copied exactly and stay **DNS only** (grey cloud).

### 1. Add the site and check the imported records

Add `armedias.com` at dash.cloudflare.com (Free plan). Before changing nameservers, make
sure the DNS page has exactly these records; add any that are missing:

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `@` | `200.141.4.211` | Proxied |
| AAAA | `@` | `2a02:4780:63:9dfa::1` | Proxied |
| CNAME | `www` | `armedias.com` | Proxied |
| MX | `@` | `mx1.hostinger.com` (priority 5) | DNS only |
| MX | `@` | `mx2.hostinger.com` (priority 10) | DNS only |
| TXT | `@` | `v=spf1 include:_spf.mail.hostinger.com ~all` | DNS only |
| CNAME | `hostingermail-a._domainkey` | `hostingermail-a.dkim.mail.hostinger.com` | DNS only |
| CNAME | `hostingermail-b._domainkey` | `hostingermail-b.dkim.mail.hostinger.com` | DNS only |
| CNAME | `hostingermail-c._domainkey` | `hostingermail-c.dkim.mail.hostinger.com` | DNS only |
| TXT | `_dmarc` | `v=DMARC1; p=none` | DNS only |
| CNAME | `autodiscover` | `autodiscover.mail.hostinger.com` | DNS only |
| CNAME | `autoconfig` | `autoconfig.mail.hostinger.com` | DNS only |

Delete imported records for subdomains that are switched off (old app subdomains) only if
you are sure nothing uses them.

### 2. Settings (before switching nameservers)

| Where | Setting | Value | Why |
|---|---|---|---|
| SSL/TLS → Overview | Encryption mode | **Full (strict)** | The server has a valid Let's Encrypt certificate |
| SSL/TLS → Edge Certificates | Always Use HTTPS | **Off** | nginx already redirects; leaving it off keeps Let's Encrypt renewal on the plain HTTP path it uses today |
| SSL/TLS → Edge Certificates | HSTS | **Off** | nginx already sends HSTS |
| Security → Bots | Bot Fight Mode | **Off** | Can challenge crawlers |
| Security → Bots / AI Crawl Control | Block AI bots | **Do not block** | robots.txt allows AI search and training crawlers |
| Security → Bots / AI Crawl Control | AI Labyrinth, Managed robots.txt | **Off** | The site's own robots.txt must be served unchanged |
| Speed → Optimization | Rocket Loader | **Off** | Rewrites script loading and can break the animations |
| Scrape Shield | Email Address Obfuscation | **Off** | Keeps the email address identical for visitors and crawlers |
| Network | IP Geolocation | **On** (default) | Sends the visitor's country header |
| Caching | Caching level | Standard (default) | No "Cache Everything": forms, admin and API must reach the server |

### 3. Switch nameservers

In Hostinger (Domains → armedias.com → DNS / Nameservers) replace the nameservers with the
two Cloudflare gives you. The switch takes minutes to a few hours.

### 4. Check

```bash
curl -sI https://armedias.com/ | grep -iE 'cf-ray|server|strict-transport'
certbot renew --dry-run
```

`cf-ray` in the output means Cloudflare is in front. Send a test email to and from
info@armedias.com, then open `/admin/` after a few visits: "Visitors by country" fills in.

## Admin panel

- Sign in at `https://armedias.com/admin/` with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`.
- After wrong passwords the IP is locked: 3 tries → 30 s, 2 tries → 1 min, then 1 try per lock
  starting at 10 min and doubling (20 min, 40 min, …). A clean 24 hours resets it.
- To change the password, edit `.env` and run `sudo systemctl restart armedias`.
- Back up `/var/www/armedias/data/armedias.db` regularly; it holds all your leads.

## Every deploy

```bash
cd /var/www/armedias && bash current/deploy/deploy.sh   # first time: run deploy/deploy.sh from a clone
```

The script clones `main`, builds it in a new release folder, switches `current` to it,
restarts the API and reloads nginx. Failed builds leave the live site untouched.

## After the first deploy

- Submit the contact form once and confirm the email arrives at info@armedias.com.
- Search engines (after the Cloudflare switch, so the TXT records go into Cloudflare):
  1. search.google.com/search-console → Add property → **Domain** → `armedias.com`.
     Copy the `google-site-verification=…` TXT value into Cloudflare DNS (`@`, DNS only),
     then click Verify.
  2. Sitemaps → submit `https://armedias.com/sitemap-index.xml`.
  3. URL Inspection → request indexing for the home page and each `/services/…/` page
     (the daily limit is about 10; spread the rest over the next days).
  4. bing.com/webmasters → **Import from Google Search Console** (covers Bing, DuckDuckGo,
     Yahoo and ChatGPT search).
- Check https://pagespeed.web.dev for the home page on mobile.
