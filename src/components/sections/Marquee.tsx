"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export const Marquee: React.FC = () => {
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  const itemsRow1 = [
    "Bespoke Web Platforms",
    "Creative Technology",
    "Enterprise Software",
    "Motion Architecture",
    "High Concurrency Systems",
    "Digital Engineering",
  ];

  const itemsRow2 = [
    "Production Grade Reliability",
    "Scalable Cloud Engines",
    "Next.js Architecture",
    "Hardware Accelerated 60FPS",
    "Custom Business ERP",
    "Award Caliber Interfaces",
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const el1 = marquee1Ref.current;
    const el2 = marquee2Ref.current;
    if (!el1 || !el2) return;

    const tween1 = gsap.to(el1, {
      xPercent: -50,
      repeat: -1,
      duration: 28,
      ease: "none",
      force3D: true,
    });

    const tween2 = gsap.fromTo(
      el2,
      { xPercent: -50 },
      {
        xPercent: 0,
        repeat: -1,
        duration: 32,
        ease: "none",
        force3D: true,
      }
    );

    const container = el1.closest(".marquee-container");
    if (container) {
      const onEnter = () => {
        tween1.pause();
        tween2.pause();
      };
      const onLeave = () => {
        tween1.play();
        tween2.play();
      };

      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);

      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
        tween1.kill();
        tween2.kill();
      };
    }

    return () => {
      tween1.kill();
      tween2.kill();
    };
  }, []);

  return (
    <section
      aria-label="Studio Capabilities Ribbon"
      className="marquee-container py-8 sm:py-12 bg-[#08080A] border-y border-white/[0.08] overflow-hidden select-none relative"
    >
      {/* Row 1: Leftward Marquee */}
      <div className="flex w-max" ref={marquee1Ref}>
        {[...itemsRow1, ...itemsRow1].map((text, idx) => (
          <div key={`m1-${idx}`} className="flex items-center space-x-6 sm:space-x-8 px-4 sm:px-6">
            <span className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white hover:text-[#D4FF00] transition-colors whitespace-nowrap">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shrink-0" />
          </div>
        ))}
      </div>

      {/* Row 2: Rightward Marquee with Editorial Italic Contrast */}
      <div className="flex w-max mt-4 sm:mt-6" ref={marquee2Ref}>
        {[...itemsRow2, ...itemsRow2].map((text, idx) => (
          <div key={`m2-${idx}`} className="flex items-center space-x-6 sm:space-x-8 px-4 sm:px-6">
            <span className="text-lg sm:text-2xl md:text-3xl font-light italic tracking-normal text-neutral-400 hover:text-white transition-colors whitespace-nowrap">
              {text}
            </span>
            <span className="text-neutral-600 text-xs shrink-0">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};
