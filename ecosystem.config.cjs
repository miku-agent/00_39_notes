const path = require('node:path');

const cwd = process.env.APP_DIR || '/Users/bini/apps/04_39notes';
const port = process.env.PORT || '23300';
const blogContentDir = process.env.BLOG_CONTENT_DIR || path.resolve(cwd, '../00_Blog');

module.exports = {
  apps: [
    {
      name: '39-notes',
      cwd,
      script: 'node_modules/next/dist/bin/next',
      args: `start --hostname 127.0.0.1 --port ${port}`,
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: port,
        BLOG_CONTENT_DIR: blogContentDir,
      },
    },
  ],
};
