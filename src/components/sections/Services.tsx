"use client";

import React, { useState, useEffect, useRef } from "react";
import { servicesData } from "@/data/services";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Services: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (listRef.current) {
        const rows = listRef.current.querySelectorAll(".service-row");
        gsap.fromTo(
          rows,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 bg-[#0A0A0A] relative border-b border-neutral-800/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#B8FF00] tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-[#B8FF00]" />
              <span>WHAT WE DO</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter uppercase font-mono text-white">
              SERVICES<span className="text-[#B8FF00]">.</span>
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm md:text-base font-light">
            Tailored digital engineering and creative technology offerings designed for businesses demanding excellence.
          </p>
        </div>

        {/* Interactive Vertical Services List */}
        <div ref={listRef} className="divide-y divide-neutral-800 border-t border-b border-neutral-800">
          {servicesData.map((service, idx) => {
            const isHovered = activeIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className={`service-row py-8 md:py-10 transition-all duration-500 cursor-pointer ${
                  activeIdx !== null && !isHovered ? "opacity-30 blur-[0.5px]" : "opacity-100"
                }`}
                data-cursor="EXPLORE"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Number & Title */}
                  <div className="lg:col-span-6 flex items-center space-x-6">
                    <span
                      className={`font-mono text-lg md:text-xl font-bold transition-colors duration-300 ${
                        isHovered ? "text-[#B8FF00]" : "text-neutral-600"
                      }`}
                    >
                      {service.number}
                    </span>
                    <h3
                      className={`text-2xl sm:text-4xl md:text-5xl font-mono font-extrabold tracking-tight transition-all duration-300 ${
                        isHovered
                          ? "translate-x-4 text-[#B8FF00]"
                          : "text-white"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Subtitle & Description */}
                  <div className="lg:col-span-5 space-y-2">
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                      {service.subtitle}
                    </div>
                    <p className="text-neutral-300 font-light text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>

                    {/* Deliverables Pills (Shows on hover) */}
                    <div
                      className={`pt-2 flex flex-wrap gap-2 transition-all duration-300 ${
                        isHovered ? "max-h-24 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      {service.deliverables.map((item, dIdx) => (
                        <span
                          key={dIdx}
                          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#B8FF00]"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#B8FF00]" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="lg:col-span-1 flex justify-end">
                    <div
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? "bg-[#B8FF00] border-[#B8FF00] text-black translate-x-2"
                          : "border-neutral-800 text-neutral-500"
                      }`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
