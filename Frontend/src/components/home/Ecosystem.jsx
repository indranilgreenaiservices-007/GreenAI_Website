import React from "react";
import { Building2, Scale, Mic, BookOpen, LineChart, ShieldCheck } from "lucide-react";
import TiltCard from "../ui/TiltCard";

export default function Ecosystem() {
    return (
        <section id="solutions" className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-6 w-full max-w-7xl">
                <div className="mb-12 max-w-3xl">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
