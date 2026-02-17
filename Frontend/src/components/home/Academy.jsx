import React from "react";
import { Sparkles, ArrowRight, CheckCircle2, Globe2, ShieldCheck, Cpu } from "lucide-react";
import AcademyCard from "../ui/AcademyCard";

export default function Academy({ onContactClick }) {
    return (
        <section id="academy" className="py-16 border-t border-slate-900/5 bg-[radial-gradient(1000px_600px_at_10%_0%,rgba(230,81,0,0.14),transparent_60%),radial-gradient(900px_600px_at_90%_30%,rgba(46,125,50,0.12),transparent_60%),linear-gradient(180deg,rgba(255,245,238,0.60),rgba(255,255,255,0.92))]">
            <div className="container mx-auto px-6 w-full max-w-7xl">
                <div className="flex flex-col items-center text-center gap-8 mb-10">
                    <div className="max-w-[78ch] mx-auto">
                        <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-full border border-[#E65100]/25 bg-white/60 text-[#E65100]/96 font-extrabold text-[13px]">
                            <Sparkles size={16} />
                            <span>GreenAI Academy</span>
                        </div>
                        <h2 className="text-[clamp(24px,3vw,36px)] leading-tight font-bold my-4 tracking-[-0.4px]">Industry-Certified Programs</h2>
                        <p className="text-[#5d6b6a] text-lg">
                            Hybrid, application-focused upskilling—built with industry relevance and academic credibility
                            through partnership with <strong>Jadavpur University</strong>.
                        </p>
                    </div>

                    <button
                        className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-[14px] font-extrabold transition-all duration-150 shadow-lg cursor-pointer hover:-translate-y-0.5 hover:shadow-xl bg-gradient-to-br from-[#E65100]/98 to-[#b43800]/98 border border-[#E65100]/35 text-white shadow-[#E65100]/22"
                        onClick={onContactClick}
                    >
                        Request a Cohort Proposal <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-4 gap-3 mt-3.5">
                    <AcademyCard
                        title="Generative AI"
                        icon={<Sparkles size={18} />}
                        desc="LLMs, prompt engineering, RAG, and safe enterprise workflows."
                    />
                    <AcademyCard
                        title="Industry 4.0 (IoT)"
                        icon={<Globe2 size={18} />}
                        desc="Sensor integration, telemetry, smart manufacturing and analytics."
                    />
                    <AcademyCard
                        title="DevOps"
                        icon={<ShieldCheck size={18} />}
                        desc="Cloud + on-prem delivery pipelines, security, observability, governance."
                    />
                    <AcademyCard
                        title="Full Stack"
                        icon={<Cpu size={18} />}
                        desc="Modern web engineering with AI-assisted development tooling."
                    />
                </div>

                <div className="mt-3.5 flex gap-2.5 items-start p-3 py-3.5 rounded-[24px] border border-[#E65100]/18 bg-white/65">
                    <CheckCircle2 size={18} className="shrink-0 scroll-mt-2" />
                    <div className="text-[#5d6b6a]">
                        Program design supports project-based learning, capstones, and cohort delivery for enterprises and institutions.
                    </div>
                </div>
            </div>
        </section>
    );
}
