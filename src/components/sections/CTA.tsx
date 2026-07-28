"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";

export const CTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { scale: 0.94, opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={containerRef}
      className="py-28 md:py-44 px-6 md:px-12 bg-[#0A0A0A] relative overflow-hidden bg-noise border-b border-neutral-800/60"
    >
      {/* Background Animated Gradient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B8FF00]/10 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto">
        <div
          ref={contentRef}
          className="relative p-10 sm:p-16 md:p-24 rounded-3xl bg-[#111111] border border-neutral-800 text-center flex flex-col items-center justify-center overflow-hidden shadow-2xl"
        >
          {/* Tech Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          {/* Section Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B8FF00]/30 bg-[#B8FF00]/10 text-[#B8FF00] font-mono text-xs tracking-widest uppercase mb-8 z-10">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>LET'S COLLABORATE</span>
          </div>

          {/* Bold Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-mono tracking-tighter uppercase text-white leading-none mb-8 z-10">
            HAVE AN IDEA?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B8FF00] to-neutral-400">
              LET'S BUILD IT.
            </span>
          </h2>

          <p className="text-neutral-300 font-light text-base sm:text-xl max-w-2xl leading-relaxed mb-12 z-10">
            Have a new web project, custom software requirement, or digital product in mind? Let's talk tech, plan the architecture, and bring your vision to life.
          </p>

          {/* Magnetic CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 z-10">
            <MagneticButton strength={0.4}>
              <a
                href="mailto:contact@ekscoder.com"
                className="px-10 py-5 rounded-full bg-[#B8FF00] text-black font-mono font-bold text-base tracking-wider uppercase hover:bg-white transition-all duration-300 flex items-center space-x-3 shadow-2xl glow-accent"
                data-cursor="TALK"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <a
                href="mailto:contact@ekscoder.com"
                className="px-8 py-5 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-white font-mono font-medium text-sm tracking-wider uppercase transition-colors flex items-center space-x-2"
                data-cursor="MAIL"
              >
                <Mail className="w-4 h-4 text-[#B8FF00]" />
                <span>contact@ekscoder.com</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
