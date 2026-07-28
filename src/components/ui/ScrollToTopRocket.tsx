"use client";

import React, { useEffect, useState } from "react";
import { Rocket } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const ScrollToTopRocket: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      if (scrollPos > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsLaunching(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleLaunch = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isLaunching) return;

    setIsLaunching(true);

    // 1. Lenis smooth scroll trigger
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: false, duration: 1.4 });
    }

    // 2. Native window & document scroll fallbacks
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Reset launch state after rocket reaches top and finishes animation
    setTimeout(() => {
      setIsLaunching(false);
    }, 1400);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9990] transition-all duration-500 transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-8 scale-75 pointer-events-none"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* 1. Ground Launchpad Smoke Blast (Stays at bottom launch pad & expands as rocket blasts off) */}
        {isLaunching && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0 flex flex-col items-center">
            <div className="relative w-32 h-32 flex items-center justify-center -mt-8">
              <div className="absolute w-20 h-20 rounded-full bg-white/70 blur-md animate-ping" />
              <div className="absolute w-24 h-24 rounded-full bg-neutral-400/80 blur-lg animate-pulse" />
              <div className="absolute w-28 h-28 rounded-full bg-[#B8FF00]/40 blur-xl animate-pulse delay-75" />
              <div className="absolute w-36 h-36 rounded-full bg-neutral-700/50 blur-2xl animate-bounce delay-150" />
            </div>
          </div>
        )}

        {/* 2. Rocket & Fire Thruster Wrapper (MOVES TOGETHER UPWARDS TO THE SKY) */}
        <div
          className={`relative flex flex-col items-center transition-all duration-1000 ease-in-out z-10 ${
            isLaunching
              ? "-translate-y-[80vh] opacity-0 scale-125"
              : "translate-y-0 opacity-100 scale-100"
          }`}
        >
          {/* Rocket Button */}
          <MagneticButton strength={isLaunching ? 0 : 0.4} onClick={handleLaunch}>
            <button
              type="button"
              aria-label="Launch to top"
              onClick={handleLaunch}
              disabled={isLaunching}
              className={`w-14 h-14 rounded-full bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 text-neutral-300 flex items-center justify-center shadow-2xl transition-all duration-300 group pointer-events-auto ${
                isLaunching
                  ? "border-[#B8FF00] bg-black text-[#B8FF00] shadow-[0_0_40px_#B8FF00]"
                  : "hover:text-black hover:bg-[#B8FF00] hover:border-[#B8FF00] hover:shadow-[0_0_25px_rgba(184,255,0,0.5)]"
              }`}
            >
              {/* Lucide Rocket Icon rotated -45deg so it points straight UP */}
              <Rocket
                className={`w-6 h-6 transition-all duration-300 -rotate-45 ${
                  isLaunching
                    ? "text-[#B8FF00] animate-pulse scale-125"
                    : "group-hover:-translate-y-1 group-hover:scale-110"
                }`}
              />
            </button>
          </MagneticButton>

          {/* Fire Thruster & Exhaust Plume (ATTACHED DIRECTLY TO ROCKET BOTTOM) */}
          {isLaunching && (
            <div className="absolute top-12 pointer-events-none flex flex-col items-center z-0">
              {/* Bright Fire Thruster Flame */}
              <div className="w-5 h-24 bg-gradient-to-b from-[#B8FF00] via-amber-400 via-orange-500 to-transparent rounded-b-full blur-[1px] animate-pulse shadow-[0_0_30px_#B8FF00]" />

              {/* Trailing Tail Smoke Plume */}
              <div className="w-10 h-16 bg-neutral-300/60 rounded-full blur-md animate-ping -mt-6" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
