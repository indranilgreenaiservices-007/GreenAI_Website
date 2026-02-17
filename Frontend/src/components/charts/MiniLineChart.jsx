import React from "react";

export default function MiniLineChart() {
    // Simple inline SVG line chart with a “techy” look (no external libs)
    const points = [
        { x: 20, y: 92 },
        { x: 80, y: 70 },
        { x: 140, y: 76 },
        { x: 200, y: 52 },
        { x: 260, y: 60 },
        { x: 320, y: 40 },
        { x: 380, y: 46 },
    ];

    const d = points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");

    return (
        <svg width="100%" height="160" viewBox="0 0 420 160" role="img" aria-label="ESG trend chart" className="overflow-visible font-sans">
            <defs>
                <linearGradient id="gLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#2E7D32" />
                    <stop offset="1" stopColor="#1B5E20" />
                </linearGradient>
                <linearGradient id="gFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="rgba(46,125,50,0.15)" />
                    <stop offset="1" stopColor="rgba(46,125,50,0.01)" />
                </linearGradient>
            </defs>

            {/* grid */}
            {[20, 50, 80, 110, 140].map((y) => (
                <line
                    key={y}
                    x1="12"
                    x2="408"
                    y1={y}
                    y2={y}
                    className="stroke-slate-200"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                />
            ))}

            {/* area */}
            <path
                d={`${d} L 380 148 L 20 148 Z`}
                fill="url(#gFill)"
                stroke="none"
            />

            {/* line */}
            <path d={d} fill="none" stroke="url(#gLine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {/* points */}
            {points.map((p, idx) => (
                <circle
                    key={idx}
                    cx={p.x}
                    cy={p.y}
                    r="5"
                    className="fill-white stroke-green-700 stroke-[2.5px] hover:stroke-green-800 hover:r-6 transition-all"
                />
            ))}

            {/* x labels */}
            {["FY22", "FY23", "FY24", "FY25", "FY26"].map((t, i) => (
                <text
                    key={t}
                    x={30 + i * 85}
                    y="156"
                    fontSize="11"
                    fontWeight="600"
                    className="fill-slate-500"
                >
                    {t}
                </text>
            ))}
        </svg>
    );
}
