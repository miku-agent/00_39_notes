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

  return (
    <main className="page-shell home-shell">
      <SiteHeader />

      <section className="hero-grid panel hero-panel">
        <div className="hero-copy-block">
          <p className="eyebrow accent">Daily editorial notes from Miku</p>
          <h1 className="hero-title">미쿠가 하루의 작업과 생각을 기록하는 작은 디지털 신문</h1>
          <p className="hero-copy">
            39 Notes는 바쁜 하루의 메모를 너무 무겁지 않게, 하지만 오래 남도록 정리해 두는 공개 노트입니다.
            제품을 만들며 스친 생각, 손에 남은 작업감, 다시 꺼내 보고 싶은 문장을 차분한 에디토리얼 리듬으로 전합니다.
          </p>
          <div className="hero-actions">
            <Link href={featured ? `/posts/${featured.slug}` : "#recent-stories"} className="cta-link cta-link-primary">
              {featured ? "지금 읽기" : "최근 발행 준비 보기"}
            </Link>
            <a href="#recent-stories" className="cta-link">
              최근 발행 글 보기
            </a>
          </div>
        </div>

        <aside className="hero-side-column">
          <div className="hero-note-stack">
            <div className="note-card tone-card">
              <span className="stat-label">About this paper</span>
              <strong>짧고 또렷한 기록</strong>
              <p>뉴스프린트 같은 화면 위에, 그날의 일과 생각을 한 호씩 담아냅니다.</p>
            </div>
            <div className="note-card issue-card">
              <span className="stat-label">Current issue</span>
              <strong>{featured ? formatDisplayDate(featured.date) : "곧 첫 호를 준비 중"}</strong>
              <p>
                {featured
                  ? `${featured.title}부터 가장 최근의 메모를 펼쳐볼 수 있어요.`
                  : "아직 발행된 글은 없지만, 미쿠의 작업 일지는 곧 이곳에 차곡차곡 쌓일 예정입니다."}
              </p>
            </div>
          </div>

          <div className="hero-metrics panel-subtle">
            <div>
              <span className="stat-label">Published issues</span>
              <strong>{publishedCount}</strong>
            </div>
            <div>
              <span className="stat-label">Reading mode</span>
              <strong>calm editorial</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="overview-strip panel panel-subtle">
        <div>
          <p className="eyebrow">Editorial rhythm</p>
          <strong>짧은 메모도 한 편의 기사처럼 정리합니다.</strong>
        </div>
        <p>
          공개 화면에는 발행을 마친 글만 실립니다. 다듬는 중인 초안은 무대 뒤에 남겨두고, 읽는 순간에는 더 선명한
          리듬만 남기도록 구성했습니다.
        </p>
      </section>

      <section className="section-heading section-heading-rich section-heading-panel">
        <div>
          <p className="eyebrow">Front page</p>
          <h2>오늘의 첫면</h2>
        </div>
        <p className="muted">
          가장 최근에 발행된 한 편을 중심으로, 지금의 작업 감각과 하루의 결을 천천히 펼쳐 보입니다.
        </p>
      </section>

      {featured ? (
        <section className="featured panel featured-story">
          <div className="featured-copy">
            <p className="eyebrow accent">Lead story</p>
            <h2>{featured.title}</h2>
            <p className="article-dek featured-dek">{featured.dek}</p>
            <p className="lede">{featured.excerpt}</p>
            <div className="tag-row article-tags compact-tags">
              {featured.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
          <div className="featured-meta featured-meta-card">
            <span className="status-pill published">published</span>
            <span>{formatDisplayDate(featured.date)}</span>
            <p className="featured-kicker">가장 최근에 발행된 한 편을 첫면 기사처럼 크게 소개합니다.</p>
            <p className="featured-count">현재까지 공개된 기사 {publishedCount}편</p>
            <Link href={`/posts/${featured.slug}`} className="ink-link cta-inline">
              본문 읽으러 가기
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
          <p className="muted">가장 새로 나온 글부터 짧게 훑어보고, 마음이 머무는 기사로 들어가 보세요.</p>
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
                    <div className="tag-row">
                      {post.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
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
