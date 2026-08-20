"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BlogPost,
  BlogCategory,
  formatDate,
  getPostExcerpt,
  getFullImageUrl,
  getReadingTime,
} from "@/services/blogService";
import { gsap } from "@/lib/gsap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  ArrowLeft,
  ArrowUpRight,
  Share2,
  Calendar,
  Eye,
  User,
  Tag,
  Clock,
  Code2,
  Sparkles,
  ChevronRight,
  Check,
  BookOpen,
  MessageSquare,
} from "lucide-react";

export interface BlogDetailClientProps {
  post: BlogPost | null;
  allPosts: BlogPost[];
}

/**
 * Robust Cyber Cover Image with fallback
 */
export const ArticleCoverImage: React.FC<{
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

  const accentColor = category?.color || "#B8FF00";

  if (!fullSrc || hasError) {
    return (
      <div
        className={`w-full h-full min-h-[260px] sm:min-h-[380px] relative flex flex-col items-center justify-center overflow-hidden select-none bg-[#0c0d0e] rounded-3xl border border-neutral-800 ${className}`}
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${accentColor}18 0%, #0c0d0e 85%)`,
        }}
      >
        {/* Cyber Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${accentColor}25 1px, transparent 1px), linear-gradient(90deg, ${accentColor}25 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Glow */}
        <div
          className="w-56 h-56 rounded-full blur-3xl absolute opacity-20 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        {/* Center Graphic */}
        <div className="relative z-10 flex flex-col items-center space-y-4 p-8 text-center">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-2xl border backdrop-blur-md transition-transform duration-500"
            style={{
              backgroundColor: `${accentColor}15`,
              borderColor: `${accentColor}35`,
              color: accentColor,
            }}
          >
            <Code2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="space-y-1.5">
            <span
              className="font-mono text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border inline-block backdrop-blur-md"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}30`,
                color: accentColor,
              }}
            >
              {category?.name || "EKSCODER // TECHNICAL ARTICLE"}
            </span>
          </div>
        </div>

        {/* Watermark */}
        <div
          className="absolute bottom-4 right-6 font-mono text-[10px] tracking-widest opacity-40 uppercase font-bold select-none"
          style={{ color: accentColor }}
        >
          // EKSCODER.DEV // INSIGHT
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px] max-h-[460px] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800">
      <img
        src={fullSrc}
        alt={alt}
        className={`w-full h-full object-cover object-center ${className}`}
        loading="eager"
        onError={() => setHasError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
};

export function BlogDetailClient({ post, allPosts }: BlogDetailClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);

  // Related articles (same category if available or latest, excluding current)
  const related = useMemo(() => {
    if (!post) return [];
    const others = allPosts.filter((p) => p.id !== post.id && p.slug !== post.slug);
    const sameCategory = others.filter((p) => p.category?.name === post.category?.name);
    const result = sameCategory.length > 0 ? sameCategory : others;
    return result.slice(0, 3);
  }, [post, allPosts]);

  const readingTime = useMemo(() => getReadingTime(post?.content), [post?.content]);
  const summary = useMemo(() => (post ? getPostExcerpt(post, 240) : ""), [post]);

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }, "-=0.3")
        .fromTo(metaRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
        .fromTo(overviewRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(bodyRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .fromTo(sidebarRef.current, { opacity: 0, x: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");

      if (relatedRef.current) {
        const cards = relatedRef.current.querySelectorAll(".related-blog-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: relatedRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [post]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined" && post) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Baca artikel menarik: "${post.title}" di EKSCODER`);
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, "_blank");
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined" && post) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`"${post.title}" via @ekscoder`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
  };

  // 404 State
  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center">
        <span className="text-[#B8FF00] font-mono text-xs tracking-widest mb-6">// 404 ARTICLE NOT FOUND</span>
        <h1 className="text-5xl sm:text-7xl font-extrabold font-mono text-white tracking-tighter uppercase mb-6">
          ARTICLE NOT FOUND.
        </h1>
        <p className="text-neutral-400 max-w-md mb-8 font-light text-sm sm:text-base">
          Artikel yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <Link
          href="/#blog"
          suppressHydrationWarning
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#B8FF00] text-black font-mono font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>KEMBALI KE BLOG</span>
        </Link>
      </div>
    );
  }

  const categoryColor = post.category?.color || "#B8FF00";

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden selection:bg-[#B8FF00] selection:text-black">
      {/* ── Top Navigation Bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between border-b border-neutral-800/50 bg-[#0A0A0A]/85 backdrop-blur-xl">
        <Link
          href="/#blog"
          data-cursor="HOME"
          suppressHydrationWarning
          className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-[#B8FF00] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="tracking-wider">KEMBALI</span>
        </Link>

        <Link
          href="/"
          suppressHydrationWarning
          className="font-mono font-extrabold text-white text-lg tracking-tighter hover:text-[#B8FF00] transition-colors"
          data-cursor="EKSCODER"
        >
          EKSCODER<span className="text-[#B8FF00]">.</span>
        </Link>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyLink}
            suppressHydrationWarning
            data-cursor="SHARE"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-neutral-700 hover:border-[#B8FF00] text-xs font-mono text-neutral-300 hover:text-[#B8FF00] transition-all bg-neutral-900/60"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#B8FF00]" />
                <span className="text-[#B8FF00]">LINK TERSALIN</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">BAGIKAN</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* ── Hero Banner Section ── */}
      <div
        ref={heroRef}
        className="relative w-full min-h-[50vh] md:min-h-[60vh] bg-gradient-to-b from-[#121417] via-[#0D0E10] to-[#0A0A0A] flex flex-col justify-end pt-28 md:pt-36 pb-14 px-6 md:px-12 overflow-hidden border-b border-neutral-800/60"
      >
        {/* Cyber Grid Texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        {/* Ambient Radial Accent Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 65% 40%, ${categoryColor}18, transparent 70%)`,
          }}
        />

        {/* Ambient Subtle Blue-Green Glow */}
        <div className="w-[500px] h-[500px] rounded-full blur-[140px] absolute -top-40 right-10 bg-[#B8FF00]/5 pointer-events-none" />

        {/* Giant Watermark Category */}
        <div className="absolute -bottom-6 -right-6 font-mono text-[16vw] font-black text-white/[0.03] select-none pointer-events-none leading-none uppercase">
          {post.category?.slug || "BLOG"}
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Category & Read Time Badge */}
          <div ref={badgeRef} className="flex flex-wrap items-center gap-3 mb-6">
            <div
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border font-mono text-[11px] font-bold tracking-widest uppercase shadow-lg"
              style={{
                backgroundColor: `${categoryColor}18`,
                borderColor: `${categoryColor}40`,
                color: categoryColor,
              }}
            >
              <Sparkles className="w-3 h-3" />
              <span>{post.category?.name || "TECHNICAL"}</span>
            </div>

            <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono text-neutral-400">
              <Clock className="w-3 h-3 text-[#B8FF00]" />
              <span>{readingTime}</span>
            </span>

            {post.featured && (
              <span className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#B8FF00] text-black font-mono text-[11px] font-extrabold uppercase shadow-lg">
                <Sparkles className="w-3 h-3" />
                <span>FEATURED</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-mono tracking-tight uppercase leading-[1.05] text-white mb-8 max-w-5xl"
          >
            {post.title}
          </h1>

          {/* Metadata Row */}
          <div ref={metaRef} className="flex flex-wrap items-center gap-6 font-mono text-xs text-neutral-400">
            <span className="flex items-center space-x-2">
              <User className="w-3.5 h-3.5 text-[#B8FF00]" />
              <span className="text-neutral-200">{post.author?.name || "Ekscoder Author"}</span>
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-[#B8FF00]" />
              <span>{formatDate(post.published_at, "ID")}</span>
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center space-x-2">
              <Eye className="w-3.5 h-3.5 text-[#B8FF00]" />
              <span>{post.views_count} views</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Article & Sidebar Content ── */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Cover Image Frame */}
        <div className="mb-14">
          <ArticleCoverImage
            src={post.cover_image}
            alt={post.title}
            category={post.category}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (8 cols): Article Body */}
          <div className="lg:col-span-8 space-y-12">
            {/* Markdown Body Content */}
            <div ref={bodyRef} className="prose prose-invert max-w-none text-neutral-300 font-light text-base sm:text-lg leading-relaxed space-y-6">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl sm:text-4xl font-black font-mono text-white tracking-tight uppercase border-b border-neutral-800 pb-4 mt-12 mb-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl sm:text-3xl font-bold font-mono text-white tracking-tight uppercase mt-10 mb-5 border-b border-neutral-800/70 pb-3 flex items-center space-x-3">
                      <span className="w-3 h-3 rounded-sm bg-[#B8FF00] inline-block mr-2" />
                      <span>{children}</span>
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg sm:text-2xl font-bold font-mono text-[#B8FF00] tracking-tight mt-8 mb-4">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-base sm:text-xl font-semibold font-mono text-neutral-200 mt-6 mb-3">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-3 mb-6 text-neutral-300 pl-3">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-3 mb-6 text-neutral-300 pl-3 font-mono">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed text-neutral-300">
                      {children}
                    </li>
                  ),
                  pre: ({ children }) => (
                    <pre className="p-5 my-6 rounded-2xl bg-black/90 border border-neutral-800 font-mono text-xs sm:text-sm text-[#B8FF00] overflow-x-auto whitespace-pre-wrap shadow-2xl custom-scrollbar">
                      {children}
                    </pre>
                  ),
                  code: ({ node, className, children, ...props }: any) => {
                    const isMultiLine = typeof children === "string" && children.includes("\n");
                    const isInline = !className && !isMultiLine;

                    if (isInline) {
                      return (
                        <code
                          className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[#B8FF00] font-mono text-xs sm:text-sm"
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
                    <blockquote className="p-5 sm:p-6 my-6 rounded-2xl bg-neutral-900/90 border-l-4 border-[#B8FF00] text-neutral-200 font-light text-base sm:text-lg italic shadow-md">
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
                {post.content.replace(/\r\n/g, "\n")}
              </ReactMarkdown>
            </div>

            {/* Social Share & Interaction Footer */}
            <div className="pt-8 border-t border-neutral-800/80 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                  <Tag className="w-4 h-4 text-[#B8FF00]" />
                  <span>KATA KUNCI: {post.meta?.keywords || "laravel, vps, devops, software architecture"}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleShareWhatsApp}
                    aria-label="Share to WhatsApp"
                    className="px-4 py-2 rounded-full bg-[#111111] border border-neutral-800 hover:border-[#B8FF00] hover:text-[#B8FF00] font-mono text-xs text-neutral-300 transition-all flex items-center space-x-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={handleShareTwitter}
                    aria-label="Share to Twitter"
                    className="px-4 py-2 rounded-full bg-[#111111] border border-neutral-800 hover:border-[#B8FF00] hover:text-[#B8FF00] font-mono text-xs text-neutral-300 transition-all flex items-center space-x-2"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>X (Twitter)</span>
                  </button>
                </div>
              </div>

              {/* Author Box */}
              <div className="p-6 rounded-2xl bg-[#111111] border border-neutral-800 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#B8FF00]/10 border border-[#B8FF00]/30 text-[#B8FF00] flex items-center justify-center font-mono font-bold text-lg">
                    {post.author?.name?.charAt(0) || "E"}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">DITULIS OLEH</span>
                    <h4 className="font-mono font-bold text-white text-base">{post.author?.name || "Ekscoder Engineering Team"}</h4>
                  </div>
                </div>

                <Link
                  href="/#blog"
                  suppressHydrationWarning
                  className="hidden sm:inline-flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-[#B8FF00] transition-colors"
                >
                  <span>SEMUA ARTIKEL</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Info Sidebar */}
          <div ref={sidebarRef} className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 rounded-3xl bg-[#111111] border border-neutral-800 space-y-6 font-mono text-xs shadow-xl">
                <div>
                  <span className="text-neutral-500 tracking-widest uppercase block mb-2">KATEGORI</span>
                  <span
                    className="inline-block px-3 py-1 rounded-full font-bold uppercase"
                    style={{
                      backgroundColor: `${categoryColor}18`,
                      borderColor: `${categoryColor}40`,
                      color: categoryColor,
                      border: `1px solid ${categoryColor}40`,
                    }}
                  >
                    {post.category?.name || "General"}
                  </span>
                </div>

                <div className="h-[1px] bg-neutral-800" />

                <div>
                  <span className="text-neutral-500 tracking-widest uppercase block mb-2">TANGGAL RILIS</span>
                  <span className="text-neutral-200 font-bold">{formatDate(post.published_at, "ID")}</span>
                </div>

                <div className="h-[1px] bg-neutral-800" />

                <div>
                  <span className="text-neutral-500 tracking-widest uppercase block mb-2">WAKTU BACA</span>
                  <span className="text-neutral-200 font-bold">{readingTime}</span>
                </div>

                <div className="h-[1px] bg-neutral-800" />

                <div>
                  <span className="text-neutral-500 tracking-widest uppercase block mb-2">TOTAL PEMBACA</span>
                  <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#B8FF00]/10 border border-[#B8FF00]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
                    <span className="text-[#B8FF00] font-bold">{post.views_count} VIEWS</span>
                  </span>
                </div>

                {post.featured && (
                  <>
                    <div className="h-[1px] bg-neutral-800" />
                    <div>
                      <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                        <Sparkles className="w-3 h-3 text-[#B8FF00]" />
                        <span className="text-neutral-300 font-bold">ARTIKEL UNGGULAN</span>
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Consultation / CTA Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 to-[#111111] border border-neutral-800 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#B8FF00] uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" />
                  <span>BUTUH SOLUSI TEKNIS?</span>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed font-light">
                  Diskusikan arsitektur sistem, automasi deployment, atau pengembangan platform digital Anda bersama tim engineer Ekscoder.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=6281230508019&text=Halo%20Ekscoder%2C%20saya%20tertarik%20konsultasi%20mengenai%20project%20teknologi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full py-3 rounded-full bg-[#B8FF00] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <span>KONSULTASI GRATIS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Articles Section ── */}
      {related.length > 0 && (
        <section className="border-t border-neutral-800/60 px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center space-x-3 text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-3">
                  <span className="w-8 h-[1px] bg-[#B8FF00]" />
                  <span>// REKOMENDASI BACAAN</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tighter uppercase text-white">
                  ARTIKEL LAINNYA.
                </h2>
              </div>
              <Link
                href="/#blog"
                suppressHydrationWarning
                data-cursor="ALL"
                className="hidden sm:inline-flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-[#B8FF00] transition-colors group"
              >
                <span>SEMUA ARTIKEL</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div ref={relatedRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => {
                const relAccent = rel.category?.color || "#B8FF00";
                const relExcerpt = getPostExcerpt(rel, 120);

                return (
                  <Link
                    key={rel.slug || rel.id}
                    href={`/blog/${rel.slug || rel.id}`}
                    suppressHydrationWarning
                    data-cursor="READ"
                    className="related-blog-card group rounded-3xl bg-[#111111] border border-neutral-800 hover:border-[#B8FF00]/40 overflow-hidden transition-all duration-400 flex flex-col justify-between"
                  >
                    {/* Card Preview Frame */}
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                      <ArticleCoverImage
                        src={rel.cover_image}
                        alt={rel.title}
                        category={rel.category}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className="px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase shadow-md backdrop-blur-md"
                          style={{
                            backgroundColor: `${relAccent}25`,
                            color: relAccent,
                            border: `1px solid ${relAccent}45`,
                          }}
                        >
                          {rel.category?.name || "DevOps"}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center space-x-3 text-neutral-500 font-mono text-[11px] mb-3">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(rel.published_at, "ID")}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{rel.views_count} views</span>
                          </span>
                        </div>

                        <h3 className="text-base font-extrabold font-mono text-white uppercase tracking-tight group-hover:text-[#B8FF00] transition-colors line-clamp-2 mb-3 leading-snug">
                          {rel.title}
                        </h3>

                        {relExcerpt && (
                          <p className="text-neutral-400 font-light text-xs leading-relaxed line-clamp-2 mb-4">
                            {relExcerpt}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs">
                        <span className="text-neutral-500 text-[11px]">
                          By {rel.author?.name || "Ekscoder"}
                        </span>
                        <span className="inline-flex items-center space-x-1 text-[#B8FF00] font-bold group-hover:translate-x-1 transition-transform">
                          <span>BACA</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer Strip ── */}
      <footer className="border-t border-neutral-800/60 px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <span>© 2026 EKSCODER. ALL RIGHTS RESERVED.</span>
          <Link
            href="/"
            suppressHydrationWarning
            className="hover:text-[#B8FF00] transition-colors tracking-wider"
          >
            KEMBALI KE BERANDA →
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default BlogDetailClient;
