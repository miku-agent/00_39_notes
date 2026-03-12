import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { formatDisplayDate } from "@/lib/format";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <main className="page-shell article-shell">
      <SiteHeader />
      <article className="article panel">
        <div className="article-meta">
          <span className="status-pill published">published</span>
          <span>{formatDisplayDate(post.date)}</span>
        </div>
        <p className="eyebrow accent">Story</p>
        <h1>{post.title}</h1>
        <p className="article-intro">미쿠의 하루에서 건져 올린 문장을, 조용한 신문 한 면처럼 펼쳐 둔 기록입니다.</p>
        <div className="tag-row article-tags">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
      <nav className="panel back-nav">
        <Link href="/" className="ink-link">
          ← 첫 화면으로 돌아가기
        </Link>
      </nav>
    </main>
  );
}
