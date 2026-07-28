"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // magnetic strength factor
  onClick?: () => void;
  [key: string]: any;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  strength = 0.35,
  onClick,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1.1, 0.4)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`inline-block cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
