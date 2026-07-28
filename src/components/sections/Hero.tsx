"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowDownRight, Sparkles, Terminal } from "lucide-react";

interface HeroProps {
  ready?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ ready = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Stagger badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      // Stagger heading lines
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".hero-line");
        tl.fromTo(
          lines,
          { opacity: 0, y: 80, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.4"
        );
      }

      // Supporting text
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // CTAs & visual background
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      ).fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=1"
      );

      // Parallax scroll trigger effect on scroll
      if (containerRef.current) {
        gsap.to(headingRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 120,
          opacity: 0.3,
          scale: 0.96,
        });

        gsap.to(visualRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: -80,
          scale: 1.1,
        });
      }
    });

    return () => ctx.revert();
  }, [ready]);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsEl = document.getElementById("projects");
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    const ctaEl = document.getElementById("cta");
    if (ctaEl) {
      ctaEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen min-h-[650px] h-[100dvh] w-full flex flex-col justify-between pt-20 md:pt-24 pb-6 md:pb-8 px-6 md:px-12 bg-grid-pattern overflow-hidden bg-noise select-none"
    >
      {/* Glow Backdrops */}
      <div
        ref={visualRef}
        className="absolute top-1/4 right-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#B8FF00]/10 rounded-full blur-[140px] pointer-events-none -z-10"
      />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Ambient Grid Accent Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/40 to-[#0A0A0A] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full my-auto z-10 flex flex-col justify-center">
        {/* Status Badge */}
        <div ref={badgeRef} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 md:mb-6 self-start">
          <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono text-neutral-300 tracking-wider">
            CREATIVE TECHNOLOGY STUDIO // 2026
          </span>
        </div>

        {/* Hero Main Heading */}
        <h1
          ref={headingRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5vw] font-extrabold tracking-tighter uppercase leading-[0.92] text-white font-mono"
        >
          <div className="overflow-hidden">
            <span className="hero-line block">WE BUILD</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B8FF00] to-neutral-400">
              DIGITAL
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line block flex items-center gap-3">
              EXPERIENCES<span className="text-[#B8FF00]">.</span>
            </span>
          </div>
        </h1>

        {/* Supporting description & CTAs grid */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <p
            ref={textRef}
            className="lg:col-span-7 text-base sm:text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl"
          >
            <strong className="text-white font-semibold">EKSCODER</strong> is a creative technology studio focused on building modern digital products, scalable software, and memorable web experiences through code and technology.
          </p>

          <div ref={ctaRef} className="lg:col-span-5 flex flex-wrap items-center gap-4">
            <MagneticButton strength={0.4}>
              <a
                href="#projects"
                onClick={scrollToWork}
                className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#B8FF00] text-black font-mono font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-white transition-colors duration-300 flex items-center space-x-3 shadow-xl glow-accent"
                data-cursor="EXPLORE"
              >
                <span>VIEW OUR WORK</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <a
                href="#cta"
                onClick={scrollToCTA}
                className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-white font-mono font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300"
                data-cursor="TALK"
              >
                <span>LET'S TALK</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="max-w-7xl mx-auto w-full pt-4 sm:pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] sm:text-xs font-mono text-neutral-500 border-t border-neutral-800/60 gap-2 sm:gap-4">
        <div className="flex items-center space-x-3">
          <Terminal className="w-4 h-4 text-[#B8FF00]" />
          <span>FRONTEND // BACKEND // CLOUD // MOTION</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B8FF00]" />
            <span>GSAP + SCROLLTRIGGER</span>
          </span>
          <span>EST. 2026</span>
        </div>
      </div>
    </section>
  );
};
