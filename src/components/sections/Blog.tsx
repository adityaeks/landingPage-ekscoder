"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  BookOpen,
  Eye,
  Calendar,
  User,
  ArrowUpRight,
  X,
  Sparkles,
  Share2,
  Tag,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import {
  BlogPost,
  fetchBlogPostsFromBackend,
  formatDate,
  fallbackBlogPosts,
} from "@/services/blogService";
import { MagneticButton } from "@/components/ui/MagneticButton";
import ReactMarkdown from "react-markdown";

export const Blog: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].blog;

  const [posts, setPosts] = useState<BlogPost[]>(fallbackBlogPosts);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activePostModal, setActivePostModal] = useState<BlogPost | null>(null);

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

  // Open & Close Modal Reader
  const openModal = (post: BlogPost) => {
    setActivePostModal(post);
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.stop();
    }
  };

  const closeModal = () => {
    setActivePostModal(null);
    document.body.style.overflow = "unset";
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.start();
    }
  };

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

        {/* Category Filter Tabs */}
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
        ) : (
          <div className="space-y-12">
            {/* Featured Post Banner */}
            {featuredPost && (
              <div
                onClick={() => openModal(featuredPost)}
                data-cursor="READ"
                suppressHydrationWarning
                className="group relative rounded-3xl bg-[#111111] border border-neutral-800 hover:border-[#B8FF00]/50 overflow-hidden transition-all duration-500 cursor-pointer shadow-2xl grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Cover Image Container */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-neutral-900">
                  <img
                    src={featuredPost.cover_image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent lg:hidden" />

                  {/* Featured Pill */}
                  <div className="absolute top-6 left-6 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#B8FF00] text-black font-mono text-[11px] font-extrabold uppercase shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    <span>{t.featuredBadge}</span>
                  </div>
                </div>

                {/* Article Info Details */}
                <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    {/* Category & Meta Pill */}
                    <div className="flex items-center space-x-3 mb-6 font-mono text-xs">
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
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-white tracking-tight uppercase leading-snug group-hover:text-[#B8FF00] transition-colors mb-4">
                      {featuredPost.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed line-clamp-3 mb-8">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  {/* Footer Meta info */}
                  <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs text-neutral-500">
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

                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 group-hover:bg-[#B8FF00] group-hover:text-black group-hover:border-[#B8FF00] text-white flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
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
                    <div
                      key={post.id}
                      onClick={() => openModal(post)}
                      data-cursor="READ"
                      suppressHydrationWarning
                      className="w-[280px] sm:w-[340px] md:w-[360px] lg:w-[380px] shrink-0 snap-start group rounded-3xl bg-[#111111] border border-neutral-800 hover:border-[#B8FF00]/40 overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xl"
                    >
                      {/* Cover Frame */}
                      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-neutral-900">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
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

                          <p className="text-neutral-400 font-light text-xs leading-relaxed line-clamp-3 mb-6">
                            {post.excerpt}
                          </p>
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ARTICLE READER MODAL DRAWER */}
      {activePostModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl animate-fade-in"
          onClick={closeModal}
          data-lenis-prevent
        >
          <div
            data-lenis-prevent
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#111111] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Controls */}
            <div className="p-6 border-b border-neutral-800/80 flex items-center justify-between bg-[#141414] shrink-0">
              <div className="flex items-center space-x-3">
                <span
                  className="px-3.5 py-1 rounded-full font-mono text-xs font-bold uppercase"
                  style={{
                    backgroundColor: `${activePostModal.category?.color || "#B8FF00"}20`,
                    color: activePostModal.category?.color || "#B8FF00",
                    border: `1px solid ${activePostModal.category?.color || "#B8FF00"}40`,
                  }}
                >
                  {activePostModal.category?.name}
                </span>

                <span className="text-neutral-400 font-mono text-xs hidden sm:inline">
                  • {formatDate(activePostModal.published_at, language)}
                </span>
              </div>

              <button
                onClick={closeModal}
                suppressHydrationWarning
                className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-[#B8FF00] hover:text-black border border-neutral-800 text-neutral-300 font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center space-x-2"
              >
                <span>{t.closeModal}</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Modal Article Content */}
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="p-6 sm:p-10 overflow-y-auto space-y-8 custom-scrollbar overscroll-contain flex-1"
            >
              {/* Cover Header */}
              <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <img
                  src={activePostModal.cover_image}
                  alt={activePostModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
              </div>

              {/* Title & Metadata */}
              <div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-mono text-white tracking-tight uppercase leading-tight mb-6">
                  {activePostModal.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pb-6 border-b border-neutral-800">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-4 h-4 text-[#B8FF00]" />
                    <span className="text-white font-medium">{activePostModal.author?.name}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(activePostModal.published_at, language)}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1.5">
                    <Eye className="w-4 h-4" />
                    <span>
                      {activePostModal.views_count} {t.views}
                    </span>
                  </div>
                </div>
              </div>

              {/* Excerpt Lead */}
              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-neutral-200 font-light text-base leading-relaxed italic">
                &ldquo;{activePostModal.excerpt}&rdquo;
              </div>

              {/* Formatted Content Body */}
              <div className="prose prose-invert max-w-none text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight uppercase border-b border-neutral-800 pb-3 mt-8 mb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight mt-8 mb-4 border-b border-neutral-800/80 pb-2">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg sm:text-xl font-bold font-mono text-[#B8FF00] tracking-tight mt-6 mb-3">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-base sm:text-lg font-semibold font-mono text-neutral-200 mt-4 mb-2">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 mb-4 text-neutral-300 pl-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 mb-4 text-neutral-300 pl-2 font-mono">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed text-neutral-300">
                        {children}
                      </li>
                    ),
                    pre: ({ children }) => (
                      <pre className="p-4 my-4 rounded-xl bg-black border border-neutral-800 font-mono text-xs text-[#B8FF00] overflow-x-auto whitespace-pre-wrap">
                        {children}
                      </pre>
                    ),
                    code: ({ node, className, children, ...props }: any) => {
                      const isMultiLine = typeof children === "string" && children.includes("\n");
                      const isInline = !className && !isMultiLine;

                      if (isInline) {
                        return (
                          <code
                            className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[#B8FF00] font-mono text-xs"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="p-4 my-4 rounded-xl bg-neutral-900/80 border-l-4 border-[#B8FF00] text-neutral-200 font-light text-sm italic">
                        {children}
                      </blockquote>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-white">
                        {children}
                      </strong>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B8FF00] underline underline-offset-4 hover:text-white transition-colors"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {activePostModal.content.replace(/\r\n/g, "\n")}
                </ReactMarkdown>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                  <Tag className="w-4 h-4 text-[#B8FF00]" />
                  <span>
                    Keywords: {activePostModal.meta?.keywords || "laravel, vps, web development"}
                  </span>
                </div>

                <MagneticButton strength={0.3}>
                  <button
                    onClick={closeModal}
                    suppressHydrationWarning
                    className="px-6 py-3 rounded-full bg-[#B8FF00] text-black font-mono font-bold text-xs tracking-wider uppercase hover:bg-white transition-colors"
                  >
                    {t.closeModal}
                  </button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
