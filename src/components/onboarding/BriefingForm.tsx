"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface BriefingFormProps {
    projectName: string;
    setProjectName: (val: string) => void;
    category: string;
    setCategory: (val: string) => void;
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        contact?: string;
    };
    setPersonalInfo: (info: BriefingFormProps['personalInfo']) => void;
}

const CATEGORIES = [
    { label: "ALL", key: "all" },
    { label: "LANDING_PAGE", key: "landing" },
    { label: "E-COMMERCE", key: "ecommerce" },
    { label: "SAAS", key: "saas" },
    { label: "PORTFOLIO", key: "portfolio" },
    { label: "CREATIVE", key: "creative" },
    { label: "CORPORATE", key: "corporate" }
];

export default function BriefingForm({
    projectName,
    setProjectName,
    category,
    setCategory,
    personalInfo,
    setPersonalInfo,
}: BriefingFormProps) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === "ar";
    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Project Name Input */}
                <div className="relative group/field">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-3 block group-focus-within/field:text-brand-blue transition-colors">
                        {t('onboarding.briefing.nameLabel')}
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder={t('onboarding.briefing.namePlaceholder')}
                            className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-brand-blue/50 focus:bg-white/5 transition-all duration-300 font-sans"
                        />
                        <motion.div
                            initial={false}
                            animate={{ scaleX: projectName ? 1 : 0 }}
                            className={`absolute bottom-0 left-0 right-0 h-px bg-brand-blue ${isRtl ? 'origin-right' : 'origin-left'}`}
                        />
                    </div>
                </div>

                {/* Category Selector */}
                <div className="relative group/field">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-3 block group-focus-within/field:text-brand-blue transition-colors">
                        {t('onboarding.briefing.categoryLabel')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.label}
                                onClick={() => setCategory(cat.label)}
                                className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all duration-300 ${category === cat.label
                                    ? "bg-brand-blue border-brand-blue text-white"
                                    : "bg-transparent border-white/10 text-neutral-500 hover:border-white/30 hover:text-white"
                                    }`}
                            >
                                {t(`onboarding.categories.${cat.key}`)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Personal Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Full Name */}
                <div className="relative group/field">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-3 block group-focus-within/field:text-brand-blue transition-colors">
                        {t('onboarding.briefing.fullName')} *
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={personalInfo.fullName}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                            placeholder={t('onboarding.briefing.fullNamePlaceholder')}
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-brand-blue/50 focus:bg-white/5 transition-all duration-300 font-sans"
                        />
                        <motion.div
                            initial={false}
                            animate={{ scaleX: personalInfo.fullName ? 1 : 0 }}
                            className={`absolute bottom-0 left-0 right-0 h-px bg-brand-blue ${isRtl ? 'origin-right' : 'origin-left'}`}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="relative group/field">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-3 block group-focus-within/field:text-brand-blue transition-colors">
                        {t('onboarding.briefing.email')} *
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                            placeholder={t('onboarding.briefing.emailPlaceholder')}
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-brand-blue/50 focus:bg-white/5 transition-all duration-300 font-sans"
                        />
                        <motion.div
                            initial={false}
                            animate={{ scaleX: personalInfo.email ? 1 : 0 }}
                            className={`absolute bottom-0 left-0 right-0 h-px bg-brand-blue ${isRtl ? 'origin-right' : 'origin-left'}`}
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="relative group/field">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-3 block group-focus-within/field:text-brand-blue transition-colors">
                        {t('onboarding.briefing.phone')} *
                    </label>
                    <div className="relative">
                        <input
                            type="tel"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                            placeholder={t('onboarding.briefing.phonePlaceholder')}
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-brand-blue/50 focus:bg-white/5 transition-all duration-300 font-sans"
                        />
                        <motion.div
                            initial={false}
                            animate={{ scaleX: personalInfo.phone ? 1 : 0 }}
                            className={`absolute bottom-0 left-0 right-0 h-px bg-brand-blue ${isRtl ? 'origin-right' : 'origin-left'}`}
                        />
                    </div>
                </div>

                {/* Optional Contact */}
                <div className="relative group/field">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-3 block group-focus-within/field:text-brand-blue transition-colors">
                        {t('onboarding.briefing.contact')}
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={personalInfo.contact || ''}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, contact: e.target.value })}
                            placeholder={t('onboarding.briefing.contactPlaceholder')}
                            className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-brand-blue/50 focus:bg-white/5 transition-all duration-300 font-sans"
                        />
                        <motion.div
                            initial={false}
                            animate={{ scaleX: personalInfo.contact ? 1 : 0 }}
                            className={`absolute bottom-0 left-0 right-0 h-px bg-brand-blue ${isRtl ? 'origin-right' : 'origin-left'}`}
                        />
                    </div>
                </div>
            </div>

            {/* Decorative Divider */}
            <div className={`relative h-px w-full ${isRtl ? 'bg-linear-to-l' : 'bg-linear-to-r'} from-transparent via-white/10 to-transparent`}>
                <motion.div
                    animate={{ left: isRtl ? ["100%", "0%"] : ["0%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-0 w-20 h-full ${isRtl ? 'bg-linear-to-l' : 'bg-linear-to-r'} from-transparent via-brand-blue/40 to-transparent`}
                />
            </div>
        </div>
    );
}
