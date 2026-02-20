import React from "react";

export default function AcademyCard({ title, desc, icon }) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-yellow-200 hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-yellow-100">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
                {desc}
            </p>
        </div>
    );
}
