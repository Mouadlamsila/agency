"use client";

import { motion } from "framer-motion";

const packages = [
    {
        id: "01",
        name: "Foundation Website",
        target: "For small teams or early-stage brands",
        description: "A high-performance digital presence designed to establish authority. We focus on clarity, speed, and a refined aesthetic that scales.",
        includes: [
            "Strategic Art Direction",
            "Custom UI/UX Design",
            "Responsive Development",
            "SEO & Performance Optimization",
            "CMS Integration"
        ],
        pricing: "Starting from $15,000"
    },
    {
        id: "02",
        name: "Growth Platform",
        target: "For growing businesses & startups",
        description: "A scalable architecture built for conversion and performance. We engineer deep integrations and custom workflows to support your expansion.",
        includes: [
            "Everything in Foundation",
            "Advanced Motion Design",
            "Custom API Integrations",
            "Conversion Rate Optimization",
            "Performance Monitoring"
        ],
        pricing: "Starting from $35,000"
    },
    {
        id: "03",
        name: "Custom Digital System",
        target: "For serious products & enterprises",
        description: "A fully tailored digital ecosystem. We think long-term, building bespoke tools and systems that define your industry's digital standard.",
        includes: [
            "Bespoke Product Strategy",
            "Multi-platform Ecosystems",
            "Custom Backend Infrastructure",
            "Long-term Technical Partnership",
            "White-glove Support"
        ],
        pricing: "Typical range $75,000+"
    }
];

export default function ServicePackages() {
    const expoOut = [0.16, 1, 0.3, 1] as any;

    return (
        <section id="packages" className="w-full py-40 px-6 bg-brand-dark border-t border-white/5">
            <div className="mx-auto max-w-7xl">
                <div className="mb-32">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: expoOut }}
                        className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600"
                    >
                        Engagement Models
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.1, ease: expoOut }}
                        className="mt-6 text-5xl font-bold tracking-tight md:text-7xl font-display"
                    >
                        Service <span className="text-zinc-500 text-balance">Packages.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1.5,
                                delay: 0.2 + index * 0.15,
                                ease: expoOut
                            }}
                            className="flex flex-col border-l border-white/5 pl-8 md:pl-12"
                        >
                            <div className="mb-12">
                                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                                    {pkg.id} / {pkg.target}
                                </span>
                                <h3 className="mt-4 text-3xl font-bold font-display tracking-tight text-zinc-100">
                                    {pkg.name}
                                </h3>
                            </div>

                            <div className="flex-grow">
                                <p className="text-sm leading-relaxed text-zinc-500 font-sans mb-12 max-w-[280px]">
                                    {pkg.description}
                                </p>

                                <ul className="space-y-4 mb-16">
                                    {pkg.includes.map((item, i) => (
                                        <li key={i} className="text-[11px] uppercase tracking-widest text-zinc-400 font-mono">
                                            — {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest block mb-2">
                                    Investment
                                </span>
                                <span className="text-lg font-display font-medium text-zinc-200">
                                    {pkg.pricing}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
