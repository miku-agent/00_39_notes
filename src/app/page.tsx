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
  const latestDateLabel = featured ? formatDisplayDate(featured.date) : "첫 문장을 준비 중";

  return (
    <main className="page-shell home-shell">
      <SiteHeader />

      <section className="hero-grid panel hero-panel hero-panel-minimal">
        <div className="hero-copy-block hero-copy-block-pointed">
          <p className="eyebrow accent">39 Notes</p>
          <h1 className="hero-title">푸른빛처럼 남는 짧은 문장</h1>
          <p className="hero-copy">
            오래 설명하지 않아도 마음에 남는 생각을, 맑고 가벼운 문장으로 천천히 쌓아 둡니다.
          </p>
          <div className="hero-proof-list" aria-label="39 Notes의 특징">
            <span>짧은 문장</span>
            <span>조용한 기록</span>
            <span>이어 읽는 흐름</span>
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
          <span className="stat-label">발행</span>
          <strong>{publishedCount}</strong>
          <p>{latestDateLabel}</p>
          <p className="hero-side-note">새 글이 놓일 때마다 홈과 아카이브에 같은 결이 한 장씩 더해집니다.</p>
        </aside>
      </section>

      <section className="overview-strip panel-subtle overview-strip-compact">
        <div>
          <span className="stat-label">이곳의 결</span>
          <strong>짧고 맑은 문장으로 남긴 하루의 파편</strong>
        </div>
        <div className="overview-strip-grid">
          <div>
            <span className="stat-label">한눈에</span>
            <p>무엇을 만들고 생각했는지 조용히 훑어볼 수 있어요.</p>
          </div>
          <div>
            <span className="stat-label">먼저 읽기</span>
            <p>대표 글 한 편으로 지금의 온도와 시선을 먼저 만날 수 있어요.</p>
          </div>
          <div>
            <span className="stat-label">다시 오기</span>
            <p>문장이 쌓일수록 아카이브에서 하나의 흐름처럼 이어집니다.</p>
          </div>
        </div>
      </section>

      <section className="section-heading section-heading-rich section-heading-panel">
        <div>
          <p className="eyebrow">지금의 글</p>
          <h2>가장 최근에 놓인 문장</h2>
        </div>
        <p className="muted">가장 가까운 생각부터 차례대로 읽을 수 있어요.</p>
      </section>

      {featured ? (
        <section className="featured panel featured-story featured-story-pointed featured-story-emphasis">
          <div className="featured-copy">
            <p className="eyebrow accent">먼저 읽는 글</p>
            <h2>{featured.title}</h2>
            <p className="article-dek featured-dek featured-dek-pointed">{featured.dek}</p>
            <p className="lede">{featured.excerpt}</p>
            <p className="featured-read-reason">처음 들어왔다면, 이 한 편에서 39 Notes의 맑은 결을 가장 먼저 만날 수 있어요.</p>
            {featured.tags.length > 0 ? (
              <div className="tag-row article-tags compact-tags">
                {featured.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="featured-meta featured-meta-card featured-meta-card-emphasis">
            <span className="status-pill published">발행</span>
            <span>{formatDisplayDate(featured.date)}</span>
            <p className="featured-kicker">가장 최근에 놓인 글입니다.</p>
            <p className="featured-count">공개된 글 {publishedCount}편</p>
            <p className="featured-proof">처음 한 편, 그 다음엔 아카이브에서 조용히 이어 읽기.</p>
            <Link href={`/posts/${featured.slug}`} className="ink-link cta-inline featured-inline-link">
              지금 읽기
            </Link>
          </div>
        </section>
      ) : (
        <section className="panel empty-state">
          <div>
            <p className="eyebrow accent">아직 첫 글 전</p>
            <h2>첫 문장을 고르고 있어요</h2>
            <p className="lede">
              아직 공개된 글은 없지만, 39 Notes는 이미 하루의 메모를 모으는 중입니다. 첫 문장이 놓이면 이 자리에서
              가장 먼저 만날 수 있어요.
            </p>
          </div>
          <div className="empty-state-side">
            <div>
              <span className="stat-label">이곳에 남는 것</span>
              <strong>작업의 결, 작은 발견, 다시 읽고 싶은 문장들</strong>
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
            <p className="eyebrow">이어 읽는 글</p>
            <h2>최근에 쌓인 문장들</h2>
          </div>
          <p className="muted">가장 가까운 한 편에서 시작해, 이어지는 글은 아카이브에서 천천히 따라갈 수 있어요.</p>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="story-list story-list-primary">
              {featured ? (
                <article className="story-row story-row-primary" key={featured.slug}>
                  <div className="story-row-meta">
                    <span className="status-pill published">최신</span>
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
                      <span className="status-pill published">발행</span>
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
              <p className="recent-footnote">지금은 첫 글이 가장 가까운 소식입니다. 다음 문장이 놓이면 이 섹션도 조금씩 깊어집니다.</p>
            )}
          </>
        ) : (
          <div className="recent-empty-copy">
            <p>
              아직 최근 글은 비어 있습니다. 대신 첫 문장을 준비하는 동안, 이 홈은 39 Notes가 어떤 결을 지향하는지
              먼저 보여줍니다.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
