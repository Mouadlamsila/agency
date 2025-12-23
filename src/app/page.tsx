"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "@/components/home/Hero";
import Impact from "@/components/home/Impact";
import Expertise from "@/components/home/Expertise";
import Services from "@/components/home/Services";
import ProcessSection from "@/components/home/ProcessSection";
import ServicePackages from "@/components/home/ServicePackages";
import SelectedWork from "@/components/home/SelectedWork";
import Philosophy from "@/components/home/Philosophy";
import FinalCTA from "@/components/home/FinalCTA";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col bg-brand-dark">
      <Navbar />

      <Hero />
      <Impact />
      <Expertise />
      <Services />
      <ProcessSection />
      <ServicePackages />
      <SelectedWork />
      <Philosophy />
      <FinalCTA />
    </main>
  );
}
