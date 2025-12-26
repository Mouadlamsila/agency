"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { div } from "framer-motion/client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface ExpertiseItem {
    id: string;
    title: string;
    label: string;
    description: string;
    supporting: string[];
    image: string;
}

const expertiseData: ExpertiseItem[] = [
    {
        id: "web",
        title: "Web Engineering",
        label: "Architecture",
        description: "Building high-performance, scalable web architectures that serve as the backbone of digital transformation.",
        supporting: ["Next.js", "TypeScript", "Performance"],
        image: "image1.jpg"
    },
    {
        id: "saas",
        title: "SaaS Infrastructure",
        label: "Systems",
        description: "Designing complex multi-tenant systems and cloud-native infrastructures for global scalability.",
        supporting: ["Cloud Native", "Scalability", "Security"],
        image: "image2.jpg"
    },
    {
        id: "uiux",
        title: "UI/UX Architecture",
        label: "Precision",
        description: "Engineering pixel-perfect, motion-driven interfaces that blend aesthetic excellence with functional logic.",
        supporting: ["Motion Design", "Design Systems", "UX Logic"],
        image: "image3.jpg"
    },
    {
        id: "enterprise",
        title: "Enterprise Solutions",
        label: "Complexity",
        description: "Solving intricate business problems through custom-engineered software and integrated digital ecosystems.",
        supporting: ["Custom ERP", "API Design", "Integration"],
        image: "image4.jpg"
    },
    {
        id: "strategy",
        title: "Digital Strategy",
        label: "Vision",
        description: "Aligning technical architecture with business objectives to ensure long-term systemic growth.",
        supporting: ["Roadmapping", "Consultancy", "Growth"],
        image: "image5.jpg"
    }
];

export default function Expertise() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="relative w-full sm:px-26 px-2 bg-[#0E0E11] pt-32 md:pt-48 pb-0">
            {/* Subtle Noise Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] bg-repeat" />

            <div className="container relative z-10 mx-auto px-6">
                <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-32">

                    {/* Left: Expertise Blocks */}
                    <div className="flex flex-col gap-12 pb-32 md:pb-48">
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
                                <ExpertiseRow
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    activeIndex={activeIndex}
                                    setActiveIndex={setActiveIndex}
                                />
                            ))}
                        </div>
                    </div>


                    {/* Right: Architectural Visuals */}
                    <div className="relative hidden lg:block min-h-[180vh]">
                        <div className="sticky top-[15vh]   h-[70vh] w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
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
                                        {/* Dynamic Visuals based on activeIndex */}
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.8, ease: expoOut }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={`/category/${expertiseData[activeIndex].image}`}
                                                alt={expertiseData[activeIndex].title}
                                                fill
                                                priority={activeIndex === 0}
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                                className="object-cover opacity-60 mix-blend-luminosity"
                                            />
                                            {/* Overlay Gradient for depth */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E11] via-transparent to-transparent opacity-60" />

                                            {/* Technical Labels Overlay */}
                                            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none z-20">
                                                <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-zinc-400">
                                                    <span>Module_{expertiseData[activeIndex].id}</span>
                                                    <span>Status: Active</span>
                                                </div>
                                                <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-zinc-400">
                                                    <span>Logic_Gate: 0{activeIndex + 1}</span>
                                                    <span>Engine: v.2.0</span>
                                                </div>
                                            </div>
                                        </motion.div>
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

function ExpertiseRow({ item, index, activeIndex, setActiveIndex }: {
    item: ExpertiseItem;
    index: number;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: "-40% 0px -40% 0px",
    });

    useEffect(() => {
        if (isInView) {
            setActiveIndex(index);
        }
    }, [isInView, index, setActiveIndex]);

    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.div
            ref={ref}
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
    );
}

