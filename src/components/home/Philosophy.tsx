"use client";

import { motion } from "framer-motion";

const statements = [
    "We don't solve problems; we eliminate them.",
    "Complexity is the enemy of performance.",
    "Logic dictates form. Meaning dictates motion.",
    "We build for the next decade, not the next trend.",
    "Precision is our only standard.",
    "Everything else is noise."
];

export default function Philosophy() {
    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="w-full py-60 px-6 bg-[#0A0A0A]">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col items-start space-y-12 md:space-y-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: expoOut }}
                        className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600 mb-8"
                    >
                        Mindset
                    </motion.span>

                    <div className="flex flex-col space-y-6 md:space-y-8">
                        {statements.map((statement, index) => (
                            <div key={index} className="overflow-hidden py-1">
                                <motion.p
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{
                                        duration: 1.8,
                                        delay: index * 0.15,
                                        ease: expoOut
                                    }}
                                    className="font-display text-3xl font-medium tracking-tight text-zinc-100 md:text-5xl lg:text-6xl"
                                >
                                    {statement}
                                </motion.p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
