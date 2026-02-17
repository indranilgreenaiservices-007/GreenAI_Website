import React from "react";
import { Sparkles, Cpu, Leaf, Globe2 } from "lucide-react";

export default function Philosophy() {
    return (
        <section id="philosophy" className="py-10 bg-white">
            <div className="container mx-auto px-6 w-full max-w-7xl">
                <div className="mb-12 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-100 bg-green-50 text-green-700 font-semibold text-xs tracking-wide uppercase mb-4">
                        <Leaf size={14} />
                        <span>Green Tech • Responsible AI</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                        The Green AI Paradigm
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        A conscious shift away from high-carbon, centralized “Red AI” toward edge-native,
                        frugal, inclusive systems designed for real-world constraints.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Red AI Card - Warm/Warning Tone */}
                    <div className="relative rounded-2xl border border-orange-100 bg-orange-50/30 p-8 transition-all hover:bg-orange-50/50 hover:border-orange-200 hover:shadow-md">
                        <div className="flex gap-4 items-start mb-6">
                            <div className="w-12 h-12 rounded-lg grid place-items-center bg-white border border-orange-100 text-orange-600 shadow-sm">
                                <Cpu size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Red AI</h3>
                                <p className="text-slate-500 text-sm mt-1">
                                    High compute, centralized, expensive to run at scale.
                                </p>
                            </div>
                        </div>
                        <ul className="space-y-3 text-slate-600 mb-8">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Massive data-center dependence
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> High energy + carbon footprint
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Costly inferencing and recurring OPEX
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Often excludes low-resource languages & contexts
                            </li>
                        </ul>
                        <div className="flex gap-2 flex-wrap">
                            <span className="text-xs font-bold px-3 py-1.5 bg-white border border-orange-200 rounded-full text-orange-700 shadow-sm">High Carbon</span>
                            <span className="text-xs font-bold px-3 py-1.5 bg-white border border-orange-200 rounded-full text-orange-700 shadow-sm">High Cost</span>
                            <span className="text-xs font-bold px-3 py-1.5 bg-white border border-orange-200 rounded-full text-orange-700 shadow-sm">Centralized</span>
                        </div>
                    </div>

                    {/* Green AI Card - Fresh/Green Tone */}
                    <div className="relative rounded-2xl border border-green-200 bg-green-50/50 p-8 shadow-md ring-1 ring-green-500/10 transition-transform hover:-translate-y-1">
                        <div className="flex gap-4 items-start mb-6">
                            <div className="w-12 h-12 rounded-lg grid place-items-center bg-green-600 text-white shadow-lg shadow-green-600/20">
                                <Leaf size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Green AI</h3>
                                <p className="text-green-800 text-sm mt-1 font-medium">
                                    Right-sized, edge-native intelligence that’s low-energy and inclusive.
                                </p>
                            </div>
                        </div>
                        <ul className="space-y-3 text-slate-700 mb-8">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Edge-first: low latency, minimal connectivity dependency
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Privacy by design: keep data local wherever possible
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Multilingual and culturally grounded AI
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Sufficiency: use AI only where it adds real value
                            </li>
                        </ul>
                        <div className="flex gap-2 flex-wrap">
                            <span className="text-xs font-bold px-3 py-1.5 bg-green-100 border border-green-200 rounded-full text-green-800">Edge-native</span>
                            <span className="text-xs font-bold px-3 py-1.5 bg-green-100 border border-green-200 rounded-full text-green-800">Low-energy</span>
                            <span className="text-xs font-bold px-3 py-1.5 bg-green-100 border border-green-200 rounded-full text-green-800">Inclusive</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-2xl border border-green-100 bg-green-50/30 p-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                        <Globe2 size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">Designed for Enterprise & Government in India</h3>
                        <p className="text-slate-600 text-sm">
                            Modular deployments across cloud, on-prem, and hybrid—built for compliance, auditability, and multilingual access.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
