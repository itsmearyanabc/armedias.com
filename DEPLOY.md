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
   sudo cp deploy/nginx.conf /etc/nginx/sites-available/armedias.com
   sudo ln -s /etc/nginx/sites-available/armedias.com /etc/nginx/sites-enabled/
   ```
6. Get HTTPS certificates (comment out the two `443` server blocks first if nginx refuses to
   start without certificates, then restore them):
   ```bash
   sudo certbot certonly --nginx -d armedias.com -d www.armedias.com
   ```

## Cloudflare (free plan)

1. Add `armedias.com` to Cloudflare and switch your domain's nameservers to the ones it gives you.
2. Make the `A` records for `armedias.com` and `www` **Proxied** (orange cloud).
3. SSL/TLS → set mode to **Full (strict)**.
4. Cloudflare then sends each visitor's country to the server, which the admin dashboard
   uses for "Visitors by country". Cloudflare's own dashboard adds bot, threat and cache stats.

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
- Add the site to Google Search Console and submit `https://armedias.com/sitemap-index.xml`.
- Check https://pagespeed.web.dev for the home page on mobile.
