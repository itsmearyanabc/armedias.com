#!/usr/bin/env bash
# Run on the VPS from /var/www/armedias to deploy the latest main branch.
# Builds into a new release folder, then switches the `current` link, so a failed
# build never takes the live site down.
set -euo pipefail

APP=/var/www/armedias
REPO=https://github.com/itsmearyanabc/armedias.com.git
RELEASE="$APP/releases/$(date +%Y%m%d%H%M%S)"

git clone --depth 1 "$REPO" "$RELEASE"
cd "$RELEASE"
npm ci
npm run build

ln -sfn "$RELEASE" "$APP/current"
sudo systemctl restart armedias
sudo nginx -t && sudo systemctl reload nginx

# Keep the five most recent releases
ls -1dt "$APP"/releases/* | tail -n +6 | xargs -r rm -rf
echo "Deployed $RELEASE"
