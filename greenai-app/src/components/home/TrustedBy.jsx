import React from "react";

const partners = [
    "Jadavpur University (SET)",
    "IIT Patna",
    "University of Calcutta",
    "IISER Kolkata",
    "Dhirubhai Ambani University",
    "IIIT Hyderabad",
];

export default function TrustedBy() {
    return (
        <section className="py-10 border-y border-slate-200 bg-slate-50/50 overflow-hidden">
            <div className="container mx-auto px-6 mb-6 text-center">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    Trusted Innovation Partners
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-16 px-8">
                    {partners.map((p, i) => (
                        <span
                            key={i}
                            className="text-xl md:text-2xl font-bold text-slate-400 grayscale transition-all duration-300 hover:grayscale-0 hover:text-slate-800 cursor-default"
                        >
                            {p}
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {partners.map((p, i) => (
                        <span
                            key={`dup-${i}`}
                            className="text-xl md:text-2xl font-bold text-slate-400 grayscale transition-all duration-300 hover:grayscale-0 hover:text-slate-800 cursor-default"
                        >
                            {p}
                        </span>
                    ))}
                    {partners.map((p, i) => (
                        <span
                            key={`dup2-${i}`}
                            className="text-xl md:text-2xl font-bold text-slate-400 grayscale transition-all duration-300 hover:grayscale-0 hover:text-slate-800 cursor-default"
                        >
                            {p}
                        </span>
                    ))}
                </div>

                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10" />
            </div>
        </section>
    );
}
