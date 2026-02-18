import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ContactUs from "./components/home/ContactUs";
import Hero from "./components/home/Hero";
import WhatWeDo from "./components/home/WhatWeDo";
import Philosophy from "./components/home/Philosophy";
import ActiveBackground from "./components/layout/ActiveBackground";
import RegIntelFeature from "./components/home/RegIntelFeature";
import Ecosystem from "./components/home/Ecosystem";
import Academy from "./components/home/Academy";
import Career from "./components/home/Career";
import Blogs from "./components/home/Blogs";
import TrustedBy from "./components/home/TrustedBy";
import WhyChoose from "./components/home/WhyChoose";
import FAQ from "./components/home/FAQ";
import BlogPost from "./pages/BlogPost";
import AllBlogs from "./pages/AllBlogs";

/**
 * GreenAI Services — Single-file React corporate website (Refactored)
 * Tech: React + Tailwind CSS
 */

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToId = (id) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  // Handle scroll from navigation state
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
      // Clear state to avoid scrolling on refresh
      window.history.replaceState({}, document.title)
    }
  }, [location]);


  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen font-sans text-[#0b1220]">
      <ActiveBackground />
      <Navbar
        isScrolled={isScrolled}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        scrollToId={scrollToId}
      />
      <main id="top">
        {/* pt-20 to offset fixed navbar if needed, check Navbar css */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Simplified HomePage component containing only the landing page sections
function HomePage() {
  // We need to access the scrollToId function from context or pass it down?
  // Actually the Hero buttons call scrollToId. 
  // For now, let's redefine a local helper or use the one from Layout via context if we convert Layout to provide context.
  // simpler: Pass content that doesn't need props, or use standard anchors.

  // The Hero component calls onPrimary/onSecondary.
  // Let's use a small helper hook or just document.getElementById since we are on the page.
  const scroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Hero
        onPrimary={() => scroll("regintel")}
        onSecondary={() => scroll("solutions")}
      />
      <WhatWeDo />
      <Philosophy />
      <Ecosystem />
      <RegIntelFeature />
      <Academy onContactClick={() => scroll("contact")} />
      <TrustedBy />
      <Career />
      <Blogs />
      <FAQ />
      <ContactUs />
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </Layout>
  );
}
