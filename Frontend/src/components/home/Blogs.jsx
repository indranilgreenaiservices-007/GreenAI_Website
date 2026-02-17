import React from "react";
import { Leaf } from "lucide-react";

export default function Blogs() {
    return (
        <section id="blogs" className="py-16 bg-slate-50 relative">
            <div className="container mx-auto px-6 w-full max-w-7xl">
                <div className="mb-12 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700 font-semibold text-xs tracking-wide uppercase mb-4">
                        <Leaf size={12} />
                        Insights & Updates
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                        GreenAI Insights
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        Stay updated with the latest trends in AI, sustainability, and our company news.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-40 bg-slate-100 rounded-lg mb-4 w-full animate-pulse"></div>
                                <div className="h-4 w-24 bg-slate-100 rounded mb-3"></div>
                                <div className="h-6 w-3/4 bg-slate-100 rounded mb-2"></div>
                                <div className="h-4 w-full bg-slate-50 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}