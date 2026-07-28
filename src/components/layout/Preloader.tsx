"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Initial State
    gsap.set(logoRef.current, { opacity: 0, y: 30, scale: 0.95 });
    gsap.set(counterRef.current, { opacity: 0, y: 20 });

    // 2. Animate counter state
    const counterObj = { value: 0 };

    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    })
      .to(
        counterRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(
        counterObj,
        {
          value: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            const val = Math.floor(counterObj.value);
            setProgress(val);
            if (barRef.current) {
              barRef.current.style.width = `${val}%`;
            }
          },
        },
        "-=0.2"
      )
      // 3. Logo scale up
      .to(logoRef.current, {
        scale: 1.15,
        letterSpacing: "0.2em",
        color: "#B8FF00",
        duration: 0.5,
        ease: "power2.inOut",
      })
      // 4. Fade out text
      .to([logoRef.current, counterRef.current, barRef.current?.parentElement], {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power3.in",
      })
      // 5. Slide preloader screen up curtain
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut",
      });
  }, [onComplete]);

  const formatProgress = (val: number) => {
    return val.toString().padStart(3, "0");
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-[#0A0A0A] flex flex-col items-center justify-between p-8 md:p-16 select-none bg-noise"
    >
      <div className="w-full flex justify-between items-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
        <span>EKSCODER // DIGITAL EXPERIENCES</span>
        <span>SYS.INIT.2026</span>
      </div>

      <div className="flex flex-col items-center justify-center text-center my-auto space-y-6">
        <div
          ref={logoRef}
          className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white font-mono"
        >
          EKSCODER<span className="text-[#B8FF00]">.</span>
        </div>

        <div
          ref={counterRef}
          className="font-mono text-xl sm:text-2xl text-[#B8FF00] font-bold tracking-widest"
        >
          [ {formatProgress(progress)}% ]
        </div>

        {/* Progress Bar Track */}
        <div className="w-48 sm:w-64 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-[#B8FF00] w-0 transition-all duration-75"
          />
        </div>
      </div>

      <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-mono text-neutral-600 tracking-wider">
        <span>CREATIVE TECHNOLOGY BRAND</span>
        <span>SCROLL DRIVEN / MOTION FIRST</span>
      </div>
    </div>
  );
};
