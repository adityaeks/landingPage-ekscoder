import { MetadataRoute } from 'next';
import { fetchBlogPostsFromBackend } from '@/services/blogService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ekscoder.com';

  // 1. Halaman Statis / Beranda
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. Halaman Dinamis Blog dari Backend API
  try {
    const posts = await fetchBlogPostsFromBackend();

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
      const lastModDate = post.updated_at
        ? new Date(post.updated_at)
        : post.published_at
        ? new Date(post.published_at)
        : new Date();

      return {
        url: `${baseUrl}/blog/${post.slug || post.id}`,
        lastModified: !isNaN(lastModDate.getTime()) ? lastModDate : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    });

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error('[Sitemap] Gagal mengambil data blog untuk sitemap:', error);
    return staticRoutes;
  }
}

