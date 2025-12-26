"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const BeforeUI = () => (
    <div className="relative w-full h-full bg-[#0E0E11] flex items-center justify-center p-4 md:p-12 opacity-40 grayscale">
        <div className="w-full max-w-5xl aspect-[16/10] md:aspect-video border border-white/10 rounded-lg p-4 md:p-8 flex flex-col gap-4 md:gap-8 bg-[#16161A]">
            {/* Messy Header */}
            <div className="flex justify-between items-start">
                <div className="w-20 md:w-32 h-3 md:h-5 bg-white/10" />
                <div className="flex gap-2 md:gap-4">
                    <div className="w-8 md:w-16 h-2 md:h-4 bg-white/5" />
                    <div className="w-8 md:w-16 h-2 md:h-4 bg-white/5" />
                    <div className="w-8 md:w-16 h-2 md:h-4 bg-white/5" />
                </div>
            </div>

            {/* Fragmented Content */}
            <div className="grid grid-cols-12 gap-4 md:gap-8 flex-1">
                <div className="col-span-12 md:col-span-7 flex flex-col gap-4 md:gap-6">
                    <div className="w-full md:w-3/4 h-6 md:h-12 bg-white/10" />
                    <div className="space-y-2 md:space-y-3">
                        <div className="w-full h-2 md:h-4 bg-white/5" />
                        <div className="w-11/12 h-2 md:h-4 bg-white/5" />
                        <div className="w-4/5 h-2 md:h-4 bg-white/5" />
                    </div>
                    <div className="mt-2 md:mt-4 w-24 md:w-40 h-8 md:h-14 border border-white/10" />
                </div>
                <div className="hidden md:flex col-span-5 flex-col gap-4">
                    <div className="w-full h-32 md:h-48 bg-white/5 border border-white/10" />
                    <div className="w-full h-20 md:h-32 bg-white/5 border border-white/10" />
                </div>
            </div>

            {/* Misaligned Footer */}
            <div className="mt-auto pt-4 md:pt-8 border-t border-white/5 flex gap-4 md:gap-12">
                <div className="w-12 md:w-24 h-2 md:h-4 bg-white/5" />
                <div className="w-12 md:w-24 h-2 md:h-4 bg-white/5" />
                <div className="w-12 md:w-24 h-2 md:h-4 bg-white/5 ml-auto" />
            </div>
        </div>

        {/* Technical Labels */}
        <div className="absolute top-6 left-6 md:top-12 md:left-12 font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-white/20">
            [ Status: Legacy / Fragmented ]
        </div>
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-white/10">
            Latency: 450ms+ | Conversion: 1.2%
        </div>
    </div>
);

const AfterUI = () => (
    <div className="relative w-full h-full bg-[#0E0E11] flex items-center justify-center p-4 md:p-12">
        {/* Subtle Glow Leak */}
        <div className="absolute inset-0 bg-radial-gradient from-brand-blue/10 via-transparent to-transparent pointer-events-none" />

        <div className="w-full max-w-5xl aspect-[16/10] md:aspect-video rounded-xl md:rounded-3xl p-4 md:p-10 flex flex-col gap-4 md:gap-10 shadow-[0_0_100px_rgba(46,92,255,0.1)] border border-brand-blue/20 bg-[#111115] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] bg-repeat" />

            {/* Engineered Header */}
            <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-brand-blue shadow-[0_0_15px_#2E5CFF]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="w-20 md:w-40 h-2 md:h-4 bg-white/20 rounded-full" />
                        <div className="w-12 md:w-24 h-1 md:h-2 bg-white/5 rounded-full" />
                    </div>
                </div>
                <div className="flex gap-3 md:gap-8">
                    <div className="hidden sm:block w-12 md:w-20 h-1.5 md:h-2.5 bg-white/5 rounded-full" />
                    <div className="hidden sm:block w-12 md:w-20 h-1.5 md:h-2.5 bg-white/5 rounded-full" />
                    <div className="w-12 md:w-24 h-1.5 md:h-2.5 bg-brand-blue/50 rounded-full" />
                </div>
            </div>

            {/* Systemized Content */}
            <div className="grid grid-cols-12 gap-4 md:gap-12 flex-1 relative z-10">
                <div className="col-span-12 md:col-span-8 flex flex-col gap-4 md:gap-8">
                    <div className="space-y-2 md:space-y-4">
                        <div className="w-16 md:w-24 h-1.5 md:h-2.5 bg-brand-blue/60 rounded-full" />
                        <div className="w-full h-8 md:h-16 bg-white/10 rounded-lg md:rounded-2xl border border-white/5" />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                        <div className="w-full h-2 md:h-4 bg-white/5 rounded-full" />
                        <div className="w-11/12 h-2 md:h-4 bg-white/5 rounded-full" />
                        <div className="w-3/4 h-2 md:h-4 bg-white/5 rounded-full" />
                    </div>
                    <div className="mt-2 md:mt-6 flex gap-3 md:gap-6">
                        <div className="w-32 md:w-56 h-10 md:h-16 rounded-full bg-brand-blue flex items-center justify-center shadow-[0_0_30px_rgba(46,92,255,0.4)] group-hover:scale-105 transition-transform">
                            <div className="w-16 md:w-24 h-1.5 md:h-2.5 bg-white/30 rounded-full" />
                        </div>
                        <div className="w-10 md:w-16 h-10 md:h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
                            <div className="w-3 h-3 md:w-5 md:h-5 rounded-sm border-2 border-white/20" />
                        </div>
                    </div>
                </div>
                <div className="hidden md:grid col-span-4 grid-rows-2 gap-6 md:gap-8">
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col gap-4">
                        <div className="w-10 md:w-14 h-10 md:h-14 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-brand-blue/40 border-t-brand-blue rounded-full animate-spin" />
                        </div>
                        <div className="space-y-2">
                            <div className="w-full h-2 bg-white/10 rounded-full" />
                            <div className="w-2/3 h-2 bg-white/5 rounded-full" />
                        </div>
                    </div>
                    <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center">
                                <div className="w-4 h-4 bg-brand-blue rounded-sm" />
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-mono text-brand-blue">+300%</div>
                                <div className="text-[8px] font-mono text-zinc-500 uppercase">Growth</div>
                            </div>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 2, delay: 1 }}
                                className="h-full bg-brand-blue"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Structured Footer */}
            <div className="mt-auto pt-4 md:pt-10 border-t border-white/5 flex justify-between items-center relative z-10">
                <div className="flex gap-4 md:gap-12">
                    <div className="w-16 md:w-32 h-1.5 md:h-2.5 bg-white/5 rounded-full" />
                    <div className="w-16 md:w-32 h-1.5 md:h-2.5 bg-white/5 rounded-full" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-[8px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">System_Secure</div>
                    <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20" />
                </div>
            </div>
        </div>

        {/* Technical Labels */}
        <div className="absolute top-6 right-6 md:top-12 md:right-12 font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-brand-blue">
            [ Status: Engineered / Scalable ]
        </div>
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-brand-blue/60">
            Latency: 12ms | Conversion: 4.8%
        </div>
    </div>
);

