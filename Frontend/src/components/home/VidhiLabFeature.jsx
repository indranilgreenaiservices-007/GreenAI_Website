
import React, { useMemo, useState } from "react";
import { Scale, MessageSquare, BookOpen, FileText, Mic, Search, Gavel, ScrollText, CheckCircle } from "lucide-react";
import StatusBar from "../ui/StatusBar";

export default function VidhiLabFeature() {
    const tabs = useMemo(
        () => [
            {
                key: "assistant",
                title: "AI Legal Assistant",
                icon: <MessageSquare size={18} />,
                desc: "Conversational advisory through voice and text in 7+ Indian languages.",
            },
            {
                key: "knowledge",
                title: "RAG Knowledge Base",
                icon: <BookOpen size={18} />,
                desc: "Real-time, dynamically updated legal database for Indian law citations and precedents.",
            },
            {
                key: "tenders",
                title: "Tender & Compliance",
                icon: <FileText size={18} />,
                desc: "Automated tender parsing, compliance checks, and document automation.",
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
        <div id="vidhilab" className="scroll-mt-24">
            <section className="hidden md:block py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.05),transparent_40%)]" aria-hidden="true"></div>

                <div className="container mx-auto px-6 w-full max-w-7xl relative z-10">

                    <div className="flex justify-center gap-4 -mr-206 scale-85 -mt-19">
                        <div className="px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[120px]">
                            <div className="text-xl font-bold text-slate-900">7+</div>
                            <div className="text-[10px] font-semibold text-slate-800 uppercase tracking-wide mt-1">Indian Languages</div>
                        </div>
                        <div className="px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[120px]">
                            <div className="text-xl font-bold text-slate-900">RAG</div>
                            <div className="text-[10px] font-semibold text-slate-800 uppercase tracking-wide mt-1">Real-time Updates</div>
                        </div>
                        <div className="px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[120px]">
                            <div className="text-xl font-bold text-slate-900">24/7</div>
                            <div className="text-[10px] font-semibold text-slate-800 uppercase tracking-wide mt-1">Advisory</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
                        <div className="space-y-2">
                            {tabs.map((t) => (
                                <button
                                    key={t.key}
                                    className={`cursor-pointer w-full text-left p-4 rounded-xl transition-all duration-200 flex gap-4 items-start group bg-white ${t.key === active
                                        ? "shadow-lg border border-purple-500 ring-1 ring-purple-500/20"
                                        : "shadow-sm border border-slate-100 hover:shadow-md hover:border-purple-200"
                                        }`}
                                    onClick={() => setActive(t.key)}
                                >
                                    <div className={`pt-1 transition-colors ${t.key === active ? "text-purple-600" : "text-slate-400 group-hover:text-slate-600"}`}>
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
                                    <Scale size={16} /> Legal Intelligence
                                </div>
                                <p className="text-xs leading-relaxed">
                                    VidhiLab is GreenAI's flagship AI legal assistant for Indian law. Powered by RAG and multilingual NLP for dynamically updated legal support.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl min-h-[500px] p-1 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500"></div>
                            <div className="p-8 h-full bg-slate-50/30 rounded-[22px]">
                                {active === "assistant" && <MockAssistant />}
                                {active === "knowledge" && <MockKnowledge />}
                                {active === "tenders" && <MockTenders />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile View */}
            <section className="block md:hidden py-16 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wide mb-3">
                            <Gavel size={12} /> VidhiLab
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">
                            AI Legal Assistant
                        </h2>
                        <p className="text-sm text-slate-600 leading-relaxed px-2">
                            Intelligent legal support for Indian Law.
                        </p>
                    </div>

                    <div className="relative mb-6" ref={contentRef}>
                        <div className="absolute -top-15 z-20 flex flex-col-3 gap-2">
                            <div className="bg-slate-900 text-white px-3 py-2 rounded-xl shadow-lg border border-slate-700/50 backdrop-blur-md">
                                <div className="text-lg font-bold leading-none">7+</div>
                                <div className="text-[9px] font-medium opacity-80 uppercase">Langs</div>
                            </div>
                            <div className="bg-white text-slate-900 px-3 py-2 rounded-xl shadow-lg border border-slate-200">
                                <div className="text-lg font-bold leading-none">RAG</div>
                                <div className="text-[9px] font-medium uppercase text-slate-500">Real-Time</div>
                            </div>
                            <div className="bg-white text-slate-900 px-3 py-2 rounded-xl shadow-lg border border-slate-200">
                                <div className="text-lg font-bold leading-none">24/7</div>
                                <div className="text-[9px] font-medium uppercase text-slate-500">Support</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative min-h-[480px]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500"></div>
                            <div className="p-4 pt-8 bg-slate-50/50 h-full">
                                <div className="scale-95 origin-top-left w-[105%]">
                                    {active === "assistant" && <MockAssistant />}
                                    {active === "knowledge" && <MockKnowledge />}
                                    {active === "tenders" && <MockTenders />}
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
                                <div className={`${active === t.key ? "text-purple-400" : "text-slate-400"}`}>
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

function MockAssistant() {
    return (
        <div>
            <div className="flex justify-between items-center gap-3 mb-2.5">
                <h3 className="m-0 text-base font-bold tracking-tight">Multilingual Legal Advisory</h3>
                <div className="flex gap-2 flex-wrap">
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <Mic size={14} /> Voice Enabled
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <MessageSquare size={14} /> Vernacular
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-3.5 items-start">
                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3 h-full flex flex-col">
                    <div className="font-[950] m-0 mb-3 flex items-center justify-between gap-2 text-purple-700">
                        <span className="flex items-center gap-2"><MessageSquare size={16} /> Legal Chat</span>
                        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Hindi / English</span>
                    </div>

                    {/* Chat Mock */}
                    <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col gap-3 min-h-[160px]">
                        <div className="self-end bg-purple-600 text-white rounded-t-xl rounded-bl-xl p-2.5 max-w-[85%] text-xs shadow-sm">
                            <p>Is e-signing valid for rent agreements in India?</p>
                        </div>
                        <div className="self-start bg-white border border-slate-200 text-slate-700 rounded-t-xl rounded-br-xl p-2.5 max-w-[90%] text-xs shadow-sm">
                            <p className="font-bold mb-1 text-purple-800">VidhiLab Assistant</p>
                            <p>Yes, under the <strong>IT Act, 2000</strong>. However, for leave and license agreements covering &gt;11 months, registration is mandatory.</p>
                            <div className="mt-2 text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                                <ScrollText size={10} /> IT Act Section 10A
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 relative">
                        <div className="h-8 bg-white border border-slate-200 rounded-lg w-full"></div>
                        <div className="absolute right-2 top-1.5 p-1 bg-purple-100 rounded text-purple-600"><Mic size={12} /></div>
                    </div>
                </div>

                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3 flex flex-col gap-3">
                    <div className="font-[950] m-0 flex items-center gap-2">
                        <Search size={16} /> Capabilities
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                            <div className="bg-green-100 p-1 rounded-md text-green-700 mt-0.5"><CheckCircle size={12} /></div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-800">Contract Review</h4>
                                <p className="text-[11px] text-slate-500">Instant clause analysis.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                            <div className="bg-blue-100 p-1 rounded-md text-blue-700 mt-0.5"><CheckCircle size={12} /></div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-800">Case Law Lookup</h4>
                                <p className="text-[11px] text-slate-500">Relevant precedent search.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                            <div className="bg-orange-100 p-1 rounded-md text-orange-700 mt-0.5"><CheckCircle size={12} /></div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-800">Legal Translation</h4>
                                <p className="text-[11px] text-slate-500">English to Vernacular.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 bg-purple-50 rounded-lg text-center mt-auto">
                        <p className="text-[10px] text-purple-700 font-bold">Try Voice Mode →</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MockKnowledge() {
    return (
        <div>
            <div className="flex justify-between items-center gap-3 mb-2.5">
                <h3 className="m-0 text-base font-bold tracking-tight">RAG Knowledge Engine</h3>
                <div className="flex gap-2 flex-wrap">
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <BookOpen size={14} /> Laws & Acts
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <ScrollText size={14} /> Citations
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-3.5 items-start">
                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-3 flex items-center gap-2 text-slate-800">
                        <Scale size={16} /> Dynamic Knowledge Base
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-red-50 text-red-600 grid place-items-center font-serif font-bold text-xs">IPC</div>
                                <div>
                                    <div className="text-xs font-bold text-slate-800">Bhartiya Nyaya Sanhita</div>
                                    <div className="text-[10px] text-slate-500">Updated 2024</div>
                                </div>
                            </div>
                            <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">Active</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 grid place-items-center font-serif font-bold text-xs">IT</div>
                                <div>
                                    <div className="text-xs font-bold text-slate-800">IT Amendment Rules</div>
                                    <div className="text-[10px] text-slate-500">Updated 2023</div>
                                </div>
                            </div>
                            <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">Active</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-orange-50 text-orange-600 grid place-items-center font-serif font-bold text-xs">GST</div>
                                <div>
                                    <div className="text-xs font-bold text-slate-800">GST Council Updates</div>
                                    <div className="text-[10px] text-slate-500">Live Feed</div>
                                </div>
                            </div>
                            <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">Syncing</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3 h-full">
                    <div className="font-[950] m-0 mb-3 flex items-center gap-2 text-slate-800">
                        <Search size={16} /> RAG Architecture
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                        <div className="flex justify-center gap-2 mb-2">
                            <div className="p-1.5 bg-white border rounded shadow-sm"><FileText size={12} /></div>
                            <span className="text-slate-300">→</span>
                            <div className="p-1.5 bg-purple-100 border border-purple-200 rounded text-purple-600 shadow-sm"><Database size={12} /></div>
                            <span className="text-slate-300">→</span>
                            <div className="p-1.5 bg-white border rounded shadow-sm"><Search size={12} /></div>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-tight">
                            Documents are vectorized and stored. Semantic search retrieves context for the LLM to provide accurate legal answers.
                        </p>
                    </div>
                </div>
            </div>

            <p className="text-[#5d6b6a] text-[13px] mt-4">
                Powered by RAG (Retrieval-Augmented Generation) to ensure legal advice is grounded in actual statutes and case documents.
            </p>
        </div>
    );
}
import { Database } from "lucide-react";


function MockTenders() {
    return (
        <div className="h-full">
            <div className="flex justify-between items-center gap-3 mb-2.5">
                <h3 className="m-0 text-base font-bold tracking-tight">Compliance & Tender Management</h3>
                <div className="flex gap-2 flex-wrap">
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <FileText size={14} /> Auto-Parsing
                    </span>
                    <span className="chip flex items-center gap-2 text-xs font-[850] border border-slate-900/10 bg-white/65 px-2.5 py-1.5 rounded-full">
                        <CheckCircle size={14} /> Bid Checks
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 items-stretch">
                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-2 flex items-center gap-2 text-slate-800">
                        <FileText size={16} /> Tender Parsing
                    </div>
                    <div className="space-y-2 mt-3">
                        <div className="p-2 border border-slate-200 bg-white rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-slate-700">GEM/2024/B/12345</span>
                                <span className="text-[9px] bg-yellow-100 text-yellow-700 px-1 rounded">Pending</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-1">
                                <div className="h-full w-3/4 bg-purple-500"></div>
                            </div>
                            <div className="text-[9px] text-slate-400 mt-1 text-right">Parsing Criteria...</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                        <div className="p-2 bg-slate-50 rounded-lg">
                            <div className="text-lg font-black text-purple-600">85%</div>
                            <div className="text-[10px] text-slate-500">Match Score</div>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-lg">
                            <div className="text-lg font-black text-purple-600">3 Days</div>
                            <div className="text-[10px] text-slate-500">Deadline</div>
                        </div>
                    </div>
                </div>

                <div className="rounded-[18px] border border-slate-900/10 bg-white/75 p-3">
                    <div className="font-[950] m-0 mb-2 flex items-center gap-2 text-slate-800">
                        <CheckCircle size={16} /> Compliance Checklist
                    </div>

                    <div className="space-y-1.5 mt-2">
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle size={14} className="text-green-500" />
                            <span>GST Registration Valid</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle size={14} className="text-green-500" />
                            <span>MSME Certificate Attached</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle size={14} className="text-green-500" />
                            <span>ITR Last 3 Years</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-3.5 h-3.5 rounded-full border border-slate-300"></div>
                            <span>Bank Solvency Certificate</span>
                        </div>
                    </div>

                    <button className="w-full mt-4 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700 transition-colors">
                        Generate Bid Documents
                    </button>
                </div>
            </div>
        </div>
    )
}
