"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

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

const ProjectFit = () => {
    const { t } = useTranslation('common');
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isFinished, setIsFinished] = useState(false);

    const questions: Question[] = [
        {
            id: 1,
            text: t('projectFit.questions.0.text'),
            key: "situation",
            options: [
                { id: "s1", label: t('projectFit.questions.0.options.s1'), value: "startup" },
                { id: "s2", label: t('projectFit.questions.0.options.s2'), value: "growing" },
                { id: "s3", label: t('projectFit.questions.0.options.s3'), value: "established" },
                { id: "s4", label: t('projectFit.questions.0.options.s4'), value: "enterprise" },
            ],
        },
        {
            id: 2,
            text: t('projectFit.questions.1.text'),
            key: "product",
            options: [
                { id: "p1", label: t('projectFit.questions.1.options.p1'), value: "marketing" },
                { id: "p2", label: t('projectFit.questions.1.options.p2'), value: "saas" },
                { id: "p3", label: t('projectFit.questions.1.options.p3'), value: "redesign" },
                { id: "p4", label: t('projectFit.questions.1.options.p4'), value: "system" },
            ],
        },
        {
            id: 3,
            text: t('projectFit.questions.2.text'),
            key: "priority",
            options: [
                { id: "m1", label: t('projectFit.questions.2.options.m1'), value: "speed" },
                { id: "m2", label: t('projectFit.questions.2.options.m2'), value: "scalability" },
                { id: "m3", label: t('projectFit.questions.2.options.m3'), value: "design" },
                { id: "m4", label: t('projectFit.questions.2.options.m4'), value: "reliability" },
            ],
        },
        {
            id: 4,
            text: t('projectFit.questions.3.text'),
            key: "timeline",
            options: [
                { id: "t1", label: t('projectFit.questions.3.options.t1'), value: "asap" },
                { id: "t2", label: t('projectFit.questions.3.options.t2'), value: "1-3m" },
                { id: "t3", label: t('projectFit.questions.3.options.t3'), value: "flexible" },
            ],
        },
        {
            id: 5,
            text: t('projectFit.questions.4.text'),
            key: "budget",
            options: [
                { id: "b1", label: t('projectFit.questions.4.options.b1'), value: "10-15k" },
                { id: "b2", label: t('projectFit.questions.4.options.b2'), value: "15-30k" },
                { id: "b3", label: t('projectFit.questions.4.options.b3'), value: "30k+" },
                { id: "b4", label: t('projectFit.questions.4.options.b4'), value: "not-sure" },
            ],
        },
    ];

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
                                            {t('projectFit.results.success.title')}
                                        </h2>
                                        <p className="text-foreground/60 text-lg mb-12 max-w-md leading-relaxed">
                                            {t('projectFit.results.success.description')}
                                        </p>
                                        <button className="group relative px-8 py-4 bg-brand-blue text-white font-mono text-sm uppercase tracking-widest rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(46,92,255,0.4)]">
                                            <span className="relative z-10">{t('projectFit.results.success.cta')}</span>
                                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8">
                                            <div className="w-3 h-3 rounded-full bg-white/20" />
                                        </div>
                                        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                                            {t('projectFit.results.fail.title')}
                                        </h2>
                                        <p className="text-foreground/60 font-medium text-lg mb-12 max-w-md leading-relaxed">
                                            {t('projectFit.results.fail.description')}
                                        </p>
                                        <button
                                            onClick={reset}
                                            className="font-mono text-xs uppercase tracking-widest text-foreground/40 hover:text-brand-blue transition-colors"
                                        >
                                            {t('projectFit.results.fail.cta')}
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
