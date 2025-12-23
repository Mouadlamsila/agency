"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
    {
        title: "VENTRILOQ",
        category: "Digital Architecture",
        description: "A study in minimalist digital systems.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    },
    {
        title: "AGENT VOICE",
        category: "AI Infrastructure",
        description: "Engineering the future of vocal intelligence.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
    },
    {
        title: "CODER",
        category: "System Design",
        description: "High-performance environments for creators.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    },
    {
        title: "QUANTUM",
        category: "Commerce Logic",
        description: "Redefining the mechanics of digital trade.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    }
];

export default function SelectedWork() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-[#0A0A0A]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-20 px-20">
                    {/* Intro Slide */}
                    <div className="flex h-[60vh] w-[40vw] flex-col justify-center shrink-0">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600"
                        >
                            Portfolio
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.1 }}
                            className="mt-6 text-6xl font-bold tracking-tight md:text-8xl font-display"
                        >
                            Selected <br />
                            <span className="text-zinc-500">Work.</span>
                        </motion.h2>
                    </div>

                    {/* Project Slides */}
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const imageX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div ref={cardRef} className="group relative h-[70vh] w-[80vw] shrink-0 overflow-hidden rounded-2xl bg-zinc-900 md:w-[60vw]">
            <motion.div style={{ x: imageX }} className="absolute inset-0 h-full w-[120%]">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-50 transition-opacity duration-700 group-hover:opacity-70"
                />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
                <div className="max-w-md">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-400"
                    >
                        {project.category}
                    </motion.span>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1 }}
                        className="mt-2 text-4xl font-bold tracking-tight md:text-6xl font-display text-zinc-100"
                    >
                        {project.title}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mt-4 font-sans text-sm text-zinc-500"
                    >
                        {project.description}
                    </motion.p>
                </div>

                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm md:flex"
                >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                        <path d="M3.64645 11.3536C3.45118 11.5488 3.45118 11.8654 3.64645 12.0607C3.84171 12.2559 4.15829 12.2559 4.35355 12.0607L3.64645 11.3536ZM12.0607 4.35355C12.2559 4.15829 12.2559 3.84171 12.0607 3.64645L8.87868 0.464466C8.68342 0.269204 8.36683 0.269204 8.17157 0.464466C7.97631 0.659728 7.97631 0.976311 8.17157 1.17157L11 4L8.17157 6.82843C7.97631 7.02369 7.97631 7.34027 8.17157 7.53553C8.36683 7.7308 8.68342 7.7308 8.87868 7.53553L12.0607 4.35355ZM4.35355 12.0607L12.0607 4.35355L11.3536 3.64645L3.64645 11.3536L4.35355 12.0607Z" fill="currentColor" />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
}
