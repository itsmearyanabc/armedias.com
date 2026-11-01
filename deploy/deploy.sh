#!/usr/bin/env bash
# Run on the VPS to deploy the latest main branch:  bash /var/www/armedias/current/deploy/deploy.sh
# Builds into a new release folder with Node 24 from /opt/node24, then switches the
# `current` link and restarts the PM2 process, so a failed build never takes the site down.
set -euo pipefail

APP=/var/www/armedias
REPO=https://github.com/itsmearyanabc/armedias.com.git
RELEASE="$APP/releases/$(date +%Y%m%d%H%M%S)"
export PATH=/opt/node24/bin:$PATH

git clone --depth 1 "$REPO" "$RELEASE"
cd "$RELEASE"
npm ci --no-audit --no-fund
npm run build

ln -sfn "$RELEASE" "$APP/current"
pm2 delete armedias >/dev/null 2>&1 || true
pm2 start "$APP/current/deploy/ecosystem.config.cjs"
pm2 save
nginx -t && systemctl reload nginx

# Ask IndexNow search engines to recrawl the pages (never fails the deploy)
(cd "$APP/current" && node scripts/indexnow.mjs) || true

# Keep the five most recent releases
ls -1dt "$APP"/releases/* | tail -n +6 | xargs -r rm -rf
echo "Deployed $RELEASE"
