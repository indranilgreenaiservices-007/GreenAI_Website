
import React, { useState, useEffect } from "react";
import { Leaf, ArrowRight, Scale, LineChart, Mic, GraduationCap, CheckCircle2, Activity, Users, FileText, Ruler, Scan } from "lucide-react";
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
        id: "AI-monitoring",
        title: "Conveyor Particle Size Monitoring",
        subtitle: "Real-time size monitoring in motion",
        icon: <Ruler size={20} />,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        visual: () => (
            <div className="w-full max-w-md space-y-4 text-sm">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between mb-3">
                        <span className="font-semibold text-slate-700">
                            Live Measurement
                        </span>
                        <span className="text-xs text-emerald-600 font-bold">
                            Within Tolerance ✓
                        </span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Expected Width</span>
                            <span className="text-slate-900 font-semibold">
                                120 mm
                            </span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Detected Width</span>
                            <span className="text-emerald-600 font-semibold">
                                119.8 mm
                            </span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Deviation</span>
                            <span className="text-emerald-600 font-semibold">
                                0.2 mm
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },

    {
        id: "crack-detection",
        title: "Surface Crack Detection",
        subtitle: "AI-powered vision-based defect inspection",
        icon: <Scan size={20} />,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        visual: () => (
            <div className="w-full max-w-md space-y-4 text-sm">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between mb-3">
                        <span className="font-semibold text-slate-700">
                            Inspection Result
                        </span>
                        <span className="text-xs text-red-600 font-bold">
                            Crack Detected
                        </span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Crack Length</span>
                            <span className="text-red-600 font-semibold">
                                3.4 mm
                            </span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Confidence</span>
                            <span className="text-red-600 font-semibold">
                                97.6%
                            </span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Status</span>
                            <span className="text-slate-900 font-semibold">
                                Flagged for Removal
                            </span>
                        </div>
                    </div>
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
                    <div className="font-semibold text-slate-700">Industry 4.0 Cohort</div>
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

    // Auto-swipe functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % features.length);
        }, 3200); // 2.3s hold + 0.8s transition
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative  lg:py-30 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30 -left-[200px] -top-[300px] bg-[radial-gradient(circle_at_center,rgba(46,125,50,0.4),rgba(255,255,255,0))]" />
                <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 -right-[150px] -top-[200px] bg-[radial-gradient(circle_at_center,rgba(46,125,50,0.3),rgba(255,255,255,0))]" />
            </div>

            {/* desktop view */}
            <div className="hidden md:grid container mx-auto px-6 w-full max-w-7xl grid-cols-[1fr_1.1fr] gap-12 items-center relative z-10">

                {/* LEFT CONTENT (UNCHANGED) */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-6xl text-left font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                        Sustainable AI for <span className="text-green-700">Enterprise</span> & <span className="text-slate-800">Government</span>
                    </h1>

                    <p className="text-lg leading-relaxed text-slate-600 mb-8 max-w-xl">
                        Build intelligent systems that reduce carbon footprints, respect privacy, and stay usable in
                        low-bandwidth realities.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        {["Make in India", "Edge AI Native", "Sustainable Tech"].map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                                bg-white/60 backdrop-blur-md border border-slate-200 
                                text-slate-700 text-[10px] font-semibold shadow-sm hover:shadow-md hover:border-green-200 transition-all cursor-default"
                            >
                                <span className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={onPrimary}
                            className="inline-flex justify-center items-center gap-2 px-8 py-2 rounded-2xl font-bold 
                            bg-slate-900 text-white text-base shadow-xl shadow-slate-900/20 
                            hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-1
                            transition-all duration-300 group"
                        >
                            Discover
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={onSecondary}
                            className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-2xl font-bold 
                            bg-white/80 backdrop-blur-md border border-slate-200 
                            text-slate-700 text-base shadow-lg hover:shadow-xl hover:bg-white hover:-translate-y-1
                            transition-all duration-300 group"
                        >
                            Explore
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* RIGHT CONSOLE */}
                <motion.div
                    className="relative pl-8 flex justify-center md:justify-end scale-90"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <div className="relative w-full max-w-[420px]">

                        {/* Card Container */}
                        <div className="relative w-full h-[520px] mb-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIdx}
                                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}

                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = offset.x; // Access offset.x directly
                                        if (swipe < -50) {
                                            setActiveIdx((prev) => (prev + 1) % features.length);
                                        } else if (swipe > 50) {
                                            setActiveIdx((prev) => (prev - 1 + features.length) % features.length);
                                        }
                                    }}
                                    className="absolute inset-0 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/60 overflow-hidden ring-1 ring-slate-900/5 flex flex-col cursor-grab active:cursor-grabbing"
                                >
                                    {/* Visual Area (Top 65%) */}
                                    <div className="flex-[3] relative bg-gradient-to-b from-slate-50/50 to-white/20 flex items-center justify-center p-6 overflow-hidden">
                                        {/* Dynamic Glow */}
                                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${features[activeIdx].color.replace('text-', 'from-').replace('600', '400')} to-transparent opacity-10 blur-3xl -z-10 rounded-full transform translate-x-1/2 -translate-y-1/2`} />

                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="w-full flex items-center justify-center pointer-events-none"
                                        >
                                            {features[activeIdx].visual()}
                                        </motion.div>
                                    </div>

                                    {/* Info Area (Bottom 35%) */}
                                    <div className="flex-[2] relative p-6 md:p-8 flex flex-col justify-center bg-white/40">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className={`p-2.5 rounded-xl ${features[activeIdx].bg} shadow-sm ring-1 ring-black/5`}>
                                                    {React.cloneElement(features[activeIdx].icon, { size: 22 })}
                                                </div>
                                                <span className={`text-xs font-bold uppercase tracking-wider ${features[activeIdx].color}`}>
                                                    Feature {activeIdx + 1}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-extrabold text-slate-800 leading-tight mb-2">
                                                {features[activeIdx].title}
                                            </h3>
                                            <p className="text-sm font-medium text-slate-500 leading-relaxed">
                                                {features[activeIdx].subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* External Progress Bar */}
                        <div className="flex items-center gap-2 px-2 scale-50">
                            {features.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIdx(idx)}
                                    className="group relative h-2 flex-1 rounded-full bg-slate-200/80 overflow-hidden transition-all hover:bg-slate-300 hover:h-2.5"
                                >
                                    {idx === activeIdx && (
                                        <motion.div
                                            layoutId="progress"
                                            className="absolute inset-0 bg-slate-800"
                                            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                    </div>
                </motion.div>

            </div>



            {/* mobile view*/}
            <div className="block md:hidden relative overflow-hidden">



                {/* Content Container */}
                <div className="relative z-10 container mx-auto px-6 pt-23 pb-10 space-y-10">

                    {/* Header + Subtext + Tags + Buttons */}
                    <motion.div
                        className="flex flex-col items-center text-center space-y-5"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >

                        <h1 className="text-5xl font-extrabold text-slate-900 leading-[1.2] tracking-tight mb-9">
                            Sustainable AI for{" "}
                            <span className="text-green-700">Enterprise</span> &{" "}
                            <span className="text-slate-800">Government</span>
                        </h1>

                        <p className="text-[18px] leading-relaxed text-slate-600 max-w-sm mb-9">
                            Build intelligent systems that reduce carbon footprints, respect privacy,
                            and stay usable in low-bandwidth realities.
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap justify-center gap-3 pt-2">
                            {["Make in India", "Edge AI Native", "Sustainable Tech"].map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
        bg-white/70 backdrop-blur-md border border-white/40 
        text-slate-700 text-xs font-semibold shadow-sm"
                                >
                                    <span className="w-2 h-2 rounded-full bg-green-600 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 w-full pt-2">
                            <button
                                className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl font-semibold 
        bg-slate-900 text-white text-sm shadow-md 
        transition-all active:scale-95 hover:shadow-lg"
                                onClick={onPrimary}
                            >
                                Discover <ArrowRight size={14} />
                            </button>

                            <button
                                className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl font-semibold 
        bg-white/80 backdrop-blur-md border border-slate-200 
        text-slate-700 text-sm shadow-sm 
        transition-all active:scale-95 hover:bg-white"
                                onClick={onSecondary}
                            >
                                Explore <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Mobile Feature Carousel */}
                    <motion.div
                        className="pt-6"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <div className="relative h-[400px] rounded-3xl
      bg-white/70 backdrop-blur-xl
      border border-white/40
      p-5 flex flex-col justify-between
      overflow-hidden shadow-xl cursor-grab active:cursor-grabbing">

                            {/* Visual */}
                            <div className="flex-1 flex items-center justify-center p-2 cursor-grab active:cursor-grabbing">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIdx}
                                        initial={{ opacity: 0, x: 25 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -25 }}
                                        transition={{ duration: 0.35 }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.2}
                                        onDragEnd={(e, { offset, velocity }) => {
                                            const swipe = offset.x;
                                            if (swipe < -50) {
                                                setActiveIdx((prev) => (prev + 1) % features.length);
                                            } else if (swipe > 50) {
                                                setActiveIdx((prev) => (prev - 1 + features.length) % features.length);
                                            }
                                        }}
                                        className="w-full flex items-center justify-center "
                                    >
                                        <div className="scale-95 origin-center w-full flex justify-center pointer-events-none">
                                            {features[activeIdx].visual()}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Info Section */}
                            <div className="mt-4 pt-4 border-t border-slate-200/60 bg-white/60 backdrop-blur-md rounded-2xl p-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl ${features[activeIdx].bg}`}>
                                        {React.cloneElement(features[activeIdx].icon, { size: 20 })}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">
                                            {features[activeIdx].title}
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium">
                                            {features[activeIdx].subtitle}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-2 mt-5">
                            {features.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIdx(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${activeIdx === idx
                                        ? "w-6 bg-slate-900"
                                        : "w-1.5 bg-slate-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>



                </div>
            </div>




        </section >
    );
}
