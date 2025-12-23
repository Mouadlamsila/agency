"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function FinalCTA() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnetic effect: move button towards cursor
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        mouseX.set(distanceX * 0.35);
        mouseY.set(distanceY * 0.35);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    const expoOut = [0.16, 1, 0.3, 1] as any;

    return (
        <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-6 py-40">
            {/* Subtle Grain Overlay */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Soft Ambient Glow */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                transition={{ duration: 3, ease: expoOut }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-blue blur-[120px] pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: expoOut }}
                    className="max-w-4xl font-display text-4xl font-medium tracking-tight text-zinc-100 md:text-6xl lg:text-7xl"
                >
                    The next chapter begins <br /> with a conversation.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.4, ease: expoOut }}
                    className="mt-24"
                >
                    <motion.button
                        ref={buttonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={handleMouseLeave}
                        style={{ x: springX, y: springY }}
                        className="group relative flex h-56 w-56 items-center justify-center rounded-full border border-white/10 bg-transparent transition-colors hover:border-white/20"
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]"
                        />

                        <span className="relative z-10 font-sans text-sm font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors group-hover:text-white">
                            Start a conversation
                        </span>

                        {/* Physical feel: subtle border glow on hover */}
                        <div className="absolute inset-0 rounded-full border border-white/0 transition-all duration-500 group-hover:border-white/10 group-hover:scale-[1.02]" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Footer-like minimal info */}
            <div className="absolute bottom-12 flex w-full max-w-7xl justify-between px-12 font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-700">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                >
                    © 2025 Agency
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1.2 }}
                >
                    Built for Excellence
                </motion.span>
            </div>
        </section>
    );
}
