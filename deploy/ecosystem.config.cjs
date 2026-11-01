// PM2 process for the site's API (contact form, admin, analytics).
// Uses its own Node 24 at /opt/node24 so other apps on the server keep their Node version.
// Secrets and settings come from /var/www/armedias/.env (never committed).
module.exports = {
  apps: [
    {
      name: 'armedias',
      cwd: '/var/www/armedias/current',
      script: 'dist/server/entry.mjs',
      interpreter: '/opt/node24/bin/node',
      node_args: '--env-file=/var/www/armedias/.env',
      env: { NODE_ENV: 'production' },
      max_memory_restart: '300M',
      time: true,
    },
  ],
};
