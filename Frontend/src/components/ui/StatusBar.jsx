import React from "react";

export default function StatusBar({ label, value, tone }) {
    let barColor = "bg-green-700"; // default forest
    if (tone === "warn") barColor = "bg-orange-600";
    else if (tone === "good") barColor = "bg-green-600";

    return (
        <div className="mb-3 last:mb-0">
            <div className="flex justify-between items-end mb-1.5">
                <div className="text-slate-600 text-[13px] font-bold">
                    {label}
                </div>
                <div className="text-slate-900 text-[13px] font-black">
                    {value}%
                </div>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
                    style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
                />
            </div>
        </div>
    );
}
