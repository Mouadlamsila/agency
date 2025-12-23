"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Impact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    const expoOut = [0.16, 1, 0.3, 1] as any;

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] py-40"
        >
            {/* Background Texture/Grain is handled by the global NoiseOverlay */}

            <div className="relative z-10 flex flex-col items-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: expoOut }}
                    className="mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-600"
                >
                    engineered
                </motion.span>

                <div className="relative flex flex-col items-center">
                    {/* Main Word 1: PURE (Gradient) */}
                    <motion.h2
                        style={{ y: y1 }}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, delay: 0.3, ease: expoOut }}
                        className="font-display text-[22vw] font-bold leading-[0.7] tracking-[-0.06em] text-transparent bg-clip-text bg-gradient-to-b from-zinc-200/20 to-zinc-500/5 select-none"
                    >
                        PURE
                    </motion.h2>

                    {/* Main Word 2: INTENT (White, Overlapping) */}
                    <motion.h2
                        style={{ y: y2 }}
                        initial={{ opacity: 0, y: 150 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, delay: 0.5, ease: expoOut }}
                        className="relative -mt-[8vw] font-display text-[22vw] font-bold leading-[0.7] tracking-[-0.06em] text-zinc-100 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] select-none"
                    >
                        INTENT
                    </motion.h2>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 1.2 }}
                    className="mt-12 max-w-[280px] text-center font-sans text-[11px] uppercase tracking-[0.2em] text-zinc-500 leading-relaxed"
                >
                    Every pixel serves a purpose. Every line of code is a choice.
                </motion.p>
            </div>

            {/* Decorative Light Streak */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[1px] w-[60%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent blur-sm" />
        </section>
    );
}
