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
            <span className="status-pill published">발행</span>
            <span>{formatDisplayDate(post.date)}</span>
            <span className="article-meta-slash" aria-hidden="true">
              /
            </span>
            <span>{post.tags.length > 0 ? `태그 ${post.tags.length}` : "단일 기록"}</span>
          </div>

          <div className="article-title-row article-title-row-minimal article-title-row-pointed">
            <div>
              <p className="eyebrow accent">기록</p>
              <h1>{post.title}</h1>
            </div>
          </div>

          <p className="article-dek article-dek-page">{post.dek}</p>
          {post.tags.length > 0 ? (
            <div className="tag-row article-tags">
              {post.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          ) : null}
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
              <span className="stat-label">더 최근 글</span>
              <strong>{newerPost.title}</strong>
            </Link>
          ) : null}
          {olderPost ? (
            <Link href={`/posts/${olderPost.slug}`} className="article-nav-card">
              <span className="stat-label">이전 글</span>
              <strong>{olderPost.title}</strong>
            </Link>
          ) : null}
        </div>
      </nav>
    </main>
  );
}
