
import React from "react";
import { Mic, ShieldCheck, Scale, ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExploreDashboard() {
    const navigate = useNavigate();

    const products = [
        {
            id: "clics",
            title: "CLiCS",
            subtitle: "Voice & Multilingual AI",
            problems: [
                "Language barriers in hospitals and telecom",
                "Noisy environments affecting communication",
                "High latency cloud solutions",
                "Lack of Indic-language ASR models"
            ],
            solution: "Real-time multilingual voice recognition, translation, and synthesis optimized for low-latency and edge deployment.",
            icon: <Mic className="text-emerald-600" size={24} />,
            route: "clics",
            color: "emerald"
        },
        {
            id: "regintel",
            title: "RegIntel 360",
            subtitle: "ESG & Compliance Automation",
            problems: [
                "Manual ESG reporting (BRSR, GRI, SASB, IFRS, CDP)",
                "Audit risks and inconsistencies",
                "Fragmented sustainability data",
                "Lack of predictive compliance insights"
            ],
            solution: "AI-powered sustainability reporting, real-time monitoring, and predictive compliance intelligence.",
            icon: <ShieldCheck className="text-blue-600" size={24} />,
            route: "regintel",
            color: "blue"
        },
        {
            id: "vidhilab",
            title: "VidhiLab",
            subtitle: "Legal & Tender Intelligence",
            problems: [
                "Legal research overload",
                "Tender document complexity",
                "Slow regulatory interpretation",
                "Lack of multilingual legal AI support"
            ],
            solution: "AI-driven legal advisory and tender management powered by multilingual NLP and RAG.",
            icon: <Scale className="text-amber-600" size={24} />,
            route: "vidhilab",
            color: "amber"
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <div className="space-y-4 max-w-3xl">
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    AI Infrastructure for <span className="text-emerald-600 font-black">Mission-Critical</span> Enterprise and Government Operations
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                    GreenAI delivers multilingual AI, ESG automation, and compliance intelligence for highly regulated industries. Join the next generation of intelligent enterprises.
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => navigate(product.route)}
                        className="group bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                    >
                        <div className={`p-3 rounded-xl bg-${product.color}-50 w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            {product.icon}
                        </div>

                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-slate-900">{product.title}</h3>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{product.subtitle}</p>
                        </div>

                        <div className="space-y-3 mb-8 flex-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">Client Problem Focus</p>
                            <ul className="space-y-2">
                                {product.problems.map((problem, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                                        <span>{problem}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-slate-50 mt-auto">
                            <p className="text-sm text-slate-700 font-medium mb-6 leading-relaxed">
                                {product.solution}
                            </p>

                            <div className="flex items-center text-emerald-600 font-bold text-sm group-hover:gap-3 transition-all gap-2">
                                Explore Solution <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA or Info */}
            <div className="bg-slate-900 rounded-2xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Ready to modernize your operations?</h4>
                    <p className="text-slate-400">Schedule a consultation with our enterprise solutions team.</p>
                </div>
                <button className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2 whitespace-nowrap">
                    Reach Us <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
