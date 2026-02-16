import React from "react";

export default function MiniGauge({ value }) {
    const v = Math.max(0, Math.min(100, value));
    const radius = 56;
    const stroke = 10;
    const cx = 72;
    const cy = 72;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - v / 100);

    return (
        <svg width="144" height="144" viewBox="0 0 144 144" role="img" aria-label="Gauge" className="font-sans">
            <defs>
                <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2E7D32" />
                    <stop offset="1" stopColor="#1B5E20" />
                </linearGradient>
            </defs>
            <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                className="stroke-slate-100"
                strokeWidth={stroke}
            />
            <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke="url(#gaugeGrad)"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${cx} ${cy})`}
                className="transition-all duration-1000 ease-out"
            />

            {/* Inner aesthetic ring */}
            <circle cx={cx} cy={cy} r="46" className="fill-white/80 stroke-slate-100/50" />

            <text
                x={cx}
                y={cy + 6}
                textAnchor="middle"
                fontSize="24"
                fontWeight="800"
                className="fill-slate-900"
            >
                {v}
            </text>
            <text
                x={cx}
                y={cy + 24}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                className="fill-slate-500 uppercase tracking-wide"
            >
                Score
            </text>
        </svg>
    );
}
