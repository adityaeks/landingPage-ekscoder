const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  color?: string | null;
  posts_count?: number | null;
}

export interface BlogAuthor {
  id: number;
  name: string;
}

export interface BlogPostMeta {
  title?: string;
  description?: string;
  keywords?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  cover_image?: string | null;
  category: BlogCategory;
  author: BlogAuthor;
  status: string;
  featured: boolean;
  views_count: number;
  meta?: BlogPostMeta;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export const fallbackBlogPosts: BlogPost[] = [];

/**
 * Fetch blog posts from Laravel REST API backend (http://127.0.0.1:8000/api/posts)
 * Returns a list of blog posts or an empty array if unreachable / empty.
 */
export async function fetchBlogPostsFromBackend(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[BlogService] API returned ${res.status}.`);
      return [];
    }

    const json = await res.json();

    if (json.status === "success" && Array.isArray(json.data)) {
      return json.data;
    }

    if (Array.isArray(json)) {
      return json;
    }

    return [];
  } catch (error) {
    console.warn("[BlogService] Could not reach Laravel API backend.", error);
    return [];
  }
}

/**
 * Helper to format ISO dates into friendly localized date strings.
 */
export function formatDate(dateString: string, lang: "EN" | "ID" = "ID"): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString(lang === "ID" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Extracts excerpt or generates a clean summary from post content when excerpt is missing or empty.
 */
export function getPostExcerpt(
  post: { excerpt?: string | null; content?: string | null },
  maxLength: number = 160
): string {
  if (post.excerpt && post.excerpt.trim() !== "") {
    return post.excerpt.trim();
  }

  if (!post.content || typeof post.content !== "string") {
    return "";
  }

  const cleanText = post.content
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove inline code
    .replace(/`([^`]+)`/g, "$1")
    // Remove markdown images ![alt](url)
    .replace(/!\[.*?\]\(.*?\)/g, "")
    // Remove markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove HTML tags
    .replace(/<[^>]+>/g, "")
    // Remove markdown headers
    .replace(/^#+\s+/gm, "")
    // Remove blockquotes and list markers
    .replace(/^[\s>*-+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    // Remove markdown styling (*, **, _, __, ~~)
    .replace(/[*_~]{1,3}/g, "")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    .trim();

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  // Truncate at word boundary
  const truncated = cleanText.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  if (lastSpaceIndex > 0) {
    return truncated.slice(0, lastSpaceIndex) + "...";
  }

  return truncated + "...";
}

/**
 * Normalizes image URL from backend storage or absolute URLs.
 */
export function getFullImageUrl(src?: string | null): string | null {
  if (!src || typeof src !== "string" || src.trim() === "") return null;
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    ? process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/api\/?$/, "")
    : "http://127.0.0.1:8000";
  return `${baseUrl}/${src.replace(/^\/+/, "")}`;
}

/**
 * Calculates estimated reading time in minutes.
 */
export function getReadingTime(content?: string | null): string {
  if (!content || typeof content !== "string") return "1 MIN READ";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} MIN READ`;
}


