"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/data/projects";
import { gsap } from "@/lib/gsap";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Calendar,
  Tag,
  Code2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface ProjectDetailClientProps {
  project: Project | null;
  allProjects: Project[];
}

export function ProjectDetailClient({ project, allProjects }: ProjectDetailClientProps) {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  // Related projects (exclude current)
  const related = allProjects.filter((p) => p.slug !== project?.slug).slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .fromTo(titleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" }, "-=0.3")
        .fromTo(metaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
        .fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .fromTo(techRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

      if (relatedRef.current) {
        const cards = relatedRef.current.querySelectorAll(".related-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: relatedRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [project]);

  // 404 State
  if (!project) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center">
        <span className="text-[#B8FF00] font-mono text-xs tracking-widest mb-6">// 404 PROJECT NOT FOUND</span>
        <h1 className="text-5xl sm:text-7xl font-extrabold font-mono text-white tracking-tighter uppercase mb-6">
          OOPS.
        </h1>
        <p className="text-neutral-400 max-w-md mb-8 font-light">
          This project doesn&apos;t exist or has been removed from the portfolio.
        </p>
        <Link
          href="/#projects"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#B8FF00] text-black font-mono font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO PROJECTS</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden">

      {/* ── Back Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between border-b border-neutral-800/50 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <button
          onClick={() => router.back()}
          data-cursor="BACK"
          className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-[#B8FF00] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="tracking-wider">BACK</span>
        </button>

        <Link
          href="/"
          className="font-mono font-extrabold text-white text-lg tracking-tighter hover:text-[#B8FF00] transition-colors"
          data-cursor="EKSCODER"
        >
          EKSCODER<span className="text-[#B8FF00]">.</span>
        </Link>

        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="LIVE"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-neutral-700 text-xs font-mono text-neutral-300 hover:border-[#B8FF00] hover:text-[#B8FF00] transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>LIVE PREVIEW</span>
          </a>
        ) : (
          <span
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-neutral-800 text-xs font-mono text-neutral-600 cursor-not-allowed select-none opacity-50"
            title="No live preview available"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>LIVE PREVIEW</span>
          </span>
        )}
      </nav>

      {/* ── Hero Banner ── */}
      <div
        ref={heroRef}
        className={`relative w-full min-h-[60vh] md:min-h-[70vh] bg-gradient-to-br ${project.imageBg} flex flex-col justify-end pt-28 md:pt-32 pb-16 px-6 md:px-12 overflow-hidden`}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 70% 50%, ${project.accentColor}18, transparent 70%)`,
          }}
        />

        {/* Giant watermark number */}
        <div className="absolute -bottom-4 -right-6 font-mono text-[22vw] font-black text-white/[0.04] select-none pointer-events-none leading-none">
          {project.number}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Badge */}
          <div ref={badgeRef} className="flex items-center space-x-3 mb-6">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
              <Sparkles className="w-3 h-3 text-[#B8FF00]" />
              <span className="text-[11px] font-mono text-[#B8FF00] tracking-widest uppercase">
                {project.category}
              </span>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5 text-[11px] font-mono text-neutral-400">
              {project.number} / {String(allProjects.length).padStart(2, "0")}
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-[13vw] sm:text-8xl md:text-9xl font-extrabold font-mono tracking-tighter uppercase leading-[0.88] text-white mb-8"
          >
            {project.title}
          </h1>

          {/* Meta info row */}
          <div ref={metaRef} className="flex flex-wrap items-center gap-6 font-mono text-xs text-neutral-400">
            <span className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-[#B8FF00]" />
              <span>{project.year}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Tag className="w-3.5 h-3.5 text-[#B8FF00]" />
              <span>{project.category}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Code2 className="w-3.5 h-3.5 text-[#B8FF00]" />
              <span>{project.technologies.length} TECHNOLOGIES</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: Description */}
          <div className="lg:col-span-8 space-y-12">
            {/* Description */}
            <div ref={descRef}>
              <div className="flex items-center space-x-3 text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-5">
                <span className="w-8 h-[1px] bg-[#B8FF00]" />
                <span>// PROJECT OVERVIEW</span>
              </div>
              <p className="text-xl sm:text-2xl text-neutral-300 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div ref={techRef}>
              <div className="flex items-center space-x-3 text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-5">
                <span className="w-8 h-[1px] bg-[#B8FF00]" />
                <span>// TECH STACK</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-[#141414] border border-neutral-800 hover:border-[#B8FF00]/40 font-mono text-sm text-neutral-300 hover:text-[#B8FF00] transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 pt-4">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="LIVE"
                  className="inline-flex items-center space-x-3 px-7 py-4 rounded-full bg-[#B8FF00] text-black font-mono font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors shadow-[0_0_30px_rgba(184,255,0,0.2)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>VISIT LIVE SITE</span>
                </a>
              ) : (
                <span
                  className="inline-flex items-center space-x-3 px-7 py-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-600 font-mono font-bold text-sm tracking-wider uppercase cursor-not-allowed select-none opacity-50"
                  title="No live site available"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>VISIT LIVE SITE</span>
                </span>
              )}
              <button
                onClick={() => router.back()}
                data-cursor="BACK"
                className="inline-flex items-center space-x-3 px-7 py-4 rounded-full border border-neutral-700 bg-neutral-900/60 text-white font-mono font-medium text-sm tracking-wider uppercase hover:bg-neutral-800 hover:border-neutral-600 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>ALL PROJECTS</span>
              </button>
            </div>
          </div>

          {/* Right: Project Info Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 p-6 rounded-2xl bg-[#111111] border border-neutral-800 space-y-6 font-mono text-xs">
              <div>
                <span className="text-neutral-500 tracking-widest uppercase block mb-2">PROJECT ID</span>
                <span className="text-neutral-200 font-bold">{project.number}</span>
              </div>
              <div className="h-[1px] bg-neutral-800" />
              <div>
                <span className="text-neutral-500 tracking-widest uppercase block mb-2">CATEGORY</span>
                <span className="text-[#B8FF00] font-bold">{project.category}</span>
              </div>
              <div className="h-[1px] bg-neutral-800" />
              <div>
                <span className="text-neutral-500 tracking-widest uppercase block mb-2">YEAR</span>
                <span className="text-neutral-200 font-bold">{project.year}</span>
              </div>
              <div className="h-[1px] bg-neutral-800" />
              <div>
                <span className="text-neutral-500 tracking-widest uppercase block mb-3">STATUS</span>
                <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#B8FF00]/10 border border-[#B8FF00]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
                  <span className="text-[#B8FF00] font-bold">ACTIVE PROJECT</span>
                </span>
              </div>
              {project.featured && (
                <>
                  <div className="h-[1px] bg-neutral-800" />
                  <div>
                    <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                      <Sparkles className="w-3 h-3 text-[#B8FF00]" />
                      <span className="text-neutral-300 font-bold">FEATURED WORK</span>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <section className="border-t border-neutral-800/60 px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center space-x-3 text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-3">
                  <span className="w-8 h-[1px] bg-[#B8FF00]" />
                  <span>// MORE PROJECTS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tighter uppercase text-white">
                  RELATED WORK.
                </h2>
              </div>
              <Link
                href="/#projects"
                data-cursor="ALL"
                className="hidden sm:inline-flex items-center space-x-2 text-xs font-mono text-neutral-400 hover:text-[#B8FF00] transition-colors group"
              >
                <span>VIEW ALL</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div ref={relatedRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/projects/${rel.slug}`}
                  data-cursor="VIEW"
                  className="related-card group rounded-2xl bg-[#111111] border border-neutral-800 hover:border-[#B8FF00]/40 overflow-hidden transition-all duration-400"
                >
                  {/* Card preview gradient */}
                  <div
                    className={`h-44 w-full bg-gradient-to-br ${rel.imageBg} relative flex items-end p-5 overflow-hidden group-hover:scale-[1.03] transition-transform duration-500`}
                  >
                    <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                    <div className="absolute bottom-2 right-3 font-mono text-6xl font-black text-white/5 select-none">
                      {rel.number}
                    </div>
                    <div className="relative z-10">
                      <span className="text-[10px] font-mono text-[#B8FF00] tracking-widest uppercase block mb-0.5">
                        {rel.category}
                      </span>
                      <h3 className="text-lg font-mono font-black text-white uppercase tracking-tight group-hover:text-[#B8FF00] transition-colors">
                        {rel.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 flex items-center justify-between">
                    <span className="font-mono text-xs text-neutral-500">{rel.year}</span>
                    <span className="inline-flex items-center space-x-1.5 font-mono text-xs text-neutral-400 group-hover:text-[#B8FF00] transition-colors">
                      <span>EXPLORE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
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
            className="hover:text-[#B8FF00] transition-colors tracking-wider"
          >
            BACK TO HOME →
          </Link>
        </div>
      </footer>
    </div>
  );
}
