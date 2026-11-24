"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations, WA_LINK, INSTAGRAM_LINK, TIKTOK_LINK } from "@/data/translations";

interface NavbarProps {
  ready?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ ready = true }) => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const menuMetaRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: "hero", label: language === "ID" ? "Beranda" : "Index", number: "01" },
    { id: "about", label: t.about, number: "02" },
    { id: "services", label: t.services, number: "03" },
    { id: "solutions", label: t.solutions, number: "04" },
    { id: "projects", label: t.project, number: "05" },
    { id: "process", label: t.process, number: "06" },
    { id: "blog", label: t.blog, number: "07" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setIsScrolled(scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.on("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lenis) {
        lenis.off("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.1 }
      );
    });

    return () => ctx.revert();
  }, [ready]);

  // Handle Lenis stop/start, Escape key, and staggered entrance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    const lenis = typeof window !== "undefined" ? (window as any).lenis : null;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
      window.addEventListener("keydown", handleKeyDown);

      if (menuLinksRef.current && menuMetaRef.current) {
        const links = menuLinksRef.current.querySelectorAll(".editorial-nav-item");
        gsap.fromTo(
          links,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out", delay: 0.1 }
        );

        gsap.fromTo(
          menuMetaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.2 }
        );
      }
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.body.style.overflow = "";

    const lenis = typeof window !== "undefined" ? (window as any).lenis : null;
    if (lenis) {
      lenis.start();
    }

    let targetId = id;
    if (id === "articles") targetId = "blog";
    if (id === "solutions") targetId = "services";

    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(element, { offset: -70, duration: 1.2, immediate: false });
        } else {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (typeof window !== "undefined") {
        window.location.href = `/#${targetId}`;
      }
    }, 50);
  }, []);

  return (
    <>
      {/* Contemporary Studio Header */}
      <header
        ref={navRef}
        role="banner"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 px-6 sm:px-12 md:px-16 ${
          isScrolled
            ? "py-4 bg-[#08080A]/90 backdrop-blur-xl border-b border-white/[0.08]"
            : "py-6 sm:py-9 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Mark: Pure, Unified Typography */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "hero")}
            aria-label="EKSCODER Home"
            className="group flex items-center space-x-2 text-lg sm:text-xl font-bold tracking-tight text-white hover:text-neutral-200 transition-colors focus:outline-none cursor-pointer"
          >
            <span className="font-bold tracking-wider">EKSCODER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform" />
          </a>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Minimal Essential Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-7 text-xs font-medium tracking-wider text-neutral-300">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {t.project}
              </a>
              <a
                href="#services"
                onClick={(e) => scrollToSection(e, "services")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {t.services}
              </a>
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, "about")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {t.about}
              </a>
            </div>

            {/* Language Switcher (Desktop) */}
            <div
              role="group"
              aria-label="Language Selector"
              className="hidden sm:flex items-center space-x-1.5 text-xs font-medium text-neutral-400 select-none px-3 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.03]"
            >
              <button
                type="button"
                onClick={() => setLanguage("EN")}
                className={`transition-colors cursor-pointer ${
                  language === "EN" ? "text-white font-bold" : "text-neutral-500 hover:text-neutral-300"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="text-neutral-600">·</span>
              <button
                type="button"
                onClick={() => setLanguage("ID")}
                className={`transition-colors cursor-pointer ${
                  language === "ID" ? "text-white font-bold" : "text-neutral-500 hover:text-neutral-300"
                }`}
                aria-label="Switch to Indonesian"
              >
                ID
              </button>
            </div>

            {/* Direct Consultation CTA */}
            <div className="hidden sm:block">
              <MagneticButton strength={0.25}>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-white/20 bg-white text-black hover:bg-neutral-200 text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center space-x-1.5 group cursor-pointer focus:outline-none"
                >
                  <span>{t.talk}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </MagneticButton>
            </div>

            {/* Bespoke Architectural Menu Button */}
            <MagneticButton strength={0.3}>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="px-4 py-2.5 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/10 text-white text-xs font-medium tracking-widest uppercase transition-all flex items-center space-x-3 cursor-pointer min-h-[40px] focus:outline-none"
              >
                <span>{menuOpen ? "Close" : "Menu"}</span>
                <span className="flex flex-col space-y-1.5 w-4 items-end justify-center">
                  <span
                    className={`h-[1px] bg-white transition-all duration-300 ${
                      menuOpen ? "w-4 rotate-45 translate-y-[3.5px]" : "w-4"
                    }`}
                  />
                  <span
                    className={`h-[1px] bg-white transition-all duration-300 ${
                      menuOpen ? "w-4 -rotate-45 -translate-y-[4px]" : "w-2.5"
                    }`}
                  />
                </span>
              </button>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* Cinematic Full-Screen Editorial Menu with Native Smooth Scroll & Lenis Bypass */}
      <div
        ref={menuOverlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        className={`fixed inset-0 z-[9999] bg-[#08080A]/98 backdrop-blur-3xl overflow-y-auto transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="min-h-full max-w-7xl mx-auto flex flex-col justify-between p-6 sm:p-10 md:p-12">
          {/* Top Header inside Overlay */}
          <div className="w-full flex items-center justify-between border-b border-white/[0.08] pb-5">
            <span className="text-xs tracking-widest text-neutral-400 uppercase font-medium">
              Navigation Index
            </span>

            <div className="flex items-center space-x-3">
              {/* Language Switcher inside Menu Overlay */}
              <div
                role="group"
                aria-label="Language Selector"
                className="flex items-center space-x-1.5 text-xs font-medium text-neutral-400 select-none px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-white/[0.15] bg-white/[0.04]"
              >
                <button
                  type="button"
                  onClick={() => setLanguage("EN")}
                  className={`transition-colors cursor-pointer ${
                    language === "EN" ? "text-white font-bold" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <span className="text-neutral-600">·</span>
                <button
                  type="button"
                  onClick={() => setLanguage("ID")}
                  className={`transition-colors cursor-pointer ${
                    language === "ID" ? "text-white font-bold" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                  aria-label="Switch to Indonesian"
                >
                  ID
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="px-4 py-2 rounded-full border border-white/20 text-neutral-300 hover:text-white hover:border-white text-xs font-medium uppercase transition-all cursor-pointer min-h-[40px] sm:min-h-[44px]"
              >
                Close (Esc)
              </button>
            </div>
          </div>

          {/* Main Nav Content: 2-column layout ensuring all 7 items fit without clipping */}
          <div className="w-full my-auto py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <nav
              ref={menuLinksRef}
              role="navigation"
              aria-label="Menu Links"
              className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 sm:gap-y-4"
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className="editorial-nav-item group flex items-baseline space-x-3.5 py-2.5 px-3 rounded-lg hover:bg-white/[0.04] transition-all cursor-pointer border-b border-white/[0.04]"
                >
                  <span className="text-xs font-mono text-neutral-500 group-hover:text-white transition-colors">
                    {item.number}
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white group-hover:text-neutral-200 group-hover:translate-x-2 transition-all duration-200 uppercase">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Right Editorial Info Column */}
            <div
              ref={menuMetaRef}
              className="lg:col-span-4 lg:pl-10 lg:border-l border-white/[0.08] flex flex-col justify-between space-y-6 text-neutral-400 text-xs"
            >
              <div className="space-y-2">
                <span className="text-white font-medium tracking-wider uppercase">Studio Essence</span>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  Creative developer studio crafting award-caliber digital platforms, scalable software systems, and high-concurrency web engines.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-white font-medium tracking-wider uppercase">Direct Inquiries</span>
                <div>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-white hover:text-neutral-300 transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>WhatsApp Consultation</span>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </a>
                  <span className="text-neutral-500 text-xs block mt-1">Average response time: within 2 hours</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-white font-medium tracking-wider uppercase">Network</span>
                <div className="flex flex-wrap gap-5 text-xs text-neutral-300">
                  <a
                    href={INSTAGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Instagram
                  </a>
                  <a
                    href={TIKTOK_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    TikTok
                  </a>
                  <a
                    href="https://github.com/miqdadbadjuber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Strip */}
          <div className="w-full pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-neutral-500">
            <span>EKSCODER Studio</span>
            <span>Surabaya, Indonesia</span>
            <span>2026 All Rights Reserved</span>
          </div>
        </div>
      </div>
    </>
  );
};
