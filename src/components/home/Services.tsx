"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Layers, Zap, ShoppingCart, Compass, ArrowUpRight } from "lucide-react";

export default function Services() {
    const expoOut = [0.16, 1, 0.3, 1] as const;
    const { t } = useTranslation();

    const cards = [
        {
            id: "01",
            icon: <Layers className="size-8 text-brand-blue" />,
            title: t('services.items.0.label'),
            heading: t('services.items.0.title'),
            description: t('services.items.0.description'),
            tag: t('services.items.0.metadata'),
        },
        {
            id: "02",
            icon: <Zap className="size-8 text-brand-blue" />,
            title: t('services.items.1.label'),
            heading: t('services.items.1.title'),
            description: t('services.items.1.description'),
            tag: t('services.items.1.metadata'),
        },
        {
            id: "03",
            icon: <ShoppingCart className="size-8 text-brand-blue" />,
            title: t('services.items.2.label'),
            heading: t('services.items.2.title'),
            description: t('services.items.2.description'),
            tag: t('services.items.2.metadata'),
        },
        {
            id: "04",
            icon: <Compass className="size-8 text-brand-blue" />,
            title: t('services.items.3.label'),
            heading: t('services.items.3.title'),
            description: t('services.items.3.description'),
            tag: t('services.items.3.metadata'),
        }
    ];

    return (
        <section id="services" className="w-full py-32 md:py-48 px-6 bg-[#0A0A0A] relative overflow-hidden">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="mx-auto max-w-7xl relative z-10 font-sans">
                {/* Header Section */}
                <div className="mb-20 md:mb-24 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: expoOut }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-8 h-px bg-brand-blue/50" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-blue">
                            {t('services.sectionLabel')}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.1, ease: expoOut }}
                        className="text-5xl font-bold tracking-tighter md:text-7xl font-display text-white leading-[0.9]"
                    >
                        {t('services.heading.line1')} <br />
                        <span className="text-neutral-500 italic font-serif pr-4">{t('services.heading.line2')}</span>
                        <span className="text-brand-blue">{t('services.heading.line3')}</span>
                    </motion.h2>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 1,
                                delay: index * 0.1,
                                ease: expoOut
                            }}
                            className="group relative flex flex-col justify-between p-8 md:p-12 rounded-[2rem] bg-neutral-900/50 backdrop-blur-md border border-neutral-800 hover:border-brand-blue/30 transition-all duration-500 overflow-hidden hover:bg-neutral-900/80"
                        >
                            <div className="flex flex-col gap-6 relative z-10">
                                <div className="flex justify-between items-start">
                                    <div className="p-3 rounded-2xl bg-neutral-800/50 text-brand-blue group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors duration-500">
                                        {card.icon}
                                    </div>
                                    <span className="font-mono text-xs text-neutral-600 group-hover:text-brand-blue/60 transition-colors duration-300 border border-neutral-800 px-3 py-1 rounded-full uppercase tracking-wider">
                                        {card.tag}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="font-mono text-xs text-brand-blue/80 uppercase tracking-widest mb-2">
                                            {card.title}
                                        </p>
                                        <h3 className="text-3xl font-bold text-neutral-100 tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                                            {card.heading}
                                        </h3>
                                    </div>

                                    <p className="text-neutral-400 leading-relaxed max-w-sm group-hover:text-neutral-300 transition-colors duration-500">
                                        {card.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Action */}
                            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-brand-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
                                <span>{t('services.items.0.cta') || 'Explore Module'}</span>
                                <ArrowUpRight className="size-4" />
                            </div>

                            {/* Decorative Gradients */}
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-blue/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-brand-blue/10 transition-colors duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
