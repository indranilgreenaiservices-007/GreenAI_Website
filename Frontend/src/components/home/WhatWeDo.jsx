import React from "react";
import { motion } from "framer-motion";
import { PenTool, Code2, ShieldCheck, Rocket, RefreshCw } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Architect",
        description: "Design future-ready systems for smarter solutions.",
        icon: <PenTool className="w-8 h-8 text-white" />,
        color: "from-blue-500 to-cyan-400",
    },
    {
        id: 2,
        title: "Engineer + Modernize",
        description: "Build innovative software, optimize infra for peak performance.",
        icon: <Code2 className="w-8 h-8 text-white" />,
        color: "from-indigo-500 to-purple-400",
    },
    {
        id: 3,
        title: "Secure Apps & Data",
        description: "Protect data, ensure compliance, and manage risk with full control.",
        icon: <ShieldCheck className="w-8 h-8 text-white" />,
        color: "from-emerald-500 to-green-400",
    },
    {
        id: 4,
        title: "Scale + Deploy",
        description: "Easily integrate, manage, launch, and scale across environments.",
        icon: <Rocket className="w-8 h-8 text-white" />,
        color: "from-orange-500 to-amber-400",
    },
    {
        id: 5,
        title: "Updates + Support",
        description: "Seamless operations, continuous improvement, and resilient growth.",
        icon: <RefreshCw className="w-8 h-8 text-white" />,
        color: "from-rose-500 to-pink-400",
    },
];

const WhatWeDo = () => {
    return (
        <section id="what-we-do" className="relative py-24 bg-slate-50 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-green-100/40 rounded-full blur-3xl" />
                <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
            </div>
            {/* desktop view  */}
            <div className="container mx-auto px-6 w-full max-w-7xl relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-20  ">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl py-5     md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-6">
                            From vision to velocity — powering your digital future
                        </h2>
                        <p className="text-lg text-slate-600">
                            We make it simple. From conception to continuous evolution.
                        </p>
                    </motion.div>
                </div>

                <div className="hidden md:block relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    {/* Vertical Beam Line (Animated) */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 transform -translate-x-1/2" />
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 6.5, ease: "linear" }}
                        className="absolute left-[28px] md:left-1/2 top-0 w-[3px] bg-gradient-to-b from-green-400 via-green-500 to-green-600 shadow-[0_0_20px_rgba(34,197,94,0.6)] transform -translate-x-1/2 z-0 overflow-visible"
                    >
                        {/* Glowing Tip/Head of the beam */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-12 bg-green-400 blur-lg rounded-full opacity-40" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white blur-[5px] rounded-full" />
                    </motion.div>

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <TimelineItem key={step.id} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
            {/* mobile view  */}
            <div className="md:hidden relative mt-12 px-4 pb-20">
                {/* Zig Zag Beam Layer */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <svg className="w-full h-full" viewBox="0 0 100 110" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#4ade80" />
                                <stop offset="100%" stopColor="#22c55e" />
                            </linearGradient>
                        </defs>
                        {/* The Zig Zag Path */}
                        <motion.path
                            d="M 50 0 L 5 10 L 95 30 L 5 50 L 95 70 L 5 90"
                            fill="none"
                            stroke="url(#beamGradient)"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 5.5, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

                {/* Cards Container */}
                <div className="relative z-10 flex flex-col gap-12 pt-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.9 }} // Cards appear first
                            className={`relative w-3/4 p-4 rounded-xl bg-white border border-green-100 shadow-md 
                                ${index % 2 === 0 ? "self-start ml-2 text-left" : "self-end mr-2 text-right"}
                            `}
                        >
                            {/* Pulse Glow Effect */}
                            <div className="absolute inset-0 rounded-xl bg-green-400/20 animate-pulse z-0" />

                            {/* Card Content with Icon */}
                            <div className={`relative z-10 flex items-center gap-3 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                                <div className={`p-2 rounded-full bg-gradient-to-br ${step.color} shadow-sm shrink-0`}>
                                    {React.cloneElement(step.icon, { className: "w-4 h-4 text-white" })}
                                </div>
                                <h3 className="text-sm font-bold text-slate-800">{step.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TimelineItem = ({ step, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.4 }}
            className={`relative flex items-start md:items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
        >
            {/* Spacer for Desktop Alignment */}
            <div className="flex-1 hidden md:block" />

            {/* Icon Node */}
            <div className="relative z-10 shrink-0 md:mx-0">
                <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} shadow-lg shadow-slate-200 flex items-center justify-center relative md:translate-x-0`}
                >
                    {step.icon}
                    {/* Pulse effect */}
                    {/* Pulse effect */}
                    <div className="absolute -inset-2 rounded-full bg-green-500 animate-ping opacity-30" />
                </div>
            </div>

            {/* Content Card */}
            <div className="flex-1 pt-8 md:pt-0 pl-8 md:pl-0">
                <div
                    className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 relative 
        ${isEven ? "md:ml-12 md:text-left" : "md:mr-12 md:text-right"}`}
                >
                    <div
                        className={`absolute top-1/2 w-4 h-4 bg-white border border-slate-100 transform -translate-y-1/2 rotate-45 hidden md:block 
            ${isEven ? "-left-2 border-r-0 border-t-0" : "-right-2 border-l-0 border-b-0"}`}
                    />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
            </div>

        </motion.div>
    );
};

export default WhatWeDo;
