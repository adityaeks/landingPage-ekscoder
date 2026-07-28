"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const Introduction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".intro-line");
        gsap.fromTo(
          lines,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "top 35%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 bg-[#0A0A0A] relative border-b border-neutral-800/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Section Label */}
        <div className="lg:col-span-3">
          <div className="flex items-center space-x-3 text-xs font-mono text-[#B8FF00] tracking-widest uppercase">
            <span className="w-8 h-[1px] bg-[#B8FF00]" />
            <span>WHO WE ARE</span>
          </div>
        </div>

        {/* Right Section Content */}
        <div className="lg:col-span-9 space-y-8">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter uppercase font-mono leading-[1.05] text-white"
          >
            <div className="overflow-hidden">
              <span className="intro-line block">WE TURN</span>
            </div>
            <div className="overflow-hidden">
              <span className="intro-line block text-neutral-400">IDEAS INTO</span>
            </div>
            <div className="overflow-hidden">
              <span className="intro-line block text-[#B8FF00]">DIGITAL PRODUCTS.</span>
            </div>
          </h2>

          <p
            ref={textRef}
            className="text-xl sm:text-2xl md:text-3xl text-neutral-300 font-light leading-relaxed max-w-4xl"
          >
            EKSCODER membantu bisnis, startup, dan enterprise mengubah ide kompleks menjadi software, platform web, dan infrastruktur digital yang cepat, scalable, serta berkesan. Kami memadukan rekayasa perangkat lunak kelas dunia dengan estetika desain modern.
          </p>

          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs text-neutral-400 border-t border-neutral-800/80">
            <div>
              <div className="text-white text-2xl font-bold font-sans">100%</div>
              <div className="mt-1 text-neutral-500">CUSTOM CODE</div>
            </div>
            <div>
              <div className="text-[#B8FF00] text-2xl font-bold font-sans">6+</div>
              <div className="mt-1 text-neutral-500">CORE SERVICES</div>
            </div>
            <div>
              <div className="text-white text-2xl font-bold font-sans">99.9%</div>
              <div className="mt-1 text-neutral-500">UPTIME ARCHITECTURE</div>
            </div>
            <div>
              <div className="text-white text-2xl font-bold font-sans">0.2s</div>
              <div className="mt-1 text-neutral-500">AVG RESPONSE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
