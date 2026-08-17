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
  excerpt: string;
  content: string;
  cover_image: string;
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

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 3,
    title: "Cara Setup VPS Ubuntu 24.04 LTS untuk Deployment Laravel Production",
    slug: "cara-setup-vps-ubuntu-2404-untuk-laravel-production",
    excerpt: "Langkah demi langkah mengonfigurasi Nginx, PHP-FPM 8.3, MySQL, Redis, dan SSL Certbot gratis di Linux VPS.",
    content: `## Pengenalan Setup Server

Menyiapkan VPS Linux sendiri memberikan fleksibilitas penuh serta kontrol performa yang optimal untuk aplikasi skala besar.

### Langkah 1: Update Server & User Permission
Pastikan selalu memperbarui repositori sebelum menginstall dependensi:
\`\`\`bash
sudo apt update && sudo apt upgrade -y
\`\`\`

### Langkah 2: Install Nginx & PHP-FPM 8.3
Konfigurasi Nginx dengan PHP 8.3-FPM dan optimasi OPcache untuk kecepatan pemrosesan skrip PHP.

### Langkah 3: Amankan Server dengan SSL Certbot
\`\`\`bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d example.com
\`\`\``,
    cover_image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    category: {
      id: 2,
      name: "DevOps & Cloud",
      slug: "devops-cloud",
      description: "Panduan Linux VPS, Docker, CI/CD pipeline, dan Cloud Architecture.",
      color: "#8b5cf6",
      posts_count: null,
    },
    author: {
      id: 2,
      name: "Admin Ekscoder",
    },
    status: "published",
    featured: true,
    views_count: 310,
    meta: {
      title: "Setup VPS Ubuntu 24.04 untuk Laravel",
      description: "Tutorial deploy Laravel di VPS Ubuntu dengan Nginx dan PHP 8.3.",
      keywords: "vps, ubuntu, nginx, deployment, laravel",
    },
    published_at: "2026-08-09T06:52:38+00:00",
    created_at: "2026-08-10T06:52:38+00:00",
    updated_at: "2026-08-10T06:52:38+00:00",
  },
  {
    id: 1,
    title: "Panduan Lengkap Laravel 11 dan Vite untuk Web Modern",
    slug: "panduan-lengkap-laravel-11-dan-vite",
    excerpt: "Pelajari cara mengintegrasikan Laravel 11 dengan Vite untuk mendapatkan performa build yang super cepat dan workflow modern.",
    content: `## Pendahuluan

Laravel 11 hadir dengan berbagai peningkatan signifikan dalam struktur direktori yang lebih ramping dan integrasi penuh dengan **Vite**.

### Mengapa Menggunakan Vite?
- **Instant Server Start**: Tidak perlu menunggu bundling saat development.
- **Lightning Fast HMR**: Hot Module Replacement yang sangat responsif.
- **Optimized Production Build**: Hasil bundling asset yang kecil dan efisien.

### Kesimpulan
Integrasi ini mempermudah developer membangun aplikasi fullstack dengan pengalaman development terbaik.`,
    cover_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    category: {
      id: 1,
      name: "Web Development",
      slug: "web-development",
      description: "Tutorial, best practices, dan tren seputar pengembangan website modern.",
      color: "#3b82f6",
      posts_count: null,
    },
    author: {
      id: 2,
      name: "Admin Ekscoder",
    },
    status: "published",
    featured: true,
    views_count: 142,
    meta: {
      title: "Panduan Laravel 11 & Vite - Ekscoder",
      description: "Tutorial integrasi Laravel 11 dan Vite untuk performa web modern.",
      keywords: "laravel, vite, php, web development",
    },
    published_at: "2026-08-08T06:52:38+00:00",
    created_at: "2026-08-10T06:52:38+00:00",
    updated_at: "2026-08-10T06:52:38+00:00",
  },
  {
    id: 2,
    title: "Membangun REST API High-Performance dengan Laravel & API Resources",
    slug: "membangun-rest-api-high-performance-dengan-laravel",
    excerpt: "Tips dan trik optimasi query Eloquent, caching response, dan format JSON standar menggunakan Laravel API Resources.",
    content: `## Rest API di Laravel

Merancang RESTful API yang cepat membutuhkan perhatian khusus pada query Eloquent agar terhindar dari N+1 problem.

### Gunakan Eager Loading
Selalu gunakan \`with()\` ketika meretrieve relasi data.

### Caching Strategy
Gunakan Redis atau File Cache untuk data yang jarang berubah.`,
    cover_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: {
      id: 1,
      name: "Web Development",
      slug: "web-development",
      description: "Tutorial, best practices, dan tren seputar pengembangan website modern.",
      color: "#3b82f6",
      posts_count: null,
    },
    author: {
      id: 2,
      name: "Admin Ekscoder",
    },
    status: "published",
    featured: false,
    views_count: 98,
    meta: {
      title: "REST API High Performance Laravel",
      description: "Cara membuat REST API cepat di Laravel.",
      keywords: "api, laravel, rest, json",
    },
    published_at: "2026-08-05T06:52:38+00:00",
    created_at: "2026-08-10T06:52:38+00:00",
    updated_at: "2026-08-10T06:52:38+00:00",
  },
];

/**
 * Fetch blog posts from Laravel REST API backend (http://127.0.0.1:8000/api/posts)
 * Returns a list of blog posts or fallbacks to default posts if unreachable.
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
      console.warn(`[BlogService] API returned ${res.status}. Serving fallback blog posts.`);
      return fallbackBlogPosts;
    }

    const json = await res.json();

    if (json.status === "success" && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }

    if (Array.isArray(json) && json.length > 0) {
      return json;
    }

    return fallbackBlogPosts;
  } catch (error) {
    console.warn("[BlogService] Could not reach Laravel API backend. Serving fallback blog posts.", error);
    return fallbackBlogPosts;
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
