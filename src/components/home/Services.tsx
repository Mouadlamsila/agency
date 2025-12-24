"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const services = [
    {
        label: "01 / Architecture",
        title: "Digital Systems",
        description: "Foundational digital infrastructures designed for long-term stability and performance.",
        className: "md:col-span-2 md:row-span-2 min-h-[400px]",
    },
    {
        label: "02 / Engineering",
        title: "Scalable Products",
        description: "High-performance applications that grow with your ambition.",
        className: "md:col-span-1 md:row-span-1 min-h-[300px]",
    },
    {
        label: "03 / Commerce",
        title: "E-commerce Infrastructure",
        description: "Bespoke shopping experiences built on robust, conversion-first logic.",
        className: "md:col-span-1 md:row-span-2 min-h-[400px]",
    },
    {
        label: "04 / Strategy",
        title: "Technical Consulting",
        description: "Navigating complex digital landscapes with precision and foresight.",
        className: "md:col-span-1 md:row-span-1 min-h-[300px]",
    }
];

export default function Services() {
    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="w-full py-40 px-6 bg-[#0A0A0A]">
            <div className="mx-auto max-w-7xl">
                <div className="mb-24 flex flex-col items-start md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: expoOut }}
                            className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600"
                        >
                            Capabilities
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.1, ease: expoOut }}
                            className="mt-6 text-5xl font-bold tracking-tight md:text-7xl font-display"
                        >
                            Engineered for <br />
                            <span className="text-zinc-500">Exclusivity.</span>
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
                    {services.map((service, index) => (
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
                            whileHover={{ y: -4 }}
                            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/20 p-10 transition-colors hover:border-white/10 ${service.className}`}
                        >
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="flex flex-col gap-2">
                                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
                                    {service.label}
                                </span>
                                <h3 className="text-3xl font-bold tracking-tight font-display text-zinc-100">
                                    {service.title}
                                </h3>
                            </div>

                            <p className="mt-12 max-w-[240px] font-sans text-sm leading-relaxed text-zinc-500">
                                {service.description}
                            </p>

                            <div className="absolute right-6 top-6 h-1 w-1 rounded-full bg-zinc-800 transition-colors group-hover:bg-brand-blue" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
