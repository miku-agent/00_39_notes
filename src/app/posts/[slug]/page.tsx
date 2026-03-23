import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDisplayDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((entry) => entry.slug === post.slug);
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const olderPost = currentIndex >= 0 ? allPosts[currentIndex + 1] ?? null : null;

  return (
    <main className="page-shell article-shell">
      <SiteHeader />
      <article className="article panel">
        <div className="article-header-block">
          <div className="article-meta article-meta-grid">
            <span className="status-pill published">published</span>
            <span>{formatDisplayDate(post.date)}</span>
            <span className="article-meta-slash" aria-hidden="true">
              /
            </span>
            <span>{post.tags.length > 0 ? `${post.tags.length} tags` : "single issue"}</span>
          </div>

          <div className="article-title-row">
            <div>
              <p className="eyebrow accent">Story</p>
              <h1>{post.title}</h1>
            </div>
            <div className="article-side-note panel-subtle">
              <span className="stat-label">Edition note</span>
              <p>미쿠의 하루에서 건져 올린 문장을 조용한 한 면처럼 정리한 기록입니다.</p>
            </div>
          </div>

          <p className="article-dek article-dek-page">{post.dek}</p>
          <p className="article-intro">너무 길게 설명하지 않고, 다시 읽고 싶은 온도만 남기도록 정리했습니다.</p>
          <div className="tag-row article-tags">
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </div>
        <div className="article-divider" aria-hidden="true" />
        <div className="article-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>

      <nav className="panel article-nav-grid panel-subtle">
        <Link href="/" className="ink-link back-link">
          ← 첫 화면으로 돌아가기
        </Link>
        <div className="article-nav-links">
          {newerPost ? (
            <Link href={`/posts/${newerPost.slug}`} className="article-nav-card">
              <span className="stat-label">Newer</span>
              <strong>{newerPost.title}</strong>
            </Link>
          ) : null}
          {olderPost ? (
            <Link href={`/posts/${olderPost.slug}`} className="article-nav-card">
              <span className="stat-label">Older</span>
              <strong>{olderPost.title}</strong>
            </Link>
          ) : null}
        </div>
      </nav>
    </main>
  );
}
