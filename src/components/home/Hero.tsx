"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    const headline = "WE BUILD THE SYSTEMS THAT POWER DIGITAL AMBITION.";
    const words = headline.split(" ");

    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-20 bg-[#0A0A0A]"
        >
            {/* Architectural Layer: Background Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Structural Guide Lines */}
            <div className="absolute inset-0 z-0 flex justify-center pointer-events-none">
                <div className="relative w-full max-w-5xl h-full">
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.5, delay: 1, ease: expoOut }}
                        className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent origin-top"
                    />
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.5, delay: 1, ease: expoOut }}
                        className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent origin-top"
                    />
                </div>
            </div>

            {/* Abstract Background Element */}
            <motion.div
                style={{ y: y1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 0.08,
                    scale: 1,
                }}
                transition={{
                    opacity: { duration: 2, ease: "easeOut" },
                    scale: { duration: 2, ease: "easeOut" },
                }}
                className="absolute -right-[10%] -bottom-[20%] h-[70vw] w-[70vw] rounded-full bg-gradient-to-br from-brand-blue/30 to-transparent blur-[120px] pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Editorial Label */}
                <div className="mb-8 overflow-hidden">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: expoOut }}
                        className="font-mono text-[10px] font-medium tracking-[0.4em] text-zinc-500 uppercase"
                    >
                        EST. 2024 — DIGITAL ARCHITECTURE
                    </motion.span>
                </div>

                {/* Cinematic Headline */}
                <h1 className="flex flex-wrap justify-center max-w-5xl font-display text-[11vw] font-bold leading-[0.9] tracking-[-0.04em] md:text-[8vw] text-white">
                    {words.map((word, i) => (
                        <span key={i} className="relative block overflow-hidden pb-[0.1em] mr-[0.25em]">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 1.8,
                                    delay: 0.4 + i * 0.06,
                                    ease: expoOut,
                                }}
                                className="block"
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                {/* Service Clarification Line */}
                <div className="mt-12 max-w-2xl overflow-hidden">
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 1.2, ease: expoOut }}
                        className="text-lg text-zinc-400 md:text-xl font-sans leading-relaxed tracking-tight"
                    >
                        Specializing in high-performance <span className="text-brand-blue font-medium cursor-help transition-opacity hover:opacity-80">websites</span>,
                        scalable <span className="text-brand-blue font-medium cursor-help transition-opacity hover:opacity-80">digital products</span>,
                        and enterprise <span className="text-brand-blue font-medium cursor-help transition-opacity hover:opacity-80">SaaS systems</span>.
                    </motion.p>
                </div>

                {/* Action Group */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.6, ease: expoOut }}
                    className="mt-16 flex flex-col sm:flex-row items-center gap-6"
                >
                    <button className="group relative px-8 py-4 bg-brand-blue text-white font-sans text-sm font-medium tracking-wide overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <span className="relative z-10">START A PROJECT</span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full transition-transform group-hover:translate-y-0" />
                    </button>

                    <button className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-sans text-sm font-medium tracking-wide">
                        EXPLORE WORK
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
                            <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </motion.div>

                {/* Directional Guide (Engineered Scroll) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 2.2, ease: "linear" }}
                    className="mt-24 relative"
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative h-[60px] w-[1px] bg-white/10 overflow-hidden">
                            <motion.div
                                animate={{ y: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-brand-blue to-transparent"
                            />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">System Ready</span>
                    </div>
                </motion.div>
            </div>

            {/* Subtle Glass Overlay */}
            <motion.div
                style={{ y: y2 }}
                className="absolute inset-0 pointer-events-none z-0"
            >
                <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full border border-white/5 bg-white/[0.01] backdrop-blur-2xl" />
            </motion.div>
        </section>
    );
}

