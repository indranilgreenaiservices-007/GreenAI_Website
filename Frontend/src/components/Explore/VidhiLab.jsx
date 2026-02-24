
import React from "react";
import { Scale, CheckCircle2, FileText, Search, BookOpen } from "lucide-react";

export default function VidhiLab() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-6 border-b border-slate-200 pb-8">
                {/* <div className="p-4 rounded-2xl bg-amber-50 text-amber-600">
                    <Scale size={40} />
                </div> */}
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">VidhiLab</h2>
                    <p className="text-slate-500 font-medium">Legal & Tender Intelligence powered by Multilingual NLP</p>
                </div>
            </div>

            {/* Problem Landscape */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                    Problem Landscape
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: "Research Overload", desc: "Thousands of legal precedents and documents requiring manual review." },
                        { title: "Tender Complexity", desc: "Complex technical requirements in tenders often missed during manual screening." },
                        { title: "Regulatory Interpretation", desc: "Slow and inconsistent interpretation of new government regulations." },
                        { title: "Language Barriers", desc: "Legal documents in multiple Indic languages requiring accurate cross-lingual analysis." }
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
                    <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                    How It Works
                </h3>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-900">
                        <Scale size={120} />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <p className="text-slate-700 leading-relaxed max-w-2xl">
                            VidhiLab employs RAG (Retrieval-Augmented Generation) coupled with our specialized legal language models. It creates a semantic index of all relevant legal and tender documents, enabling precise queries and automated summarization across multiple languages.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-amber-600 font-bold">1</div>
                                <h5 className="font-bold text-sm">Semantic Indexing</h5>
                                <p className="text-xs text-slate-500">Vectorized storage of legal knowledge bases.</p>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-amber-600 font-bold">2</div>
                                <h5 className="font-bold text-sm">Multilingual NLP</h5>
                                <p className="text-xs text-slate-500">Cross-language search and summarization.</p>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-amber-600 font-bold">3</div>
                                <h5 className="font-bold text-sm">Decision Support</h5>
                                <p className="text-xs text-slate-500">Structured extraction of key tender clauses.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enterprise Impact */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                    Enterprise Impact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: <Search size={20} />, title: "Speed", desc: "Perform legal research 10x faster with semantic search." },
                        { icon: <FileText size={20} />, title: "Precision", desc: "Never miss a critical clause in complex tender documents." },
                        { icon: <BookOpen size={20} />, title: "Intelligence", desc: "Unified legal intelligence across state and central regulations." }
                    ].map((impact, i) => (
                        <div key={i} className="bg-slate-900 p-6 rounded-2xl text-white space-y-4">
                            <div className="text-amber-400">{impact.icon}</div>
                            <h4 className="font-bold">{impact.title}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">{impact.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <div className="flex justify-center pt-8">
                <button className="px-10 py-4 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-500 transition-all shadow-lg shadow-amber-600/20 flex items-center gap-3">
                    Request Executive Demo <CheckCircle2 size={20} />
                </button>
            </div>
        </div>
    );
}
