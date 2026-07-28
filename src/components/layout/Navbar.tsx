"use client";

import React, { useState, useEffect, useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { gsap } from "@/lib/gsap";
import { Menu, X, ArrowUpRight, Radio, Sparkles, Terminal } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

interface NavbarProps {
  ready?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ ready = true }) => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { id: "about", label: t.about, number: "01" },
    { id: "capabilities", label: t.capabilities, number: "02" },
    { id: "services", label: t.services, number: "03" },
    { id: "technologies", label: t.solutions, number: "04" },
    { id: "projects", label: t.work, number: "05" },
    { id: "process", label: t.process, number: "06" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section spy
      const sections = ["hero", "about", "capabilities", "services", "technologies", "projects", "process", "cta"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", delay: 0.1 }
      );
    });

    return () => ctx.revert();
  }, [ready]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[50] px-4 sm:px-6 md:px-8 transition-all duration-500 pt-3 md:pt-5"
      >
        <div
          className={`max-w-6xl mx-auto rounded-full transition-all duration-500 flex items-center justify-between px-5 md:px-7 py-2.5 md:py-3 ${
            isScrolled
              ? "bg-[#0E0E0E]/85 backdrop-blur-2xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8)] glow-accent/5"
              : "bg-[#111111]/40 backdrop-blur-md border border-white/5"
          }`}
        >
          {/* Logo with Status Badge */}
          <div className="flex items-center space-x-3">
            <a
              ref={logoRef}
              href="#hero"
              onClick={(e) => scrollToSection(e, "hero")}
              className="text-lg md:text-xl font-extrabold tracking-tighter text-white hover:text-[#B8FF00] transition-colors flex items-center group font-mono"
              data-cursor="EKSCODER"
            >
              <span>EKSCODER</span>
              <span className="text-[#B8FF00] group-hover:translate-x-0.5 transition-transform">.</span>
            </a>

            {/* Live System Indicator */}
            {/* <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-[10px] font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-ping" />
              <span className="text-[#B8FF00]">SYS.ONLINE</span>
            </div> */}
          </div>

          {/* Desktop Floating Pill Nav Links */}
          <nav
            ref={linksRef}
            className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-black/40 p-1 rounded-full border border-white/5 text-xs font-mono text-neutral-300"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`px-4 py-1.5 rounded-full transition-all duration-300 relative flex items-center space-x-1.5 font-medium tracking-wider ${
                    isActive
                      ? "bg-[#B8FF00] text-black font-bold shadow-md shadow-[#B8FF00]/20"
                      : "hover:text-white hover:bg-white/5"
                  }`}
                  data-cursor={link.label}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Language Switcher & Magnetic CTA Button */}
          <div ref={ctaRef} className="flex items-center space-x-3">
            {/* Desktop Language Switcher Pill */}
            <div className="hidden md:flex items-center space-x-1 p-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono select-none">
              <button
                onClick={() => setLanguage("EN")}
                className={`px-2.5 py-1 rounded-full font-bold transition-all duration-300 ${
                  language === "EN"
                    ? "bg-[#B8FF00] text-black shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
                aria-label="Switch to English"
              >
                ENG
              </button>
              <button
                onClick={() => setLanguage("ID")}
                className={`px-2.5 py-1 rounded-full font-bold transition-all duration-300 ${
                  language === "ID"
                    ? "bg-[#B8FF00] text-black shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
                aria-label="Switch to Indonesian"
              >
                IDN
              </button>
            </div>

            <div className="hidden md:flex">
              <MagneticButton strength={0.3}>
                <a
                  href="#cta"
                  onClick={(e) => scrollToSection(e, "cta")}
                  className="px-5 py-2 rounded-full bg-[#B8FF00] hover:bg-white text-black text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center space-x-2 shadow-lg glow-accent group"
                  data-cursor="TALK"
                >
                  <span>{t.talk}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-[#B8FF00] focus:outline-none transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#B8FF00]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Glass Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[40] bg-[#0A0A0A]/98 backdrop-blur-3xl flex flex-col justify-between p-8 md:hidden transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="pt-20 space-y-2">
          {/* Mobile Menu Header with Language Switcher */}
          <div className="text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>{t.navigation}</span>
            </div>

            {/* Language Switcher inside Mobile Menu */}
            <div className="flex items-center space-x-1 p-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono select-none">
              <button
                onClick={() => setLanguage("EN")}
                className={`px-3 py-1 rounded-full font-bold transition-all duration-300 ${
                  language === "EN"
                    ? "bg-[#B8FF00] text-black shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
                aria-label="Switch to English"
              >
                ENG
              </button>
              <button
                onClick={() => setLanguage("ID")}
                className={`px-3 py-1 rounded-full font-bold transition-all duration-300 ${
                  language === "ID"
                    ? "bg-[#B8FF00] text-black shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
                aria-label="Switch to Indonesian"
              >
                IDN
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-4 font-mono text-2xl font-extrabold tracking-wider text-white">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`py-3 border-b border-neutral-800/80 flex items-center justify-between transition-colors ${
                    isActive ? "text-[#B8FF00]" : "hover:text-[#B8FF00]"
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-xs text-neutral-500 font-normal">{link.number}</span>
                    <span>{link.label}</span>
                  </span>
                  <ArrowUpRight className={`w-5 h-5 ${isActive ? "text-[#B8FF00]" : "text-neutral-600"}`} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-neutral-800/80">
          <a
            href="#cta"
            onClick={(e) => scrollToSection(e, "cta")}
            className="w-full py-4 rounded-full bg-[#B8FF00] text-black text-center font-mono font-bold text-sm tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center space-x-2 shadow-xl glow-accent"
          >
            <span>{t.talk}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            <span>SYS.ONLINE // 2026</span>
            <span>EKSCODER DIGITAL EXPERIENCE</span>
          </div>
        </div>
      </div>
    </>
  );
};
