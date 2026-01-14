"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Upload, CheckCircle2, X, ArrowRight, Image as ImageIcon } from "lucide-react";

export default function ClientBriefingPage() {
    const { t, i18n } = useTranslation('common');
    const isRtl = i18n.language === "ar";
    const expoOut = [0.16, 1, 0.3, 1] as const;

    const [formData, setFormData] = useState({
        // Brand Identity
        logo: null as File | null,
        logoPreview: "",
        productName: "",
        brandDescription: "",
        colors: [] as string[],
        selectedColors: [] as string[],
        
        // Project Type
        projectType: "",
        
        // Style Preferences
        style: "",
        animation: "",
        
        // Typography
        preferredFonts: "",
        
        // Content
        targetAudience: "",
        contentReady: "",
        referenceWebsites: "",
        
        // Technical
        specialRequirements: "",
        integrations: "",
        
        // Timeline
        preferredTimeline: "",
        
        // Additional
        additionalNotes: "",
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const predefinedColors = [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
        { name: "Blue", value: "#2E5CFF" },
        { name: "Red", value: "#FF0000" },
        { name: "Green", value: "#00FF00" },
        { name: "Yellow", value: "#FFFF00" },
        { name: "Purple", value: "#8000FF" },
        { name: "Orange", value: "#FF8000" },
        { name: "Pink", value: "#FF00FF" },
        { name: "Gray", value: "#808080" },
    ];

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({
                ...formData,
                logo: file,
                logoPreview: URL.createObjectURL(file)
            });
        }
    };

    const handleColorToggle = (color: string) => {
        const colors = formData.selectedColors.includes(color)
            ? formData.selectedColors.filter(c => c !== color)
            : [...formData.selectedColors, color];
        setFormData({ ...formData, selectedColors: colors });
    };

    const handleColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (value && value.match(/^#[0-9A-Fa-f]{6}$/) && !formData.colors.includes(value)) {
            setFormData({
                ...formData,
                colors: [...formData.colors, value]
            });
            e.target.value = "";
        }
    };

    const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value && !formData.colors.includes(value)) {
            setFormData({
                ...formData,
                colors: [...formData.colors, value]
            });
        }
    };

    const removeCustomColor = (color: string) => {
        setFormData({
            ...formData,
            colors: formData.colors.filter(c => c !== color)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('productName', formData.productName);
            formDataToSend.append('brandDescription', formData.brandDescription);
            formDataToSend.append('projectType', formData.projectType);
            formDataToSend.append('style', formData.style);
            formDataToSend.append('animation', formData.animation);
            formDataToSend.append('preferredFonts', formData.preferredFonts);
            formDataToSend.append('targetAudience', formData.targetAudience);
            formDataToSend.append('contentReady', formData.contentReady);
            formDataToSend.append('referenceWebsites', formData.referenceWebsites);
            formDataToSend.append('specialRequirements', formData.specialRequirements);
            formDataToSend.append('integrations', formData.integrations);
            formDataToSend.append('preferredTimeline', formData.preferredTimeline);
            formDataToSend.append('additionalNotes', formData.additionalNotes);
            formDataToSend.append('selectedColors', JSON.stringify(formData.selectedColors));
            formDataToSend.append('customColors', JSON.stringify(formData.colors));
            
            if (formData.logo) {
                formDataToSend.append('logo', formData.logo);
            }

            const response = await fetch('/api/client-briefing', {
                method: 'POST',
                body: formDataToSend
            });

            if (response.ok) {
                setStatus("success");
                setTimeout(() => {
                    setStatus("idle");
                    // Reset form
                    setFormData({
                        logo: null,
                        logoPreview: "",
                        productName: "",
                        brandDescription: "",
                        colors: [],
                        selectedColors: [],
                        projectType: "",
                        style: "",
                        animation: "",
                        preferredFonts: "",
                        targetAudience: "",
                        contentReady: "",
                        referenceWebsites: "",
                        specialRequirements: "",
                        integrations: "",
                        preferredTimeline: "",
                        additionalNotes: "",
                    });
                }, 3000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch (error) {
            console.error("BRIEFING_SUBMISSION_ERROR:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

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
                <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-brand-blue/5 blur-[160px] rounded-full" />
                <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-brand-violet/5 blur-[160px] rounded-full" />
            </div>

            <section className="relative z-10 flex-1 pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: expoOut }}
                        className="text-center space-y-4"
                    >
                        <span className="font-mono text-[10px] tracking-[0.4em] text-brand-blue uppercase">
                            {t('clientBriefing.label')}
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-bold font-display tracking-tight text-white leading-none">
                            {t('clientBriefing.title')}
                        </h1>
                        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                            {t('clientBriefing.description')}
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: expoOut }}
                        className="glass-panel p-8 md:p-12 border-white/10 bg-white/2"
                    >
                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Brand Identity Section */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-px flex-1 bg-white/5" />
                                    <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                                        {t('clientBriefing.sections.brandIdentity')}
                                    </h2>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Logo Upload */}
                                    <div className="relative group/field">
                                        <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-3 block">
                                            {t('clientBriefing.logo')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                                className="hidden"
                                                id="logo-upload"
                                            />
                                            <label
                                                htmlFor="logo-upload"
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-sm cursor-pointer hover:border-brand-blue/50 transition-colors bg-black/20"
                                            >
                                                {formData.logoPreview ? (
                                                    <div className="relative w-full h-full">
                                                        <img
                                                            src={formData.logoPreview}
                                                            alt="Logo preview"
                                                            className="w-full h-full object-contain p-4"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setFormData({ ...formData, logo: null, logoPreview: "" });
                                                            }}
                                                            className="absolute top-2 right-2 p-1 bg-black/80 rounded-full hover:bg-red-500 transition-colors"
                                                        >
                                                            <X className="w-3 h-3 text-white" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Upload className="w-8 h-8 text-neutral-500 mb-2" />
                                                        <span className="text-xs text-neutral-500 font-mono">
                                                            {t('clientBriefing.uploadLogo')}
                                                        </span>
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    {/* Product Name */}
                                    <FormField
                                        label={t('clientBriefing.productName')}
                                        required
                                        value={formData.productName}
                                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                        placeholder={t('clientBriefing.productNamePlaceholder')}
                                    />
                                </div>

                                {/* Brand Description */}
                                <FormField
                                    label={t('clientBriefing.brandDescription')}
                                    value={formData.brandDescription}
                                    onChange={(e) => setFormData({ ...formData, brandDescription: e.target.value })}
                                    placeholder={t('clientBriefing.brandDescriptionPlaceholder')}
                                    textarea
                                    rows={4}
                                />

                                {/* Colors */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block">
                                        {t('clientBriefing.colors')}
                                    </label>
                                    
                                    {/* Predefined Colors */}
                                    <div className="flex flex-wrap gap-3">
                                        {predefinedColors.map((color) => (
                                            <button
                                                key={color.value}
                                                type="button"
                                                onClick={() => handleColorToggle(color.value)}
                                                className={`w-12 h-12 rounded-sm border-2 transition-all ${
                                                    formData.selectedColors.includes(color.value)
                                                        ? "border-brand-blue scale-110 ring-2 ring-brand-blue/50"
                                                        : "border-white/10 hover:border-white/30"
                                                }`}
                                                style={{ backgroundColor: color.value }}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>

                                    {/* Custom Color Input */}
                                    <div className="flex gap-3">
                                        <input
                                            type="color"
                                            onChange={handleColorPicker}
                                            className="w-16 h-12 border border-white/10 rounded-sm cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            placeholder={t('clientBriefing.customColorPlaceholder')}
                                            onChange={handleColorInput}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const target = e.target as HTMLInputElement;
                                                    const value = target.value.trim();
                                                    if (value && value.match(/^#[0-9A-Fa-f]{6}$/) && !formData.colors.includes(value)) {
                                                        setFormData({
                                                            ...formData,
                                                            colors: [...formData.colors, value]
                                                        });
                                                        target.value = "";
                                                    }
                                                }
                                            }}
                                            className="flex-1 bg-black/40 border border-white/10 rounded-sm px-6 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-brand-blue/50 focus:bg-white/5 transition-all duration-300 font-sans"
                                        />
                                    </div>

                                    {/* Selected Colors Display */}
                                    {formData.colors.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {formData.colors.map((color, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-white/10 rounded-sm"
                                                >
                                                    <div
                                                        className="w-4 h-4 rounded-sm"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                    <span className="text-xs text-neutral-400 font-mono">{color}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCustomColor(color)}
                                                        className="text-neutral-500 hover:text-white"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Project Details Section */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-px flex-1 bg-white/5" />
                                    <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                                        {t('clientBriefing.sections.projectDetails')}
                                    </h2>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Project Type */}
                                    <SelectField
                                        label={t('clientBriefing.projectType')}
                                        required
                                        value={formData.projectType}
                                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                        options={[
                                            { value: "", label: t('clientBriefing.selectProjectType') },
                                            { value: "website", label: t('clientBriefing.types.website') },
                                            { value: "webapp", label: t('clientBriefing.types.webapp') },
                                            { value: "mobile", label: t('clientBriefing.types.mobile') },
                                            { value: "ecommerce", label: t('clientBriefing.types.ecommerce') },
                                            { value: "saas", label: t('clientBriefing.types.saas') },
                                            { value: "landing", label: t('clientBriefing.types.landing') },
                                        ]}
                                    />

                                    {/* Style */}
                                    <SelectField
                                        label={t('clientBriefing.style')}
                                        required
                                        value={formData.style}
                                        onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                                        options={[
                                            { value: "", label: t('clientBriefing.selectStyle') },
                                            { value: "modern", label: t('clientBriefing.styles.modern') },
                                            { value: "classic", label: t('clientBriefing.styles.classic') },
                                            { value: "minimalist", label: t('clientBriefing.styles.minimalist') },
                                            { value: "bold", label: t('clientBriefing.styles.bold') },
                                            { value: "elegant", label: t('clientBriefing.styles.elegant') },
                                            { value: "playful", label: t('clientBriefing.styles.playful') },
                                        ]}
                                    />
                                </div>

                                {/* Animation */}
                                <SelectField
                                    label={t('clientBriefing.animation')}
                                    required
                                    value={formData.animation}
                                    onChange={(e) => setFormData({ ...formData, animation: e.target.value })}
                                    options={[
                                        { value: "", label: t('clientBriefing.selectAnimation') },
                                        { value: "yes", label: t('clientBriefing.animationOptions.yes') },
                                        { value: "no", label: t('clientBriefing.animationOptions.no') },
                                        { value: "minimal", label: t('clientBriefing.animationOptions.minimal') },
                                        { value: "extensive", label: t('clientBriefing.animationOptions.extensive') },
                                    ]}
                                />

                                {/* Preferred Fonts */}
                                <FormField
                                    label={t('clientBriefing.preferredFonts')}
                                    value={formData.preferredFonts}
                                    onChange={(e) => setFormData({ ...formData, preferredFonts: e.target.value })}
                                    placeholder={t('clientBriefing.preferredFontsPlaceholder')}
                                />
                            </div>

                            {/* Content & Audience Section */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-px flex-1 bg-white/5" />
                                    <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                                        {t('clientBriefing.sections.content')}
                                    </h2>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>

                                <FormField
                                    label={t('clientBriefing.targetAudience')}
                                    value={formData.targetAudience}
                                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                    placeholder={t('clientBriefing.targetAudiencePlaceholder')}
                                    textarea
                                    rows={3}
                                />

                                <SelectField
                                    label={t('clientBriefing.contentReady')}
                                    value={formData.contentReady}
                                    onChange={(e) => setFormData({ ...formData, contentReady: e.target.value })}
                                    options={[
                                        { value: "", label: t('clientBriefing.selectContentReady') },
                                        { value: "yes", label: t('clientBriefing.contentOptions.yes') },
                                        { value: "partial", label: t('clientBriefing.contentOptions.partial') },
                                        { value: "no", label: t('clientBriefing.contentOptions.no') },
                                    ]}
                                />

                                <FormField
                                    label={t('clientBriefing.referenceWebsites')}
                                    value={formData.referenceWebsites}
                                    onChange={(e) => setFormData({ ...formData, referenceWebsites: e.target.value })}
                                    placeholder={t('clientBriefing.referenceWebsitesPlaceholder')}
                                    textarea
                                    rows={3}
                                />
                            </div>

                            {/* Technical Requirements Section */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-px flex-1 bg-white/5" />
                                    <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                                        {t('clientBriefing.sections.technical')}
                                    </h2>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>

                                <FormField
                                    label={t('clientBriefing.specialRequirements')}
                                    value={formData.specialRequirements}
                                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                                    placeholder={t('clientBriefing.specialRequirementsPlaceholder')}
                                    textarea
                                    rows={4}
                                />

                                <FormField
                                    label={t('clientBriefing.integrations')}
                                    value={formData.integrations}
                                    onChange={(e) => setFormData({ ...formData, integrations: e.target.value })}
                                    placeholder={t('clientBriefing.integrationsPlaceholder')}
                                    textarea
                                    rows={3}
                                />

                                <SelectField
                                    label={t('clientBriefing.preferredTimeline')}
                                    value={formData.preferredTimeline}
                                    onChange={(e) => setFormData({ ...formData, preferredTimeline: e.target.value })}
                                    options={[
                                        { value: "", label: t('clientBriefing.selectTimeline') },
                                        { value: "asap", label: t('clientBriefing.timelineOptions.asap') },
                                        { value: "1month", label: t('clientBriefing.timelineOptions.1month') },
                                        { value: "2-3months", label: t('clientBriefing.timelineOptions.2to3months') },
                                        { value: "3-6months", label: t('clientBriefing.timelineOptions.3to6months') },
                                        { value: "flexible", label: t('clientBriefing.timelineOptions.flexible') },
                                    ]}
                                />
                            </div>

                            {/* Additional Notes */}
                            <div className="space-y-4">
                                <FormField
                                    label={t('clientBriefing.additionalNotes')}
                                    value={formData.additionalNotes}
                                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                                    placeholder={t('clientBriefing.additionalNotesPlaceholder')}
                                    textarea
                                    rows={5}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-8">
                                <motion.button
                                    type="submit"
                                    disabled={status === "submitting" || !formData.productName || !formData.projectType || !formData.style || !formData.animation}
                                    className={`w-full px-8 py-5 font-mono text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 ${
                                        status === "submitting" || !formData.productName || !formData.projectType || !formData.style || !formData.animation
                                            ? "bg-white/5 text-zinc-600 cursor-not-allowed border border-white/5"
                                            : "bg-brand-blue text-white hover:scale-[1.02]"
                                    }`}
                                    whileHover={status !== "submitting" && formData.productName && formData.projectType && formData.style && formData.animation ? { scale: 1.02 } : {}}
                                    whileTap={status !== "submitting" && formData.productName && formData.projectType && formData.style && formData.animation ? { scale: 0.98 } : {}}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        {status === "idle" && (
                                            <>
                                                {t('clientBriefing.submit')}
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                        {status === "submitting" && (
                                            <>
                                                {t('clientBriefing.submitting')}
                                                <span className="animate-pulse">...</span>
                                            </>
                                        )}
                                        {status === "success" && (
                                            <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                {t('clientBriefing.success')}
                                            </>
                                        )}
                                        {status === "error" && (
                                            <>
                                                <X className="w-4 h-4" />
                                                {t('clientBriefing.error')}
                                            </>
                                        )}
                                    </span>
                                    {formData.productName && formData.projectType && formData.style && formData.animation && status === "idle" && (
                                        <motion.div
                                            className="absolute inset-0 bg-white/10"
                                            animate={{ left: ["-100%", "100%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        />
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function FormField({
    label,
    value,
    onChange,
    placeholder,
    required,
    textarea,
    rows,
}: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    textarea?: boolean;
    rows?: number;
}) {
    const { i18n } = useTranslation();
    const isRtl = i18n.language === "ar";

    return (
        <div className="relative group/field">
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-3 block group-focus-within/field:text-brand-blue transition-colors">
                {label} {required && "*"}
            </label>
            {textarea ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    rows={rows}
                    className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-brand-blue/50 focus:bg-white/5 transition-all duration-300 font-sans resize-none"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 text-white placeholder-neutral-700 focus:outline-none focus:border-brand-blue/50 focus:bg-white/5 transition-all duration-300 font-sans"
                />
            )}
            <motion.div
                initial={false}
                animate={{ scaleX: value ? 1 : 0 }}
                className={`absolute bottom-0 left-0 right-0 h-px bg-brand-blue ${isRtl ? 'origin-right' : 'origin-left'}`}
            />
        </div>
    );
}

function SelectField({
    label,
    value,
    onChange,
    options,
    required,
}: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    required?: boolean;
}) {
    return (
        <div className="relative group/field">
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-3 block group-focus-within/field:text-brand-blue transition-colors">
                {label} {required && "*"}
            </label>
            <select
                value={value}
                onChange={onChange}
                required={required}
                className="w-full bg-black/40 border border-white/10 rounded-sm px-6 py-4 text-white focus:outline-none focus:border-brand-blue/50 focus:bg-white/5 transition-all duration-300 font-sans"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value} className="bg-black">
                        {option.label}
                    </option>
                ))}
            </select>
            <motion.div
                initial={false}
                animate={{ scaleX: value ? 1 : 0 }}
                className="absolute bottom-0 left-0 right-0 h-px bg-brand-blue"
            />
        </div>
    );
}
