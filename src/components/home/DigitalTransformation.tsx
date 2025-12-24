"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const BeforeUI = () => (
    <div className="relative w-full h-full bg-brand-dark flex items-center justify-center p-8 opacity-40 grayscale">
        <div className="w-full max-w-4xl aspect-video border border-white/10 rounded-sm p-6 flex flex-col gap-6">
            {/* Messy Header */}
            <div className="flex justify-between items-start">
                <div className="w-24 h-4 bg-white/10" />
                <div className="flex gap-4">
                    <div className="w-12 h-3 bg-white/5" />
                    <div className="w-12 h-3 bg-white/5" />
                    <div className="w-12 h-3 bg-white/5" />
                </div>
            </div>
            {/* Fragmented Content */}
            <div className="grid grid-cols-12 gap-4 flex-1">
                <div className="col-span-7 flex flex-col gap-4">
                    <div className="w-3/4 h-8 bg-white/10" />
                    <div className="w-full h-4 bg-white/5" />
                    <div className="w-5/6 h-4 bg-white/5" />
                    <div className="w-2/3 h-4 bg-white/5" />
                    <div className="mt-4 w-32 h-10 border border-white/10" />
                </div>
                <div className="col-span-5 flex flex-col gap-4">
                    <div className="w-full h-32 bg-white/5 border border-white/10" />
                    <div className="w-full h-24 bg-white/5 border border-white/10" />
                </div>
            </div>
            {/* Misaligned Footer */}
            <div className="mt-auto pt-6 border-t border-white/5 flex gap-8">
                <div className="w-16 h-3 bg-white/5" />
                <div className="w-16 h-3 bg-white/5" />
            </div>
        </div>
        <div className="absolute top-12 left-12 font-mono text-[10px] uppercase tracking-widest text-white/20">
            [ Unstructured / Fragmented ]
        </div>
    </div>
);

const AfterUI = () => (
    <div className="relative w-full h-full bg-brand-dark flex items-center justify-center p-8">
        {/* Subtle Glow Leak */}
        <div className="absolute inset-0 bg-radial-gradient from-brand-blue/5 via-transparent to-transparent pointer-events-none" />

        <div className="w-full max-w-4xl aspect-video glass-panel rounded-2xl p-8 flex flex-col gap-8 shadow-[0_0_50px_rgba(46,92,255,0.05)] border-brand-blue/20">
            {/* Engineered Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-sm bg-brand-blue shadow-[0_0_10px_#2E5CFF]" />
                    </div>
                    <div className="w-32 h-4 bg-white/10 rounded-full" />
                </div>
                <div className="flex gap-6">
                    <div className="w-16 h-2 bg-white/5 rounded-full" />
                    <div className="w-16 h-2 bg-white/5 rounded-full" />
                    <div className="w-16 h-2 bg-brand-blue/40 rounded-full" />
                </div>
            </div>

            {/* Systemized Content */}
            <div className="grid grid-cols-12 gap-8 flex-1">
                <div className="col-span-8 flex flex-col gap-6">
                    <div className="space-y-3">
                        <div className="w-20 h-2 bg-brand-blue/60 rounded-full" />
                        <div className="w-full h-12 bg-white/10 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <div className="w-full h-3 bg-white/5 rounded-full" />
                        <div className="w-11/12 h-3 bg-white/5 rounded-full" />
                        <div className="w-4/5 h-3 bg-white/5 rounded-full" />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <div className="w-40 h-12 rounded-full bg-brand-blue flex items-center justify-center shadow-[0_0_20px_rgba(46,92,255,0.3)]">
                            <div className="w-20 h-2 bg-white/20 rounded-full" />
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-sm border border-white/20" />
                        </div>
                    </div>
                </div>
                <div className="col-span-4 grid grid-rows-2 gap-6">
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                        <div className="w-12 h-12 rounded-lg bg-brand-blue/10 border border-brand-blue/20" />
                        <div className="w-full h-2 bg-white/10 rounded-full" />
                        <div className="w-2/3 h-2 bg-white/5 rounded-full" />
                    </div>
                    <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-2xl p-4 flex flex-col gap-3">
                        <div className="w-full h-full rounded-lg bg-brand-blue/10 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full border-2 border-brand-blue/40 border-t-brand-blue animate-spin" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Structured Footer */}
            <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center">
                <div className="flex gap-8">
                    <div className="w-20 h-2 bg-white/5 rounded-full" />
                    <div className="w-20 h-2 bg-white/5 rounded-full" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5" />
            </div>
        </div>
        <div className="absolute top-12 right-12 font-mono text-[10px] uppercase tracking-widest text-brand-blue">
            [ Engineered / Systemized ]
        </div>
    </div>
);

const DigitalTransformation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const position = ((x - rect.left) / rect.width) * 100;

        setSliderPos(Math.min(Math.max(position, 0), 100));
    };

    // Auto-sweep animation on enter
    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                let start = 0;
                const duration = 1500;
                const startTime = performance.now();

                const animate = (currentTime: number) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Expo out easing
                    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    setSliderPos(ease * 100);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen bg-brand-dark overflow-hidden cursor-col-resize  select-none"
            onMouseMove={(e) => isDragging && handleMouseMove(e)}
            onTouchMove={(e) => isDragging && handleMouseMove(e)}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
        >
            {/* Section Header */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-blue mb-4 block"
                >
                    The Impact
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground"
                >
                    Digital <span className="text-brand-blue">Transformation</span>
                </motion.h2>
            </div>

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
                className="absolute top-0 bottom-0 z-30 w-[1px] bg-brand-blue shadow-[0_0_20px_rgba(46,92,255,0.5)]"
                style={{ left: `${sliderPos}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-brand-blue/30 bg-brand-dark/80 backdrop-blur-md flex items-center justify-center group">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-brand-blue group-hover:scale-150 transition-transform" />
                        <div className="w-1 h-1 rounded-full bg-brand-blue group-hover:scale-150 transition-transform delay-75" />
                        <div className="w-1 h-1 rounded-full bg-brand-blue group-hover:scale-150 transition-transform delay-150" />
                    </div>
                </div>

                {/* Visual Hint */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-brand-blue/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    Drag to compare
                </div>
            </motion.div>

            {/* Background Grid (Sync with other sections) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
        </section>
    );
};

export default DigitalTransformation;
