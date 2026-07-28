"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export const Marquee: React.FC = () => {
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  const itemsRow1 = [
    "WEB DEVELOPMENT",
    "SOFTWARE ENGINEERING",
    "CLOUD ARCHITECTURE",
    "UI/UX DESIGN",
    "DIGITAL EXPERIENCES",
    "FULLSTACK SYSTEMS",
    "MOTION GRAPHICS",
  ];

  const itemsRow2 = [
    "HIGH PERFORMANCE",
    "NEXT.JS & TYPESCRIPT",
    "GSAP ANIMATION ENGINE",
    "MICROSERVICES",
    "DEVOPS & DOCKER",
    "SCALABLE SOFTWARE",
    "CREATIVE CODING",
  ];

  useEffect(() => {
    const el1 = marquee1Ref.current;
    const el2 = marquee2Ref.current;

    if (!el1 || !el2) return;

    // Row 1 move left
    const tween1 = gsap.to(el1, {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: "none",
    });

    // Row 2 move right
    const tween2 = gsap.fromTo(
      el2,
      { xPercent: -50 },
      {
        xPercent: 0,
        repeat: -1,
        duration: 25,
        ease: "none",
      }
    );

    // Pause on hover
    const container = el1.closest(".marquee-container");
    if (container) {
      const handleMouseEnter = () => {
        gsap.to([tween1, tween2], { timeScale: 0.2, duration: 0.5 });
      };
      const handleMouseLeave = () => {
        gsap.to([tween1, tween2], { timeScale: 1, duration: 0.5 });
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        tween1.kill();
        tween2.kill();
      };
    }
  }, []);

  return (
    <div className="marquee-container py-12 bg-transparent backdrop-blur-sm border-y border-white/10 overflow-hidden select-none">
      {/* Row 1 - Leftward */}
      <div className="flex whitespace-nowrap mb-4">
        <div ref={marquee1Ref} className="flex items-center space-x-8 shrink-0">
          {[...itemsRow1, ...itemsRow1].map((text, idx) => (
            <div key={idx} className="flex items-center space-x-8">
              <span className="text-3xl sm:text-5xl font-mono font-extrabold tracking-tighter text-white/90 uppercase hover:text-[#B8FF00] transition-colors cursor-default">
                {text}
              </span>
              <span className="w-3 h-3 rounded-full bg-[#B8FF00]" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Rightward */}
      <div className="flex whitespace-nowrap">
        <div ref={marquee2Ref} className="flex items-center space-x-8 shrink-0">
          {[...itemsRow2, ...itemsRow2].map((text, idx) => (
            <div key={idx} className="flex items-center space-x-8">
              <span className="text-3xl sm:text-5xl font-mono font-bold tracking-tighter text-stroke uppercase cursor-default">
                {text}
              </span>
              <span className="text-[#B8FF00] font-mono text-2xl">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
