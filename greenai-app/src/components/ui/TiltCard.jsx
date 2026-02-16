import React, { useRef, useState } from "react";

export default function TiltCard({ title, subtitle, icon, bullets, tone = "slate" }) {
    const ref = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const toneStyles = {
        green: {
            border: "border-green-100/60",
            bg: "bg-gradient-to-br from-white/90 to-green-50/40",
            iconBg: "bg-green-50 text-green-700 border-green-100",
            bullet: "bg-green-500",
            subtitle: "text-green-700"
        },
        orange: {
            border: "border-orange-100/60",
            bg: "bg-gradient-to-br from-white/90 to-orange-50/40",
            iconBg: "bg-orange-50 text-orange-700 border-orange-100",
            bullet: "bg-orange-500",
            subtitle: "text-orange-700"
        },
        slate: {
            border: "border-slate-200/60",
            bg: "bg-gradient-to-br from-white/90 to-slate-50/40",
            iconBg: "bg-slate-50 text-slate-700 border-slate-200",
            bullet: "bg-slate-400",
            subtitle: "text-slate-500"
        }
    };

    const currentTone = toneStyles[tone] || toneStyles.slate;

    const handleMouseMove = (e) => {
        const card = ref.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-lg p-6 transition-all duration-300 ease-out [transform-style:preserve-3d] hover:shadow-xl hover:-translate-y-1 ${currentTone.border} ${currentTone.bg}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
        >
            <div
                className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none"
                style={{ transform: "translateZ(0)" }}
            />

            <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm border ${currentTone.iconBg}`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{title}</h3>
                <p className={`text-sm font-bold mb-4 uppercase tracking-wide opacity-90 ${currentTone.subtitle}`}>{subtitle}</p>

                <ul className="space-y-2.5">
                    {bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${currentTone.bullet}`} />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
