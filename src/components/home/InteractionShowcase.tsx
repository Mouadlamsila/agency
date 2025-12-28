"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const { i18n } = useTranslation();

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        x.set(distanceX * 0.35);
        y.set(distanceY * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="relative group"
        >
            <div className="px-10 py-5 bg-brand-blue rounded-full text-white font-medium relative z-10 overflow-hidden shadow-[0_0_30px_rgba(46,92,255,0.3)] group-hover:shadow-[0_0_60px_rgba(46,92,255,0.6)] transition-all duration-500">
                <motion.div
                    className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]"
                />
                <div className="relative z-10 flex items-center gap-3">
                    <span className="tracking-tight">{children}</span>
                    {
                        i18n.language === 'ar' ? (
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="text-lg"
                            >
                                ←
                            </motion.span>
                        ) : (
                            <motion.span
                                animate={{ x: [0, -5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="text-lg"
                            >
                                →
                            </motion.span>
                        )
                    }
                </div>
            </div>
            {/* Magnetic Glow */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="absolute inset-0 bg-brand-blue/30 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
        </motion.div>
    );
};

const TiltCard = ({ title, description, icon, label, activeModulesLabel }: { title: string, description: string, icon: string, label: string, activeModulesLabel: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const springConfig = { damping: 25, stiffness: 150 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set(clientX - centerX);
        y.set(clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const background = useTransform(
        [x, y],
        ([latestX, latestY]: any[]) => `radial-gradient(800px circle at ${latestX + 250}px ${latestY + 250}px, rgba(46,92,255,0.12), transparent 40%)`
    );

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
            className="w-full h-full bg-[#111115] border border-white/5 rounded-[2.5rem] p-10 md:p-14 relative group overflow-hidden"
        >
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div style={{ transform: "translateZ(60px)" }} className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shadow-[0_0_20px_rgba(46,92,255,0.1)]">
                        <span className="text-3xl">{icon}</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 border border-white/5 px-3 py-1 rounded-full bg-white/[0.02]">
                        {label}
                    </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight leading-tight">
                    {title}
                </h3>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
                    {description}
                </p>

                <div className="mt-auto pt-12 flex items-center gap-4">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111115] bg-zinc-800 flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-brand-blue/40 to-transparent" />
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">{activeModulesLabel}</span>
                </div>
            </div>

            {/* Dynamic Spotlight Glow */}
            <motion.div
                className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background }}
            />

            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-[80px] -mr-16 -mt-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>
    );
};

const MicroInteractionGrid = ({ t }: { t: any }) => {
    const { i18n } = useTranslation();
    const [activeToggle, setActiveToggle] = useState(false);
    const [sliderValue, setSliderValue] = useState(72);
    const isRtl = i18n.language === 'ar';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Toggle Interaction */}
            <div className="bg-[#111115] border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:border-brand-blue/20 transition-colors duration-500">
                <div className="flex justify-between items-center mb-8">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">{t('interactionShowcase.microInteraction.systemSync')}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${activeToggle ? 'bg-brand-blue animate-pulse shadow-[0_0_10px_#2E5CFF]' : 'bg-zinc-700'}`} />
                </div>
                <div
                    onClick={() => setActiveToggle(!activeToggle)}
                    className="w-14 h-7 rounded-full bg-zinc-900 border border-white/5 relative cursor-pointer overflow-hidden p-1"
                >

                    <motion.div
                        animate={{ x: activeToggle ? (isRtl ? -28 : 28) : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`w-5 h-5 rounded-full shadow-lg ${activeToggle ? 'bg-brand-blue' : 'bg-zinc-600'}`}
                    />
                </div>
                <div className="mt-6 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                    {activeToggle ? t('interactionShowcase.microInteraction.protocolActive') : t('interactionShowcase.microInteraction.standbyMode')}
                </div>
            </div>

            {/* Slider Interaction */}
            <div className="bg-[#111115] border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:border-brand-blue/20 transition-colors duration-500">
                <div className="flex justify-between items-center mb-8">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">{t('interactionShowcase.microInteraction.engineLoad')}</span>
                    <span className="font-mono text-[10px] text-brand-blue">{Math.round(sliderValue)}%</span>
                </div>
                <div className="relative w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        className={cn(
                            "absolute inset-y-0 bg-brand-blue shadow-[0_0_15px_rgba(46,92,255,0.5)]",
                            isRtl ? "right-0" : "left-0"
                        )}
                        animate={{ width: `${sliderValue}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(parseInt(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                </div>
                <div className="mt-6 flex justify-between">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={`w-1 h-3 rounded-full ${sliderValue > i * 15 ? 'bg-brand-blue/40' : 'bg-zinc-800'}`} />
                        ))}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{t('interactionShowcase.microInteraction.optimized')}</span>
                </div>
            </div>
        </div>
    );
};

const InteractionShowcase = () => {
    const { t } = useTranslation('common');
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <section ref={containerRef} className="py-32 md:py-48 bg-[#0E0E11] relative overflow-hidden">
            {/* Background Architectural Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-brand-blue/20 via-white/5 to-transparent" />
                <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24 md:mb-40">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 mb-8"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-blue">
                            {t('interactionShowcase.tag')}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display font-bold text-4xl md:text-7xl text-white mb-10 tracking-tight leading-[1.1]"
                    >
                        {t('interactionShowcase.heading.line1')} <span className="text-zinc-600 italic">{t('interactionShowcase.heading.line2')}</span> <br />
                        <span className="text-brand-blue relative">
                            {t('interactionShowcase.heading.line3')}
                            <svg className="absolute -bottom-4 left-0 w-full h-3 text-brand-blue/20" viewBox="0 0 300 12" fill="none">
                                <path d="M1 10.5C50 3.5 150 1.5 299 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="text-zinc-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        {t('interactionShowcase.description')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                    {/* Left: Premium Tilt Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="lg:col-span-7"
                    >
                        <TiltCard
                            icon={t('interactionShowcase.tiltCard.icon')}
                            label={t('interactionShowcase.tiltCard.label')}
                            title={t('interactionShowcase.tiltCard.title')}
                            description={t('interactionShowcase.tiltCard.description')}
                            activeModulesLabel={t('interactionShowcase.tiltCard.activeModules')}
                        />
                    </motion.div>

                    {/* Right: Interaction Stack */}
                    <div className="lg:col-span-5 flex flex-col gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="flex-1 flex items-center justify-center bg-[#111115] border border-white/5 rounded-[2.5rem] p-16 relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />
                            <MagneticButton>{t('interactionShowcase.magneticButton')}</MagneticButton>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            <MicroInteractionGrid t={t} />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Technical Metadata */}
            <div className="absolute bottom-12 left-12 hidden xl:block">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-px bg-brand-blue/30" />
                        <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">{t('interactionShowcase.metadata.frameRate')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-px bg-brand-blue/30" />
                        <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">{t('interactionShowcase.metadata.latency')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractionShowcase;
