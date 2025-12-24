"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

interface ExpertiseItem {
    id: string;
    title: string;
    label: string;
    description: string;
    supporting: string[];
}

const expertiseData: ExpertiseItem[] = [
    {
        id: "web",
        title: "Web Engineering",
        label: "Architecture",
        description: "Building high-performance, scalable web architectures that serve as the backbone of digital transformation.",
        supporting: ["Next.js", "TypeScript", "Performance"]
    },
    {
        id: "saas",
        title: "SaaS Infrastructure",
        label: "Systems",
        description: "Designing complex multi-tenant systems and cloud-native infrastructures for global scalability.",
        supporting: ["Cloud Native", "Scalability", "Security"]
    },
    {
        id: "uiux",
        title: "UI/UX Architecture",
        label: "Precision",
        description: "Engineering pixel-perfect, motion-driven interfaces that blend aesthetic excellence with functional logic.",
        supporting: ["Motion Design", "Design Systems", "UX Logic"]
    },
    {
        id: "enterprise",
        title: "Enterprise Solutions",
        label: "Complexity",
        description: "Solving intricate business problems through custom-engineered software and integrated digital ecosystems.",
        supporting: ["Custom ERP", "API Design", "Integration"]
    },
    {
        id: "strategy",
        title: "Digital Strategy",
        label: "Vision",
        description: "Aligning technical architecture with business objectives to ensure long-term systemic growth.",
        supporting: ["Roadmapping", "Consultancy", "Growth"]
    }
];

export default function Expertise() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="relative w-full sm:px-26 px-2 overflow-hidden bg-[#0E0E11] py-32 md:py-48">
            {/* Subtle Noise Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] bg-repeat" />

            <div className="container relative z-10 mx-auto px-6">
                <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-32">

                    {/* Left: Expertise Blocks */}
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-4">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: expoOut }}
                                className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-blue"
                            >
                                Our Capabilities
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.1, ease: expoOut }}
                                className="max-w-md font-display text-4xl font-bold text-white md:text-5xl tracking-tight"
                            >
                                ARCHITECTING <span className="text-zinc-500 italic">SYSTEMS</span> OF VALUE.
                            </motion.h2>
                        </div>

                        <div className="flex flex-col">
                            {expertiseData.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: expoOut }}
                                    className={`group relative border-b border-white/5 py-10 px-10 transition-colors duration-500 first:border-t ${activeIndex === index ? "border-brand-blue/30" : "hover:border-white/10"
                                        }`}
                                >
                                    <div className="relative z-10 flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <span className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-500 ${activeIndex === index ? "text-brand-blue" : "text-zinc-600"
                                                }`}>
                                                {item.label} — 0{index + 1}
                                            </span>
                                            <div className={`h-1 w-1 rounded-full transition-all duration-500 ${activeIndex === index ? "bg-brand-blue scale-150" : "bg-zinc-800"
                                                }`} />
                                        </div>

                                        <h3 className={`font-display text-3xl font-bold transition-all duration-500 md:text-4xl lg:text-5xl ${activeIndex === index ? "text-white translate-x-2" : "text-zinc-500"
                                            }`}>
                                            {item.title}
                                        </h3>

                                        <AnimatePresence mode="wait">
                                            {activeIndex === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.5, ease: expoOut }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="max-w-lg font-sans text-base text-zinc-400 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                    <div className="mt-6 flex flex-wrap gap-3">
                                                        {item.supporting.map((tag) => (
                                                            <span key={tag} className="border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Background Highlight */}
                                    <div className={`absolute inset-0 -z-10 bg-gradient-to-r from-brand-blue/5 to-transparent transition-opacity duration-500 ${activeIndex === index ? "opacity-100" : "opacity-0"
                                        }`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Architectural Visuals */}
                    <div className="relative hidden lg:block">
                        <div className="sticky top-48 h-[600px] w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.8, ease: expoOut }}
                                        className="relative h-full w-full p-12"
                                    >
                                        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {/* Base Grid */}
                                            <defs>
                                                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
                                                </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill="url(#smallGrid)" />

                                            {/* Dynamic Visuals based on activeIndex */}
                                            {activeIndex === 0 && (
                                                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <motion.path d="M100 200 L300 200 M200 100 L200 300" stroke="#2E5CFF" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
                                                    <motion.circle cx="200" cy="200" r="80" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                                                    <motion.rect x="160" y="160" width="80" height="80" stroke="#2E5CFF" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
                                                </motion.g>
                                            )}
                                            {activeIndex === 1 && (
                                                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <motion.path d="M50 100 L350 100 M50 200 L350 200 M50 300 L350 300" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
                                                    <motion.rect x="100" y="80" width="200" height="240" stroke="#2E5CFF" strokeWidth="1" initial={{ height: 0 }} animate={{ height: 240 }} transition={{ duration: 1 }} />
                                                    <motion.circle cx="200" cy="200" r="40" fill="#2E5CFF" fillOpacity="0.1" stroke="#2E5CFF" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} />
                                                </motion.g>
                                            )}
                                            {activeIndex === 2 && (
                                                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <motion.path d="M100 100 Q200 50 300 100 T300 300 Q200 350 100 300 Z" stroke="#2E5CFF" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
                                                    <motion.circle cx="100" cy="100" r="4" fill="#2E5CFF" />
                                                    <motion.circle cx="300" cy="100" r="4" fill="#2E5CFF" />
                                                    <motion.circle cx="300" cy="300" r="4" fill="#2E5CFF" />
                                                    <motion.circle cx="100" cy="300" r="4" fill="#2E5CFF" />
                                                    <motion.path d="M150 150 L250 250 M250 150 L150 250" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                                                </motion.g>
                                            )}
                                            {activeIndex === 3 && (
                                                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <motion.rect x="50" y="50" width="300" height="300" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
                                                    <motion.path d="M50 50 L350 350 M350 50 L50 350" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
                                                    <motion.rect x="150" y="150" width="100" height="100" fill="#2E5CFF" fillOpacity="0.1" stroke="#2E5CFF" animate={{ rotate: 45 }} />
                                                    <motion.path d="M200 50 V350 M50 200 H350" stroke="#2E5CFF" strokeWidth="0.5" strokeDasharray="2 2" />
                                                </motion.g>
                                            )}
                                            {activeIndex === 4 && (
                                                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <motion.circle cx="200" cy="200" r="120" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
                                                    <motion.circle cx="200" cy="200" r="60" stroke="#2E5CFF" strokeWidth="1" />
                                                    <motion.path d="M200 80 V320 M80 200 H320" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
                                                    <motion.path d="M140 140 L260 260 M260 140 L140 260" stroke="#2E5CFF" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
                                                </motion.g>
                                            )}
                                        </svg>

                                        {/* Technical Labels */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                                            <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-zinc-600">
                                                <span>Module_{expertiseData[activeIndex].id}</span>
                                                <span>Status: Active</span>
                                            </div>
                                            <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-zinc-600">
                                                <span>Logic_Gate: 0{activeIndex + 1}</span>
                                                <span>Engine: v.2.0</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
