import React, { useMemo, useState } from "react";
import { ShieldCheck, LineChart, AlertTriangle, Gauge, BookOpen, Globe2, Sparkles } from "lucide-react";
import MiniLineChart from "../charts/MiniLineChart";
import MiniGauge from "../charts/MiniGauge";
import StatusBar from "../ui/StatusBar";

export default function RegIntelFeature() {
    const tabs = useMemo(
        () => [
            {
                key: "esg",
                title: "ESG Dashboard",
                icon: <LineChart size={18} />,
                desc:
                    "Multi-year trends, drill-down KPIs, and board-ready summaries—built for SEBI-aligned reporting cycles.",
            },
            {
                key: "compliance",
                title: "Compliance Monitor",
                icon: <AlertTriangle size={18} />,
                desc:
                    "Validation, anomaly detection, and evidence-first workflows to keep disclosures audit-defensible.",
            },
            {
                key: "ops",
                title: "Operations View",
                icon: <Gauge size={18} />,
                desc:
                    "IoT-connected monitoring for water, energy, emissions, and waste—turning telemetry into decisions.",
            },
        ],
        []
    );

    const [active, setActive] = useState(tabs[0].key);

    const activeTab = tabs.find((t) => t.key === active) || tabs[0];

    return (
        <section id="regintel" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Subtler background */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(46,125,50,0.05),transparent_40%)]" aria-hidden="true"></div>

            <div className="container mx-auto px-6 w-full max-w-7xl relative z-10">
                <div className="flex flex-col items-center text-center gap-12 mb-10">
                    <div className="max-w-2xl mb-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-700 font-semibold text-xs tracking-wide uppercase mb-4 shadow-sm">
                            <ShieldCheck size={14} />
                            <span>RegIntel 360</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                            Demonstrate Compliance Intelligence
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            An end-to-end ESG compliance operating system for SEBI’s BRSR / BRSR Core:
                            workflow digitization, ERP + IoT integration, AI-assisted guidance, and audit-ready evidence trails.
                        </p>
                    </div>
                    <div className="flex gap-4 ml-auto">
                        <div className="px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[120px]">
                            <div className="text-3xl font-bold text-slate-900">70%</div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Faster Reporting</div>
                        </div>
                        <div className="px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[120px]">
                            <div className="text-3xl font-bold text-slate-900">100%</div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Audit Ready</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
                    <div className="space-y-2 ">
                        {tabs.map((t) => (
                            <button
                                key={t.key}
                                className={` cursor-pointer w-full text-left p-4  rounded-xl transition-all duration-200 flex gap-4 items-start group ${t.key === active
                                    ? "bg-white shadow-md border border-slate-200 ring-1 ring-slate-200/50"
                                    : "hover:bg-slate-100/80 border border-transparent"
                                    }`}
                                onClick={() => setActive(t.key)}
                            >
                                <div className={`pt-1 transition-colors ${t.key === active ? "text-green-700" : "text-slate-400 group-hover:text-slate-600"}`}>
                                    {t.icon}
                                </div>
                                <div>
                                    <div className={`font-semibold text-sm ${t.key === active ? "text-slate-900" : "text-slate-600"}`}>
                                        {t.title}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                                        {t.desc}
                                    </div>
                                </div>
                            </button>
                        ))}

                        <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-slate-300 transform scale-95 opacity-80 mix-blend-multiply">
                            <div className="flex items-center gap-2 font-semibold text-white mb-2">
                                <ShieldCheck size={16} /> Enterprise Security
                            </div>
                            <p className="text-xs leading-relaxed">
                                Role-based access control, encrypted logs, and on-premise deployment options available.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl min-h-[500px] p-1 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
                        <div className="p-8 h-full bg-slate-50/30 rounded-[22px]">
                            {active === "esg" && <MockESG />}
                            {active === "compliance" && <MockCompliance />}
                            {active === "ops" && <MockOps />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MockESG() {
    return (
        <>
            <div className="flex justify-between items-center gap-3 mb-2.5">
                <h3 className="m-0 text-base font-bold tracking-tight">ESG Trend Visualization</h3>
                <div className="flex gap-2 flex-wrap">
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <ShieldCheck size={14} /> Audit Trail
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <Sparkles size={14} /> AI Auto-Fill
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <LineChart size={14} /> Benchmarking
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-3.5 items-start">
                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-2 flex items-center gap-2">
                        <LineChart size={16} /> Multi-FY ESG Score Trend
                    </div>
                    <MiniLineChart />
                    <div className="text-[#5d6b6a] text-[13px] mt-2">
                        Drill-down views with heatmaps, maturity indicators, and year-on-year narratives—ready for executive review.
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 mt-2.5">
                        <div className="rounded-[16px] border border-slate-900/10 bg-white/75 p-2.5">
                            <div className="font-[950] text-[#0b3a1f]">70%</div>
                            <div className="text-[#5d6b6a] text-xs mt-1">Time Reduction</div>
                        </div>
                        <div className="rounded-[16px] border border-slate-900/10 bg-white/75 p-2.5">
                            <div className="font-[950] text-[#0b3a1f]">100%</div>
                            <div className="text-[#5d6b6a] text-xs mt-1">Audit Readiness</div>
                        </div>
                        <div className="rounded-[16px] border border-slate-900/10 bg-white/75 p-2.5">
                            <div className="font-[950] text-[#0b3a1f]">360°</div>
                            <div className="text-[#5d6b6a] text-xs mt-1">Visibility</div>
                        </div>
                    </div>
                </div>

                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-2 flex items-center gap-2">
                        <ShieldCheck size={16} /> What’s happening now
                    </div>
                    <div className="text-[#5d6b6a] text-[13px]">
                        • Auto-mapped BRSR fields from PDFs/logs <br />
                        • Unit + YoY validation checks <br />
                        • Evidence locker exports for assurance
                    </div>

                    <div className="mt-2.5">
                        <StatusBar label="Section A completeness" value={86} />
                        <StatusBar label="Section B validation" value={74} />
                        <StatusBar label="Section C evidence linked" value={68} />
                    </div>
                </div>
            </div>
        </>
    );
}

function MockCompliance() {
    return (
        <>
            <div className="flex justify-between items-center gap-3 mb-2.5">
                <h3 className="m-0 text-base font-bold tracking-tight">Validation & Auditability</h3>
                <div className="flex gap-2 flex-wrap">
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <AlertTriangle size={14} /> Exception Alerts
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <ShieldCheck size={14} /> Cross-Validation
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <BookOpen size={14} /> Evidence Pack
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-3.5 items-start">
                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-2 flex items-center gap-2">
                        <AlertTriangle size={16} /> Live Alerts
                    </div>

                    <div className="flex flex-col gap-2.5">
                        {[
                            { title: "Missing evidence for waste disposal", meta: "Indicator: Waste 처리 • FY: 2025–26 • Action: Upload disposal certificate" },
                            { title: "Outlier detected in energy consumption", meta: "42% YoY change • Check units (kWh vs MWh) • Suggest review" },
                            { title: "Supplier portal responses incomplete", meta: "11 suppliers pending • Auto-reminder scheduled" },
                        ].map((alert, i) => (
                            <div key={i} className="rounded-[16px] border border-slate-900/10 bg-white/80 p-2.5 flex gap-2.5 items-start">
                                <div className="w-[34px] h-[34px] rounded-[14px] grid place-items-center border border-[#E65100]/25 bg-[#E65100]/10 text-[#E65100] shrink-0">
                                    <AlertTriangle size={16} />
                                </div>
                                <div>
                                    <p className="font-[950] text-[#0b1220] text-sm m-0">{alert.title}</p>
                                    <p className="text-[#5d6b6a] text-[13px] mt-1">{alert.meta}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-2 flex items-center gap-2">
                        <ShieldCheck size={16} /> Audit Mode Snapshot
                    </div>
                    <div className="text-[#5d6b6a] text-[13px]">
                        • Time-stamped logs for edits, approvals, and imports <br />
                        • Artifact storage linked to each KPI <br />
                        • One-click auditor export package
                    </div>

                    <div className="mt-2.5">
                        <StatusBar label="Disclosure deviations" value={12} tone="warn" />
                        <StatusBar label="Evidence coverage" value={71} tone="good" />
                        <StatusBar label="Ready for assurance" value={64} tone="good" />
                    </div>
                </div>
            </div>
        </>
    );
}

function MockOps() {
    return (
        <>
            <div className="flex justify-between items-center gap-3 mb-2.5">
                <h3 className="m-0 text-base font-bold tracking-tight">Operations & Telemetry</h3>
                <div className="flex gap-2 flex-wrap">
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <Globe2 size={14} /> IoT Streams
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <Gauge size={14} /> Real-time KPIs
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <ShieldCheck size={14} /> ERP Sync
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-3.5 items-start">
                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-2 flex items-center gap-2">
                        <Gauge size={16} /> Emissions Health Gauge
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <MiniGauge value={63} />
                        <div className="flex flex-col gap-1.5">
                            <div>
                                <div className="text-xs font-extrabold text-[#5d6b6a]">Carbon intensity</div>
                                <div className="font-[950] text-[#0b3a1f]">63 / 100</div>
                            </div>
                            <div>
                                <div className="text-xs font-extrabold text-[#5d6b6a]">Status</div>
                                <div className="font-[950] text-[#0b3a1f]">
                                    Stable
                                </div>
                            </div>
                            <div>
                                <div className="text-xs font-extrabold text-[#5d6b6a]">Recommendation</div>
                                <div className="font-[950] text-[#0b1220] text-[13px]">
                                    Optimize energy + reduce peaks
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-[#5d6b6a] text-[13px] mt-2.5">
                        Connect sensors to monitor water, energy, emissions, and waste—then auto-map telemetry into ESG disclosures.
                    </div>
                </div>

                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-2 flex items-center gap-2">
                        <LineChart size={16} /> Live Operational Signals
                    </div>

                    <div className="text-[#5d6b6a] text-[13px] mb-2.5">
                        Latest 24h snapshot
                    </div>

                    <StatusBar label="Water usage compliance" value={82} />
                    <StatusBar label="Energy efficiency" value={69} />
                    <StatusBar label="Waste segregation" value={58} tone="warn" />
                </div>
            </div>
        </>
    );
}
