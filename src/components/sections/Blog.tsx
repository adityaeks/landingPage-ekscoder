"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Eye,
  Calendar,
  User,
  ArrowUpRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Code2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import {
  BlogPost,
  BlogCategory,
  fetchBlogPostsFromBackend,
  formatDate,
  getPostExcerpt,
  getFullImageUrl,
} from "@/services/blogService";

/**
 * Robust BlogCoverImage component with automatic fallback & cyber placeholder
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
    const accentColor = category?.color || "#B8FF00";
    return (
      <div
        className={`w-full h-full min-h-[180px] relative flex flex-col items-center justify-center overflow-hidden select-none bg-[#0c0d0e] ${className}`}
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${accentColor}18 0%, #0c0d0e 85%)`,
        }}
      >
        {/* Subtle Cyber Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${accentColor}25 1px, transparent 1px), linear-gradient(90deg, ${accentColor}25 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Ambient Glow Aura */}
        <div
          className="w-36 h-36 rounded-full blur-3xl absolute opacity-25 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        {/* Central Graphic Badge */}
        <div className="relative z-10 flex flex-col items-center space-y-3 p-6 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl border backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundColor: `${accentColor}15`,
              borderColor: `${accentColor}35`,
              color: accentColor,
            }}
          >
            <Code2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border inline-block backdrop-blur-md"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}30`,
                color: accentColor,
              }}
            >
              {category?.name || "EKSCODER // INSIGHT"}
            </span>
          </div>
        </div>

        {/* Cyber Watermark Accent */}
        <div
          className="absolute bottom-3 right-4 font-mono text-[9px] tracking-wider opacity-40 uppercase font-bold select-none"
          style={{ color: accentColor }}
        >
          // EKSCODER.DEV
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

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      setLoading(true);
      const data = await fetchBlogPostsFromBackend();
      if (isMounted) {
        setPosts(data);
        setLoading(false);
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
      className="py-24 md:py-36 px-6 md:px-12 bg-transparent relative overflow-hidden border-b border-neutral-800/60"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#B8FF00]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B8FF00]/30 bg-[#B8FF00]/10 text-[#B8FF00] font-mono text-xs tracking-widest uppercase mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-mono tracking-tighter uppercase text-white leading-none">
              {t.title}
            </h2>
          </div>

          <p className="text-neutral-400 font-light text-sm sm:text-base max-w-md leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Category Filter Tabs (only if posts exist) */}
        {posts.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-neutral-800/80 pb-6">
            <button
              onClick={() => setSelectedCategory("ALL")}
              suppressHydrationWarning
              className={`px-5 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                selectedCategory === "ALL"
                  ? "bg-[#B8FF00] text-black font-bold shadow-lg glow-accent"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
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
                  className={`px-5 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "bg-[#B8FF00] text-black font-bold shadow-lg glow-accent"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
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
                className="rounded-3xl bg-neutral-900/60 border border-neutral-800 h-96 animate-pulse p-6 flex flex-col justify-between"
              >
                <div className="h-48 bg-neutral-800 rounded-2xl w-full" />
                <div className="space-y-3 mt-4">
                  <div className="h-4 bg-neutral-800 rounded w-1/3" />
                  <div className="h-6 bg-neutral-800 rounded w-full" />
                  <div className="h-4 bg-neutral-800 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-3xl bg-[#111111]/80 border border-neutral-800/80 p-12 text-center flex flex-col items-center justify-center space-y-4 my-8">
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#B8FF00] shadow-lg">
              <BookOpen className="w-8 h-8 opacity-70" />
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-bold font-mono text-white tracking-tight uppercase">
                {t.emptyTitle}
              </h3>
              <p className="text-neutral-400 font-light text-sm">
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
                className="group relative rounded-3xl bg-[#111111] border border-neutral-800 hover:border-[#B8FF00]/50 overflow-hidden transition-all duration-500 cursor-pointer shadow-2xl grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Cover Image Container */}
                <div className="lg:col-span-5 relative h-60 sm:h-72 lg:h-[340px] overflow-hidden bg-neutral-900">
                  <BlogCoverImage
                    src={featuredPost.cover_image}
                    alt={featuredPost.title}
                    category={featuredPost.category}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent lg:hidden pointer-events-none" />

                  {/* Featured Pill */}
                  <div className="absolute top-5 left-5 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#B8FF00] text-black font-mono text-[11px] font-extrabold uppercase shadow-lg z-10">
                    <Sparkles className="w-3 h-3" />
                    <span>{t.featuredBadge}</span>
                  </div>
                </div>

                {/* Article Info Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Category & Meta Pill */}
                    <div className="flex items-center space-x-3 mb-5 font-mono text-xs">
                      <span
                        className="px-3 py-1 rounded-full font-bold uppercase"
                        style={{
                          backgroundColor: `${featuredPost.category?.color || "#B8FF00"}20`,
                          color: featuredPost.category?.color || "#B8FF00",
                          border: `1px solid ${featuredPost.category?.color || "#B8FF00"}40`,
                        }}
                      >
                        {featuredPost.category?.name || "DevOps"}
                      </span>

                      <span className="text-neutral-500 flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>
                          {featuredPost.views_count} {t.views}
                        </span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono text-white tracking-tight uppercase leading-snug group-hover:text-[#B8FF00] transition-colors mb-4">
                      {featuredPost.title}
                    </h3>

                    {/* Excerpt / Summary */}
                    {getPostExcerpt(featuredPost, 200) && (
                      <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6">
                        {getPostExcerpt(featuredPost, 200)}
                      </p>
                    )}
                  </div>

                  {/* Footer Meta info */}
                  <div className="pt-5 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs text-neutral-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <User className="w-3.5 h-3.5 text-[#B8FF00]" />
                        <span>{featuredPost.author?.name}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(featuredPost.published_at, language)}</span>
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 group-hover:bg-[#B8FF00] group-hover:text-black group-hover:border-[#B8FF00] text-white flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Horizontal Scroll Article Slider Container */}
            {regularPosts.length > 0 && (
              <div className="space-y-4">
                {/* Horizontal Navigation Header Controls */}
                <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
                    <span className="tracking-wider uppercase font-bold text-neutral-300">
                      [ HORIZONTAL SLIDER // SCROLL SAMPING → ]
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => scrollSlider("left")}
                      aria-label="Previous Article"
                      suppressHydrationWarning
                      className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/90 hover:bg-[#B8FF00] hover:text-black hover:border-[#B8FF00] text-white flex items-center justify-center transition-all duration-300 shadow-md"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => scrollSlider("right")}
                      aria-label="Next Article"
                      suppressHydrationWarning
                      className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/90 hover:bg-[#B8FF00] hover:text-black hover:border-[#B8FF00] text-white flex items-center justify-center transition-all duration-300 shadow-md"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Horizontal Scroll Track */}
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
                      className="w-[280px] sm:w-[340px] md:w-[360px] lg:w-[380px] shrink-0 snap-start group rounded-3xl bg-[#111111] border border-neutral-800 hover:border-[#B8FF00]/40 overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xl"
                    >
                      {/* Cover Frame */}
                      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-neutral-900">
                        <BlogCoverImage
                          src={post.cover_image}
                          alt={post.title}
                          category={post.category}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 left-4 z-10">
                          <span
                            className="px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase shadow-md backdrop-blur-md"
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
                          <div className="flex items-center space-x-3 text-neutral-500 font-mono text-[11px] mb-3">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(post.published_at, language)}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>
                                {post.views_count} {t.views}
                              </span>
                            </span>
                          </div>

                          <h4 className="text-lg font-extrabold font-mono text-white tracking-tight uppercase leading-snug group-hover:text-[#B8FF00] transition-colors mb-3 line-clamp-2">
                            {post.title}
                          </h4>

                          {getPostExcerpt(post, 130) && (
                            <p className="text-neutral-400 font-light text-xs leading-relaxed line-clamp-3 mb-6">
                              {getPostExcerpt(post, 130)}
                            </p>
                          )}
                        </div>

                        {/* Card Footer */}
                        <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs">
                          <span className="text-neutral-500 text-[11px]">
                            {t.by} {post.author?.name}
                          </span>

                          <span className="inline-flex items-center space-x-1 text-[#B8FF00] font-bold group-hover:translate-x-1 transition-transform">
                            <span>{t.readArticle}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

