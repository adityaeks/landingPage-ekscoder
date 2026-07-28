"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Code,
  Cpu,
  Cloud,
  Layout,
  ShieldCheck,
  ArrowUpRight,
  Terminal as TerminalIcon,
  Activity,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export const Capabilities: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].capabilities;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileTabsRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const capabilities = [
    {
      number: "01",
      shortTitle: "FRONTEND",
      title: "FRONTEND ENGINEERING",
      subtitle: "MOTION-FIRST FRONTEND ENGINE",
      description: "High-end, performance-driven web applications engineered with Next.js, TypeScript, GSAP, and ultra-fast SSR.",
      icon: Code,
      accent: "#B8FF00",
      accentBg: "border-[#B8FF00]/40 shadow-[#B8FF00]/10",
      terminalTitle: "next.config.ts — v16.2",
      snippet: [
        "export default defineNextConfig({",
        "  motionFirst: true, smoothScroll: 'Lenis',",
        "  animationEngine: 'GSAP/ScrollTrigger'",
        "});"
      ],
      badge: "LATENCY: 0.12ms",
      tags: ["Next.js", "React", "GSAP", "Tailwind CSS"]
    },
    {
      number: "02",
      shortTitle: "SOFTWARE",
      title: "SOFTWARE ENGINEERING",
      subtitle: "ENTERPRISE MICROSERVICES & APIs",
      description: "Scalable backend systems, ERP architectures, complex business logic engines, and high-concurrency RESTful APIs.",
      icon: Cpu,
      accent: "#06B6D4",
      accentBg: "border-cyan-500/40 shadow-cyan-500/10",
      terminalTitle: "api-gateway.service.go",
      snippet: [
        "func HandleStream(ctx *Context) {",
        "  pool := redis.NewCluster()",
        "  ctx.JSON(200, status.OK)",
        "}"
      ],
      badge: "THROUGHPUT: 50k rps",
      tags: ["Go", "Node.js", "PostgreSQL", "Redis"]
    },
    {
      number: "03",
      shortTitle: "CLOUD",
      title: "CLOUD & INFRASTRUCTURE",
      subtitle: "DEVOPS, DOCKER & CI/CD",
      description: "Containerized deployment pipelines, Nginx load balancers, high-availability Linux clusters, and zero-downtime releases.",
      icon: Cloud,
      accent: "#A855F7",
      accentBg: "border-purple-500/40 shadow-purple-500/10",
      terminalTitle: "docker-compose.prod.yml",
      snippet: [
        "services: app_cluster:",
        "  image: ekscoder/core:latest",
        "  replicas: 8, ports: ['443:443']"
      ],
      badge: "UPTIME: 99.99%",
      tags: ["Docker", "Linux", "Nginx", "CI/CD"]
    },
    {
      number: "04",
      shortTitle: "UI/UX",
      title: "UI/UX & DIGITAL EXP",
      subtitle: "DESIGN SYSTEMS & MOTION",
      description: "Dark-themed interactive interfaces, component tokens, fluid micro-interactions, and custom cursor state machines.",
      icon: Layout,
      accent: "#F43F5E",
      accentBg: "border-rose-500/40 shadow-rose-500/10",
      terminalTitle: "design-tokens.config.json",
      snippet: [
        "{\n  \"theme\": \"Dark Technology\", \"accent\": \"#B8FF00\"\n}"
      ],
      badge: "FPS: 120 MAX",
      tags: ["Design Tokens", "Figma", "GSAP Timeline", "UX"]
    },
    {
      number: "05",
      shortTitle: "SECURITY",
      title: "SECURITY & RELIABILITY",
      subtitle: "SYSTEM HARDENING & AUDITING",
      description: "Automated vulnerability scanning, AES-256 SSL encryption, rate limiting, and zero-trust security compliance.",
      icon: ShieldCheck,
      accent: "#10B981",
      accentBg: "border-emerald-500/40 shadow-emerald-500/10",
      terminalTitle: "security-audit.log",
      snippet: [
        "[SECURITY CHECK]",
        "✓ SSL/TLS: Valid (AES-256)",
        "✓ Vulnerabilities: 0 Detected"
      ],
      badge: "SECURITY: PASSED",
      tags: ["SSL/TLS", "Rate Limiting", "Auditing", "AES-256"]
    }
  ];

  const mobileTabs = [
    ...capabilities.map((cap) => ({ number: cap.number, label: cap.shortTitle })),
    { number: "06", label: "TALK" }
  ];

  useEffect(() => {
    // Only run GSAP horizontal scroll on desktop (width >= 768px)
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const getScrollAmount = () => {
        return track.scrollWidth - container.clientWidth + 120;
      };

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const pct = Math.round(self.progress * 100);
            setScrollProgress(pct);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${pct}%`;
            }
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Auto-scroll mobile top tabs bar when active card changes
  useEffect(() => {
    if (mobileTabsRef.current) {
      const track = mobileTabsRef.current;
      const activeTab = track.children[activeMobileIdx] as HTMLElement;
      if (activeTab) {
        const targetScrollLeft = activeTab.offsetLeft - (track.clientWidth - activeTab.clientWidth) / 2;
        track.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: "smooth" });
      }
    }
  }, [activeMobileIdx]);

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.firstElementChild?.clientWidth || 300;
    const idx = Math.round(scrollLeft / (cardWidth + 16));
    if (idx >= 0 && idx < mobileTabs.length) {
      setActiveMobileIdx(idx);
    }
  };

  const scrollToMobileCard = (index: number) => {
    if (mobileTrackRef.current) {
      const track = mobileTrackRef.current;
      const card = track.children[index] as HTMLElement;
      if (card) {
        const targetScrollLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
        track.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: "smooth" });
        setActiveMobileIdx(index);
      }
    }
  };

  const nextMobileSlide = () => {
    const nextIdx = (activeMobileIdx + 1) % mobileTabs.length;
    scrollToMobileCard(nextIdx);
  };

  const prevMobileSlide = () => {
    const prevIdx = (activeMobileIdx - 1 + mobileTabs.length) % mobileTabs.length;
    scrollToMobileCard(prevIdx);
  };

  return (
    <section
      id="capabilities"
      ref={containerRef}
      className="relative w-full bg-transparent border-b border-neutral-800/60 overflow-hidden flex flex-col justify-between pt-16 md:pt-24 pb-12 md:pb-6 bg-noise md:h-screen md:min-h-[700px] md:h-[100dvh]"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#B8FF00]/5 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse" />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 md:pb-4 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono text-[#B8FF00] tracking-widest uppercase mb-1">
              <span className="w-6 h-[1px] bg-[#B8FF00]" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter uppercase font-mono text-white flex items-center gap-3">
              <span>{t.title}</span>
            </h2>
          </div>

          {/* Desktop Progress Indicator & Scroll Instruction */}
          <div className="hidden md:flex flex-col items-end space-y-1.5">
            <div className="flex items-center space-x-3 font-mono text-xs text-neutral-400">
              <span className="text-[#B8FF00] font-bold">{t.scrollInstruction}</span>
              <span className="text-white font-bold">{scrollProgress}%</span>
            </div>

            {/* Horizontal Track Progress Bar */}
            <div className="w-40 sm:w-56 h-[3px] bg-neutral-800 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-[#B8FF00] w-0 transition-all duration-75 shadow-[0_0_10px_#B8FF00]"
              />
            </div>
          </div>

          {/* Mobile Quick Selector Tabs (Auto-Centering & Includes 06 TALK) */}
          <div
            ref={mobileTabsRef}
            className="flex md:hidden items-center space-x-1.5 overflow-x-auto scrollbar-none py-1 text-[11px] font-mono w-full"
          >
            {mobileTabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => scrollToMobileCard(idx)}
                className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all duration-300 shrink-0 ${
                  activeMobileIdx === idx
                    ? "bg-[#B8FF00] text-black shadow-md shadow-[#B8FF00]/20"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {tab.number} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP HORIZONTAL GSAP TRACK (>= 768px) */}
      <div className="hidden md:block w-full overflow-hidden px-6 md:px-12 my-auto py-2">
        <div
          ref={trackRef}
          className="flex flex-row gap-7 w-max"
        >
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className={`group relative p-7 rounded-2xl bg-[#111111]/90 backdrop-blur-xl border ${cap.accentBg} transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl w-[480px] lg:w-[520px] shrink-0 min-h-[380px]`}
                data-cursor="SWIPE"
              >
                {/* Background Large Number Watermark */}
                <div className="absolute -bottom-8 -right-4 font-mono text-8xl font-black text-white/5 pointer-events-none select-none group-hover:text-[#B8FF00]/10 transition-colors duration-500">
                  {cap.number}
                </div>

                <div>
                  {/* Top Console Bar */}
                  <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 mb-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="flex space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400 font-medium">
                        {cap.terminalTitle}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-bold" style={{ color: cap.accent }}>
                      <Activity className="w-3 h-3 animate-pulse" />
                      <span>{cap.badge}</span>
                    </div>
                  </div>

                  {/* Card Title & Icon Row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-0.5 font-semibold">
                        // DOMAIN {cap.number} — {cap.subtitle}
                      </div>
                      <h3 className="text-2xl font-extrabold font-mono text-white tracking-tight group-hover:translate-x-1 transition-transform">
                        {cap.title}
                      </h3>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:bg-[#B8FF00] group-hover:text-black transition-colors duration-300">
                      <Icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                    </div>
                  </div>

                  <p className="text-neutral-300 font-light text-sm leading-relaxed mb-4">
                    {cap.description}
                  </p>

                  {/* Live Code / Console Snippet Window */}
                  <div className="p-3 rounded-xl bg-[#080808] border border-neutral-800/90 font-mono text-[11px] text-neutral-300 space-y-0.5 overflow-x-auto shadow-inner group-hover:border-neutral-700 transition-colors">
                    {cap.snippet.map((line, lIdx) => (
                      <div key={lIdx} className="flex items-center space-x-2">
                        <span className="text-neutral-600 select-none text-[10px]">{lIdx + 1}</span>
                        <span className="text-[#B8FF00]/90 font-mono leading-tight">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Row */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between mt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {cap.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400 group-hover:text-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-1.5 text-[11px] font-mono font-bold text-[#B8FF00] group-hover:translate-x-1 transition-transform">
                    <span>INSPECT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* End Cyber Terminal CTA Card */}
          <div
            className="group relative p-7 rounded-2xl bg-gradient-to-br from-[#161616] via-neutral-900 to-[#111111] border border-[#B8FF00]/40 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl w-[450px] shrink-0 min-h-[380px]"
            data-cursor="TALK"
          >
            <div>
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 mb-4">
                <span className="text-[11px] font-mono text-[#B8FF00] font-bold">
                  // FINAL DOMAIN // BUILD READY
                </span>
                <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-ping" />
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/30 flex items-center justify-center mb-4">
                <TerminalIcon className="w-6 h-6 text-[#B8FF00]" />
              </div>

              <h3 className="text-2xl font-extrabold font-mono text-white tracking-tight uppercase leading-tight mb-3">
                READY TO DEPLOY YOUR IDEA?
              </h3>

              <p className="text-neutral-400 font-light text-xs leading-relaxed mb-4">
                Engineered with high performance, scalability, and modern motion graphics. Let's start your project architecture now.
              </p>
            </div>

            <a
              href="#cta"
              className="w-full py-3 rounded-full bg-[#B8FF00] text-black font-mono font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center space-x-2 shadow-xl glow-accent"
            >
              <span>INITIATE PROJECT TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-32 shrink-0 pointer-events-none opacity-0" />
        </div>
      </div>

      {/* MOBILE TOUCH-SWIPE CAROUSEL (< 768px) */}
      <div className="block md:hidden w-full px-4 my-6">
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none space-x-4 pb-4 px-1"
        >
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className={`snap-center shrink-0 w-[86vw] max-w-[340px] p-5 rounded-2xl bg-[#111111]/95 border ${cap.accentBg} flex flex-col justify-between overflow-hidden shadow-2xl relative`}
              >
                {/* Number Watermark */}
                <div className="absolute -bottom-6 -right-3 font-mono text-7xl font-black text-white/5 pointer-events-none select-none">
                  {cap.number}
                </div>

                <div>
                  {/* Console Bar */}
                  <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5 mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 rounded-full bg-red-500/80" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <span className="w-2 h-2 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[140px]">
                        {cap.terminalTitle}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[9px] font-mono font-bold" style={{ color: cap.accent }}>
                      <Activity className="w-2.5 h-2.5 animate-pulse" />
                      <span>{cap.badge}</span>
                    </div>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider mb-0.5 font-semibold">
                        // DOMAIN {cap.number} — {cap.shortTitle}
                      </div>
                      <h3 className="text-lg font-extrabold font-mono text-white tracking-tight">
                        {cap.title}
                      </h3>
                    </div>

                    <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 shrink-0">
                      <Icon className="w-4 h-4 text-[#B8FF00]" />
                    </div>
                  </div>

                  <p className="text-neutral-300 font-light text-xs leading-relaxed mb-3">
                    {cap.description}
                  </p>

                  {/* Code Snippet */}
                  <div className="p-2.5 rounded-xl bg-[#080808] border border-neutral-800/90 font-mono text-[10px] text-neutral-300 space-y-0.5 overflow-x-auto shadow-inner mb-3">
                    {cap.snippet.map((line, lIdx) => (
                      <div key={lIdx} className="flex items-center space-x-1.5 whitespace-nowrap">
                        <span className="text-neutral-600 select-none text-[9px]">{lIdx + 1}</span>
                        <span className="text-[#B8FF00]/90 font-mono">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {cap.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[9px] font-mono text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-1 text-[10px] font-mono font-bold text-[#B8FF00]">
                    <span>INSPECT</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Mobile Final CTA Card */}
          <div className="snap-center shrink-0 w-[86vw] max-w-[340px] p-5 rounded-2xl bg-gradient-to-br from-[#161616] via-neutral-900 to-[#111111] border border-[#B8FF00]/40 flex flex-col justify-between overflow-hidden shadow-2xl relative">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5 mb-3">
                <span className="text-[10px] font-mono text-[#B8FF00] font-bold">
                  // FINAL DOMAIN
                </span>
                <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-ping" />
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/30 flex items-center justify-center mb-3">
                <TerminalIcon className="w-5 h-5 text-[#B8FF00]" />
              </div>

              <h3 className="text-xl font-extrabold font-mono text-white tracking-tight uppercase leading-tight mb-2">
                READY TO DEPLOY YOUR IDEA?
              </h3>

              <p className="text-neutral-400 font-light text-xs leading-relaxed mb-3">
                Engineered with high performance, scalability, and modern motion graphics.
              </p>
            </div>

            <a
              href="#cta"
              className="w-full py-3 rounded-full bg-[#B8FF00] text-black font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 shadow-xl glow-accent"
            >
              <span>INITIATE TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile Slide Controls & Dots Pagination Indicator */}
        <div className="flex items-center justify-between pt-3 px-2">
          {/* Prev Slide Button */}
          <button
            onClick={prevMobileSlide}
            aria-label="Previous domain"
            className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-[#B8FF00] active:scale-95 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots & Counter */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              {mobileTabs.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => scrollToMobileCard(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeMobileIdx === idx ? "w-5 bg-[#B8FF00]" : "w-1.5 bg-neutral-800"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-neutral-400 ml-1 font-bold">
              0{activeMobileIdx + 1}/0{mobileTabs.length}
            </span>
          </div>

          {/* Next Slide Button */}
          <button
            onClick={nextMobileSlide}
            aria-label="Next domain"
            className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-[#B8FF00] active:scale-95 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer Track Indicator */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest border-t border-neutral-800/60 pt-2 pb-1">
        <span>05 CORE CONSOLES AVAILABLE</span>
        <span>EKSCODER // HIGH PERFORMANCE DIGITAL ENGINEERING</span>
      </div>
    </section>
  );
};
