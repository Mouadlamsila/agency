"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SelectedWork() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation('common');

    const projects = [
        {
            id: "01",
            title: t('selectedWork.projects.0.title'),
            outcome: t('selectedWork.projects.0.outcome'),
            industry: t('selectedWork.projects.0.industry'),
            platform: t('selectedWork.projects.0.platform'),
            scope: t('selectedWork.projects.0.scope'),
            color: "#0066FF"
        },
        {
            id: "02",
            title: t('selectedWork.projects.1.title'),
            outcome: t('selectedWork.projects.1.outcome'),
            industry: t('selectedWork.projects.1.industry'),
            platform: t('selectedWork.projects.1.platform'),
            scope: t('selectedWork.projects.1.scope'),
            color: "#0066FF"
        },
        {
            id: "03",
            title: t('selectedWork.projects.2.title'),
            outcome: t('selectedWork.projects.2.outcome'),
            industry: t('selectedWork.projects.2.industry'),
            platform: t('selectedWork.projects.2.platform'),
            scope: t('selectedWork.projects.2.scope'),
            color: "#0066FF"
        },
        {
            id: "04",
            title: t('selectedWork.projects.3.title'),
            outcome: t('selectedWork.projects.3.outcome'),
            industry: t('selectedWork.projects.3.industry'),
            platform: t('selectedWork.projects.3.platform'),
            scope: t('selectedWork.projects.3.scope'),
            color: "#0066FF"
        }
    ];
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Custom expo.out easing for heavy, intentional movement
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
    const springX = useSpring(x, { stiffness: 50, damping: 20, restDelta: 0.001 });

    return (
        <section
            id="work"
            ref={sectionRef}
            className="relative h-[400vh] bg-[#0A0A0A] text-zinc-100 selection:bg-[#0066FF]/30"
        >
            {/* Noise Overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>

            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                {/* Background Text / Progress */}
                <div className="absolute left-12 top-12 z-10">
                    <motion.div
                        className="h-[1px] bg-[#0066FF]"
                        style={{ width: useTransform(scrollYProgress, [0, 1], ["0px", "200px"]) }}
                    />
                    <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                        {t('selectedWork.label')}
                    </span>
                </div>

                <motion.div style={{ x: springX }} className="flex gap-[10vw] px-[10vw]">
                    {/* Intro Slide */}
                    <div className="flex h-[60vh] w-[35vw] flex-col justify-center shrink-0">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#0066FF]"
                        >
                            {t('selectedWork.subLabel')}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-8 text-7xl font-bold tracking-tighter md:text-9xl font-display leading-[0.85]"
                        >
                            {t('selectedWork.heading.line1')} <br />
                            <span className="text-zinc-800">{t('selectedWork.heading.line2')}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="mt-12 max-w-xs text-sm leading-relaxed text-zinc-500"
                        >
                            {t('selectedWork.description')}
                        </motion.p>
                    </div>

                    {/* Project Slides */}
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>
            </div>

            {/* Mobile View (Vertical Stack) - Hidden on Desktop */}
            <div className="md:hidden px-6 py-24 space-y-24">
                {projects.map((project) => (
                    <div key={project.id} className="space-y-6">
                        <div className="aspect-[4/5] w-full rounded-sm bg-zinc-900/50 border border-zinc-800 flex items-center justify-center overflow-hidden">
                            <AbstractUI />
                        </div>
                        <div className="space-y-2">
                            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">{project.industry}</span>
                            <h3 className="text-3xl font-display font-bold">{project.title}</h3>
                            <p className="text-zinc-400 text-sm">{project.outcome}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation('common');

    // Parallax effect for the internal UI
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

    return (
        <motion.div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex h-[75vh] w-[65vw] shrink-0 flex-col justify-between"
        >
            {/* Visual Frame */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-zinc-900/30 border border-zinc-800/50 transition-colors duration-500 group-hover:border-[#0066FF]/30">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <AbstractUI isHovered={isHovered} />
                </motion.div>
            </div>

            {/* Content */}
            <div className="mt-12 grid grid-cols-12 gap-8">
                <div className="col-span-8">
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-[10px] text-zinc-600">{project.id}</span>
                        <h3 className="text-4xl font-bold tracking-tight font-display transition-colors duration-500 group-hover:text-[#0066FF]">
                            {project.title}
                        </h3>
                    </div>
                    <p className="mt-4 text-xl text-zinc-400 font-sans leading-snug max-w-md">
                        {project.outcome}
                    </p>
                </div>

                <div className="col-span-4 flex flex-col justify-end space-y-2 border-l border-zinc-800 pl-8">
                    <div className="space-y-1">
                        <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">{t('selectedWork.labels.industry')}</p>
                        <p className="font-mono text-[10px] text-zinc-400">{project.industry}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">{t('selectedWork.labels.platform')}</p>
                        <p className="font-mono text-[10px] text-zinc-400">{project.platform}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">{t('selectedWork.labels.scope')}</p>
                        <p className="font-mono text-[10px] text-zinc-400">{project.scope}</p>
                    </div>
                </div>
            </div>

            {/* Hover Progress Indicator */}
            <motion.div
                className="absolute -bottom-4 left-0 h-[2px] bg-[#0066FF]"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "100%" : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
        </motion.div>
    );
}

function AbstractUI({ isHovered = false }: { isHovered?: boolean }) {
    return (
        <div className="relative h-full w-full p-12 opacity-40 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0">
            {/* Mock UI Elements */}
            <div className="h-full w-full border border-zinc-800 p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div className="h-2 w-24 bg-zinc-800" />
                    <div className="flex gap-2">
                        <div className="h-4 w-4 rounded-full border border-zinc-800" />
                        <div className="h-4 w-4 rounded-full border border-zinc-800" />
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-6">
                    <div className="col-span-2 border border-zinc-800 relative overflow-hidden">
                        <motion.div
                            animate={{
                                x: isHovered ? [0, 10, 0] : 0,
                                opacity: isHovered ? [0.5, 1, 0.5] : 0.5
                            }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0066FF]/10 to-transparent"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="h-12 border border-zinc-800" />
                        <div className="h-12 border border-zinc-800" />
                        <div className="flex-1 border border-zinc-800" />
                    </div>
                </div>
                <div className="h-8 border border-zinc-800 flex items-center px-4 gap-4">
                    <div className="h-1 w-full bg-zinc-800 overflow-hidden">
                        <motion.div
                            animate={{ scaleX: isHovered ? 1 : 0.3 }}
                            className="h-full w-full bg-[#0066FF] origin-left"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
