"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
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
  Clock,
  Code2,
  Check,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { WA_LINK } from "@/data/translations";

export interface BlogDetailClientProps {
  post: BlogPost | null;
  allPosts: BlogPost[];
}

/**
 * Editorial Article Cover Image with clean fallback
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

  if (!fullSrc || hasError) {
    return (
      <div
        className={`w-full aspect-[21/9] min-h-[240px] sm:min-h-[360px] relative flex flex-col items-center justify-center overflow-hidden select-none bg-[#101014] rounded-2xl sm:rounded-3xl border border-white/10 ${className}`}
      >
        <div className="flex flex-col items-center space-y-4 text-center p-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-white shadow-xl">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-neutral-300">
            {category?.name || "JOURNAL"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[21/9] min-h-[240px] sm:min-h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#101014] border border-white/10 shadow-2xl">
      <img
        src={fullSrc}
        alt={alt}
        className={`w-full h-full object-cover object-center ${className}`}
        loading="eager"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export function BlogDetailClient({ post, allPosts }: BlogDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const mastheadRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Next / Previous recommendations (excluding current post)
  const nextPosts = useMemo(() => {
    if (!post) return [];
    return allPosts.filter((p) => p.id !== post.id && p.slug !== post.slug).slice(0, 2);
  }, [post, allPosts]);

  const readingTime = useMemo(() => getReadingTime(post?.content), [post?.content]);
  const leadParagraph = useMemo(() => (post ? getPostExcerpt(post, 200) : ""), [post]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animations
  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      if (mastheadRef.current) {
        gsap.fromTo(
          mastheadRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
        );
      }
    }, containerRef);

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
      const text = encodeURIComponent(`Baca tulisan: "${post.title}" di EKSCODER`);
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
      <div className="min-h-screen bg-[#08080A] flex flex-col items-center justify-center px-6 text-center select-none">
        <span className="text-neutral-400 text-xs tracking-widest mb-4 uppercase">404 ARTICLE NOT FOUND</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase mb-6">
          ARTICLE NOT FOUND.
        </h1>
        <p className="text-neutral-400 max-w-md mb-8 font-light text-sm sm:text-base">
          Artikel yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <Link
          href="/#blog"
          suppressHydrationWarning
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>KEMBALI KE ARTIKEL</span>
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#08080A] text-[#F4F4F6] selection:bg-white selection:text-black"
    >
      {/* ── Scroll Reading Progress Bar ── */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-white z-[100] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Editorial Studio Top Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 md:px-16 py-4 flex items-center justify-between border-b border-white/10 bg-[#08080A]/90 backdrop-blur-xl">
        <Link
          href="/#blog"
          data-cursor="BACK"
          suppressHydrationWarning
          className="inline-flex items-center space-x-2.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="tracking-wider uppercase font-medium">JOURNAL</span>
        </Link>

        <Link
          href="/"
          suppressHydrationWarning
          className="font-bold text-white text-lg tracking-tight hover:text-neutral-300 transition-colors cursor-pointer"
        >
          EKSCODER<span className="text-white">.</span>
        </Link>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyLink}
            suppressHydrationWarning
            aria-label="Share article link"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 text-xs text-neutral-300 hover:text-white transition-all bg-[#121217] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="text-white font-medium">TERSALIN</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-medium">BAGIKAN</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── Editorial Masthead ── */}
      <article className="pt-28 sm:pt-36 md:pt-44 pb-20">
        <div ref={mastheadRef} className="max-w-3xl mx-auto px-5 sm:px-8 text-center sm:text-left">
          {/* Category & Metadata Strip */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-6 text-xs text-neutral-400">
            <span className="px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-white font-semibold uppercase tracking-wider">
              {post.category?.name || "ENGINEERING"}
            </span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>{formatDate(post.published_at, "ID")}</span>
            </span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span>{readingTime}</span>
            </span>
          </div>

          {/* Monumental Article Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase leading-[1.08] text-[#F4F4F6] mb-8">
            {post.title}
          </h1>

          {/* Byline Author Info */}
          <div className="flex items-center justify-center sm:justify-start space-x-4 pt-6 border-t border-white/10 text-xs text-neutral-400">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-sm">
              {post.author?.name?.charAt(0) || "E"}
            </div>
            <div>
              <span className="text-white font-medium block">{post.author?.name || "Ekscoder Engineering"}</span>
              <span className="text-neutral-500 text-[11px]">Boutique Software & Creative Tech Studio</span>
            </div>
          </div>
        </div>

        {/* ── Featured Visual Stage ── */}
        <div className="max-w-3xl mx-auto px-5 sm:px-8 mt-12 mb-16">
          <ArticleCoverImage
            src={post.cover_image}
            alt={post.title}
            category={post.category}
          />
        </div>

        {/* ── Focused Reader View (Clean Distraction-Free Column) ── */}
        <div ref={contentRef} className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Editorial Lead Paragraph */}
          {leadParagraph && (
            <div className="text-lg sm:text-xl md:text-2xl font-light text-neutral-200 leading-relaxed pb-8 mb-8 border-b border-white/10">
              {leadParagraph}
            </div>
          )}

          {/* Markdown Content Flow */}
          <div className="prose prose-invert max-w-none text-neutral-300 font-light text-base sm:text-lg leading-relaxed space-y-6">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight uppercase border-b border-white/10 pb-4 mt-14 mb-6">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight uppercase mt-12 mb-5 border-b border-white/10 pb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight mt-10 mb-4">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-base sm:text-xl font-semibold text-neutral-200 mt-8 mb-3">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed mb-6">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-3 mb-6 text-neutral-300 pl-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-3 mb-6 text-neutral-300 pl-2 font-mono">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed text-neutral-300">
                    {children}
                  </li>
                ),
                pre: ({ children }) => (
                  <pre className="p-5 my-8 rounded-2xl bg-[#0D0D12] border border-white/10 text-xs sm:text-sm text-neutral-200 overflow-x-auto whitespace-pre-wrap shadow-xl custom-scrollbar font-mono">
                    {children}
                  </pre>
                ),
                code: ({ node, className, children, ...props }: any) => {
                  const isMultiLine = typeof children === "string" && children.includes("\n");
                  const isInline = !className && !isMultiLine;

                  if (isInline) {
                    return (
                      <code
                        className="px-2 py-0.5 rounded-md bg-[#16161D] border border-white/10 text-white text-xs sm:text-sm font-mono"
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
                  <blockquote className="p-6 my-8 rounded-2xl bg-[#111116] border-l-2 border-white text-neutral-200 font-light text-base sm:text-lg italic">
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
                    className="text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content.replace(/\r\n/g, "\n")}
            </ReactMarkdown>
          </div>

          {/* ── Article Footer & Engagement ── */}
          <div className="mt-16 pt-10 border-t border-white/10 space-y-10">
            {/* Share & Discussion Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium block mb-2">
                  BAGIKAN TULISAN INI
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleShareWhatsApp}
                    aria-label="Bagikan ke WhatsApp"
                    className="px-4 py-2 rounded-full bg-[#121217] border border-white/10 hover:border-white/30 text-xs text-neutral-300 hover:text-white transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={handleShareTwitter}
                    aria-label="Bagikan ke X"
                    className="px-4 py-2 rounded-full bg-[#121217] border border-white/10 hover:border-white/30 text-xs text-neutral-300 hover:text-white transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>X (Twitter)</span>
                  </button>
                </div>
              </div>

              {/* Consultation Invite */}
              <div className="w-full sm:w-auto">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-md cursor-pointer"
                >
                  <span>KONSULTASI PROYEK</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Author Footprint Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0F0F12] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-lg shrink-0">
                  {post.author?.name?.charAt(0) || "E"}
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{post.author?.name || "Ekscoder Engineering Team"}</h4>
                  <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                    Membangun platform digital dan software sistem kustom untuk bisnis modern di Indonesia.
                  </p>
                </div>
              </div>

              <Link
                href="/#blog"
                suppressHydrationWarning
                className="text-xs font-semibold text-neutral-300 hover:text-white uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
              >
                LIHAT SEMUA TULISAN →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Editorial Next Reads (Next in Journal) ── */}
        {nextPosts.length > 0 && (
          <div className="max-w-4xl mx-auto px-5 sm:px-8 mt-24 pt-16 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs tracking-widest text-neutral-400 uppercase font-medium">
                NEXT IN JOURNAL
              </span>
              <Link
                href="/#blog"
                suppressHydrationWarning
                className="text-xs text-neutral-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                SEMUA ARTIKEL →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {nextPosts.map((nextItem) => (
                <Link
                  key={nextItem.slug || nextItem.id}
                  href={`/blog/${nextItem.slug || nextItem.id}`}
                  suppressHydrationWarning
                  data-cursor="READ"
                  className="group p-6 rounded-2xl bg-[#0F0F12] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      {nextItem.category?.name || "ARTICLE"}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight group-hover:text-neutral-200 transition-colors line-clamp-2">
                      {nextItem.title}
                    </h3>
                    {getPostExcerpt(nextItem, 90) && (
                      <p className="text-neutral-400 text-xs font-light line-clamp-2 leading-relaxed">
                        {getPostExcerpt(nextItem, 90)}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                    <span>{formatDate(nextItem.published_at, "ID")}</span>
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* ── Studio Colophon Footer ── */}
      <footer className="border-t border-white/10 px-5 sm:px-8 md:px-16 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <span>© 2026 EKSCODER. ALL RIGHTS RESERVED.</span>
          <Link
            href="/"
            suppressHydrationWarning
            className="hover:text-white transition-colors tracking-wider uppercase font-medium cursor-pointer"
          >
            KEMBALI KE BERANDA →
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default BlogDetailClient;
