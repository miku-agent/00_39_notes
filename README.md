# 39 Notes

Newsprint-style editorial blog app for the markdown repository in `../00_Blog`.

## Stack choice

- **Next.js 16 + App Router**
- Server-side filesystem reads from `../00_Blog`
- Markdown parsing with `gray-matter` + `remark`

This stack fits the current workspace because the other apps already use Next.js, Node, and pnpm, so local development and eventual deployment stay consistent.

## Content pipeline

`00_Blog` remains the source of truth.

```text
00_Blog/
  inbox/       -> raw captured ideas / events
  drafts/      -> in-progress markdown posts
  published/   -> reviewed posts ready for publication

04_39notes/
  src/lib/blog.ts -> reads markdown from ../00_Blog
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

## Publishing workflow

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
