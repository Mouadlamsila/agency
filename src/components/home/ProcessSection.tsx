"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

interface Step {
    id: string;
    title: string;
    description: string;
    status: "completed" | "active" | "pending";
    outcome?: string;
    isClientEntry?: boolean;
}

const steps: Step[] = [
    {
        id: "01",
        title: "Discovery & Input",
        description: "Deep-diving into your vision, market dynamics, and technical constraints.",
        status: "completed",
        isClientEntry: true,
    },
    {
        id: "02",
        title: "Strategy & Architecture",
        description: "Defining the logic, data structures, and scalability roadmap.",
        status: "completed",
        outcome: "Prevents future technical debt",
    },
    {
        id: "03",
        title: "Design System",
        description: "Engineering a scalable visual language that balances form and function.",
        status: "active",
        outcome: "Ensures long-term brand consistency",
    },
    {
        id: "04",
        title: "Development & Integration",
        description: "Writing clean, performant code with seamless third-party connectivity.",
        status: "pending",
    },
    {
        id: "05",
        title: "Optimization & Testing",
        description: "Rigorous QA and performance tuning for a flawless user experience.",
        status: "pending",
    },
    {
        id: "06",
        title: "Launch & Scale",
        description: "Deploying to production and iterating based on real-world data.",
        status: "pending",
    },
];

const SectionIntro = ({ isInView }: { isInView: boolean }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="lg:w-1/3 "
    >
        <span className="font-mono text-xs uppercase tracking-widest text-brand-blue mb-4 block">
            Workflow
        </span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            Digital <br />

            Transformation <br />
            <span className="text-brand-blue">Process</span>
        </h2>
        <p className="text-foreground/60 text-lg leading-relaxed max-w-md">
            We bridge the gap between abstract ideas and engineered reality through a structured,
            logic-driven methodology designed for scale.
        </p>
    </motion.div>
);

const ProcessStep = ({ step, index, isInView }: { step: Step; index: number; isInView: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
            duration: 0.8,
            delay: index * 0.15,
            ease: [0.16, 1, 0.3, 1]
        }}
        className={`relative p-8 rounded-2xl border transition-all duration-500 group ${step.status === "active"
            ? "bg-brand-blue/5 border-brand-blue/40 shadow-[0_0_40px_rgba(46,92,255,0.1)]"
            : step.status === "completed"
                ? "bg-white/[0.03] border-emerald-500/20"
                : "bg-white/[0.02] border-white/5 opacity-60"
            }`}
    >
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
            <span className={`font-mono text-sm ${step.status === "active" ? "text-brand-blue" : "text-foreground/40"
                }`}>
                {step.id}
            </span>
            {step.status === "completed" && (
                <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-mono">
                    Completed
                </span>
            )}
            {step.status === "active" && (
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_10px_#2E5CFF]"
                />
            )}
        </div>

        <h3 className={`text-xl font-display mb-3 ${step.status === "active" ? "text-foreground" : "text-foreground/80"
            }`}>
            {step.title}
        </h3>
        <p className="text-sm text-foreground/50 leading-relaxed mb-4">
            {step.description}
        </p>

        {/* Outcome Micro-copy */}
        {step.outcome && (
            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: (index * 0.15) + 0.5 }}
                className="text-[11px] font-mono uppercase tracking-wider text-brand-blue/60 italic"
            >
                — {step.outcome}
            </motion.p>
        )}

        {/* Client Entry Indicator */}
        {step.isClientEntry && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
                className="absolute -top-3 -right-3 bg-brand-blue text-white text-[10px] font-mono px-3 py-1 rounded-full shadow-lg z-20"
            >
                [ YOU START HERE ]
            </motion.div>
        )}

        {/* Subtle Glow for Active Step */}
        {step.status === "active" && (
            <div className="absolute inset-0 rounded-2xl bg-brand-blue/5 blur-xl pointer-events-none" />
        )}
    </motion.div>
);

const CTABridge = ({ isInView }: { isInView: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
    >
        <div className="max-w-md">
            <p className="text-foreground/60 text-lg italic font-display">
                “The exact path depends on your goals.”
            </p>
        </div>
        <Link
            href="#packages"
            className="group flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-foreground/40 hover:text-brand-blue transition-colors"
        >
            <span>View Pricing & Packages</span>
            <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                →
            </motion.span>
        </Link>
    </motion.div>
);

const ProcessSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-brand-charcoal sm:px-26 px-2 py-24 lg:py-32 overflow-hidden"
            id="process"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-radial-gradient from-brand-blue/5 via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    <SectionIntro isInView={isInView} />

                    <div className="lg:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                            {steps.map((step, index) => (
                                <ProcessStep key={step.id} step={step} index={index} isInView={isInView} />
                            ))}
                        </div>
                    </div>
                </div>

                <CTABridge isInView={isInView} />
            </div>
        </section>
    );
};

export default ProcessSection;
