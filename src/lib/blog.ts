import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const blogRoot = process.env.BLOG_CONTENT_DIR
  ? path.resolve(process.env.BLOG_CONTENT_DIR)
  : path.resolve(process.cwd(), "../00_Blog");
const draftsDir = path.join(blogRoot, "drafts");
const publishedDir = path.join(blogRoot, "published");

export type PostStatus = "draft" | "published";

export type PostMeta = {
  slug: string;
  title: string;
  dek: string;
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
  dek?: string;
  excerpt?: string;
  date?: string;
  status?: PostStatus;
  tags?: string[];
};

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) return [] as string[];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
}

function normalizeWhitespace(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function extractExcerpt(content: string) {
  const cleaned = content
    .replace(/^#\s+.+$/gm, "")
    .replace(/^>\s+\*\*Lede\*\*\s*$/gim, "")
    .replace(/^##\s+오늘의 헤드라인$/gim, "")
    .replace(/^##\s+메모와 판단$/gim, "")
    .replace(/^##\s+Closing note$/gim, "")
    .replace(/^---$/gm, "")
    .replace(/[`*_>#-]/g, "")
    .trim();

  const firstParagraph = cleaned.split(/\n{2,}/).map(normalizeWhitespace).find(Boolean) ?? "";
  return firstParagraph.slice(0, 220);
}

function parsePost(filePath: string, fallbackStatus: PostStatus): PostMeta & { rawContent: string } {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as Frontmatter;
  const slug = path.basename(filePath, ".md");
  const derivedExcerpt = extractExcerpt(content);

  return {
    slug,
    title: frontmatter.title || slug,
    dek: normalizeWhitespace(frontmatter.dek || frontmatter.excerpt || derivedExcerpt),
    date: frontmatter.date || slug,
    status: frontmatter.status || fallbackStatus,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    excerpt: derivedExcerpt,
    sourcePath: filePath,
    rawContent: content,
  };
}

function stripRawContent<T extends { rawContent: string }>(posts: T[]) {
  return posts.map((post) => {
    const { rawContent, ...meta } = post;
    void rawContent;
    return meta;
  });
}

export function getAllPosts(): PostMeta[] {
  const published = ensureDir(publishedDir).map((file) => parsePost(path.join(publishedDir, file), "published"));

  return stripRawContent(published).sort((a, b) => b.date.localeCompare(a.date));
}

export function getDraftPosts(): PostMeta[] {
  const drafts = ensureDir(draftsDir).map((file) => parsePost(path.join(draftsDir, file), "draft"));
  return stripRawContent(drafts).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(publishedDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const parsed = parsePost(filePath, "published");
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(parsed.rawContent);

  return {
    slug: parsed.slug,
    title: parsed.title,
    dek: parsed.dek,
    date: parsed.date,
    status: parsed.status,
    tags: parsed.tags,
    excerpt: parsed.excerpt,
    sourcePath: parsed.sourcePath,
    contentHtml: processed.toString(),
  };
}

export async function getAllPostsWithContent(): Promise<Post[]> {
  const posts = getAllPosts();
  const loaded = await Promise.all(posts.map((post) => getPostBySlug(post.slug)));
  return loaded.filter((post): post is Post => Boolean(post));
}

export function getPostSlugs() {
  return getAllPosts().map((post) => post.slug);
}

export function getStatusCounts() {
  return {
    published: getAllPosts().length,
    draft: getDraftPosts().length,
  };
}
