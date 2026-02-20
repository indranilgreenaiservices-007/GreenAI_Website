import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        q: "How does GreenAI ensure data privacy and security?",
        a: "GreenAI adopts a privacy-by-design framework across all deployments. Our edge-native architecture enables on-premise or private cloud processing, minimizing unnecessary data exposure. For cloud environments, we implement encrypted communication protocols, secure storage practices, and strict role-based access controls (RBAC). GreenAI is certified under ISO 9001:2015 for Quality Management and ISO/IEC 27001:2013 for Information Security Management, ensuring structured governance and robust data protection practices."

    },
    {
        q: "What makes your AI 'sustainable'?",
        a: "We optimize models for inference efficiency, choosing 'right-sized' architectures over massive, energy-hungry LLMs where possible. Our edge deployment strategies further reduce the carbon footprint associated with constant cloud data transmission.",
    },
    {
        q: "Do you support regional Indian languages?",
        a: "Absolutely. Our CLiCS (CLiCS) stack is specifically engineered for Indic languages, supporting nuances, dialects, and mixed-language (code-switching) scenarios common in Indian business contexts.",
    },
    {
        q: "Can RegIntel 360 integrate with our existing ERP?",
        a: "Yes. RegIntel 360 is built with API-first architecture, allowing seamless integration with SAP, Oracle, Microsoft Dynamics, and custom ERPs to auto-fetch procurement, energy, and HR data for BRSR reporting.",
    },
    {
        q: "Is your platform audit-ready for SEBI compliance?",
        a: "Yes. Every data point in RegIntel 360 is traceable. We maintain an immutable audit trail of who changed what and when, along with evidence locking, ensuring you are always ready for assurance and verification.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 w-full max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600">
                        Everything you need to know about our platform and services.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openIndex === i
                                ? "border-green-600/30 bg-green-50/30 shadow-sm"
                                : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span
                                    className={`font-bold text-lg ${openIndex === i ? "text-green-800" : "text-slate-800"
                                        }`}
                                >
                                    {faq.q}
                                </span>
                                <span
                                    className={`p-2 rounded-full transition-colors ${openIndex === i
                                        ? "bg-green-200 text-green-800"
                                        : "bg-slate-100 text-slate-500"
                                        }`}
                                >
                                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-transparent">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
