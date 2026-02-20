import React from "react";
import { Building2, Scale, Mic, BookOpen, LineChart, ShieldCheck, Activity, Globe, FileText, ChevronDown, ArrowRight } from "lucide-react";
import RegIntelFeature from "./RegIntelFeature";
import CLiCSFeature from "./CLiCSFeature";
import VidhiLabFeature from "./VidhiLabFeature";

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
                        Solutions We Provide
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Pre-built platforms + bespoke delivery—powered by a domain-first team and an inclusive “AI for Bharat” approach.
                    </p>
                </div>

                <div className="space-y-4 w-full max-w-7xl mx-auto mb-16">

                    <SolutionItem
                        id="CLiCS"
                        title="CLiCS"
                        subtitle="Voice AI Stack for Indic Languages"
                        icon={<Mic size={20} />}
                        color="orange"
                        expandedContent={<CLiCSFeature />}
                    />

                    <SolutionItem
                        id="regintel"
                        title="RegIntel 360"
                        subtitle="ESG & Compliance Automation"
                        icon={<ShieldCheck size={20} />}
                        color="emerald"
                        isRegIntel={true}
                        expandedContent={<RegIntelFeature />}
                    />

                    <SolutionItem
                        id="vidhilab"
                        title="VidhiLab"
                        subtitle="Legal AI & Compliance"
                        icon={<Scale size={20} />}
                        color="purple"
                        link="https://legalbot.greenai.services/"
                        expandedContent={<VidhiLabFeature />}
                    />



                    <SolutionItem
                        id="granthana"
                        title="GreenAI Granthana"
                        subtitle="Digital Publishing & AI Textbooks"
                        icon={<BookOpen size={20} />}
                        description="Digital Publishing & AI Textbooks. Next-gen learning with QR-enabled immersive artifacts."
                        features={[
                            "Kindle + print + audiobooks",
                            "ISBN-backed knowledge assets",
                            "QR-enabled immersive learning artifacts"
                        ]}
                        color="blue"
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

function SolutionItem({ id, title, subtitle, icon, description, features, color, link, expandedContent, isRegIntel }) {
    const [expanded, setExpanded] = React.useState(false);

    const toggle = () => {
        setExpanded(!expanded);
    };

    const colorClasses = {
        emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-100",
        purple: "bg-purple-50 text-purple-700 border-purple-200 group-hover:bg-purple-100",
        orange: "bg-orange-50 text-orange-700 border-orange-200 group-hover:bg-orange-100",
        blue: "bg-blue-50 text-blue-700 border-blue-200 group-hover:bg-blue-100",
    };

    const activeColor = colorClasses[color] || colorClasses.emerald;

    return (
        <div className={`rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 ${expanded ? "shadow-md ring-1 ring-emerald-500/20" : "hover:border-emerald-200 hover:shadow-sm"}`}>
            <div
                onClick={toggle}
                className="p-5 flex items-center justify-between cursor-pointer group select-none"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${activeColor}`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{title}</h3>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{subtitle}</div>
                    </div>
                </div>
                <div className={`w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-300 ${expanded ? "rotate-180 bg-slate-50 text-slate-600" : "group-hover:bg-slate-50"}`}>
                    <ChevronDown size={18} />
                </div>
            </div>

            <div
                className={`grid transition-all duration-300 ease-in-out ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
                <div className="overflow-hidden">
                    {expandedContent ? (
                        <div className="border-t border-slate-100">
                            {expandedContent}
                        </div>
                    ) : (
                        <div className="px-5 pb-6 pt-0 border-t border-slate-50">
                            <p className="text-slate-600 text-sm leading-relaxed mt-4 mb-4">
                                {description}
                            </p>

                            <div className="mb-4">
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                                    <ShieldCheck size={12} className="text-emerald-600" /> Key Features
                                </h4>
                                <ul className="grid sm:grid-cols-2 gap-2">
                                    {features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                            <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {link && (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline underline-offset-4"
                                >
                                    Learn more <ArrowRight size={14} />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
