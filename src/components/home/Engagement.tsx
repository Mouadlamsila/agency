"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Engagement() {
    const { t } = useTranslation('common');
    const expoOut = [0.16, 1, 0.3, 1] as const;

    const engagementModels = [
        {
            id: "01",
            label: t('engagement.models.0.label'),
            title: t('engagement.models.0.title'),
            positioning: t('engagement.models.0.positioning'),
            outcomes: [
                t('engagement.models.0.outcomes.0'),
                t('engagement.models.0.outcomes.1'),
                t('engagement.models.0.outcomes.2')
            ],
            price: t('engagement.models.0.price'),
            bestFor: t('engagement.models.0.bestFor')
        },
        {
            id: "02",
            label: t('engagement.models.1.label'),
            title: t('engagement.models.1.title'),
            positioning: t('engagement.models.1.positioning'),
            outcomes: [
                t('engagement.models.1.outcomes.0'),
                t('engagement.models.1.outcomes.1'),
                t('engagement.models.1.outcomes.2')
            ],
            price: t('engagement.models.1.price'),
            bestFor: t('engagement.models.1.bestFor')
        },
        {
            id: "03",
            label: t('engagement.models.2.label'),
            title: t('engagement.models.2.title'),
            positioning: t('engagement.models.2.positioning'),
            outcomes: [
                t('engagement.models.2.outcomes.0'),
                t('engagement.models.2.outcomes.1'),
                t('engagement.models.2.outcomes.2')
            ],
            price: t('engagement.models.2.price'),
            bestFor: t('engagement.models.2.bestFor')
        }
    ];

    return (
        <section id="engagement" className="w-full py-40 px-6 bg-[#111216] relative overflow-hidden">
            {/* Subtle Blue Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />

            <div className="mx-auto max-w-7xl">
                <div className="mb-32">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: expoOut }}
                        className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500"
                    >
                        {t('engagement.label')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.1, ease: expoOut }}
                        className="mt-6 text-5xl font-bold tracking-tight md:text-8xl font-display text-white"
                    >
                        {t('engagement.heading.line1')} <span className="text-zinc-600">{t('engagement.heading.line2')}</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
                    {engagementModels.map((model, index) => (
                        <motion.div
                            key={model.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1.5,
                                delay: 0.2 + index * 0.15,
                                ease: expoOut
                            }}
                            className="group relative bg-[#111216] p-8 md:p-12 flex flex-col min-h-[600px] transition-all duration-700 hover:bg-[#16171d] hover:-translate-y-1"
                        >
                            {/* Blue Underline Animation */}
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-blue transition-all duration-700 ease-out group-hover:w-full" />

                            <div className="mb-16">
                                <span className="font-mono text-[11px] text-brand-blue tracking-[0.3em] block mb-6">
                                    {model.id} / {model.label}
                                </span>
                                <h3 className="text-4xl md:text-5xl font-bold font-display text-white mb-4 leading-tight">
                                    {model.title}
                                </h3>
                                <p className="text-zinc-400 font-sans text-lg leading-relaxed max-w-[280px]">
                                    {model.positioning}
                                </p>
                            </div>

                            <div className="flex-grow">
                                <ul className="space-y-6 mb-16">
                                    {model.outcomes.map((outcome, i) => (
                                        <li key={i} className="flex items-center gap-3 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-brand-blue transition-colors duration-500" />
                                            {outcome}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-auto pt-12 border-t border-white/5">
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest block mb-2">
                                            {t('engagement.investment')}
                                        </span>
                                        <span className="text-2xl font-display font-medium text-brand-blue">
                                            {model.price}
                                        </span>
                                    </div>
                                    <div className="text-[11px] text-zinc-500 font-sans italic">
                                        {t('engagement.bestForLabel')} {model.bestFor}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.8, ease: expoOut }}
                    className="mt-32 text-center"
                >
                    <p className="text-zinc-500 font-sans mb-4">{t('engagement.notSure')}</p>
                    <button className="group relative inline-flex items-center gap-2 text-white font-display text-xl hover:text-brand-blue transition-colors duration-300">
                        {t('engagement.cta')}
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-zinc-800 group-hover:bg-brand-blue transition-colors duration-300" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
