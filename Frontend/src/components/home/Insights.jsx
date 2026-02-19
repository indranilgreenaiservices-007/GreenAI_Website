
import React from 'react';
import { ArrowLeft, ArrowRight, Rss, Mic, Layers, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';


const insightsData = [];

export default function Insights() {
    return (
        <section id="insights" className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-6 w-full max-w-7xl">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700 font-semibold text-xs tracking-wide uppercase mb-4 shadow-sm">
                        <Layers size={12} />
                        Technical & Research
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">GreenAI Insights</h2>
                    <p className="text-lg text-slate-600">
                        Deep dives into our technology, podcasts, and industry perspectives.
                    </p>
                </div>

                {insightsData.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Content would go here */}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 md:py-20 bg-white rounded-3xl border border-slate-200 shadow-sm text-center px-6 mx-auto w-full max-w-2xl">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Radio size={32} className="md:w-10 md:h-10 text-blue-600" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Stay Tuned!</h2>
                        <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                            We are currently crafting in-depth technical posts, podcasts, and updates.
                            Our team is working hard to bring you valuable insights very soon.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm font-semibold text-slate-400">
                            <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100"><Mic size={12} /> Podcasts</span>
                            <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100"><Layers size={12} /> Tech Deep Dives</span>
                            <span className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100"><Rss size={12} /> Research</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
