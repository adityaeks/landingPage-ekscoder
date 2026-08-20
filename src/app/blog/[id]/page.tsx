import { fetchBlogPostsFromBackend, getPostExcerpt } from "@/services/blogService";
import { BlogDetailClient } from "./BlogDetailClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: slug } = await params;
  const posts = await fetchBlogPostsFromBackend();
  const post = posts.find((p) => p.slug === slug || String(p.id) === slug);

  if (!post) {
    return {
      title: "Article Not Found — EKSCODER",
    };
  }

  const excerpt = getPostExcerpt(post, 160);

  return {
    title: `${post.title} — EKSCODER`,
    description: excerpt || post.title,
    openGraph: {
      title: `${post.title} — EKSCODER`,
      description: excerpt || post.title,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author?.name || "EKSCODER Team"],
      tags: post.category?.name ? [post.category.name] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetchBlogPostsFromBackend();
  return posts.map((p) => ({ id: p.slug }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id: slug } = await params;
  const posts = await fetchBlogPostsFromBackend();
  const post = posts.find((p) => p.slug === slug || String(p.id) === slug) ?? null;

  return <BlogDetailClient post={post} allPosts={posts} />;
}
