import React, { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/home/Hero";
import Philosophy from "./components/home/Philosophy";
import RegIntelFeature from "./components/home/RegIntelFeature";
import Ecosystem from "./components/home/Ecosystem";
import Academy from "./components/home/Academy";

import TrustedBy from "./components/home/TrustedBy";
import WhyChoose from "./components/home/WhyChoose";
import FAQ from "./components/home/FAQ";

/**
 * GreenAI Services — Single-file React corporate website (Refactored)
 * Tech: React + Tailwind CSS
 */
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // close mobile menu on ESC
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen font-sans text-[#0b1220]">
      <Navbar
        isScrolled={isScrolled}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        scrollToId={scrollToId}
      />

      <main id="top">
        <Hero
          onPrimary={() => scrollToId("regintel")}
          onSecondary={() => scrollToId("solutions")}
        />
        <TrustedBy />
        <Philosophy />
        <RegIntelFeature />
        <WhyChoose />
        <Ecosystem />
        <Academy onContactClick={() => scrollToId("contact")} />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
