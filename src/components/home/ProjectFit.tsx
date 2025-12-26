"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
    id: string;
    label: string;
    value: string;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
    key: string;
}

const questions: Question[] = [
    {
        id: 1,
        text: "What best describes your situation?",
        key: "situation",
        options: [
            { id: "s1", label: "Early-stage startup", value: "startup" },
            { id: "s2", label: "Growing product", value: "growing" },
            { id: "s3", label: "Established business", value: "established" },
            { id: "s4", label: "Enterprise / Internal team", value: "enterprise" },
        ],
    },
    {
        id: 2,
        text: "What are you trying to build?",
        key: "product",
        options: [
            { id: "p1", label: "Marketing website", value: "marketing" },
            { id: "p2", label: "SaaS / Web platform", value: "saas" },
            { id: "p3", label: "Redesign / Rebuild", value: "redesign" },
            { id: "p4", label: "Long-term digital system", value: "system" },
        ],
    },
    {
        id: 3,
        text: "What matters most right now?",
        key: "priority",
        options: [
            { id: "m1", label: "Speed", value: "speed" },
            { id: "m2", label: "Scalability", value: "scalability" },
            { id: "m3", label: "Design quality", value: "design" },
            { id: "m4", label: "Technical reliability", value: "reliability" },
        ],
    },
    {
        id: 4,
        text: "Timeline",
        key: "timeline",
        options: [
            { id: "t1", label: "ASAP", value: "asap" },
            { id: "t2", label: "1–3 months", value: "1-3m" },
            { id: "t3", label: "Flexible", value: "flexible" },
        ],
    },
    {
        id: 5,
        text: "Budget range",
        key: "budget",
        options: [
            { id: "b1", label: "$10k–15k", value: "10-15k" },
            { id: "b2", label: "$15k–30k", value: "15-30k" },
            { id: "b3", label: "$30k+", value: "30k+" },
            { id: "b4", label: "Not sure yet", value: "not-sure" },
        ],
    },
];

const ProjectFit = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isFinished, setIsFinished] = useState(false);

    const handleOptionClick = (key: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
        if (currentStep < questions.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    const isFit = () => {
        const budget = answers.budget;
        const situation = answers.situation;

        if (budget === "30k+" || budget === "15-30k") return true;
        if (budget === "not-sure" && (situation === "established" || situation === "enterprise")) return true;
        return false;
    };

    const reset = () => {
        setCurrentStep(0);
        setAnswers({});
        setIsFinished(false);
    };

    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center bg-brand-dark py-24 overflow-hidden" id="fit">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        {!isFinished ? (
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.6, ease: expoOut }}
                                className="flex flex-col items-center text-center"
                            >
                                {/* Progress Indicator */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="font-mono text-xs tracking-[0.2em] text-brand-blue mb-12 uppercase"
                                >
                                    {String(currentStep + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
                                </motion.div>

                                {/* Question */}
                                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-12 leading-tight tracking-tight">
                                    {questions[currentStep].text}
                                </h2>

                                {/* Options */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    {questions[currentStep].options.map((option) => (
                                        <motion.button
                                            key={option.id}
                                            whileHover={{ scale: 1.02, backgroundColor: "rgba(46, 92, 255, 0.05)" }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleOptionClick(questions[currentStep].key, option.value)}
                                            className="group relative p-6 rounded-xl border border-white/10 bg-white/[0.02] text-left transition-all duration-300 hover:border-brand-blue/50"
                                        >
                                            <span className="relative z-10 text-foreground/80 group-hover:text-foreground font-sans font-medium transition-colors">
                                                {option.label}
                                            </span>
                                            <div className="absolute inset-0 rounded-xl bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors duration-300" />
                                            {/* Subtle Glow on Hover */}
                                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(46,92,255,0.15)] pointer-events-none" />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: expoOut }}
                                className="flex flex-col items-center text-center"
                            >
                                {isFit() ? (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mb-8">
                                            <div className="w-3 h-3 rounded-full bg-brand-blue animate-pulse shadow-[0_0_15px_#2E5CFF]" />
                                        </div>
                                        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                                            You’re a strong fit.
                                        </h2>
                                        <p className="text-foreground/60 text-lg mb-12 max-w-md leading-relaxed">
                                            Based on your requirements and budget, our engineering-first approach is perfectly aligned with your goals.
                                        </p>
                                        <button className="group relative px-8 py-4 bg-brand-blue text-white font-mono text-sm uppercase tracking-widest rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(46,92,255,0.4)]">
                                            <span className="relative z-10">Request a strategy call</span>
                                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8">
                                            <div className="w-3 h-3 rounded-full bg-white/20" />
                                        </div>
                                        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                                            We may not be the right partner — and that’s okay.
                                        </h2>
                                        <p className="text-foreground/60 font-medium text-lg mb-12 max-w-md leading-relaxed">
                                            Our specialized workflow is optimized for high-scale, premium systems. For your current stage, a more agile or marketing-focused agency might serve you better.
                                        </p>
                                        <button
                                            onClick={reset}
                                            className="font-mono text-xs uppercase tracking-widest text-foreground/40 hover:text-brand-blue transition-colors"
                                        >
                                            Here’s what you should look for instead
                                        </button>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ProjectFit;
