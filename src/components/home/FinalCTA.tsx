"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function FinalCTA() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useTranslation('common');

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnetic effect: move button towards cursor
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Only apply magnetic effect within a certain range
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        if (distance < 200) {
            mouseX.set(distanceX * 0.4);
            mouseY.set(distanceY * 0.4);
        } else {
            mouseX.set(0);
            mouseY.set(0);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0D0D0D] px-6 py-40">
            {/* Subtle Grain Overlay */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Soft Ambient Glow */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.15 }}
                transition={{ duration: 4, ease: expoOut }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-brand-blue blur-[140px] pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Pre-label */}
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2, ease: expoOut }}
                    className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500"
                >
                    {t('finalCTA.label')}
                </motion.span>

                {/* Main Statement */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.4, ease: expoOut }}
                    className="max-w-4xl font-display text-5xl font-medium tracking-tight text-zinc-100 md:text-7xl lg:text-8xl"
                >
                    {t('finalCTA.heading.line1')} <br /> {t('finalCTA.heading.line2')}
                </motion.h2>

                {/* Supporting Line */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.8, ease: expoOut }}
                    className="mt-12 max-w-lg font-sans text-lg text-zinc-400 md:text-xl"
                >
                    {t('finalCTA.description')}
                </motion.p>

                {/* Primary CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 1.2, ease: expoOut }}
                    className="mt-24"
                >
                    <motion.button
                        ref={buttonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={handleMouseLeave}
                        style={{ x: springX, y: springY }}
                        className="group relative flex h-64 w-64 items-center justify-center rounded-full border border-white/5 bg-transparent transition-colors hover:border-white/10"
                    >
                        {/* Magnetic Background Glow */}
                        <motion.div
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                                opacity: isHovered ? 0.1 : 0,
                            }}
                            className="absolute inset-0 rounded-full bg-brand-blue blur-2xl transition-all duration-700"
                        />

                        {/* Button Content */}
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <span className="font-sans text-sm font-medium text-zinc-200 transition-colors group-hover:text-white">
                                {t('finalCTA.button')}
                            </span>
                            <motion.div
                                animate={{ x: isHovered ? 5 : 0 }}
                                className="h-px w-8 bg-brand-blue"
                            />
                        </div>

                        {/* Border Glow */}
                        <div className="absolute inset-0 rounded-full border border-brand-blue/0 transition-all duration-700 group-hover:border-brand-blue/20 group-hover:scale-[1.05]" />
                    </motion.button>
                </motion.div>

                {/* Secondary Micro Text */}
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 2, ease: expoOut }}
                    className="mt-12 font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600"
                >
                    {t('finalCTA.price')}
                </motion.span>
            </div>

        </section>
    );
}
