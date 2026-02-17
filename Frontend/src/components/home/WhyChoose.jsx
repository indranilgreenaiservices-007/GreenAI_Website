import React from "react";
import { Shield, Zap, Leaf, Award, Lock, Cpu } from "lucide-react";

export default function WhyChoose() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 w-full max-w-7xl relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-900/20 text-green-400 font-semibold text-xs tracking-wide uppercase mb-6">
                        <Award size={14} />
                        <span>Why GreenAI Services</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Enterprise-Grade, <span className="text-green-400">Future-Proof.</span>
                    </h2>
                    <p className="text-lg text-slate-400">
                        We combine the agility of modern AI with the rigorous standards required by government agencies and large enterprises.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
                    {/* Card 1: Large Feature */}
                    <div className="md:col-span-2 md:row-span-2 rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 mb-6">
                                <Shield size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">Bank-Grade Security</h3>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    Your data never leaves your control without explicit consent. specialized in air-gapped deployments and on-premise inferencing for maximum confidentiality.
                                </p>
                                <div className="flex gap-3 flex-wrap">
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium">ISO 27001 Ready</span>
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium">End-to-End Encrypted</span>
                                </div>
                            </div>
                        </div>
                        {/* abstract visual */}
                        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                            <Shield size={200} />
                        </div>
                    </div>

                    {/* Card 2: Edge */}
                    <div className="md:col-span-1 md:row-span-1 rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors group relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                                <Zap size={20} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Blazing Fast Edge AI</h3>
                            <p className="text-slate-400 text-sm">
                                Latency as low as 20ms. Run complex models on standard hardware.
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Sustainability */}
                    <div className="md:col-span-1 md:row-span-1 rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors group relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                                <Leaf size={20} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Zero-Carbon Goal</h3>
                            <p className="text-slate-400 text-sm">
                                Optimized compute reduces energy consumption by up to 40% vs cloud APIs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
