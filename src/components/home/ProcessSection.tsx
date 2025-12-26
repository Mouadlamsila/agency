"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface Step {
    id: string;
    title: string;
    description: string;
    status: "completed" | "active" | "pending";
    input: string;
    output: string;
    supporting: string[];
}

const ProcessSection = () => {
    const { t } = useTranslation('common');
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const steps: Step[] = [
        {
            id: "01",
            title: t('process.steps.0.title'),
            description: t('process.steps.0.description'),
            status: "completed",
            input: t('process.steps.0.input'),
            output: t('process.steps.0.output'),
            supporting: [
                t('process.steps.0.supporting.0'),
                t('process.steps.0.supporting.1'),
                t('process.steps.0.supporting.2')
            ]
        },
        {
            id: "02",
            title: t('process.steps.1.title'),
            description: t('process.steps.1.description'),
            status: "completed",
            input: t('process.steps.1.input'),
            output: t('process.steps.1.output'),
            supporting: [
                t('process.steps.1.supporting.0'),
                t('process.steps.1.supporting.1'),
                t('process.steps.1.supporting.2')
            ]
        },
        {
            id: "03",
            title: t('process.steps.2.title'),
            description: t('process.steps.2.description'),
            status: "active",
            input: t('process.steps.2.input'),
            output: t('process.steps.2.output'),
            supporting: [
                t('process.steps.2.supporting.0'),
                t('process.steps.2.supporting.1'),
                t('process.steps.2.supporting.2')
            ]
        },
        {
            id: "04",
            title: t('process.steps.3.title'),
            description: t('process.steps.3.description'),
            status: "pending",
            input: t('process.steps.3.input'),
            output: t('process.steps.3.output'),
            supporting: [
                t('process.steps.3.supporting.0'),
                t('process.steps.3.supporting.1'),
                t('process.steps.3.supporting.2')
            ]
        },
        {
            id: "05",
            title: t('process.steps.4.title'),
            description: t('process.steps.4.description'),
            status: "pending",
            input: t('process.steps.4.input'),
            output: t('process.steps.4.output'),
            supporting: [
                t('process.steps.4.supporting.0'),
                t('process.steps.4.supporting.1'),
                t('process.steps.4.supporting.2')
            ]
        },
        {
            id: "06",
            title: t('process.steps.5.title'),
            description: t('process.steps.5.description'),
            status: "pending",
            input: t('process.steps.5.input'),
            output: t('process.steps.5.output'),
            supporting: [
                t('process.steps.5.supporting.0'),
                t('process.steps.5.supporting.1'),
                t('process.steps.5.supporting.2')
            ]
        },
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-[#0E0E11] sm:px-26 px-2 py-32 lg:py-48"
            id="process"
        >
            {/* Subtle Noise Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] bg-repeat" />

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-24 lg:gap-32">

                    {/* Left: Sticky Intro */}
                    <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-blue mb-6 block">
                                {t('process.label')}
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                                {t('process.heading.line1')} <span className="text-zinc-500 italic">{t('process.heading.line2')}</span> <br />
                                {t('process.heading.line3')}
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed max-w-sm mb-12">
                                {t('process.description')}
                            </p>

                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-[1px] bg-brand-blue/30" />
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{t('process.systemVersion')}</span>
                                </div>
                                <Link
                                    href="#packages"
                                    className="group inline-flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.2em] text-white/60 hover:text-brand-blue transition-colors"
                                >
                                    <span>{t('process.explore')}</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Vertical Timeline */}
                    <div className="lg:w-2/3 relative">
                        {/* Vertical Progress Line */}
                        <div className="absolute left-0 lg:left-8 top-0 bottom-0 w-[1px] bg-white/5">
                            <motion.div
                                className="absolute top-0 left-0 right-0 w-full bg-brand-blue origin-top"
                                style={{ scaleY }}
                            />
                        </div>

                        <div className="flex flex-col gap-24 lg:gap-32 pl-8 lg:pl-24">
                            {steps.map((step, index) => (
                                <StepCard key={step.id} step={step} index={index} t={t} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StepCard = ({ step, index, t }: { step: Step; index: number, t: any }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
        >
            {/* Step Dot */}
            <div className="absolute -left-[33px] lg:-left-[97px] top-2 flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${step.status === "active" ? "bg-brand-blue scale-150 shadow-[0_0_15px_#2E5CFF]" :
                    step.status === "completed" ? "bg-emerald-500" : "bg-zinc-800"
                    }`} />
                {step.status === "active" && (
                    <motion.div
                        animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute w-2 h-2 rounded-full bg-brand-blue"
                    />
                )}
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <span className={`font-mono text-[10px] uppercase tracking-widest ${step.status === "active" ? "text-brand-blue" : "text-zinc-600"
                            }`}>
                            {t('process.labels.phase')}_{step.id}
                        </span>
                        {step.status === "completed" && (
                            <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-500/60 border border-emerald-500/20 px-2 py-0.5 rounded">
                                {t('process.labels.verified')}
                            </span>
                        )}
                    </div>
                    <h3 className={`font-display text-2xl md:text-3xl font-bold transition-colors duration-500 ${step.status === "active" ? "text-white" : "text-zinc-400"
                        }`}>
                        {step.title}
                    </h3>
                </div>

                <p className={`text-base leading-relaxed max-w-xl transition-colors duration-500 ${step.status === "active" ? "text-zinc-300" : "text-zinc-400"
                    }`}>
                    {step.description}
                </p>

                {/* Technical Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-lg border border-white/5 bg-white/[0.01] group-hover:border-white/10 transition-colors">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block mb-2">{t('process.labels.input')}</span>
                        <span className="text-xs text-zinc-300 font-medium">{step.input}</span>
                    </div>
                    <div className="p-4 rounded-lg border border-white/5 bg-white/[0.01] group-hover:border-white/10 transition-colors">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block mb-2">{t('process.labels.output')}</span>
                        <span className="text-xs text-brand-blue font-medium">{step.output}</span>
                    </div>
                </div>

                {/* Supporting Capabilities */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {step.supporting.map((item) => (
                        <span key={item} className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 px-2 py-1 border border-white/5 bg-white/[0.02]">
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* Hover Background Glow */}
            <div className="absolute -inset-8 -z-10 bg-gradient-to-r from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
        </motion.div>
    );
};

export default ProcessSection;
