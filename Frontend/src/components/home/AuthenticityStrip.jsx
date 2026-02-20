
import React, { useState } from 'react';
import { ShieldCheck, Award, X, FileText } from 'lucide-react';

const CertificateModal = ({ isOpen, onClose, imgSrc, title }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 transition-opacity backdrop-blur-sm" onClick={onClose}>
            <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4 flex justify-center bg-slate-100 overflow-y-auto max-h-[calc(90vh-64px)]">
                    <img src={imgSrc} alt={title} className="max-w-full h-auto object-contain rounded drop-shadow-md" />
                </div>
            </div>
        </div>
    );
};

const AuthenticityStrip = () => {
    const [modalConfig, setModalConfig] = useState({ isOpen: false, imgSrc: '', title: '' });

    const openModal = (imgSrc, title) => {
        setModalConfig({ isOpen: true, imgSrc, title });
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, isOpen: false });
    };
    return (
        <section className="bg-white border-y border-slate-100 relative shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

                {/* Left: Company Identity */}
                <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left w-full md:w-auto">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-full shrink-0">
                            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        </div>
                        <div className="block sm:hidden flex flex-col items-start  ">
                            <h3 className="font-bold text-slate-900 text-base leading-tight">GreenAI Services Pvt. Ltd.</h3>
                        </div>
                    </div>

                    <div className="flex flex-col md:items-center sm:items-start">
                        <h3 className="hidden sm:block font-bold text-slate-900 text-lg leading-tight -ml-6">GreenAI Services Pvt. Ltd.</h3>
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

                {/* Right: Verification Details & Certificates */}
                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-4 md:gap-6 w-full md:w-auto justify-center md:justify-end mt-4 md:mt-0">

                    {/* DIPP Badge */}
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-semibold text-slate-600 whitespace-nowrap text-center shadow-sm">
                            DIPP Number: <span className="text-slate-900 font-mono ml-1">DIPP182782</span>
                        </div>
                        <button
                            onClick={() => openModal("/images/certificate/dppit-certificate.png", "DIPP Certificate")}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm group"
                        >
                            <FileText size={14} className="group-hover:scale-110 transition-transform" />
                            <span>View</span>
                        </button>
                    </div>

                    <div className="hidden md:block h-6 w-px bg-slate-200"></div>

                    {/* ISO 9001:2015 */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-white px-2 py-1 rounded">
                            <Award size={16} className="text-blue-600" />
                            ISO 9001:2015
                        </div>
                        <button
                            onClick={() => openModal("/images/certificate/GREENAI SERVICES PRIVATE LIMITED 9001 Final Soft Copy_page-0001.jpg", "ISO 9001:2015 Certificate")}
                            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-md text-[11px] font-bold transition-colors cursor-pointer"
                        >
                            Certificate
                        </button>
                    </div>

                    {/* ISO 27001:2013 */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-white px-2 py-1 rounded">
                            <ShieldCheck size={16} className="text-purple-600" />
                            ISO 27001:2013
                        </div>
                        <button
                            onClick={() => openModal("/images/certificate/GREENAI SERVICES PRIVATE LIMITED 27001 FinaL Soft Copy_page-0001.jpg", "ISO/IEC 27001:2013 Certificate")}
                            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-md text-[11px] font-bold transition-colors cursor-pointer"
                        >
                            Certificate
                        </button>
                    </div>

                </div>

            </div>

            <CertificateModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                imgSrc={modalConfig.imgSrc}
                title={modalConfig.title}
            />
        </section>
    );
};

export default AuthenticityStrip;
