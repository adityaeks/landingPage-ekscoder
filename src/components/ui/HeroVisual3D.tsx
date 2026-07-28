"use client";

import React, { useEffect, useRef } from "react";

export const HeroVisual3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle system configuration
    const particleCount = 50;
    const particles: {
      x: number;
      y: number;
      z: number;
      radius: number;
      baseAngle: number;
      speed: number;
      orbitRadius: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: 0,
        y: 0,
        z: 0,
        radius: Math.random() * 2 + 0.8,
        baseAngle: (i / particleCount) * Math.PI * 2 + Math.random() * 0.5,
        speed: (Math.random() * 0.003 + 0.002) * (i % 2 === 0 ? 1 : -1),
        orbitRadius: 140 + Math.random() * 180,
      });
    }

    let rotationAngle = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.05;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.05;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);
      rotationAngle += 0.005;

      const centerX = width / 2 + mouseX;
      const centerY = height / 2 + mouseY;

      // Draw subtle orbital rings
      ctx.save();
      ctx.translate(centerX, centerY);

      // Ring 1 (tilted)
      ctx.beginPath();
      ctx.ellipse(0, 0, 280, 95, rotationAngle * 0.4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(184, 255, 0, 0.12)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();

      // Ring 2 (counter tilted)
      ctx.beginPath();
      ctx.ellipse(0, 0, 230, 115, -rotationAngle * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 6]);
      ctx.stroke();

      // Ring 3 (inner accent)
      ctx.beginPath();
      ctx.ellipse(0, 0, 160, 60, rotationAngle * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(184, 255, 0, 0.18)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Render 3D Orbiting Particles
      particles.forEach((p) => {
        p.baseAngle += p.speed;

        const currentAngle = p.baseAngle + rotationAngle * 0.2;
        const px = Math.cos(currentAngle) * p.orbitRadius;
        const py = Math.sin(currentAngle) * (p.orbitRadius * 0.4);
        const pz = Math.sin(p.baseAngle) * 90;

        const scale = 320 / (320 + pz);
        const screenX = centerX + px * scale;
        const screenY = centerY + py * scale;

        const opacity = Math.max(0.15, Math.min(0.85, (pz + 110) / 220));

        ctx.beginPath();
        ctx.arc(screenX, screenY, p.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = pz > 20 ? `rgba(184, 255, 0, ${opacity})` : `rgba(255, 255, 255, ${opacity * 0.6})`;
        if (pz > 30) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = "#B8FF00";
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
};
