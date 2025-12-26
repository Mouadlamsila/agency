"use client";

import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface MetricProps {
    value: number;
    suffix?: string;
    label: string;
    description: string;
    delay: number;
}

function Counter({ value, suffix, delay }: { value: number; suffix?: string; delay: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    const springValue = useSpring(0, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => {
                springValue.set(value);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [inView, value, springValue, delay]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return (
        <span ref={ref} className="tabular-nums">
            {displayValue}{suffix}
        </span>
    );
}

function Metric({ value, suffix, label, description, delay }: MetricProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col gap-2"
        >
            <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600 mb-1">
                    {label}
                </span>
                <h3 className="font-display text-6xl font-bold text-white md:text-7xl lg:text-8xl tracking-tighter">
                    <Counter value={value} suffix={suffix} delay={delay} />
                    <span className="text-brand-blue ml-1">.</span>
                </h3>
            </div>
            <p className="max-w-[240px] font-sans text-sm text-zinc-500 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}

export default function Impact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const expoOut = [0.16, 1, 0.3, 1] as const;

    const metrics = [
        { value: 98, suffix: "%", label: "System Stability", description: "Average client retention rate across enterprise partnerships.", delay: 0.2 },
        { value: 250, suffix: "+", label: "Architectural Scale", description: "High-performance digital systems deployed globally.", delay: 0.4 },
        { value: 40, suffix: "%", label: "Optimization", description: "Average performance increase post-system architecture.", delay: 0.6 },
        { value: 12, label: "Quality Standard", description: "International design and engineering excellence awards.", delay: 0.8 },
    ];

    return (
        <section
            ref={containerRef}
            className="relative w-full sm:px-26 px-2 overflow-hidden bg-[#0E0E11] py-32 md:py-48"
        >
            <div className="container relative z-10 mx-auto px-6">
                <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-32">
                    {/* Left: Metrics */}
                    <div className="flex flex-col gap-16 md:gap-24">
                        <div className="flex flex-col gap-4">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: expoOut }}
                                className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-blue"
                            >
                                Impact & Outcomes
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.1, ease: expoOut }}
                                className="max-w-md font-display text-4xl font-bold text-white md:text-5xl tracking-tight"
                            >
                                WE MEASURE <span className="text-zinc-500 italic">SUCCESS</span> BY THE SYSTEMS WE <span className="text-zinc-500 italic">BUILD</span>.
                            </motion.h2>
                        </div>

                        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2">
                            {metrics.map((metric, i) => (
                                <Metric key={i} {...metric} />
                            ))}
                        </div>
                    </div>

                    {/* Right: Visual System */}
                    <div className="relative hidden lg:block">
                        <motion.div
                            style={{ y }}
                            className="sticky top-48 flex h-[600px] w-full items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
                        >
                            {/* Generated Visual System Image */}
                            <motion.img
                                src="/resource/image1.png"
                                alt="Impact Visual System"
                                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
                                initial={{ scale: 1.1, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 0.4 }}
                                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                            />

                            {/* Overlay Gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E11] via-transparent to-transparent opacity-60" />

                            {/* Floating Labels */}
                            <div className="absolute inset-0 p-12 flex flex-col justify-between pointer-events-none z-20">
                                <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-zinc-400">
                                    <span>System_v.04</span>
                                    <span>Architecture_Core</span>
                                </div>
                                <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-zinc-400">
                                    <span>Status: Optimized</span>
                                    <span>Load: 0.04ms</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
