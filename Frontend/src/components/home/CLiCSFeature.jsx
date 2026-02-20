
import React, { useMemo, useState } from "react";
import { Mic, Radio, Database, Video, Languages, Activity, Headphones, Layers, Server } from "lucide-react";
import MiniLineChart from "../charts/MiniLineChart"; // Reusing these if applicable, or create simple placeholders
import StatusBar from "../ui/StatusBar";

export default function CLiCSFeature() {
    const tabs = useMemo(
        () => [
            {
                key: "clics",
                title: "CLiCS Communication System",
                icon: <Radio size={18} />,
                desc: "Real-time voice recognition, text translation, and voice synthesis pipeline for 12+ Indic languages.",
            },
            {
                key: "studio",
                title: "GreenAI Studio",
                icon: <Video size={18} />,
                desc: "Voice-based prescriptions, script-to-video rendering, and AI avatar creation with customizable templates.",
            },
            {
                key: "data",
                title: "Multilingual Data Services",
                icon: <Database size={18} />,
                desc: "Annotation, transcription, labeling, and fine-tuning for low-resource language speech models.",
            },
        ],
        []
    );

    const [active, setActive] = useState(tabs[0].key);
    const contentRef = React.useRef(null);

    const handleMobileTabClick = (key) => {
        setActive(key);
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    return (
        <div id="CLiCS" className="scroll-mt-24">
            <section className="hidden md:block py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(234,88,12,0.05),transparent_40%)]" aria-hidden="true"></div>

                <div className="container mx-auto px-6 w-full max-w-7xl relative z-10">

                    <div className="flex justify-center gap-4 -mr-206 scale-85 -mt-19">
                        <div className="px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[120px]">
                            <div className="text-xl font-bold text-slate-900">12+</div>
                            <div className="text-[10px] font-semibold text-slate-800 uppercase tracking-wide mt-1">Indic Languages</div>
                        </div>
                        <div className="px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[120px]">
                            <div className="text-xl font-bold text-slate-900">&lt;200ms</div>
                            <div className="text-[10px] font-semibold text-slate-800 uppercase tracking-wide mt-1">Latency</div>
                        </div>
                        <div className="px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[120px]">
                            <div className="text-xl font-bold text-slate-900">98%</div>
                            <div className="text-[10px] font-semibold text-slate-800 uppercase tracking-wide mt-1">Accuracy</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
                        <div className="space-y-2">
                            {tabs.map((t) => (
                                <button
                                    key={t.key}
                                    className={`cursor-pointer w-full text-left p-4 rounded-xl transition-all duration-200 flex gap-4 items-start group bg-white ${t.key === active
                                        ? "shadow-lg border border-orange-500 ring-1 ring-orange-500/20"
                                        : "shadow-sm border border-slate-100 hover:shadow-md hover:border-orange-200"
                                        }`}
                                    onClick={() => setActive(t.key)}
                                >
                                    <div className={`pt-1 transition-colors ${t.key === active ? "text-orange-600" : "text-slate-400 group-hover:text-slate-600"}`}>
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
                                    <Languages size={16} /> Language Stack
                                </div>
                                <p className="text-xs leading-relaxed">
                                    Hindi • Bengali • Tamil • Telugu • Marathi • Gujarati • Kannada • Malayalam • Punjabi • Odia • Assamese • Urdu
                                </p>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl min-h-[500px] p-1 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"></div>
                            <div className="p-8 h-full bg-slate-50/30 rounded-[22px]">
                                {active === "clics" && <MockCLiCS />}
                                {active === "studio" && <MockStudio />}
                                {active === "data" && <MockDataServices />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile View */}
            <section className="block md:hidden py-16 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold uppercase tracking-wide mb-3">
                            <Mic size={12} /> CLiCS
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">
                            Voice AI Stack
                        </h2>
                        <p className="text-sm text-slate-600 leading-relaxed px-2">
                            Indic language voice AI for real-time communication.
                        </p>
                    </div>

                    <div className="relative mb-6" ref={contentRef}>
                        <div className="absolute -top-15 z-20 flex flex-col-3 gap-2">
                            <div className="bg-slate-900 text-white px-3 py-2 rounded-xl shadow-lg border border-slate-700/50 backdrop-blur-md">
                                <div className="text-lg font-bold leading-none">12+</div>
                                <div className="text-[9px] font-medium opacity-80 uppercase">Langs</div>
                            </div>
                            <div className="bg-white text-slate-900 px-3 py-2 rounded-xl shadow-lg border border-slate-200">
                                <div className="text-lg font-bold leading-none">&lt;200ms</div>
                                <div className="text-[9px] font-medium uppercase text-slate-500">Latency</div>
                            </div>
                            <div className="bg-white text-slate-900 px-3 py-2 rounded-xl shadow-lg border border-slate-200">
                                <div className="text-lg font-bold leading-none">98%</div>
                                <div className="text-[9px] font-medium uppercase text-slate-500">Accuracy</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative min-h-[480px]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"></div>
                            <div className="p-4 pt-8 bg-slate-50/50 h-full">
                                <div className="scale-95 origin-top-left w-[105%]">
                                    {active === "clics" && <MockCLiCS />}
                                    {active === "studio" && <MockStudio />}
                                    {active === "data" && <MockDataServices />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Row (Bottom) */}
                    <div className="flex gap-3 pb-2 scrollbar-hide overflow-x-auto">
                        {tabs.map((t) => (
                            <button
                                key={t.key}
                                onClick={() => handleMobileTabClick(t.key)}
                                className={`flex-none snap-start px-2 py-3 rounded-xl border flex items-center gap-2.5 transition-all w-[40%] sm:w-auto ${active === t.key
                                    ? "bg-slate-900 border-slate-900 text-white shadow-md"
                                    : "bg-white border-slate-200 text-slate-600"
                                    }`}
                            >
                                <div className={`${active === t.key ? "text-orange-400" : "text-slate-400"}`}>
                                    {React.cloneElement(t.icon, { size: 14 })}
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] font-bold leading-tight line-clamp-2">{t.title}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

function MockCLiCS() {
    return (
        <div>
            <div className="flex justify-between items-center gap-3 mb-2.5">
                <h3 className="m-0 text-base font-bold tracking-tight">Real-time Multilingual Workflow</h3>
                <div className="flex gap-2 flex-wrap">
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <Activity size={14} /> VAD Enabled
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <Headphones size={14} /> Noise Suppression
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-3.5 items-start">
                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-3 flex items-center gap-2 text-orange-700">
                        <Radio size={16} /> CLiCS Pipeline Architecture
                    </div>
                    {/* Simplified Pipeline Visualization */}
                    <div className="flex flex-col gap-3 relative">
                        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200"></div>

                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 grid place-items-center text-[10px] font-bold">1</div>
                            <div className="flex-1 p-2 rounded-lg border border-slate-100 bg-white shadow-sm text-xs">
                                <span className="font-bold text-slate-700">Audio Input Stream</span>
                                <div className="text-[10px] text-slate-500 mt-0.5">Telecom / VoIP / Microphone</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-orange-100 border border-orange-300 grid place-items-center text-[10px] font-bold text-orange-700">2</div>
                            <div className="flex-1 p-2 rounded-lg border border-orange-100 bg-orange-50/50 shadow-sm text-xs">
                                <span className="font-bold text-orange-800">Processing Engine</span>
                                <div className="flex gap-1 mt-1 flex-wrap">
                                    <span className="px-1.5 py-0.5 bg-white rounded border border-orange-200 text-[9px]">VAD</span>
                                    <span className="px-1.5 py-0.5 bg-white rounded border border-orange-200 text-[9px]">Denoise</span>
                                    <span className="px-1.5 py-0.5 bg-white rounded border border-orange-200 text-[9px]">ASR</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 grid place-items-center text-[10px] font-bold">3</div>
                            <div className="flex-1 p-2 rounded-lg border border-slate-100 bg-white shadow-sm text-xs">
                                <span className="font-bold text-slate-700">Output</span>
                                <div className="text-[10px] text-slate-500 mt-0.5">Translated Text / Synthesized Voice</div>
                            </div>
                        </div>
                    </div>

                    <div className="text-[#5d6b6a] text-[13px] mt-4">
                        Seamless pipeline integrated with Voice Activity Detection models and Noise Suppression tools to enhance call quality, reduce latency and computations.
                    </div>
                </div>

                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-2 flex items-center gap-2">
                        <Activity size={16} /> Performance Metrics
                    </div>

                    <div className="mt-4 space-y-3">
                        <StatusBar label="VAD Accuracy" value={98} color="bg-orange-500" />
                        <StatusBar label="Noise Reduction (dB)" value={45} color="bg-orange-500" max={50} />
                        <StatusBar label="Word Error Rate (WER)" value={8} max={20} inverse color="bg-orange-500" />

                        <div className="pt-2 flex gap-2">
                            <div className="flex-1 p-2 bg-slate-50 rounded-lg text-center">
                                <div className="text-xs text-slate-500">Latency</div>
                                <div className="font-bold text-slate-800">180ms</div>
                            </div>
                            <div className="flex-1 p-2 bg-slate-50 rounded-lg text-center">
                                <div className="text-xs text-slate-500">Throughput</div>
                                <div className="font-bold text-slate-800">50K req/s</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MockStudio() {
    return (
        <div>
            <div className="flex justify-between items-center gap-3 mb-2.5">
                <h3 className="m-0 text-base font-bold tracking-tight">Content Generation Suite</h3>
                <div className="flex gap-2 flex-wrap">
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <Video size={14} /> AI Avatar
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <Languages size={14} /> Multi-Lingual Sync
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 items-stretch">
                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3 flex flex-col">
                    <div className="font-[950] m-0 mb-2 flex items-center gap-2 text-slate-800">
                        <Video size={16} /> Script-to-Video Engine
                    </div>
                    <div className="flex-1 bg-slate-100 rounded-lg grid place-items-center min-h-[140px] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 opacity-50"></div>
                        <div className="text-center z-10">
                            <div className="w-12 h-12 bg-white rounded-full mx-auto mb-2 flex items-center justify-center shadow-sm">
                                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-orange-500 border-b-[6px] border-b-transparent ml-1"></div>
                            </div>
                            <span className="text-xs font-semibold text-slate-500">Preview Render</span>
                        </div>
                        {/* Mock timeline */}
                        <div className="absolute bottom-2 left-2 right-2 h-1 bg-slate-300 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-orange-500 rounded-full"></div>
                        </div>
                    </div>
                    <p className="text-[#5d6b6a] text-[13px] mt-3">
                        Tools for voice-based prescriptions, script-to-video rendering, and AI avatar creation.
                    </p>
                </div>

                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3 flex flex-col gap-3">
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-orange-50 border border-orange-100">
                        <div className="mt-1"><Languages size={14} className="text-orange-600" /></div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-800">Localization Templates</h4>
                            <p className="text-xs text-slate-600 mt-1">Pre-built templates for quick prototyping in regional languages.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="mt-1"><Users size={14} className="text-slate-500" /></div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-800">Digital Avatars</h4>
                            <p className="text-xs text-slate-600 mt-1">Lip-sync capable 3D and 2D avatars for customer service.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="mt-1"><FileText size={14} className="text-slate-500" /></div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-800">Voice Prescriptions</h4>
                            <p className="text-xs text-slate-600 mt-1">Speech-to-text medical reporting format generation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { Users, FileText } from "lucide-react";


function MockDataServices() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center gap-3 mb-2.5">
                <h3 className="m-0 text-base font-bold tracking-tight">Dataset Engineering</h3>
                <div className="flex gap-2 flex-wrap">
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <Database size={14} /> Rich Datasets
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <Server size={14} /> Fine-tuning
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1">
                <div className="lg:col-span-2 rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-3 flex items-center gap-2">
                        <Layers size={16} /> Annotation Pipeline
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-16 text-xs font-bold text-slate-500 text-right">Raw Audio</div>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-slate-200"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-16 text-xs font-bold text-slate-500 text-right">Labeling</div>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-[80%] bg-orange-300"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-16 text-xs font-bold text-slate-500 text-right">Validation</div>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-[60%] bg-orange-400"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-16 text-xs font-bold text-slate-500 text-right">Fine-tune</div>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-[40%] bg-orange-500"></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-[#5d6b6a] text-[13px] mt-4">
                        Data annotation, transcription, labelling and fine-tuning for low-resource language speech models.
                    </p>
                </div>

                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3 flex flex-col justify-center gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-black text-orange-600">10k+</div>
                        <div className="text-xs font-bold text-slate-600 uppercase">Hours Data</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-orange-600">99.5%</div>
                        <div className="text-xs font-bold text-slate-600 uppercase">Label Purity</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-orange-600">ASR/NMT</div>
                        <div className="text-xs font-bold text-slate-600 uppercase">Model Support</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
