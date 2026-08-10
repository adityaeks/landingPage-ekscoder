"use client";

import React, { useState, useCallback } from "react";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SpaceParticlesBackground } from "@/components/ui/SpaceParticlesBackground";
import { Marquee } from "@/components/sections/Marquee";
import { Introduction } from "@/components/sections/Introduction";
import { Capabilities } from "@/components/sections/Capabilities";
import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopRocket } from "@/components/ui/ScrollToTopRocket";

export default function Home() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderFinished(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F5] overflow-hidden">
      <SpaceParticlesBackground />
      {!preloaderFinished && <Preloader onComplete={handlePreloaderComplete} />}
      
      <Navbar ready={preloaderFinished} />
      <Hero ready={preloaderFinished} />
      <Marquee />
      <Introduction />
      {/* <Capabilities /> */}
      <Services />
      <Technologies />
      <Projects />
      <Process />
      <CTA />
      <Footer />
      <ScrollToTopRocket />
    </main>
  );
}
