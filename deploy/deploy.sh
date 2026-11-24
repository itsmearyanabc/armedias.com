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

# The release being replaced, so IndexNow is told only about pages this deploy changed
PREVIOUS=$(readlink -f "$APP/current" || true)
ln -sfn "$RELEASE" "$APP/current"
pm2 delete armedias >/dev/null 2>&1 || true
pm2 start "$APP/current/deploy/ecosystem.config.cjs"
pm2 save
nginx -t && systemctl reload nginx

# Clear Cloudflare's cache, so cached pages update the moment a deploy goes live. Pages
# are cached at Cloudflare's edge by a Cache Rule (everything except /api/ and /admin/),
# which cuts the first response from ~1 s to tens of ms worldwide. Needs CLOUDFLARE_ZONE_ID
# and CLOUDFLARE_API_TOKEN (permission: Zone > Cache Purge) in .env; skipped if missing.
# Never fails the deploy and never prints the token.
cf_var() { { grep -E "^$1=" "$APP/.env" 2>/dev/null || true; } | tail -n 1 | cut -d= -f2- | tr -d "\"' \r"; }
CF_ZONE=$(cf_var CLOUDFLARE_ZONE_ID)
CF_TOKEN=$(cf_var CLOUDFLARE_API_TOKEN)
if [ -n "$CF_ZONE" ] && [ -n "$CF_TOKEN" ]; then
  if curl -fsS -o /dev/null -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE/purge_cache" \
       -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" --data '{"purge_everything":true}'; then
    echo "Cloudflare: cache cleared"
  else
    echo "Cloudflare: cache clear FAILED, purge it in the Cloudflare dashboard (Caching > Configuration > Purge Everything)"
  fi
else
  echo "Cloudflare: CLOUDFLARE_ZONE_ID / CLOUDFLARE_API_TOKEN not in .env, cache not cleared"
fi
unset CF_TOKEN

# Ask IndexNow search engines to recrawl the pages this deploy added, changed or removed
# (never fails the deploy)
(cd "$APP/current" && node scripts/indexnow.mjs "$PREVIOUS") || true

# Keep the five most recent releases
ls -1dt "$APP"/releases/* | tail -n +6 | xargs -r rm -rf
echo "Deployed $RELEASE"
