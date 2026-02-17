import React, { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function ActiveBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for fluid movement
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Reverse movement for depth effect (parallax)
    const springX2 = useSpring(mouseX, { ...springConfig, damping: 40 });
    const springY2 = useSpring(mouseY, { ...springConfig, damping: 40 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize mouse position (-1 to 1) for easier calculation
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
            const y = (e.clientY / innerHeight) * 2 - 1; // -1 to 1

            mouseX.set(x * 100); // Move up to 100px
            mouseY.set(y * 100);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-50/50">
            {/* Base Gradient - Light */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100 opacity-80" />

            {/* Primary Brand Orb (Green) - Follows mouse slightly */}
            <motion.div
                className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full opacity-60 blur-3xl mix-blend-multiply"
                style={{
                    background: "radial-gradient(circle, rgba(46,125,50,0.6) 0%, rgba(255,255,255,0) 70%)",
                    x: springX, // Follows mouse direction
                    y: springY,
                }}
            />

            {/* Secondary Brand Orb (Orange/Warm) - Moves opposite for depth */}
            <motion.div
                className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-50 blur-3xl mix-blend-multiply"
                style={{
                    background: "radial-gradient(circle, rgba(230,81,0,0.5) 0%, rgba(255,255,255,0) 70%)",
                    x: useMotionValue(springX2.get() * -1.5), // Moves opposite
                    y: useMotionValue(springY2.get() * -1.5), // Moves opposite
                }}
            />

            {/* Third Ambient Orb (Blue/Cool) - Slower movement */}
            <motion.div
                className="absolute bottom-[-20%] left-[-10%] w-[900px] h-[900px] rounded-full opacity-20 blur-3xl mix-blend-multiply"
                style={{
                    background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(255,255,255,0) 70%)",
                    x: useMotionValue(springX.get() * 0.5),
                    y: useMotionValue(springY.get() * 0.5),
                }}
            />
        </div>
    );
}
