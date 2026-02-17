import React from "react";
import { Building2, Scale, Mic, BookOpen, LineChart, ShieldCheck, Activity, Globe, FileText } from "lucide-react";
import TiltCard from "../ui/TiltCard";

export default function Ecosystem() {
    return (
        <section id="solutions" className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-6 w-full max-w-7xl">
                <div className="mb-12 max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-700 font-semibold text-xs tracking-wide uppercase mb-4 shadow-sm">
                        <Building2 size={14} />
                        <span>Ecosystem</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                        Products & Services
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Pre-built platforms + bespoke delivery—powered by a domain-first team and an inclusive “AI for Bharat” approach.
                    </p>
                </div>

                {/* Featured Flagship Product */}
                <div className="mb-8 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white p-8 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-110" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200">
                                <Activity size={12} />
                                <span>Flagship Platform</span>
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-900 mb-3">
                                RegIntel 360
                            </h3>
                            <p className="text-lg font-medium text-emerald-800 mb-4">
                                AI-Powered ESG & Compliance Automation Platform
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-6 max-w-2xl">
                                GreenAI's flagship platform for automated sustainability reporting and intelligent compliance management. It empowers organizations to move beyond manual data handling — turning compliance into a continuous, insight-driven process.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-emerald-100 text-slate-700 text-sm font-semibold shadow-sm">
                                    <FileText size={16} className="text-emerald-600" />
                                    Automated BRSR & GRI Reporting
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-emerald-100 text-slate-700 text-sm font-semibold shadow-sm">
                                    <Activity size={16} className="text-emerald-600" />
                                    Real-Time Environmental Monitoring
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-emerald-100 text-slate-700 text-sm font-semibold shadow-sm">
                                    <ShieldCheck size={16} className="text-emerald-600" />
                                    AI-Based Validation
                                </span>
                            </div>
                        </div>

                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 shadow-sm">
                            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Globe size={18} className="text-emerald-600" />
                                Core Capabilities
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    "Automates ESG Reporting (BRSR, GRI, SASB)",
                                    "Live Air, Water & Energy Data Integration",
                                    "Cross-checks evidence & detects inconsistencies",
                                    "Predicts ESG risks & compliance deviations",
                                    "Traceable disclosures for audit-ready transparency"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <TiltCard
                        title="VidhiLab"
                        subtitle="Legal AI & Compliance"
                        icon={<Scale size={20} />}
                        tone="green"
                        bullets={[
                            "Multilingual legal advisory (voice + text)",
                            "RAG-powered knowledge base with updates",
                            "Tender + compliance workflows",
                        ]}
                    />

                    <TiltCard
                        title="Bhasantor (CLiCS)"
                        subtitle="Voice AI Stack for Indic Languages"
                        icon={<Mic size={20} />}
                        tone="orange"
                        bullets={[
                            "Speech-to-text + translation + text-to-speech",
                            "Real-time multilingual workflows",
                            "Edge + cloud deployment options",
                        ]}
                    />

                    <TiltCard
                        title="GreenAI Granthana"
                        subtitle="Digital Publishing & AI Textbooks"
                        icon={<BookOpen size={20} />}
                        tone="slate"
                        bullets={[
                            "Kindle + print + audiobooks",
                            "ISBN-backed knowledge assets",
                            "QR-enabled immersive learning artifacts",
                        ]}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex gap-4 items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 grid place-items-center text-indigo-700 transition-colors group-hover:bg-indigo-100">
                                <LineChart size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-xl text-slate-900">Custom Industrial AI</div>
                                <div className="text-slate-500 text-sm mt-1">
                                    Vision AI, monitoring, anomaly detection, and optimization for metal & mining, power, and manufacturing.
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">Edge deployment</span>
                            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">Real-time alerts</span>
                            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">Safety & compliance</span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex gap-4 items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 grid place-items-center text-teal-700 transition-colors group-hover:bg-teal-100">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-xl text-slate-900">AI Consulting</div>
                                <div className="text-slate-500 text-sm mt-1">
                                    Strategy → data engineering → pilots → enterprise rollout, with governance and secure integration.
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold">Roadmaps</span>
                            <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold">Data insights</span>
                            <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold">Operational optimization</span>
                        </div>
                    </div>
                </div>

                {/* Partners section moved to TrustedBy.jsx */}
            </div>
        </section>
    );
}
