"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Zap, CheckCircle2, Home, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BriefingForm from "@/components/onboarding/BriefingForm";
import TemplateGrid from "@/components/onboarding/TemplateGrid";
import TransmissionPortal from "@/components/onboarding/TransmissionPortal";
import { useTranslation } from "react-i18next";

const TEMPLATES_DATA = [
    {
        id: "01",
        name: "Nexus Store",
        category: "E-COMMERCE",
        thumbnail: "/templates/nexus_store_template_1766918258590.png",
    },
    {
        id: "02",
        name: "Vertex Dashboard",
        category: "SAAS",
        thumbnail: "/templates/vertex_dashboard_template_1766918273084.png",
    },
    {
        id: "03",
        name: "Aura Portfolio",
        category: "CREATIVE",
        thumbnail: "/templates/aura_portfolio_template_1766918285948.png",
    },
    {
        id: "04",
        name: "Prism Shop",
        category: "E-COMMERCE",
        thumbnail: "/templates/prism_shop_template_1766918299765.png",
    },
    {
        id: "05",
        name: "Flux Analytics",
        category: "SAAS",
        thumbnail: "/templates/vertex_dashboard_template_1766918273084.png", // Reusing image due to quota
    },
    {
        id: "06",
        name: "Zenith Studio",
        category: "CREATIVE",
        thumbnail: "/templates/aura_portfolio_template_1766918285948.png", // Reusing image due to quota
    },
];

