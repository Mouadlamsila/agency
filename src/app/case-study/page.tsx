"use client";

import React from "react";
import {
    SectionWrapper,
    MonoMeta,
    Reveal,
    ApproachDiagram,
    TransformationFrame
} from "@/components/case-study/CaseStudyComponents";

export default function CaseStudyPage() {
    return (
        <main className="bg-brand-dark text-foreground min-h-screen selection:bg-brand-blue/30">
            {/* 1. INTRO / CONTEXT */}
            <SectionWrapper className="min-h-screen justify-end pb-24">
                <div className="max-w-4xl">
                    <Reveal>
                        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tighter mb-8">
                            Nexus <span className="text-brand-blue">Systems</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed mb-16">
                            Architecting a unified design language for a global logistics infrastructure.
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
                            <MonoMeta label="Industry" value="Logistics" />
                            <MonoMeta label="Timeline" value="6 Months" />
                            <MonoMeta label="Scope" value="System Design" />
                            <MonoMeta label="Outcome" value="Unified Core" />
                        </div>
                    </Reveal>
                </div>
            </SectionWrapper>

            {/* 2. THE PROBLEM */}
            <SectionWrapper className="bg-white/[0.02]">
                <div className="max-w-3xl">
                    <Reveal>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-blue mb-6 block">
                            The Problem
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl mb-8">
                            Fragmented logic, <br />stalled execution.
                        </h2>
                        <div className="space-y-6 text-lg text-white/50 leading-relaxed">
                            <p>
                                Nexus faced a critical bottleneck: three disparate platforms with zero shared components.
                                Updates took weeks, and visual debt was accumulating faster than the team could ship.
                            </p>
                            <p>
                                The constraint wasn't talent—it was the lack of a common language.
                                Every new feature required custom engineering from the ground up.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </SectionWrapper>

            {/* 3. THE APPROACH */}
            <SectionWrapper>
                <div className="max-w-4xl">
                    <Reveal>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-blue mb-6 block">
                            The Approach
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl mb-8">
                            System thinking over <br />surface visuals.
                        </h2>
                        <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
                            We didn't start with colors. We started with the atomic structure of the data.
                            By defining the core architecture first, the visuals became a natural extension of the logic.
                        </p>
                    </Reveal>

                    <ApproachDiagram />
                </div>
            </SectionWrapper>

            {/* 4. THE TRANSFORMATION */}
            <SectionWrapper className="bg-white/[0.02]">
                <div className="max-w-5xl mx-auto w-full">
                    <Reveal>
                        <div className="text-center mb-16">
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-blue mb-6 block">
                                The Transformation
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl">
                                From chaos to clarity.
                            </h2>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <Reveal delay={0.2}>
                            <TransformationFrame type="desktop" label="Before: Fragmented" />
                        </Reveal>
                        <Reveal delay={0.4}>
                            <TransformationFrame type="desktop" label="After: Systemized" isAfter />
                        </Reveal>
                    </div>

                    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Reveal delay={0.2}>
                            <TransformationFrame type="mobile" label="Legacy Mobile" />
                        </Reveal>
                        <div className="flex items-center justify-center">
                            <Reveal delay={0.3}>
                                <div className="w-12 h-[1px] bg-white/10 hidden md:block" />
                                <div className="font-mono text-[10px] text-brand-blue px-4">EVOLUTION</div>
                                <div className="w-12 h-[1px] bg-white/10 hidden md:block" />
                            </Reveal>
                        </div>
                        <Reveal delay={0.4}>
                            <TransformationFrame type="mobile" label="Nexus Mobile" isAfter />
                        </Reveal>
                    </div>
                </div>
            </SectionWrapper>

            {/* 5. THE RESULT */}
            <SectionWrapper>
                <div className="max-w-4xl">
                    <Reveal>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-blue mb-6 block">
                            The Result
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl mb-12">
                            Measurable confidence.
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <Reveal delay={0.2}>
                            <div className="space-y-4">
                                <h4 className="font-mono text-xs uppercase tracking-widest text-white">Velocity</h4>
                                <p className="text-white/50 leading-relaxed">
                                    Feature deployment time reduced from 14 days to 48 hours through a pre-validated component library.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="space-y-4">
                                <h4 className="font-mono text-xs uppercase tracking-widest text-white">Scalability</h4>
                                <p className="text-white/50 leading-relaxed">
                                    The system now supports 12+ sub-products with a single source of truth for all UI tokens.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <div className="space-y-4">
                                <h4 className="font-mono text-xs uppercase tracking-widest text-white">Clarity</h4>
                                <p className="text-white/50 leading-relaxed">
                                    Onboarding for new engineers dropped by 60% as the system logic is now self-documenting.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.5}>
                            <div className="space-y-4">
                                <h4 className="font-mono text-xs uppercase tracking-widest text-white">Consistency</h4>
                                <p className="text-white/50 leading-relaxed">
                                    Zero visual regressions across all platforms since the implementation of the core design system.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </SectionWrapper>

            {/* 6. CLOSING */}
            <SectionWrapper className="min-h-[60vh] items-center text-center">
                <Reveal>
                    <p className="font-display text-3xl md:text-4xl text-white mb-8">
                        This is how we work.
                    </p>
                    <div className="w-12 h-[1px] bg-brand-blue mx-auto mb-12" />
                    <button className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-brand-blue transition-colors cursor-pointer">
                        Back to Work
                    </button>
                </Reveal>
            </SectionWrapper>
        </main>
    );
}
