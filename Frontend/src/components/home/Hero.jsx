
import React, { useState, useEffect } from "react";
import { Leaf, ArrowRight, Scale, LineChart, Mic, GraduationCap, CheckCircle2, Activity, Users, FileText, Ruler, Scan, Database, Cpu, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
    {
        id: "bhasantor",
        title: "Bhasantor",
        subtitle: "Voice AI Stack for Indic Languages",
        icon: <Mic size={20} />,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        visual: () => (
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 p-6">

                {/* Voice Input */}
                <div className="flex items-center gap-4">

                    {/* Mic Input */}
                    <div className="relative w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <Mic size={24} className="text-blue-600 z-10" />
                        <motion.div
                            className="absolute inset-0 border border-blue-400 rounded-full"
                            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>

                    {/* Flow Line */}
                    <div className="h-[2px] w-4 lg:w-8 bg-gradient-to-r from-blue-400 to-indigo-400" />

                    {/* Language Nodes */}
                    <div className="flex  gap-1">
                        {["EN", "HI", "BN", "TA"].map((lang, i) => (
                            <motion.div
                                key={lang}
                                className="px-2 py-1 text-xs font-semibold bg-white border border-blue-200 rounded-md shadow-sm text-blue-600"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            >
                                {lang}
                            </motion.div>
                        ))}
                    </div>

                    {/* Flow Line */}
                    <div className="h-[2px] w-4 lg:w-8 bg-gradient-to-r from-indigo-400 to-blue-400" />

                    {/* Speaker Output */}
                    <div className="relative w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <Volume2 size={24} className="text-blue-600 z-10" />
                        <motion.div
                            className="absolute inset-0 border border-blue-400 rounded-full"
                            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                    </div>
                </div>

                {/* Description Panel */}
                <div className="bg-white/80 rounded-xl p-4 text-xs lg:text-[15px] text-slate-600 border border-blue-100 text-center w-full leading-relaxed backdrop-blur-sm shadow-sm">
                    <span className="font-bold text-blue-700 block mb-1">
                        Speech → Translate → Speak
                    </span>
                    From speech capture to intelligent translation and natural voice output — delivered in real time across edge and cloud environments.
                </div>
            </div>
        )
    },

    {
        id: "regintel",
        title: "RegIntel 360",
        subtitle: "Automated ESG & Compliance",
        icon: <Leaf size={20} />,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        visual: () => (
            <div className="w-full h-full flex flex-col justify-center items-center gap-6 p-4">
                {/* Flow Container */}
                <div className="flex items-center gap-1 w-full justify-between">

                    {/* Step 1: Data Collection */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center relative">
                            <FileText size={16} className="text-slate-400 absolute top-2 left-2" />
                            <Database size={16} className="text-slate-400 absolute bottom-2 right-2" />
                            <Activity size={20} className="text-emerald-600" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Data/IoT</span>
                    </div>

                    {/* Arrow/Flow */}
                    <div className="flex-1 h-[2px] bg-slate-100 relative overflow-hidden mx-1">
                        <motion.div
                            className="absolute inset-y-0 left-0 w-1/2 bg-emerald-500"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Step 2: Processing (Center) */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-200/50 flex items-center justify-center relative overflow-hidden p-1">
                            <Cpu size={32} className="text-white relative z-10" />
                            {/* Pulse Ring */}
                            <motion.div
                                className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                                animate={{ scale: [0.9, 1.1], opacity: [1, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">RegIntel 360</span>
                    </div>

                    {/* Arrow/Flow */}
                    <div className="flex-1 h-[2px] bg-slate-100 relative overflow-hidden mx-1">
                        <motion.div
                            className="absolute inset-y-0 left-0 w-1/2 bg-emerald-500"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                        />
                    </div>

                    {/* Step 3: Output */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-white border border-green-200 shadow-sm flex items-center justify-center">
                            <CheckCircle2 size={24} className="text-emerald-600" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Report</span>
                    </div>
                </div>

                {/* Text Desc */}
                <div className="bg-slate-50/80 rounded-xl p-4 text-xs lg:text-[15px] text-slate-600 border border-slate-300 text-center w-full leading-relaxed backdrop-blur-sm">
                    <span className="font-bold text-emerald-700 block mb-1">End-to-End Automation</span>
                    Ingest data from <strong>IoT sensors & Manual logs</strong>, process via <strong>AI</strong>, and generate <strong>Audit-Ready</strong> BRSR reports instantly.
                </div>
            </div>
        ),
    },
    {
        id: "vidhilab",
        title: "VidhiLab",
        subtitle: "Intelligent Legal Support & Compliance",
        icon: <Scale size={20} />,
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-200",
        visual: () => (
            <div className="w-full h-full flex flex-col justify-center items-center gap-5 p-4">
                {/* Central AI Brain */}
                <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center p-1 relative z-10">
                        <Scale size={32} className="text-purple-600" />
                        <motion.div
                            className="absolute inset-0 border-2 border-purple-400 rounded-full"
                            animate={{ scale: [1, 1.2], opacity: [0.8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                    {/* Connecting Lines */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[1px] bg-purple-200 -z-0 rotate-45" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[1px] bg-purple-200 -z-0 -rotate-45" />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3 w-full">
                    {[
                        { icon: <Database size={14} />, text: "RAG & NLP" },
                        { icon: <Mic size={14} />, text: "Voice & Text" },
                        { icon: <Scan size={14} />, text: "7+ Languages" },
                        { icon: <FileText size={14} />, text: "Tender Mgmt" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center gap-2 bg-white border border-purple-100 p-2 rounded-lg shadow-sm"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className="text-purple-500">{item.icon}</span>
                            <span className="text-[10px] font-semibold text-slate-600">{item.text}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Description */}
                <div className="bg-purple-50/80 rounded-xl p-3 text-xs lg:text-[15px] text-slate-600 border border-purple-100 text-center w-full leading-relaxed backdrop-blur-sm">
                    <span className="font-bold text-purple-700 block mb-0.5">AI Legal Assistant for Indian Law</span>
                    Conversational advisory powered by real-time knowledge base.
                </div>
            </div>
        )
    }
];

export default function Hero({ onPrimary, onSecondary }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-swipe functionality
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setActiveIdx((prev) => (prev + 1) % features.length);
            }, 3600); // 3s hold + 0.6s transition
            return () => clearInterval(interval);
        }
    }, [isHovered]);

    return (
        <section id="home" className="relative  lg:py-25 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30 -left-[200px] -top-[300px] bg-[radial-gradient(circle_at_center,rgba(46,125,50,0.4),rgba(255,255,255,0))]" />
                <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 -right-[150px] -top-[200px] bg-[radial-gradient(circle_at_center,rgba(46,125,50,0.3),rgba(255,255,255,0))]" />
            </div>

            {/* desktop view */}
            <div className="hidden md:grid container mx-auto px-6 w-full max-w-7xl grid-cols-[1fr_1.1fr] gap-12 items-center relative z-10 -mt-10">

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
                                text-slate-700 text-[14px] font-semibold shadow-sm hover:shadow-md hover:border-green-200 transition-all cursor-default"
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
                    className="relative pl-8 flex justify-center md:justify-end"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <div className="relative w-full max-w-[420px]">

                        {/* Card Container */}
                        <div
                            className="relative w-full h-[540px] mb-6"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIdx}
                                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}

                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = offset.x;
                                        if (swipe < -50) {
                                            setActiveIdx((prev) => (prev + 1) % features.length);
                                        } else if (swipe > 50) {
                                            setActiveIdx((prev) => (prev - 1 + features.length) % features.length);
                                        }
                                    }}
                                    className="absolute inset-0 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/60 overflow-hidden ring-1 ring-slate-900/5 flex flex-col"
                                >
                                    {/* Visual Area (Expanded) */}
                                    <div className="flex-[4] relative bg-slate-50/50 flex items-center justify-center p-6 overflow-hidden">
                                        {/* Dynamic Background Glow */}
                                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${features[activeIdx].color.replace('text-', 'from-').replace('600', '300')} to-transparent opacity-20 blur-3xl -z-10 rounded-full transform translate-x-1/2 -translate-y-1/2`} />

                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="w-full h-full flex items-center justify-center"
                                        >
                                            {features[activeIdx].visual()}
                                        </motion.div>
                                    </div>

                                    {/* Info Area (Bottom) */}
                                    <div className="relative p-6 bg-white/60 border-t border-white/50 backdrop-blur-sm">
                                        <div className="mb-2">
                                            {/* <span className={`text-[10px] font-bold uppercase tracking-wider ${features[activeIdx].color}`}>
                                                Feature {activeIdx + 1}
                                            </span> */}
                                        </div>

                                        <h3 className="text-xl font-extrabold text-slate-900 leading-tight mb-2 flex items-center gap-3">
                                            <div className={`p-2 rounded-xl ${features[activeIdx].bg} shadow-sm ring-1 ring-black/5`}>
                                                {React.cloneElement(features[activeIdx].icon, { size: 20 })}
                                            </div>
                                            {features[activeIdx].title}
                                        </h3>
                                        <p className="text-sm font-medium text-slate-500 leading-relaxed">
                                            {features[activeIdx].subtitle}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* External Progress Bar */}
                        <div className="flex items-center justify-center gap-2 px-2 mt-4 w-[120px] mx-auto">
                            {features.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIdx(idx)}
                                    className="group relative h-1.5 flex-1 rounded-full bg-slate-300 overflow-hidden transition-all hover:bg-slate-300 hover:h-2"
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
                </motion.div>            </div>



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
                        <div className="relative h-[435px] rounded-3xl
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