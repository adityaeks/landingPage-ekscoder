"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

interface HeroProps {
  ready?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ ready = true }) => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // GSAP Entrance & Parallax Motion
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Headline lines reveal with smooth translation
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-mask-line");
        tl.fromTo(
          lines,
          { yPercent: 120, opacity: 0, rotateX: -12 },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: "power4.out",
          }
        );
      }

      // Scroll-driven Parallax effect
      if (containerRef.current && headlineRef.current) {
        gsap.to(headlineRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 100,
          opacity: 0.25,
          scale: 0.98,
        });
      }
    });

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Hero Introduction"
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#08080A] text-white overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08080A]/40 to-[#08080A] pointer-events-none" />

      {/* Centerpiece Monumental Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start justify-center">
        <h1
          ref={headlineRef}
          className="text-[12.5vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.6vw] font-black tracking-[-0.045em] uppercase leading-[0.88] text-white"
        >
          <div className="overflow-hidden">
            <span className="hero-mask-line block text-white font-extrabold">
              {t.line1}
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-mask-line block text-neutral-400 font-light italic">
              {t.line2}
            </span>
          </div>
          <div className="overflow-hidden flex flex-wrap items-baseline gap-3 sm:gap-6">
            <span className="hero-mask-line block text-white font-black">
              {t.line3}
            </span>
            <span className="hero-mask-line inline-block text-[2.8vw] sm:text-[1.8vw] text-neutral-400 font-light tracking-normal not-italic lowercase">
              (creative studio)
            </span>
          </div>
        </h1>
      </div>
    </section>
  );
};
