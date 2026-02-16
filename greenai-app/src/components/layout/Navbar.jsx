import React, { useMemo } from "react";
import { Leaf, ArrowRight, Menu, X } from "lucide-react";

export default function Navbar({ isScrolled, mobileOpen, setMobileOpen, scrollToId }) {
    const navLinks = useMemo(
        () => [
            { id: "regintel", label: "RegIntel 360" },
            { id: "solutions", label: "Solutions" },
            { id: "philosophy", label: "Philosophy" },
            { id: "academy", label: "Academy" },
            { id: "contact", label: "Contact Us" },
        ],
        []
    );

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ease-out border-b ${isScrolled
            ? "bg-white/90 border-slate-200/60 shadow-[0_2px_8px_rgba(15,23,42,0.04)] backdrop-blur-md"
            : "bg-transparent border-transparent"
            }`}>
            <div className="container mx-auto px-6 w-full max-w-7xl h-16 flex items-center justify-between">
                <button
                    className="flex items-center gap-2.5 outline-none focus-visible:ring-2 ring-[#2E7D32]/20 rounded-lg group"
                    onClick={() => scrollToId("top")}
                    aria-label="Go to top"
                >
                    <span className="w-8 h-8 grid place-items-center rounded-lg bg-[#2E7D32]/10 text-[#2E7D32]">
                        <Leaf size={18} />
                    </span>
                    <span className="font-bold text-lg tracking-tight text-slate-800">
                        GreenAI <span className="text-[#2E7D32]">Services</span>
                    </span>
                </button>

                <nav className="hidden lg:flex gap-1 items-center" aria-label="Primary">
                    {navLinks.map((l) => (
                        <button
                            key={l.id}
                            className="px-4 py-2 rounded-full text-[13px] font-medium text-slate-600 transition-all duration-200 hover:text-[#2E7D32] hover:bg-[#2E7D32]/5"
                            onClick={() => scrollToId(l.id)}
                        >
                            {l.label}
                        </button>
                    ))}
                </nav>

                <div className="flex gap-3 items-center">
                    <button
                        className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold bg-slate-900 text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        onClick={() => scrollToId("regintel")}
                    >
                        Discover RegIntel <ArrowRight size={14} />
                    </button>

                    <button
                        className="w-9 h-9 grid place-items-center rounded-lg border border-slate-200 hover:bg-slate-50 lg:hidden text-slate-600"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-slate-100 ${mobileOpen ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
                    {navLinks.map((l) => (
                        <button
                            key={l.id}
                            className="text-left px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
                            onClick={() => scrollToId(l.id)}
                        >
                            {l.label}
                        </button>
                    ))}
                    <button
                        className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold bg-[#2E7D32] text-white"
                        onClick={() => scrollToId("contact")}
                    >
                        Contact Sales <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </header>
    );
}
