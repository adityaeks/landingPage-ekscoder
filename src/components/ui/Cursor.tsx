"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

export const Cursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Disable custom cursor only if reduced motion is requested
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    document.body.classList.add("custom-cursor-enabled");

    const cursorDot = document.getElementById("custom-cursor-dot");
    const cursorRing = document.getElementById("custom-cursor-ring");

    if (!cursorDot || !cursorRing) return;

    let mouseX = 0;
    let mouseY = 0;

    const updatePosition = (clientX: number, clientY: number) => {
      mouseX = clientX;
      mouseY = clientY;

      if (!isVisible) setIsVisible(true);

      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(cursorRing, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("[data-cursor]") as HTMLElement;

      if (interactiveEl) {
        const text = interactiveEl.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);

        const len = text.length;
        const targetScale = len > 14 ? 4.2 : len > 9 ? 3.4 : len > 0 ? 2.8 : 1.6;

        gsap.to(cursorRing, {
          scale: targetScale,
          backgroundColor: text ? "rgba(184, 255, 0, 0.15)" : "transparent",
          borderColor: "#B8FF00",
          duration: 0.25,
        });
      } else {
        const isClickable = target.closest("a, button, [role='button'], input");
        if (isClickable) {
          setIsHovered(true);
          setCursorText("");
          gsap.to(cursorRing, {
            scale: 1.5,
            borderColor: "#B8FF00",
            duration: 0.25,
          });
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("[data-cursor]");
      const isClickable = target.closest("a, button, [role='button'], input");

      if (interactiveEl || isClickable) {
        setIsHovered(false);
        setCursorText("");
        gsap.to(cursorRing, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.4)",
          duration: 0.25,
        });
      }
    };

    const onTouchEnd = () => {
      setIsVisible(false);
      setIsHovered(false);
      setCursorText("");
      if (cursorRing) {
        gsap.to(cursorRing, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.4)",
          duration: 0.2,
        });
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [isVisible]);

  return (
    <>
      {/* Center dot */}
      <div
        id="custom-cursor-dot"
        suppressHydrationWarning
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B8FF00] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Following Ring / Label Container */}
      <div
        id="custom-cursor-ring"
        suppressHydrationWarning
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {cursorText && (
          <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-wider text-[#B8FF00] uppercase select-none px-1 text-center whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
