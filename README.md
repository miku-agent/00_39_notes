# 39 Notes

Newsprint-style editorial blog app for the markdown repository in `../00_Blog`.

## Stack choice

- **Next.js 16 + App Router**
- Server-side filesystem reads from `../00_Blog`
- Markdown parsing with `gray-matter` + `remark`
- **pm2-based production runtime**

This stack fits the current workspace because the other apps already use Next.js, Node, and pnpm, so local development and eventual deployment stay consistent.

## Content pipeline

`00_Blog` remains the source of truth.

```text
00_Blog/
  inbox/       -> raw captured ideas / events
  drafts/      -> in-progress markdown posts
  published/   -> reviewed posts ready for publication

04_39notes/
  src/lib/blog.ts -> reads markdown from ../00_Blog or BLOG_CONTENT_DIR
  src/app/        -> renders archive + article pages
```

### Status behavior

- Files in `00_Blog/drafts` render with **draft** status.
- Files in `00_Blog/published` render with **published** status.
- Frontmatter `status` can override the fallback, but folder location is the default source of truth.

## Run locally

```bash
cd /Users/bini/.openclaw/workspace/04_39notes
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Verify

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## CI/CD summary

- `dev` branch: active development
- `main` branch: production only via PR merge commit
- **CI** runs on PRs to `main` and on pushes to `dev`
- **CD** runs on pushes to `main` and deploys with pm2 on the self-hosted runner

See [docs/deployment.md](./docs/deployment.md) for the full production flow.

## Production layout

Recommended server layout:

```text
/Users/bini/apps/
  04_39notes/
  00_Blog/
```

If the content repo lives elsewhere, set `BLOG_CONTENT_DIR` before building or starting the app.

## Publish / deploy workflow

1. Work in `dev`
2. Open a `dev -> main` PR
3. CI runs `install -> lint -> typecheck -> build`
4. Merge commit into `main`
5. CD syncs `/Users/bini/apps/04_39notes`, rebuilds, and `pm2 startOrReload`s the app
6. Cloudflare Tunnel exposes `127.0.0.1:23300`

## Publishing workflow for content

1. Capture notes into `00_Blog/inbox/YYYY-MM-DD.jsonl`.
2. Convert the day into `00_Blog/drafts/YYYY-MM-DD.md`.
3. Review/edit the markdown.
4. Move the final markdown into `00_Blog/published/` when ready.
5. Rebuild/redeploy the app to surface the published article.

## Future TODO ideas

- Add pagination and tag index pages.
- Generate RSS/Atom feed.
- Add cover art or issue-style front page modules.
- Introduce a simple script to move drafts into `published/` safely.
