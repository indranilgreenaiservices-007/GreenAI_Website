import React from "react";
import { Leaf, ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero({ onPrimary, onSecondary }) {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {/* Subtler orbs for corporate "calm" */}
                <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30 -left-[200px] -top-[300px] bg-[radial-gradient(circle_at_center,rgba(46,125,50,0.4),rgba(255,255,255,0))]" />
                <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 -right-[150px] -top-[200px] bg-[radial-gradient(circle_at_center,rgba(46,125,50,0.3),rgba(255,255,255,0))]" />
            </div>

            <div className="container mx-auto px-6 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-800 font-semibold text-xs tracking-wide uppercase mb-6 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0">
                        <Leaf size={14} className="text-green-600" />
                        <span>Green AI • Edge-Native • Audit-Ready</span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:0.1s] opacity-0">
                        Sustainable AI for <span className="text-green-700">Enterprise</span> & <span className="text-slate-800">Government</span>
                    </h1>

                    <p className="text-lg leading-relaxed text-slate-600 mb-8 max-w-xl animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:0.2s] opacity-0">
                        Build intelligent systems that reduce carbon footprints, respect privacy, and stay usable in
                        low-bandwidth realities—without sacrificing enterprise-grade security or compliance outcomes.
                    </p>

                    <div className="flex gap-4 flex-wrap items-center animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:0.3s] opacity-0">
                        <button
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-slate-900 text-white transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                            onClick={onPrimary}
                        >
                            Discover RegIntel 360 <ArrowRight size={16} />
                        </button>
                        <button
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-white border border-slate-200 text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                            onClick={onSecondary}
                        >
                            Explore Ecosystem <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="flex gap-3 flex-wrap mt-10 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:0.4s] opacity-0">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white/60 text-slate-700 text-sm font-bold backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_0_3px_rgba(46,125,50,0.15)]"></span>
                            Make in India
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white/60 text-slate-700 text-sm font-bold backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_0_3px_rgba(46,125,50,0.15)]"></span>
                            Edge AI Native
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white/60 text-slate-700 text-sm font-bold backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_0_3px_rgba(46,125,50,0.15)]"></span>
                            Sustainable Tech
                        </span>
                    </div>
                </div>

                <div className="relative animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:0.2s] opacity-0 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-2xl p-1">
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-50/50 to-transparent rounded-2xl pointer-events-none" />
                    <div className="relative rounded-xl border border-slate-100 bg-white/50 overflow-hidden p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-lg text-slate-900">Transform your business with AI</h3>
                                <p className="text-slate-500 text-sm font-medium">Domain-specific products, custom solutions, and expert consulting.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-4">
                            <div className="p-3 rounded-2xl border border-slate-100 bg-white/60 shadow-sm">
                                <div className="font-extrabold text-lg text-slate-800">ESG + RegTech</div>
                                <div className="text-xs text-slate-500 leading-tight mt-1">BRSR / BRSR Core compliance workflows</div>
                            </div>
                            <div className="p-3 rounded-2xl border border-slate-100 bg-white/60 shadow-sm">
                                <div className="font-extrabold text-lg text-slate-800">Multilingual</div>
                                <div className="text-xs text-slate-500 leading-tight mt-1">Voice + text experiences for diverse users</div>
                            </div>
                            <div className="p-3 rounded-2xl border border-slate-100 bg-white/60 shadow-sm">
                                <div className="font-extrabold text-lg text-slate-800">Flexible Deploy</div>
                                <div className="text-xs text-slate-500 leading-tight mt-1">Cloud, on-prem, and hybrid options</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
