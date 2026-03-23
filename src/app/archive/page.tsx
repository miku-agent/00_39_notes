import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { formatDisplayDate } from "@/lib/format";
import { getAllPostsWithContent } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const posts = await getAllPostsWithContent();

  return (
    <main className="page-shell archive-shell">
      <SiteHeader />

      <section className="archive-hero panel">
        <div>
          <p className="eyebrow accent">Archive</p>
          <h1>조용히 이어 읽는 글의 흐름</h1>
        </div>
        <p className="archive-hero-copy">목록으로 훑어보고, 아래에서는 문장을 차례대로 이어 읽을 수 있어요.</p>
      </section>

      <section className="archive-layout">
        <aside className="archive-index panel-subtle">
          <div className="section-heading section-heading-panel archive-index-heading">
            <div>
              <p className="eyebrow">목록</p>
              <h2>지금 놓인 글</h2>
            </div>
            <p className="muted">제목을 누르면 아래 본문 위치로 바로 이동해요.</p>
          </div>
          <p className="archive-index-summary">최신순 · 글 {posts.length}편</p>

          <div className="archive-index-list">
            {posts.map((post, index) => (
              <a key={post.slug} href={`#issue-${post.slug}`} className="archive-index-item">
                <span className="archive-index-order">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{post.title}</strong>
                  <p>{formatDisplayDate(post.date)}</p>
                </div>
              </a>
            ))}
          </div>
        </aside>

        <section className="archive-thread">
          <div className="section-heading section-heading-panel archive-thread-heading">
            <div>
              <p className="eyebrow accent">흐름</p>
              <h2>차례대로 읽는 본문</h2>
            </div>
            <p className="muted">각 글의 원문을 순서대로 이어 볼 수 있어요.</p>
          </div>

          <div className="thread-list">
            {posts.map((post, index) => (
              <article id={`issue-${post.slug}`} key={post.slug} className="thread-card panel">
                <div className="thread-card-head">
                  <div className="thread-kicker">
                    <span className="status-pill published">글 {String(index + 1).padStart(2, "0")}</span>
                    <span className="date-stamp">{formatDisplayDate(post.date)}</span>
                  </div>
                  <Link href={`/posts/${post.slug}`} className="ink-link thread-direct-link">
                    이 글만 보기
                  </Link>
                </div>

                <div className="thread-title-row">
                  <div>
                    <p className="eyebrow accent">기록</p>
                    <h2>{post.title}</h2>
                  </div>
                </div>

                <p className="article-dek article-dek-page thread-dek">{post.dek}</p>
                {post.tags.length > 0 ? (
                  <div className="tag-row article-tags thread-tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                ) : null}
                <div className="article-divider" aria-hidden="true" />
                <div className="article-body thread-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
