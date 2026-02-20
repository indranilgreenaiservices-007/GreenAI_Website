
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ContactUs from "./components/home/ContactUs";
import Hero from "./components/home/Hero";
import AuthenticityStrip from "./components/home/AuthenticityStrip";
import Philosophy from "./components/home/Philosophy";
import WhatWeDo from "./components/home/WhatWeDo";
import AboutUs from "./components/home/AboutUs";
import ActiveBackground from "./components/layout/ActiveBackground";
import Ecosystem from "./components/home/Ecosystem";
import Academy from "./components/home/Academy";
import Career from "./components/home/Career";
import Media from "./components/home/Media";
import TrustedBy from "./components/home/TrustedBy";
import WhyChoose from "./components/home/WhyChoose";
import FAQ from "./components/home/FAQ";
import BlogPost from "./pages/BlogPost";
import AllBlogs from "./pages/AllBlogs";
import Insights from "./components/home/Insights";
import GAIPortal from "./components/AdminPortal/GAIPortal";
import AdminPanel from "./components/AdminPortal/AdminPanel";
import Login from "./pages/GAIlogin";

// HR Portal Components
import HRDashboard from "./components/HRPortal/HRDashboard";
import Dashboard from "./components/HRPortal/Dashboard";
import Employees from "./components/HRPortal/Employees";
import Jobs from "./components/HRPortal/Jobs";
import Applicants from "./components/HRPortal/Applicants";
import Interviews from "./components/HRPortal/Interviews";
import Settings from "./components/HRPortal/Settings";

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
        // Use a small timeout to ensure DOM is ready but use 'instant' behavior to avoid visible scrolling
        setTimeout(() => el.scrollIntoView({ behavior: "instant", block: "start" }), 10);
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
  const scroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Hero
        onPrimary={() => scroll("solutions")}
        onSecondary={() => scroll("contact")}
      />
      <AuthenticityStrip />
      <AboutUs />
      <Philosophy />
      <Ecosystem />
      <WhatWeDo />
      <Academy onContactClick={() => scroll("contact")} />
      <TrustedBy />
      <Career />
      <Media />
      <Insights />
      <FAQ />
      <ContactUs />
    </>
  );
}

// Protected Route Wrapper
const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('employeeToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin Only Route Wrapper
const RequireAdmin = ({ children }) => {
  const token = localStorage.getItem('employeeToken');
  const userStr = localStorage.getItem('employeeUser');
  let user = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      console.error("Failed to parse user", e);
    }
  }

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/gai-portal" replace />;
  }
  return children;
};

const PublicLayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export default function App() {
  return (
    <Routes>
      {/* Public Routes - Wrapped in Layout */}
      <Route element={<PublicLayoutWrapper />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/media-events" element={<AllBlogs />} />
        <Route path="/media-events/:id" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />

        {/* GAIPortal & AdminPanel inside Public Layout for now (or move out if needed) */}
        <Route path="/gai-portal" element={
          <RequireAuth>
            <GAIPortal />
          </RequireAuth>
        } />
        <Route path="/gai-portal/admin" element={
          <RequireAdmin>
            <AdminPanel />
          </RequireAdmin>
        } />
      </Route>

      {/* HR Portal Routes - Completely Separate Layout (Sidebar based) */}
      <Route path="/gai-portal/hr" element={
        <RequireAuth>
          <HRDashboard />
        </RequireAuth>
      }>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
