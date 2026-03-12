# Deployment & Operations

## Recommended production layout

```text
/Users/bini/apps/
  04_39notes/   # app git clone (this repo)
  00_Blog/      # content repo clone or symlink target
```

The app reads markdown files from a sibling directory. In production, keep `00_Blog` next to the app clone or set `BLOG_CONTENT_DIR` explicitly.

## Recommended port

- **23300** for the Next.js app
- Bind to **127.0.0.1** only
- Put Cloudflare Tunnel in front of it

This keeps the Node app private while Cloudflare handles external access.

## pm2 lifecycle

Initial start:

```bash
cd /Users/bini/apps/04_39notes
APP_DIR=/Users/bini/apps/04_39notes \
BLOG_CONTENT_DIR=/Users/bini/apps/00_Blog \
PORT=23300 \
pm2 start ecosystem.config.cjs
pm2 save
```

Zero-downtime style reload for new releases:

```bash
cd /Users/bini/apps/04_39notes
APP_DIR=/Users/bini/apps/04_39notes \
BLOG_CONTENT_DIR=/Users/bini/apps/00_Blog \
PORT=23300 \
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save
```

Logs / status:

```bash
pm2 status 39-notes
pm2 logs 39-notes
```

## CD behavior

`main` branch push triggers GitHub Actions on the self-hosted runner:

1. Verify `/Users/bini/apps/04_39notes` and `/Users/bini/apps/00_Blog`
2. `git fetch --all --prune`
3. `git reset --hard origin/main`
4. `pnpm install --frozen-lockfile`
5. `pnpm build`
6. `pm2 startOrReload ecosystem.config.cjs --update-env`
7. `pm2 save`

## Cloudflare Tunnel checklist (manual)

Leave this final step to the operator in Cloudflare Dashboard:

- Create or update a public hostname (for example `notes.yourdomain.com`)
- Point the tunnel service to `http://127.0.0.1:23300`
- Confirm DNS / hostname attachment is active
- Verify the site loads through the tunnel after pm2 is healthy
