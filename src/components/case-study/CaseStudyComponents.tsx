"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const expoOut = [0.16, 1, 0.3, 1] as const;

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export const SectionWrapper = ({ children, className, id }: SectionProps) => (
    <section
        id={id}
        className={cn(
            "relative w-full min-h-[80vh] flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 lg:px-24",
            className
        )}
    >
        {children}
    </section>
);

export const MonoMeta = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            {label}
        </span>
        <span className="font-mono text-xs text-white/80 uppercase tracking-wider">
            {value}
        </span>
    </div>
);

export const Reveal = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay, ease: expoOut }}
    >
        {children}
    </motion.div>
);

export const ApproachDiagram = () => {
    const steps = [
        { title: "Analysis", desc: "Deconstructing legacy constraints" },
        { title: "Logic", desc: "Defining the system architecture" },
        { title: "Execution", desc: "Engineering the final interface" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16">
            {steps.map((step, i) => (
                <Reveal key={i} delay={i * 0.2}>
                    <div className="relative p-8 glass-panel border-white/5 group hover:border-brand-blue/20 transition-colors">
                        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center font-mono text-[10px] text-brand-blue">
                            0{i + 1}
                        </div>
                        <h4 className="font-display text-xl mb-3 text-white">{step.title}</h4>
                        <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>

                        {/* Connecting Line (Desktop) */}
                        {i < 2 && (
                            <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                        )}
                    </div>
                </Reveal>
            ))}
        </div>
    );
};

export const TransformationFrame = ({ type, label, isAfter }: { type: 'desktop' | 'mobile', label: string, isAfter?: boolean }) => (
    <div className={cn(
        "relative rounded-xl border overflow-hidden bg-brand-dark/50",
        type === 'desktop' ? "aspect-video w-full" : "aspect-[9/19] w-64 mx-auto",
        isAfter ? "border-brand-blue/30 shadow-[0_0_40px_rgba(46,92,255,0.1)]" : "border-white/10 grayscale opacity-40"
    )}>
        <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
            {label}
        </div>

        {/* Placeholder UI content */}
        <div className="p-8 pt-12 flex flex-col gap-4">
            <div className={cn("h-4 w-1/3 rounded-full", isAfter ? "bg-brand-blue/40" : "bg-white/10")} />
            <div className="h-8 w-full rounded-lg bg-white/5" />
            <div className="grid grid-cols-3 gap-4">
                <div className="h-20 rounded-lg bg-white/5" />
                <div className="h-20 rounded-lg bg-white/5" />
                <div className="h-20 rounded-lg bg-white/5" />
            </div>
            {isAfter && (
                <div className="mt-auto flex justify-end">
                    <div className="h-10 w-24 rounded-full bg-brand-blue shadow-[0_0_15px_rgba(46,92,255,0.4)]" />
                </div>
            )}
        </div>
    </div>
);
