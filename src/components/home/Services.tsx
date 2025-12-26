"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ArchitectureIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 group-hover:opacity-100 transition-opacity duration-700">
        {/* Foundation Grid */}
        <path d="M20 30 L50 15 L80 30 L50 45 Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        <path d="M20 70 L50 55 L80 70 L50 85 Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Structural Pillars */}
        <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M20 30 L20 70 M50 45 L50 85 M80 30 L80 70"
            stroke="currentColor" strokeWidth="1"
        />

        {/* Connecting Nodes */}
        <circle cx="20" cy="30" r="1.5" fill="currentColor" />
        <circle cx="50" cy="45" r="1.5" fill="currentColor" />
        <circle cx="80" cy="30" r="1.5" fill="currentColor" />
        <circle cx="20" cy="70" r="1.5" fill="currentColor" />
        <circle cx="50" cy="85" r="1.5" fill="currentColor" />
        <circle cx="80" cy="70" r="1.5" fill="currentColor" />
    </svg>
);

const EngineeringIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 group-hover:opacity-100 transition-opacity duration-700">
        {/* Performance Waveform */}
        <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            d="M10 50 Q 25 20, 40 50 T 70 50 T 90 50"
            stroke="currentColor" strokeWidth="1"
            strokeDasharray="4 4"
        />
        <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M10 50 L30 50 L40 20 L50 80 L60 50 L90 50"
            stroke="currentColor" strokeWidth="1.5"
        />

        {/* Optimization Points */}
        <motion.circle
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            cx="40" cy="20" r="2" fill="currentColor"
        />
        <motion.circle
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
            cx="50" cy="80" r="2" fill="currentColor"
        />
    </svg>
);

const CommerceIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 group-hover:opacity-100 transition-opacity duration-700">
        {/* Transaction Funnel/Node */}
        <motion.circle
            initial={{ r: 0 }}
            whileInView={{ r: 35 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4"
        />
        <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            d="M30 30 L70 70 M70 30 L30 70"
            stroke="currentColor" strokeWidth="1"
        />

        {/* Conversion Nodes */}
        <motion.rect
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            x="45" y="45" width="10" height="10" fill="currentColor"
        />
        <circle cx="30" cy="30" r="3" stroke="currentColor" strokeWidth="1" />
        <circle cx="70" cy="70" r="3" stroke="currentColor" strokeWidth="1" />
        <circle cx="70" cy="30" r="3" stroke="currentColor" strokeWidth="1" />
        <circle cx="30" cy="70" r="3" stroke="currentColor" strokeWidth="1" />
    </svg>
);

const StrategyIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 group-hover:opacity-100 transition-opacity duration-700">
        {/* Directional Radar */}
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.2" />

        <motion.line
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            x1="50" y1="50" x2="50" y2="10"
            stroke="currentColor" strokeWidth="1"
            style={{ originX: "50px", originY: "50px" }}
        />

        {/* Strategic Nodes */}
        <motion.circle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            cx="75" cy="35" r="2.5" fill="currentColor"
        />
        <motion.circle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            cx="35" cy="65" r="2.5" fill="currentColor"
        />
        <motion.circle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2 }}
            cx="60" cy="75" r="2.5" fill="currentColor"
        />
    </svg>
);

const serviceIcons = [
    {
        id: "architecture",
        className: "md:col-span-2 md:row-span-2 min-h-[450px]",
        icon: <ArchitectureIcon />
    },
    {
        id: "engineering",
        className: "md:col-span-1 md:row-span-1 min-h-[300px]",
        icon: <EngineeringIcon />
    },
    {
        id: "commerce",
        className: "md:col-span-1 md:row-span-2 min-h-[450px]",
        icon: <CommerceIcon />
    },
    {
        id: "strategy",
        className: "md:col-span-1 md:row-span-1 min-h-[300px]",
        icon: <StrategyIcon />
    }
];

export default function Services() {
    const expoOut = [0.16, 1, 0.3, 1] as const;
    const { t, i18n } = useTranslation('common');

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <section className="w-full py-32 md:py-48 px-6 bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* Language Toggle Button */}
            <button
                onClick={toggleLanguage}
                className="absolute top-8 right-8 z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-brand-blue/60 hover:text-brand-blue transition-colors duration-300 border border-brand-blue/20 hover:border-brand-blue/40 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm"
                aria-label="Toggle language"
            >
                {i18n.language === 'en' ? 'FR' : 'EN'}
            </button>

            <div className="mx-auto max-w-7xl relative z-10">
                <div className="mb-24 md:mb-32 flex flex-col items-start md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: expoOut }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="w-8 h-px bg-brand-blue/40" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-blue">
                                {t('services.sectionLabel')}
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.1, ease: expoOut }}
                            className="text-5xl font-bold tracking-tight md:text-7xl font-display text-white leading-[0.9]"
                        >
                            {t('services.heading.line1')} <br />
                            <span className="text-zinc-700 italic">{t('services.heading.line2')}</span> <span className="text-brand-blue">{t('services.heading.line3')}</span>
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-3">
                    {serviceIcons.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1.5,
                                delay: 0.2 + index * 0.1,
                                ease: expoOut
                            }}
                            className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/5 bg-[#111115] p-10 md:p-14 transition-all duration-500 hover:border-brand-blue/20 hover:bg-[#14141a] ${service.className}`}
                        >
                            {/* Architectural Icon Container */}
                            <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 text-brand-blue pointer-events-none">
                                {service.icon}
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-auto">
                                    <div className="flex flex-col gap-2">
                                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 group-hover:text-brand-blue/60 transition-colors">
                                            {t(`services.items.${index}.label`)}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight font-display text-white group-hover:text-brand-blue transition-colors duration-500">
                                            {t(`services.items.${index}.title`)}
                                        </h3>
                                    </div>
                                    <div className="font-mono text-[8px] uppercase tracking-widest text-zinc-700 border border-white/5 px-2 py-1 rounded bg-white/[0.02]">
                                        {t(`services.items.${index}.metadata`)}
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <p className="max-w-[280px] font-sans text-base leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors duration-500">
                                        {t(`services.items.${index}.description`)}
                                    </p>

                                    <motion.div
                                        className="mt-8 flex items-center gap-2 text-brand-blue opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                                    >
                                        <span className="font-mono text-[10px] uppercase tracking-widest">{t(`services.items.${index}.cta`)}</span>
                                        <span className="text-lg">→</span>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Subtle Glow Leak */}
                            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
