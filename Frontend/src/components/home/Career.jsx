import React from "react";
import { Leaf } from "lucide-react";

export default function Career() {
    return (
        <section id="career" className="py-16 bg-white relative">
            <div className="container mx-auto px-6 w-full max-w-7xl">
                <div className="mb-12 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-100 bg-green-50 text-green-700 font-semibold text-xs tracking-wide uppercase mb-4">
                        <Leaf size={12} />
                        Join Our Team
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                        Build the Future of Green AI
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        We are looking for passionate individuals who want to make a difference. Join us in our mission to leverage artificial intelligence for a sustainable planet.
                    </p>
                    
                </div>
            </div>
        </section>
    );
}