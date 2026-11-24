"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Eye,
  Calendar,
  User,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { ScrollTrigger } from "@/lib/gsap";
import {
  BlogPost,
  BlogCategory,
  fetchBlogPostsFromBackend,
  formatDate,
  getPostExcerpt,
  getFullImageUrl,
} from "@/services/blogService";

/**
 * Editorial BlogCoverImage component with clean fallback
 */
const BlogCoverImage: React.FC<{
  src?: string | null;
  alt: string;
  category?: BlogCategory;
  className?: string;
}> = ({ src, alt, category, className = "" }) => {
  const [hasError, setHasError] = useState(false);
  const fullSrc = useMemo(() => getFullImageUrl(src), [src]);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!fullSrc || hasError) {
    const accentColor = category?.color || "#FFFFFF";
    return (
      <div
        className={`w-full h-full min-h-[180px] relative flex flex-col items-center justify-center overflow-hidden select-none bg-[#121217] ${className}`}
      >
        {/* Clean Architectural Badge */}
        <div className="relative z-10 flex flex-col items-center space-y-3 p-6 text-center">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundColor: `${accentColor}15`,
              borderColor: `${accentColor}35`,
              color: accentColor,
            }}
          >
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span
              className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border inline-block"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}30`,
                color: accentColor,
              }}
            >
              {category?.name || "JOURNAL"}
            </span>
          </div>
        </div>

        {/* Minimal Subtle Brand Mark */}
        <div
          className="absolute bottom-3 right-4 text-[10px] tracking-widest uppercase font-bold text-white/20 select-none"
        >
          EKSCODER
        </div>
      </div>
    );
  }

  return (
    <img
      src={fullSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

export const Blog: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].blog;

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const sliderRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      setLoading(true);
      const data = await fetchBlogPostsFromBackend();
      if (isMounted) {
        setPosts(data);
        setLoading(false);
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Extract unique categories from posts list
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((post) => {
      if (post.category?.name) {
        set.add(post.category.name);
      }
    });
    return Array.from(set);
  }, [posts]);

  // Filter posts based on selected category tab
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "ALL") return posts;
    return posts.filter((post) => post.category?.name === selectedCategory);
  }, [posts, selectedCategory]);

  // Separate featured post if available
  const featuredPost = useMemo(() => {
    return filteredPosts.find((post) => post.featured) || filteredPosts[0];
  }, [filteredPosts]);

  const regularPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((post) => post.id !== featuredPost.id);
  }, [filteredPosts, featuredPost]);

  return (
    <section
      id="blog"
      className="py-20 md:py-32 px-5 sm:px-8 md:px-16 bg-[#08080A] relative border-b border-white/10"
    >
      <span id="articles" className="sr-only" />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-6">
          <div>
            <div className="flex items-center space-x-3 text-xs tracking-[0.25em] text-neutral-400 uppercase mb-4 font-medium">
              <span className="w-6 h-[1px] bg-white/40" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F4F4F6] uppercase">
              {t.title}
            </h2>
          </div>

          <p className="text-[#8E8E9A] text-sm sm:text-base max-w-md leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Category Filter Pills (only if posts exist) */}
        {posts.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/10 pb-6">
            <button
              onClick={() => setSelectedCategory("ALL")}
              suppressHydrationWarning
              className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === "ALL"
                  ? "bg-white text-black font-bold shadow-md"
                  : "bg-[#141419] border border-white/10 text-[#8E8E9A] hover:text-white hover:border-white/20"
              }`}
            >
              {t.allFilter} ({posts.length})
            </button>

            {categories.map((catName) => {
              const isActive = selectedCategory === catName;
              return (
                <button
                  key={catName}
                  onClick={() => setSelectedCategory(catName)}
                  suppressHydrationWarning
                  className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white text-black font-bold shadow-md"
                      : "bg-[#141419] border border-white/10 text-[#8E8E9A] hover:text-white hover:border-white/20"
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-[#0F0F12] border border-white/10 h-96 animate-pulse p-6 flex flex-col justify-between"
              >
                <div className="h-48 bg-white/5 rounded-xl w-full" />
                <div className="space-y-3 mt-4">
                  <div className="h-4 bg-white/5 rounded w-1/3" />
                  <div className="h-6 bg-white/5 rounded w-full" />
                  <div className="h-4 bg-white/5 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl bg-[#0F0F12] border border-white/10 p-12 text-center flex flex-col items-center justify-center space-y-4 my-8">
            <div className="w-14 h-14 rounded-2xl bg-[#16161D] border border-white/10 flex items-center justify-center text-white">
              <BookOpen className="w-6 h-6 opacity-70" />
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-bold text-white tracking-tight uppercase">
                {t.emptyTitle}
              </h3>
              <p className="text-[#8E8E9A] text-sm">
                {t.emptyDesc}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Post Banner */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug || featuredPost.id}`}
                data-cursor="READ"
                suppressHydrationWarning
                className="group relative rounded-2xl bg-[#0F0F12] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-500 cursor-pointer grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Cover Image Container */}
                <div className="lg:col-span-5 relative h-60 sm:h-72 lg:h-[340px] overflow-hidden bg-[#16161D]">
                  <BlogCoverImage
                    src={featuredPost.cover_image}
                    alt={featuredPost.title}
                    category={featuredPost.category}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Featured Pill */}
                  <div className="absolute top-5 left-5 inline-flex items-center px-3 py-1 rounded-full bg-white text-black text-[11px] font-bold uppercase shadow-md z-10 tracking-wider">
                    {t.featuredBadge}
                  </div>
                </div>

                {/* Article Info Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Category & Views */}
                    <div className="flex items-center space-x-3 mb-5 text-xs">
                      <span
                        className="px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${featuredPost.category?.color || "#FFFFFF"}20`,
                          color: featuredPost.category?.color || "#FFFFFF",
                          border: `1px solid ${featuredPost.category?.color || "#FFFFFF"}40`,
                        }}
                      >
                        {featuredPost.category?.name || "DevOps"}
                      </span>

                      <span className="text-[#8E8E9A] flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>
                          {featuredPost.views_count} {t.views}
                        </span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F4F4F6] tracking-tight uppercase leading-snug group-hover:text-white transition-colors mb-4">
                      {featuredPost.title}
                    </h3>

                    {/* Excerpt */}
                    {getPostExcerpt(featuredPost, 200) && (
                      <p className="text-[#8E8E9A] text-sm leading-relaxed line-clamp-3 mb-6">
                        {getPostExcerpt(featuredPost, 200)}
                      </p>
                    )}
                  </div>

                  {/* Footer Meta info */}
                  <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs text-[#8E8E9A]">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <User className="w-3.5 h-3.5 text-white" />
                        <span>{featuredPost.author?.name}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(featuredPost.published_at, language)}</span>
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-[#181820] border border-white/10 group-hover:bg-white group-hover:text-black group-hover:border-white text-white flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Horizontal Scroll Article Slider Container */}
            {regularPosts.length > 0 && (
              <div
                ref={sliderRef}
                data-lenis-prevent
                onWheel={(e) => {
                  if (e.deltaY !== 0 && sliderRef.current) {
                    sliderRef.current.scrollLeft += e.deltaY;
                  }
                }}
                className="flex items-stretch gap-6 sm:gap-8 overflow-x-auto pb-6 pt-2 custom-scrollbar snap-x snap-mandatory scroll-smooth"
              >
                {regularPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug || post.id}`}
                    data-cursor="READ"
                    suppressHydrationWarning
                    className="w-[280px] sm:w-[340px] md:w-[360px] lg:w-[380px] shrink-0 snap-start group rounded-2xl bg-[#0F0F12] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between"
                  >
                    {/* Cover Frame */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#16161D]">
                      <BlogCoverImage
                        src={post.cover_image}
                        alt={post.title}
                        category={post.category}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className="px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm backdrop-blur-md"
                          style={{
                            backgroundColor: `${post.category?.color || "#3b82f6"}30`,
                            color: post.category?.color || "#3b82f6",
                            border: `1px solid ${post.category?.color || "#3b82f6"}50`,
                          }}
                        >
                          {post.category?.name}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center space-x-3 text-[#8E8E9A] text-[11px] mb-3">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.published_at, language)}</span>
                          </span>
                          <span>·</span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>
                              {post.views_count} {t.views}
                            </span>
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-[#F4F4F6] tracking-tight uppercase leading-snug group-hover:text-white transition-colors mb-3 line-clamp-2">
                          {post.title}
                        </h4>

                        {getPostExcerpt(post, 130) && (
                          <p className="text-[#8E8E9A] text-xs leading-relaxed line-clamp-3 mb-6">
                            {getPostExcerpt(post, 130)}
                          </p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-[#8E8E9A] text-[11px]">
                          {t.by} {post.author?.name}
                        </span>

                        <span className="inline-flex items-center space-x-1 text-white font-bold group-hover:translate-x-1 transition-transform">
                          <span>{t.readArticle}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
