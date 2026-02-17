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

            <div className="container mx-auto px-6 relative z-10">
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

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform -translate-x-1/2 hidden md:block" />
                    <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-slate-200 transform -translate-x-1/2 md:hidden" />

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <TimelineItem key={step.id} step={step} index={index} />
                        ))}
                    </div>
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
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`relative flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
        >
            {/* Spacer for Desktop Alignment */}
            <div className="flex-1 hidden md:block" />

            {/* Icon Node */}
            <div className="relative z-10 shrink-0 mx-4 md:mx-0">
                <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} shadow-lg shadow-slate-200 flex items-center justify-center relative translate-x-3 md:translate-x-0`}
                >
                    {step.icon}
                    {/* Pulse effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} animate-ping opacity-20`} />
                </div>
            </div>

            {/* Content Card */}
            <div className="flex-1 pt-2 md:pt-0 pl-8 md:pl-0">
                <div
                    className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 relative ${isEven ? "md:mr-12 md:text-right" : "md:ml-12 md:text-left"
                        }`}
                >
                    <div
                        className={`absolute top-1/2 w-4 h-4 bg-white border border-slate-100 transform -translate-y-1/2 rotate-45 hidden md:block ${isEven ? "-right-2 border-l-0 border-b-0" : "-left-2 border-r-0 border-t-0"
                            }`}
                    />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default WhatWeDo;