const DigitalTransformation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const position = ((clientX - rect.left) / rect.width) * 100;
        setSliderPos(Math.min(Math.max(position, 0), 100));
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (isDragging) handleMove(e.clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (isDragging) handleMove(e.touches[0].clientX);
    };

    // Auto-sweep animation on enter
    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                let start = 0;
                const duration = 2000;
                const startTime = performance.now();

                const animate = (currentTime: number) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Custom easing for a more "cinematic" sweep
                    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    setSliderPos(ease * 100);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[80%] bg-[#0E0E11] flex flex-col pt-12 md:pt-40 pb-0 md:pb-12 overflow-hidden cursor-col-resize select-none"
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
        >
            {/* Section Header */}
            <div className="relative z-40 text-center pointer-events-none w-full px-6 mb-0 md:mb-20">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-brand-blue mb-2 md:mb-4 block"
                >
                    The Evolution
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-bold text-3xl md:text-5xl lg:text-7xl text-white tracking-tight"
                >
                    LEGACY <span className="text-zinc-500 italic">TO</span> <span className="text-brand-blue">ENGINEERED</span>
                </motion.h2>
            </div>

            {/* Comparison Area */}
            <div className="relative flex-1 w-full flex items-center justify-center min-h-[500px] md:min-h-[600px]">
                {/* Before Layer (Static) */}
                <div className="absolute inset-0 z-10">
                    <BeforeUI />
                </div>

                {/* After Layer (Clipped) */}
                <motion.div
                    className="absolute inset-0 z-20 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                    <AfterUI />
                </motion.div>

                {/* Slider Handle */}
                <motion.div
                    className="absolute top-0 bottom-0 z-30 w-[1px] bg-brand-blue shadow-[0_0_30px_rgba(46,92,255,0.6)]"
                    style={{ left: `${sliderPos}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full border border-brand-blue/40 bg-[#0E0E11]/90 backdrop-blur-xl flex items-center justify-center group shadow-2xl">
                        <div className="flex gap-1 md:gap-1.5">
                            <motion.div
                                animate={{ scale: isDragging ? 1.5 : 1 }}
                                className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brand-blue"
                            />
                            <motion.div
                                animate={{ scale: isDragging ? 1.5 : 1 }}
                                transition={{ delay: 0.05 }}
                                className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brand-blue"
                            />
                            <motion.div
                                animate={{ scale: isDragging ? 1.5 : 1 }}
                                transition={{ delay: 0.1 }}
                                className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brand-blue"
                            />
                        </div>
                    </div>

                    {/* Visual Hints */}
                    <AnimatePresence>
                        {!isDragging && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center gap-4"
                            >
                                <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-brand-blue/50">
                                    Drag to compare
                                </span>
                                <motion.div
                                    animate={{ x: [-10, 10, -10] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-brand-blue/30 text-xl"
                                >
                                    ↔
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>
        </section>
    );
};

export default DigitalTransformation;
