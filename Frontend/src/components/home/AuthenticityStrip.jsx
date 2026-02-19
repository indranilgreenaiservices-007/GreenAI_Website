
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const AuthenticityStrip = () => {
    return (
        <section className="bg-white border-y border-slate-100 relative z-20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

                {/* Left: Company Identity */}
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full md:w-auto">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-full shrink-0">
                            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        </div>
                        <div className="block sm:hidden flex flex-col items-start">
                            <h3 className="font-bold text-slate-900 text-base leading-tight">GreenAI Services Pvt. Ltd.</h3>
                        </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="hidden sm:block font-bold text-slate-900 text-lg leading-tight">GreenAI Services Pvt. Ltd.</h3>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 sm:mt-0">
                            Recognized by <span className="text-orange-600 font-bold">Startup India</span> – Govt. of India
                        </p>
                    </div>

                    <img
                        src="/images/startup-india-logo.png"
                        alt="Startup India"
                        className="h-8 md:h-10 w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mt-2 sm:mt-0 sm:ml-4"
                    />
                </div>

                {/* Right: Verification Details */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 w-full md:w-auto justify-center md:justify-end">

                    {/* DIPP Badge - Improved Mobile */}
                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm font-semibold text-slate-600 whitespace-nowrap w-full sm:w-auto text-center">
                        DIPP Number: <span className="text-slate-900 font-mono ml-1">DIPP182782</span>
                    </div>

                    <div className="hidden sm:block h-8 w-px bg-slate-200"></div>

                    {/* QR Code Container */}
                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide sm:hidden">Scan to Verify</span>

                        {/* QR Code with Tooltip */}
                        <div className="relative group perspective-1000">
                            <div className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                Scan to Verify
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                            </div>
                            <img
                                src="/images/Dipp_scanner.webp"
                                alt="Verify QR"
                                className="h-16 w-16 sm:h-12 sm:w-12 md:h-30 md:w-30 rounded-lg border border-slate-200 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-300 cursor-pointer bg-white p-1 sm:p-0.5"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AuthenticityStrip;
