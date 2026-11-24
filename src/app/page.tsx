"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Blog } from "@/components/sections/Blog";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main suppressHydrationWarning className="relative min-h-screen bg-[#08080A] text-[#F5F5F5] overflow-hidden">
      <Navbar ready={true} />
      <Hero ready={true} />
      <Introduction />
      <Services />
      <Projects />
      <Process />
      <Blog />
      <CTA />
      <Footer />
    </main>
  );
}
