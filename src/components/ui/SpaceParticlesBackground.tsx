"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const SpaceParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Star Colors palette (Space theme with EksCoder accent)
    const starColors = [
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "rgba(184, 255, 0, 0.8)", // Lime accent star
      "rgba(168, 85, 247, 0.8)", // Cosmic purple
      "rgba(147, 197, 253, 0.8)", // Icy blue
    ];

    // Generate Stars (capped at 250 max for silky smooth 60-120fps)
    const starCount = Math.min(250, Math.floor((width * height) / 5500));
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = Math.random() * 0.7 + 0.2;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        size: Math.random() * 1.4 + 0.4,
        baseAlpha,
        alpha: baseAlpha,
        twinkleSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Shooting Stars / Meteors
    const meteors: Meteor[] = [];
    const createMeteor = (): Meteor => ({
      x: Math.random() * width * 1.2 - width * 0.1,
      y: Math.random() * height * 0.4,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 6 + 4,
      angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
      alpha: 1,
      active: true,
    });

    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let lastMeteorTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Batch Star Rendering (No ctx.save/restore or shadowBlur inside loop)
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle logic
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Parallax calculation
        const parallaxY = (star.y - scrollY * 0.05 * star.z) % height;
        const finalY = parallaxY < 0 ? parallaxY + height : parallaxY;

        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, finalY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Handle Meteors
      const now = Date.now();
      if (now - lastMeteorTime > 4000 && Math.random() < 0.3) {
        meteors.push(createMeteor());
        lastMeteorTime = now;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m.active) continue;

        const endX = m.x + Math.cos(m.angle) * m.length;
        const endY = m.y + Math.sin(m.angle) * m.length;

        const gradient = ctx.createLinearGradient(m.x, m.y, endX, endY);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.7, "rgba(184, 255, 0, 0.4)");
        gradient.addColorStop(1, `rgba(255, 255, 255, ${m.alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.012;

        if (m.alpha <= 0 || m.x > width || m.y > height) {
          m.active = false;
          meteors.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div suppressHydrationWarning className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Starfield Canvas */}
      <canvas ref={canvasRef} className="w-full h-full opacity-90 transform-gpu" />

      {/* Deep Space Cosmic Nebulae Ambient Glows with Hardware Layer Promotion */}
      <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[140px] -z-10 pointer-events-none transform-gpu animate-pulse" />
      <div className="absolute top-[25%] right-[5%] w-[650px] h-[650px] bg-[#B8FF00]/5 rounded-full blur-[150px] -z-10 pointer-events-none transform-gpu" />
      <div className="absolute top-[50%] left-[15%] w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-[140px] -z-10 pointer-events-none transform-gpu animate-pulse" />
      <div className="absolute top-[75%] right-[10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[140px] -z-10 pointer-events-none transform-gpu" />
      <div className="absolute top-[90%] left-[30%] w-[550px] h-[550px] bg-[#B8FF00]/5 rounded-full blur-[130px] -z-10 pointer-events-none transform-gpu" />
    </div>
  );
};
