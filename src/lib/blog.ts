import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const blogRoot = path.resolve(process.cwd(), "../00_Blog");
const draftsDir = path.join(blogRoot, "drafts");
const publishedDir = path.join(blogRoot, "published");

export type PostStatus = "draft" | "published";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  status: PostStatus;
  tags: string[];
  excerpt: string;
  sourcePath: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

type Frontmatter = {
  title?: string;
  date?: string;
  status?: PostStatus;
  tags?: string[];
};

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) return [] as string[];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
}

function extractExcerpt(content: string) {
  return (
    content
      .replace(/^#\s+.+$/gm, "")
      .replace(/[`*_>#-]/g, "")
      .trim()
      .split(/\n{2,}/)[0]
      ?.slice(0, 220) ?? ""
  );
}

function parsePost(filePath: string, fallbackStatus: PostStatus): PostMeta & { rawContent: string } {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as Frontmatter;
  const slug = path.basename(filePath, ".md");

  return {
    slug,
    title: frontmatter.title || slug,
    date: frontmatter.date || slug,
    status: frontmatter.status || fallbackStatus,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    excerpt: extractExcerpt(content),
    sourcePath: filePath,
    rawContent: content,
  };
}

export function getAllPosts(): PostMeta[] {
  const drafts = ensureDir(draftsDir).map((file) => parsePost(path.join(draftsDir, file), "draft"));
  const published = ensureDir(publishedDir).map((file) => parsePost(path.join(publishedDir, file), "published"));

  return [...published, ...drafts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => {
      const { rawContent, ...meta } = post;
      void rawContent;
      return meta;
    });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const candidatePaths = [
    path.join(publishedDir, `${slug}.md`),
    path.join(draftsDir, `${slug}.md`),
  ];

  const filePath = candidatePaths.find((candidate) => fs.existsSync(candidate));
  if (!filePath) return null;

  const fallbackStatus: PostStatus = filePath.includes(`${path.sep}published${path.sep}`) ? "published" : "draft";
  const parsed = parsePost(filePath, fallbackStatus);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(parsed.rawContent);

  return {
    slug: parsed.slug,
    title: parsed.title,
    date: parsed.date,
    status: parsed.status,
    tags: parsed.tags,
    excerpt: parsed.excerpt,
    sourcePath: parsed.sourcePath,
    contentHtml: processed.toString(),
  };
}

export function getPostSlugs() {
  return getAllPosts().map((post) => post.slug);
}

export function getStatusCounts() {
  return getAllPosts().reduce(
    (acc, post) => {
      acc[post.status] += 1;
      return acc;
    },
    { draft: 0, published: 0 },
  );
}
