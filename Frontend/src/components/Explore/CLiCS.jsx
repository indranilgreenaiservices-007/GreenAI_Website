
import React from "react";
import { Mic, CheckCircle2, Factory, Hospital, Smartphone } from "lucide-react";

export default function CLiCS() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-6 border-b border-slate-200 pb-8">
                {/* <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                    <Mic size={40} />
                </div> */}
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">CLiCS</h2>
                    <p className="text-slate-500 font-medium">Voice & Multilingual AI for High-Stakes Environments</p>
                </div>
            </div>

            {/* Problem Landscape */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                    Problem Landscape
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: "Language Barriers", desc: "Communication gaps in hospitals and telecom sectors hindering service delivery." },
                        { title: "Environmental Noise", desc: "Industrial and outdoor environments affecting the accuracy of standard voice models." },
                        { title: "Latency Issues", desc: "Cloud-dependent solutions failing in mission-critical, real-time scenarios." },
                        { title: "Indic Support", desc: "General lack of robust ASR models for diverse Indic languages and dialects." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                            <p className="text-sm text-slate-600 line-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                    How It Works
                </h3>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Mic size={120} />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <p className="text-slate-700 leading-relaxed max-w-2xl">
                            CLiCS utilizes a specialized neural architecture optimized for low-resource languages and noisy environments. Our proprietary Indic-language ASR (Automatic Speech Recognition) models are trained on diverse datasets to ensure high accuracy across regions.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600 font-bold">1</div>
                                <h5 className="font-bold text-sm">Edge Inference</h5>
                                <p className="text-xs text-slate-500">Processing on-device for ultra-low latency.</p>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600 font-bold">2</div>
                                <h5 className="font-bold text-sm">Noise Filtration</h5>
                                <p className="text-xs text-slate-500">Advanced DSP algorithms to isolate voice.</p>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600 font-bold">3</div>
                                <h5 className="font-bold text-sm">Adaptive NLP</h5>
                                <p className="text-xs text-slate-500">Context-aware understanding of specialized domains.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enterprise Impact */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                    Enterprise Impact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: <Hospital size={20} />, title: "Healthcare", desc: "Instant translation for patient diagnostics in multilingual regions." },
                        { icon: <Smartphone size={20} />, title: "Telecom", desc: "Automated customer service with 98% accuracy in local dialects." },
                        { icon: <Factory size={20} />, title: "Industrial", desc: "Hands-free operation and documentation in high-noise factories." }
                    ].map((impact, i) => (
                        <div key={i} className="bg-slate-900 p-6 rounded-2xl text-white space-y-4">
                            <div className="text-emerald-400">{impact.icon}</div>
                            <h4 className="font-bold">{impact.title}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">{impact.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <div className="flex justify-center pt-8">
                <button className="px-10 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-3">
                    Request Executive Demo <CheckCircle2 size={20} />
                </button>
            </div>
        </div>
    );
}
