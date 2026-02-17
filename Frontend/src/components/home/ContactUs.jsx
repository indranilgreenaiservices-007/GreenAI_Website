import React from "react";
import { Leaf, MapPin, Mail, Phone } from "lucide-react";
import ContactForm from "../ui/ContactForm";
import logo from "../images/logo.webp"

export default function ContactUs() {
    return (
        <section id="contact" className="py-16 border-t border-slate-200 bg-slate-50/50">
            <div className="container mx-auto px-6 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
                <div className="flex flex-col gap-6">
                    <div className="flex gap-3 items-center">
                        <span className="w-10 h-10 grid place-items-center rounded-xl bg-green-50 border border-green-100 text-green-700 shadow-sm">
                            <img src={logo} alt="logo" className="w-8 h-8" />
                        </span>
                        <div>
                            <div className="font-bold text-lg text-slate-900 leading-tight">GreenAI Services</div>
                            <div className="text-slate-500 text-sm">Sustainable AI for Enterprise & Government</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-3 items-start group">
                            <MapPin size={18} className="shrink-0 mt-1 text-slate-400 group-hover:text-green-600 transition-colors" />
                            <div>
                                <span className="font-medium text-slate-700">Crescent Tower, 7th Floor, Kolkata</span>
                                <div className="text-slate-500 text-sm mt-0.5">Registered office: 229 AJC Bose Road, Kolkata – 700020</div>
                            </div>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <Mail size={18} className="shrink-0 mt-1 text-slate-400 group-hover:text-green-600 transition-colors" />
                            <div>
                                <a href="mailto:reach@greenai.services" className="font-medium text-slate-700 hover:text-green-700 transition-colors">reach@greenai.services</a>
                                <div className="text-slate-500 text-sm mt-0.5">For sales: <a href="mailto:sales@greenai.services" className="hover:text-green-700 transition-colors">sales@greenai.services</a></div>
                            </div>
                        </div>

                        <div className="flex gap-3 items-start group">
                            <Phone size={18} className="shrink-0 mt-1 text-slate-400 group-hover:text-green-600 transition-colors" />
                            <div>
                                <span className="font-medium text-slate-700">+91 89819 41888</span>
                                <div className="text-slate-500 text-sm mt-0.5">Business hours: Mon–Sat</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 p-4 rounded-2xl border border-slate-200 bg-white">
                        <div className="font-semibold text-slate-900 text-sm">Grievance Officer</div>
                        <div className="text-slate-500 text-sm mt-0.5">Anish Banerjee</div>
                    </div>

                    
                </div>

                <ContactForm />
            </div>
        </section>
    );
}
