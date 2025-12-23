"use client";

import { motion } from "framer-motion";

export default function Expertise() {
    return (
        <section className="relative w-full py-32 px-6">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col items-start gap-12 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold md:text-5xl font-display leading-tight">
                            We don't just build websites. We solve <span className="text-zinc-500 italic">complex</span> business problems through code.
                        </h2>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-brand-blue" />
                            <span className="font-mono text-sm uppercase tracking-widest text-zinc-500">Our Mindset</span>
                        </div>
                        <p className="max-w-xs text-zinc-400 font-sans leading-relaxed">
                            Every line of code is an investment. We ensure yours is scalable, secure, and built to last.
                        </p>
                    </div>
                </div>

                {/* Animated Divider */}
                <div className="mt-32 h-[1px] w-full overflow-hidden bg-zinc-800">
                    <motion.div
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                        className="h-full w-1/3 bg-gradient-to-r from-transparent via-brand-blue to-transparent"
                    />
                </div>
            </div>
        </section>
    );
}
