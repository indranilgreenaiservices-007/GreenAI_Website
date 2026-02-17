









import React, { useState, useEffect } from "react";
import { Leaf, ArrowRight, Scale, LineChart, Mic, GraduationCap, CheckCircle2, Activity, Users, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
    {
        id: "legal",
        title: "Legal & Compliance",
        subtitle: "Automated regulatory intelligence",
        icon: <Scale size={20} />,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        visual: () => (
            <div className="w-full max-w-md space-y-4 text-sm">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-slate-700">BRSR Disclosure.pdf</span>
                        <span className="text-xs text-emerald-600 font-bold">Audit Ready ✓</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Section 8 Compliance</span>
                            <span className="text-emerald-600 font-semibold">Matched</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">ESG Risk Flags</span>
                            <span className="text-amber-500 font-semibold">1 Warning</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Cross Verification</span>
                            <span className="text-emerald-600 font-semibold">Validated</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "strategy",
        title: "Strategy & Consulting",
        subtitle: "Enterprise AI roadmaps",
        icon: <LineChart size={20} />,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        visual: () => (
            <div className="w-full max-w-md space-y-6">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <span>Assessment</span>
                    <span>Deploy</span>
                </div>
                <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.2 }}
                        className="h-full bg-blue-600"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-white border border-slate-200 p-3 rounded-lg">
                        <div className="font-semibold text-slate-700">AI Maturity</div>
                        <div className="text-blue-600 font-bold text-lg mt-1">Level 3</div>
                    </div>
                    <div className="bg-white border border-slate-200 p-3 rounded-lg">
                        <div className="font-semibold text-slate-700">Deployment Scope</div>
                        <div className="text-slate-900 font-bold text-lg mt-1">Hybrid</div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "voice",
        title: "Voice & Multilingual",
        subtitle: "Indic language speech systems",
        icon: <Mic size={20} />,
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
        visual: () => (
            <div className="w-full max-w-md space-y-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="text-xs text-slate-500 mb-2">Live Transcription</div>
                    <div className="text-slate-900 font-medium">
                        “कृपया अपनी जानकारी सत्यापित करें.”
                    </div>
                    <div className="text-xs text-slate-500 mt-2">
                        → Translated: Please verify your information.
                    </div>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Language:</span>
                    <span className="font-semibold text-orange-600">Hindi → English</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Confidence Score</span>
                    <span className="font-semibold text-orange-600">98.2%</span>
                </div>
            </div>
        ),
    },
    {
        id: "training",
        title: "Training & Programs",
        subtitle: "Upskilling & workshops",
        icon: <GraduationCap size={20} />,
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-200",
        visual: () => (
            <div className="w-full max-w-md space-y-4 text-sm">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="font-semibold text-slate-700">Industry 6.0 Cohort</div>
                    <div className="text-xs text-slate-500 mt-1">Generative AI • Edge Systems • Cloud</div>
                    <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "60%" }}
                            transition={{ duration: 1 }}
                            className="h-full bg-purple-600"
                        />
                    </div>
                    <div className="text-xs text-purple-600 font-semibold mt-2">60% Completion</div>
                </div>
                <div className="text-xs text-slate-500">
                    Certification Status: <span className="text-purple-600 font-semibold">Active</span>
                </div>
            </div>
        ),
    },
];

export default function Hero({ onPrimary, onSecondary }) {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="relative py-24 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30 -left-[200px] -top-[300px] bg-[radial-gradient(circle_at_center,rgba(46,125,50,0.4),rgba(255,255,255,0))]" />
                <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 -right-[150px] -top-[200px] bg-[radial-gradient(circle_at_center,rgba(46,125,50,0.3),rgba(255,255,255,0))]" />
            </div>

            <div className="container mx-auto px-6 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-center relative z-10">
                {/* LEFT CONTENT UNCHANGED */}
                {/* (Your entire left section remains exactly as you wrote it) */}
                                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-800 font-semibold text-xs tracking-wide uppercase mb-6 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0">
                        <Leaf size={14} className="text-green-600" />
                        <span>Green AI • Edge-Native • Audit-Ready</span>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:0.1s] opacity-0">
                        Sustainable AI for <span className="text-green-700">Enterprise</span> & <span className="text-slate-800">Government</span>
                    </h1>

                    <p className="text-lg leading-relaxed text-slate-600 mb-8 max-w-xl animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:0.2s] opacity-0">
                        Build intelligent systems that reduce carbon footprints, respect privacy, and stay usable in
                        low-bandwidth realities.
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
                        {["Make in India", "Edge AI Native", "Sustainable Tech"].map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white/60 text-slate-700 text-sm font-bold backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_0_3px_rgba(46,125,50,0.15)]"></span>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* RIGHT CONSOLE */}
                <div className="relative lg:pl-8">
                    <div className="relative rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-2xl shadow-2xl overflow-hidden p-1">

                        <div className="relative z-10 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 h-[400px]">

                            <div className="md:col-span-5 flex flex-col gap-2">
                                {features.map((feature, idx) => (
                                    <button
                                        key={feature.id}
                                        onClick={() => setActiveIdx(idx)}
                                        className={`w-full text-left p-3 rounded-xl transition-all duration-300 border flex items-center gap-3 relative overflow-hidden group ${
                                            activeIdx === idx
                                                ? `bg-white shadow-md border-slate-200 ${feature.color}`
                                                : "hover:bg-white/50 border-transparent text-slate-500 hover:text-slate-700"
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg ${activeIdx === idx ? feature.bg : "bg-slate-100"}`}>
                                            {React.cloneElement(feature.icon, { size: 18 })}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{feature.title}</div>
                                            <div className="text-[10px] opacity-70 font-medium">{feature.subtitle}</div>
                                        </div>

                                        {activeIdx === idx && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-current"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="md:col-span-7 relative h-full bg-slate-50/50 rounded-2xl border border-slate-100 p-6 flex items-center justify-center overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIdx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full flex items-center justify-center"
                                    >
                                        {features[activeIdx].visual()}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
