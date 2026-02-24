
import React from "react";
import { ShieldCheck, CheckCircle2, BarChart3, Globe, Zap } from "lucide-react";

export default function RegIntel() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-6 border-b border-slate-200 pb-8">
                {/* <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
                    <ShieldCheck size={40} />
                </div> */}
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">RegIntel 360</h2>
                    <p className="text-slate-500 font-medium">ESG & Compliance Automation for the Sustainable Enterprise</p>
                </div>
            </div>

            {/* Problem Landscape */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                    Problem Landscape
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: "Manual Reporting", desc: "Labor-intensive ESG reporting across multiple frameworks like BRSR, GRI, and SASB." },
                        { title: "Audit Vulnerability", desc: "Data inconsistencies and lack of transparency leading to significant audit risks." },
                        { title: "Data Fragmentation", desc: "Sustainability data locked in disparate systems across the organization." },
                        { title: "Reactive Strategy", desc: "Lack of predictive insights to manage upcoming regulatory changes." }
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
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                    How It Works
                </h3>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-900">
                        <ShieldCheck size={120} />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <p className="text-slate-700 leading-relaxed max-w-2xl">
                            RegIntel 360 automates the lifecycle of sustainability data management. By integrating directly with ERP and IoT systems, it provides a real-time view of ESG performance while ensuring every data point is audit-ready and compliant with global standards.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 font-bold">1</div>
                                <h5 className="font-bold text-sm">Data Ingestion</h5>
                                <p className="text-xs text-slate-500">Automated collection from diverse API sources.</p>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 font-bold">2</div>
                                <h5 className="font-bold text-sm">Validation Engine</h5>
                                <p className="text-xs text-slate-500">AI-driven anomaly detection and validation.</p>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 font-bold">3</div>
                                <h5 className="font-bold text-sm">One-Click Reporting</h5>
                                <p className="text-xs text-slate-500">Generating framework-compliant reports instantly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enterprise Impact */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                    Enterprise Impact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: <BarChart3 size={20} />, title: "Precision", desc: "95% reduction in data errors through automated validation." },
                        { icon: <Globe size={20} />, title: "Compliance", desc: "Guaranteed adherence to evolving global ESG standards." },
                        { icon: <Zap size={20} />, title: "Efficiency", desc: "Save thousands of man-hours spent on manual data consolidation." }
                    ].map((impact, i) => (
                        <div key={i} className="bg-slate-900 p-6 rounded-2xl text-white space-y-4">
                            <div className="text-blue-400">{impact.icon}</div>
                            <h4 className="font-bold">{impact.title}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">{impact.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <div className="flex justify-center pt-8">
                <button className="px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-3">
                    Request Executive Demo <CheckCircle2 size={20} />
                </button>
            </div>
        </div>
    );
}
