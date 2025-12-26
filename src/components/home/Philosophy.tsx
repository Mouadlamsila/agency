"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Philosophy() {
    const { t } = useTranslation('common');
    const expoOut = [0.16, 1, 0.3, 1] as const;

    const statements = [
        {
            label: t('philosophy.principles.0.label'),
            text: t('philosophy.principles.0.text'),
            highlight: t('philosophy.principles.0.highlight')
        },
        {
            label: t('philosophy.principles.1.label'),
            text: t('philosophy.principles.1.text'),
            highlight: t('philosophy.principles.1.highlight')
        },
        {
            label: t('philosophy.principles.2.label'),
            text: t('philosophy.principles.2.text'),
            highlight: t('philosophy.principles.2.highlight')
        },
        {
            label: t('philosophy.principles.3.label'),
            text: t('philosophy.principles.3.text'),
            highlight: t('philosophy.principles.3.highlight')
        },
        {
            label: t('philosophy.principles.4.label'),
            text: t('philosophy.principles.4.text'),
            highlight: t('philosophy.principles.4.highlight')
        },
        {
            label: t('philosophy.principles.5.label'),
            text: t('philosophy.principles.5.text'),
            highlight: t('philosophy.principles.5.highlight')
        }
    ];

    return (
        <section className="relative w-full py-40 md:py-60 px-6 bg-[#0A0A0A] overflow-hidden">
            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Vertical Guide Lines */}
            <div className="absolute inset-0 flex justify-center pointer-events-none">
                <div className="w-full max-w-5xl h-full border-x border-white/[0.03]" />
            </div>

            <div className="relative mx-auto max-w-3xl">
                <div className="flex flex-col items-center text-center space-y-32 md:space-y-48">
                    {/* Optional small title */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: expoOut }}
                        className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600"
                    >
                        {t('philosophy.label')}
                    </motion.span>

                    <div className="flex flex-col space-y-24 md:space-y-32 w-full">
                        {statements.map((item, index) => (
                            <div key={index} className="flex flex-col items-center space-y-4">
                                {/* Mono Annotation */}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{
                                        duration: 1,
                                        delay: index * 0.4 + 0.2,
                                        ease: expoOut
                                    }}
                                    className="font-mono text-[9px] uppercase tracking-widest text-zinc-700"
                                >
                                    {item.label}
                                </motion.span>

                                {/* Statement */}
                                <div className="overflow-hidden py-2">
                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{
                                            duration: 2,
                                            delay: index * 0.4,
                                            ease: expoOut
                                        }}
                                        className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-200 leading-[1.2]"
                                    >
                                        {item.text.split(" ").map((word, i) => {
                                            const isHighlight = word.replace(/[.,]/g, "") === item.highlight;
                                            return (
                                                <span key={i} className={isHighlight ? "text-brand-blue/80" : ""}>
                                                    {word}{" "}
                                                </span>
                                            );
                                        })}
                                    </motion.p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
