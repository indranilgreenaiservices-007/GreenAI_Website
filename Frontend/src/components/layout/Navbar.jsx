import React, { useMemo, useState, useEffect } from "react";
import { Leaf, ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../images/logo-bg.webp";

export default function Navbar({ isScrolled, mobileOpen, setMobileOpen, scrollToId }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("");

    const navLinks = useMemo(
        () => [
            { id: "home", label: "Home" },
            { id: "what-we-do", label: "What We Do" },
            { id: "philosophy", label: "Philosophy" },
            { id: "solutions", label: "Solutions" },
            { id: "regintel", label: "RegIntel 360" },
            { id: "academy", label: "Academy" },
            { id: "career", label: "Career" },
            { id: "blogs", label: "Blogs" },
            { id: "contact", label: "Contact Us" },
        ],
        []
    );

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150; // Offset for better accuracy

            for (const link of navLinks) {
                const element = document.getElementById(link.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(link.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navLinks]);

    const handleNavClick = (link) => {
        if (link.id) {
            if (location.pathname !== "/") {
                navigate("/");
                setTimeout(() => scrollToId(link.id), 100);
            } else {
                scrollToId(link.id);
            }
            setActiveSection(link.id);
        }
        setMobileOpen(false);
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-500 ease-in-out border-b ${isScrolled
                ? "bg-white/80 border-white/20 shadow-[0_4_12px_rgba(0,0,0,0.05)] backdrop-blur-lg"
                : "bg-transparent border-transparent"
                }`}
        >
            <div className="container mx-auto px-6 w-full max-w-7xl h-16 flex items-center justify-between">
                <button
                    className="flex items-center gap-2.5 outline-none focus-visible:ring-2 ring-[#2E7D32]/20 rounded-lg group"
                    onClick={() => handleNavClick({ id: "top" })}
                    aria-label="Go to top"
                >
                    <img src={logo} alt="Logo" className="h-10 w-auto" />
                </button>

                <nav className="hidden lg:flex items-center gap-1 bg-white/50 p-1 rounded-full border border-white/40 backdrop-blur-md shadow-sm" aria-label="Primary">
                    {navLinks.map((l) => {
                        const isActive = activeSection === l.id;
                        return (
                            <button
                                key={l.label}
                                className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 z-10 ${isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                                    }`}
                                onClick={() => handleNavClick(l)}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        style={{ zIndex: -1 }}
                                    />
                                )}
                                {l.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="flex gap-3 items-center">
                    <button
                        className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold bg-slate-900 text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        onClick={() => handleNavClick({ id: "regintel" })}
                    >
                        Explore <ArrowRight size={14} />
                    </button>

                    <button
                        className="w-9 h-9 grid place-items-center rounded-lg border border-slate-200/50 hover:bg-white/50 lg:hidden text-slate-600 backdrop-blur-sm"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Glassmorphic Mobile menu */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out border-b border-white/20 backdrop-blur-xl ${mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
                    {navLinks.map((l) => (
                        <button
                            key={l.label}
                            className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeSection === l.id
                                    ? "bg-green-50 text-green-700 font-semibold"
                                    : "text-slate-700 hover:bg-slate-50"
                                }`}
                            onClick={() => handleNavClick(l)}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
}