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

  if (!post) {
    notFound();
  }

  return (
    <main className="page-shell article-shell">
      <SiteHeader />
      <article className="article panel">
        <div className="article-meta">
          <span className={`status-pill ${post.status}`}>{post.status}</span>
          <span>{formatDisplayDate(post.date)}</span>
          <span className="source-path">{post.sourcePath}</span>
        </div>
        <h1>{post.title}</h1>
        <div className="tag-row article-tags">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
      <nav className="panel back-nav">
        <Link href="/" className="ink-link">
          ← Back to front page
        </Link>
      </nav>
    </main>
  );
}
