import React, { useState } from "react";
import { Mail, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [status, setStatus] = useState("idle"); // idle | sending | sent

    const onSubmit = async (e) => {
        e.preventDefault();
        if (status === "sending") return;

        setStatus("sending");
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 900));
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");

        // Return to idle after a bit
        setTimeout(() => setStatus("idle"), 2500);
    };

    const btnText = status === "sending" ? "Sending..." : status === "sent" ? "Message Sent!" : "Send Message";

    return (
        <div className="rounded-3xl border border-white/60 bg-white/50 backdrop-blur-xl shadow-xl p-6 md:p-8">
            <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 m-0">Contact Us</h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed max-w-sm">
                        Tell us your use case—ESG compliance, multilingual AI, or industrial transformation.
                    </p>
                </div>
                <div className="w-12 h-12 rounded-2xl grid place-items-center border border-green-100 bg-green-50 text-green-700 shrink-0 shadow-sm">
                    <Mail size={22} />
                </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Name</label>
                        <input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            required
                            autoComplete="name"
                            className="w-full rounded-xl border border-slate-200 bg-white/70 p-3 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 focus:bg-white"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email</label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            type="email"
                            autoComplete="email"
                            className="w-full rounded-xl border border-slate-200 bg-white/70 p-3 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 focus:bg-white"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="msg" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Message</label>
                    <textarea
                        id="msg"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What would you like to build with GreenAI?"
                        required
                        className="w-full min-h-[120px] resize-y rounded-xl border border-slate-200 bg-white/70 p-3 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 focus:bg-white"
                    />
                </div>

                <div className="flex justify-between items-center gap-4 pt-2">
                    <button
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md cursor-pointer hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-75 ${status === "sent"
                            ? "bg-green-50 text-green-700 border border-green-200 shadow-none hover:translate-y-0"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                            }`}
                        type="submit"
                        disabled={status === "sending"}
                    >
                        {status === "sending" ? (
                            <Sparkles size={16} className="animate-spin" />
                        ) : status === "sent" ? (
                            <CheckCircle2 size={16} />
                        ) : (
                            <span className="flex items-center gap-2">{btnText} <ArrowRight size={16} /></span>
                        )}
                    </button>

                    {/* <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
                        <ShieldCheck size={14} />
                        <span>Secure SSL Encryption</span>
                    </div> */}
                </div>
            </form>
        </div>
    );
}
