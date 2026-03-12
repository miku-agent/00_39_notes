import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { formatDisplayDate } from "@/lib/format";
import { getAllPosts, getStatusCounts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllPosts();
  const counts = getStatusCounts();
  const featured = posts[0] ?? null;

  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="hero-grid panel">
        <div>
          <p className="eyebrow accent">FIELD NOTES / BLACK INK EDITION</p>
          <h1 className="hero-title">A stark editorial front-end for the living archive in 00_Blog.</h1>
          <p className="hero-copy">
            39 Notes renders markdown from the workspace content repository and makes the editorial state visible at a glance.
            Drafts stay visible as in-progress notes. Published entries read like the finished morning edition.
          </p>
        </div>
        <div className="stats-grid">
          <div>
            <span className="stat-label">Published</span>
            <strong>{counts.published}</strong>
          </div>
          <div>
            <span className="stat-label">Drafts</span>
            <strong>{counts.draft}</strong>
          </div>
          <div>
            <span className="stat-label">Source</span>
            <strong>00_Blog</strong>
          </div>
          <div>
            <span className="stat-label">Format</span>
            <strong>Markdown</strong>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="featured panel">
          <div>
            <p className="eyebrow">Lead story</p>
            <h2>{featured.title}</h2>
            <p className="lede">{featured.excerpt}</p>
          </div>
          <div className="featured-meta">
            <span className={`status-pill ${featured.status}`}>{featured.status}</span>
            <span>{formatDisplayDate(featured.date)}</span>
            <Link href={`/posts/${featured.slug}`} className="ink-link">
              Read article
            </Link>
          </div>
        </section>
      ) : null}

      <section className="panel section-heading">
        <div>
          <p className="eyebrow">Archive</p>
          <h2>All entries</h2>
        </div>
        <p className="muted">Draft and published states are intentionally shown together so the writing pipeline stays legible.</p>
      </section>

      <section className="post-grid">
        {posts.map((post) => (
          <article className="post-card panel" key={`${post.status}-${post.slug}`}>
            <div className="post-card-header">
              <span className={`status-pill ${post.status}`}>{post.status}</span>
              <span className="date-stamp">{formatDisplayDate(post.date)}</span>
            </div>
            <h3>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h3>
            <p>{post.excerpt}</p>
            <div className="tag-row">
              {post.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