export default function OnboardingPage() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === "ar";
    const [projectName, setProjectName] = useState("");
    const [category, setCategory] = useState("ALL");
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
    const [personalInfo, setPersonalInfo] = useState({
        fullName: "",
        email: "",
        phone: "",
        contact: "",
    });

    // Transmission States
    const [isReviewing, setIsReviewing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const filteredTemplates = useMemo(() => {
        if (category === "ALL") return TEMPLATES_DATA;
        return TEMPLATES_DATA.filter((t) => t.category === category);
    }, [category]);

    const handleTransmission = async () => {
        setIsUploading(true);

        try {
            const response = await fetch('/api/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectName,
                    category,
                    templateId: selectedTemplateId,
                    personalInfo
                })
            });

            if (response.ok) {
                // Buffer for animation visual weight
                setTimeout(() => {
                    setIsSuccess(true);
                    setIsUploading(false);
                    setIsReviewing(false);
                }, 3000);
            }
        } catch (error) {
            console.error("TRANSMISSION_ERROR:", error);
            setIsUploading(false);
        }
    };

    const expoOut = [0.16, 1, 0.3, 1] as const;

    if (isSuccess) {
        return (
            <main
                className={`min-h-screen bg-[#0A0A0A] flex flex-col font-sans selection:bg-brand-blue selection:text-white ${isRtl ? 'font-arabic' : ''}`}
                dir={isRtl ? 'rtl' : 'ltr'}
            >
                <Navbar />
                <section className="relative py-20 z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: expoOut }}
                        className="space-y-12 max-w-2xl"
                    >
                        <div className="flex justify-center">
                            <motion.div
                                initial={{ rotate: isRtl ? 20 : -20, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1, ease: expoOut }}
                                className="w-24 h-24 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center shadow-[0_0_50px_rgba(46,92,255,0.2)]"
                            >
                                <CheckCircle2 className="w-12 h-12 text-brand-blue" />
                            </motion.div>
                        </div>

                        <div className="space-y-4">
                            <span className="font-mono text-[10px] tracking-[0.4em] text-brand-blue uppercase">
                                {t('onboarding.transmission.status.complete')}
                            </span>
                            <h1 className="text-4xl lg:text-6xl font-bold font-display tracking-tight text-white uppercase leading-none">
                                {t('onboarding.success.title')}<br />
                                <span className="text-white/40">{t('onboarding.success.subtitle')}</span>
                            </h1>
                            <p className="text-zinc-500 font-sans text-lg max-w-md mx-auto">
                                {t('onboarding.success.description')}
                            </p>
                        </div>

                        <div className="pt-8">
                            <Link href="/">
                                <button className="group relative px-8 py-4 border border-white/10 text-zinc-400 hover:text-white transition-all font-mono text-xs uppercase tracking-widest flex items-center gap-3 mx-auto hover:bg-white/5">
                                    <Home className="w-4 h-4" />
                                    {t('onboarding.actions.return')}
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </section>
                <Footer />
            </main>
        );
    }

    return (
        <main
            className={`min-h-screen bg-[#0A0A0A] flex flex-col font-sans selection:bg-brand-blue selection:text-white ${isRtl ? 'font-arabic' : ''}`}
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <Navbar />

            {/* Architectural Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                {/* Brand Glow */}
                <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-brand-blue/5 blur-[160px] rounded-full" />
                <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-brand-violet/5 blur-[160px] rounded-full" />
            </div>

            <section className="relative z-10 flex-1 pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto space-y-24">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: expoOut }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                                <span className="font-mono text-[10px] tracking-[0.4em] text-zinc-500 uppercase">
                                    {t('onboarding.configurator.sequence')}
                                </span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold font-display tracking-tight text-white leading-none">
                                {t('onboarding.configurator.title')}<br />
                                <span className="text-white/40">{t('onboarding.configurator.subtitle')}</span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.2, ease: expoOut }}
                            className="glass-panel p-6 border-white/5 bg-white/2"
                        >
                            <div className="flex items-center gap-12">
                                <div className="space-y-1">
                                    <p className="font-mono text-[8px] text-zinc-600 uppercase">{t('onboarding.configurator.coreStatus')}</p>
                                    <p className="text-sm font-medium text-brand-blue">{t('onboarding.configurator.operational')}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-mono text-[8px] text-zinc-600 uppercase">{t('onboarding.configurator.selectedId')}</p>
                                    <p className="text-sm font-medium text-white">
                                        {selectedTemplateId ? `MOD_${selectedTemplateId}` : "NULL"}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Phase 1: Briefing */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="space-y-12"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-white/5" />
                            <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                                {t('onboarding.phases.01')}
                            </h2>
                            <div className="h-px flex-1 bg-white/5" />
                        </div>

                        <BriefingForm
                            projectName={projectName}
                            setProjectName={setProjectName}
                            category={category}
                            setCategory={setCategory}
                            personalInfo={personalInfo}
                            setPersonalInfo={setPersonalInfo}
                        />
                    </motion.div>

                    {/* Phase 2: Selection */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="space-y-12"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-white/5" />
                            <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                                {t('onboarding.phases.02')}
                            </h2>
                            <div className="h-px flex-1 bg-white/5" />
                        </div>

                        <TemplateGrid
                            templates={filteredTemplates}
                            selectedId={selectedTemplateId}
                            onSelect={setSelectedTemplateId}
                        />
                    </motion.div>

                    {/* Footer Action */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex justify-center pt-12"
                    >
                        <button
                            onClick={() => setIsReviewing(true)}
                            disabled={!projectName || !selectedTemplateId || !personalInfo.fullName || !personalInfo.email || !personalInfo.phone}
                            className={`group relative px-12 py-5 font-mono text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 ${projectName && selectedTemplateId && personalInfo.fullName && personalInfo.email && personalInfo.phone
                                ? "bg-brand-blue text-white hover:scale-105"
                                : "bg-white/5 text-zinc-600 cursor-not-allowed border border-white/5"
                                }`}
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                {t('onboarding.actions.initialize')}
                                {isRtl ? (
                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                )}
                            </span>
                            {projectName && selectedTemplateId && personalInfo.fullName && personalInfo.email && personalInfo.phone && (
                                <motion.div
                                    className="absolute inset-0 bg-white/10"
                                    animate={{ left: ["-100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            )}
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Phase 03: Transmission Portal Overlay */}
            <AnimatePresence>
                {isReviewing && (
                    <TransmissionPortal
                        data={{
                            projectName,
                            category,
                            templateId: selectedTemplateId || ""
                        }}
                        onConfirm={handleTransmission}
                        onCancel={() => setIsReviewing(false)}
                        isUploading={isUploading}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
