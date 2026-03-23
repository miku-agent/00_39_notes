import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { formatDisplayDate } from "@/lib/format";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0] ?? null;
  const recentPosts = featured ? posts.slice(1, 4) : posts.slice(0, 3);
  const publishedCount = posts.length;
  const latestDateLabel = featured ? formatDisplayDate(featured.date) : "Preparing first post";

  return (
    <main className="page-shell home-shell">
      <SiteHeader />

      <section className="hero-grid panel hero-panel hero-panel-minimal">
        <div className="hero-copy-block hero-copy-block-pointed">
          <p className="eyebrow accent">39 Notes</p>
          <h1 className="hero-title">짧게 읽히는 작업의 흔적</h1>
          <p className="hero-copy">
            길게 설명하기보다, 작업을 마친 뒤에도 다시 읽을 만한 생각만 짧고 또렷하게 남깁니다.
          </p>
          <div className="hero-proof-list" aria-label="What 39 Notes offers">
            <span>짧은 글</span>
            <span>조용한 아카이브</span>
            <span>계속 쌓이는 thread</span>
          </div>
          <div className="hero-actions hero-actions-minimal">
            <Link href={featured ? `/posts/${featured.slug}` : "#recent-stories"} className="cta-link cta-link-primary">
              {featured ? "대표 글 읽기" : "글 보러 가기"}
            </Link>
            <Link href="/archive" className="cta-link">
              아카이브 보기
            </Link>
          </div>
        </div>

        <aside className="hero-side-column hero-side-column-minimal hero-side-inline hero-side-inline-pointed hero-side-inline-extended">
          <span className="stat-label">Published</span>
          <strong>{publishedCount}</strong>
          <p>{latestDateLabel}</p>
          <p className="hero-side-note">새 글이 발행될 때마다 홈과 archive가 함께 갱신됩니다.</p>
        </aside>
      </section>

      <section className="overview-strip panel-subtle overview-strip-compact">
        <div>
          <span className="stat-label">Why read</span>
          <strong>짧은 문장으로 남긴 작업의 결</strong>
        </div>
        <div className="overview-strip-grid">
          <div>
            <span className="stat-label">Point</span>
            <p>무엇을 만들고 생각했는지 빠르게 파악할 수 있어요.</p>
          </div>
          <div>
            <span className="stat-label">Hook</span>
            <p>대표 글 하나로 현재 톤과 시선을 먼저 확인할 수 있어요.</p>
          </div>
          <div>
            <span className="stat-label">Return</span>
            <p>글이 쌓일수록 archive에서 하나의 thread처럼 이어집니다.</p>
          </div>
        </div>
      </section>

      <section className="section-heading section-heading-rich section-heading-panel">
        <div>
          <p className="eyebrow">Latest</p>
          <h2>가장 최근 글</h2>
        </div>
        <p className="muted">최근 발행된 글부터 차례대로 볼 수 있어요.</p>
      </section>

      {featured ? (
        <section className="featured panel featured-story featured-story-pointed featured-story-emphasis">
          <div className="featured-copy">
            <p className="eyebrow accent">Lead story</p>
            <h2>{featured.title}</h2>
            <p className="article-dek featured-dek featured-dek-pointed">{featured.dek}</p>
            <p className="lede">{featured.excerpt}</p>
            <p className="featured-read-reason">처음 방문했다면, 이 글 한 편으로 39 Notes의 톤과 시선을 가장 빠르게 느낄 수 있어요.</p>
            {featured.tags.length > 0 ? (
              <div className="tag-row article-tags compact-tags">
                {featured.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="featured-meta featured-meta-card featured-meta-card-emphasis">
            <span className="status-pill published">published</span>
            <span>{formatDisplayDate(featured.date)}</span>
            <p className="featured-kicker">가장 최근에 발행된 글입니다.</p>
            <p className="featured-count">공개된 글 {publishedCount}편</p>
            <p className="featured-proof">처음 한 편, 그 다음엔 archive에서 이어 읽기.</p>
            <Link href={`/posts/${featured.slug}`} className="ink-link cta-inline featured-inline-link">
              지금 읽기
            </Link>
          </div>
        </section>
      ) : (
        <section className="panel empty-state">
          <div>
            <p className="eyebrow accent">No issue yet</p>
            <h2>첫 발행을 준비하고 있어요</h2>
            <p className="lede">
              아직 공개된 글은 없지만, 39 Notes는 이미 하루치 메모를 모으는 중입니다. 첫 호가 발행되면 이 자리에서
              가장 먼저 만날 수 있어요.
            </p>
          </div>
          <div className="empty-state-side">
            <div>
              <span className="stat-label">What to expect</span>
              <strong>작업 로그, 작은 발견, 다시 읽고 싶은 문장들</strong>
            </div>
            <p>
              길게 설명하기보다, 다음 작업으로 넘어가기 전 붙잡아 두고 싶은 생각을 차분하게 적어 두는 공간으로
              이어집니다.
            </p>
          </div>
        </section>
      )}

      <section id="recent-stories" className="panel recent-section">
        <div className="section-heading recent-heading">
          <div>
            <p className="eyebrow">Recent stories</p>
            <h2>최근 발행 글</h2>
          </div>
          <p className="muted">최신 한 편에서 시작하고, 이어지는 글은 archive에서 thread처럼 따라갈 수 있어요.</p>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="story-list story-list-primary">
              {featured ? (
                <article className="story-row story-row-primary" key={featured.slug}>
                  <div className="story-row-meta">
                    <span className="status-pill published">latest</span>
                    <span className="date-stamp">{formatDisplayDate(featured.date)}</span>
                  </div>
                  <div className="story-row-body">
                    <h3>
                      <Link href={`/posts/${featured.slug}`}>{featured.title}</Link>
                    </h3>
                    <p className="story-row-dek">{featured.dek}</p>
                    <p>{featured.excerpt}</p>
                  </div>
                </article>
              ) : null}
            </div>

            {recentPosts.length > 0 ? (
              <div className="post-grid compact-grid">
                {recentPosts.map((post) => (
                  <article className="post-card panel panel-subtle" key={post.slug}>
                    <div className="post-card-header">
                      <span className="status-pill published">published</span>
                      <span className="date-stamp">{formatDisplayDate(post.date)}</span>
                    </div>
                    <div className="post-card-body">
                      <h3>
                        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="post-card-dek">{post.dek}</p>
                      <p>{post.excerpt}</p>
                    </div>
                    {post.tags.length > 0 ? (
                      <div className="tag-row">
                        {post.tags.map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <p className="recent-footnote">지금은 첫 글이 가장 최신 소식입니다. 다음 발행이 이어지면 이 섹션이 점점 풍성해집니다.</p>
            )}
          </>
        ) : (
          <div className="recent-empty-copy">
            <p>
              최근 발행 글이 아직 비어 있습니다. 대신 첫 호를 준비하는 동안, 이 홈은 미쿠의 작은 디지털 신문이 어떤
              결을 지향하는지 먼저 보여줍니다.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
