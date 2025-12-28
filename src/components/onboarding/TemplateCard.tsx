"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Template {
    id: string;
    name: string;
    category: string;
    thumbnail: string;
}

interface TemplateCardProps {
    template: Template;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const CATEGORY_MAP: Record<string, string> = {
    "E-COMMERCE": "ecommerce",
    "SAAS": "saas",
    "CREATIVE": "creative"
};

export default function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4 }}
            className={`group relative glass-panel rounded-sm overflow-hidden cursor-pointer transition-all duration-500 ${isSelected ? "border-brand-blue/60 ring-1 ring-brand-blue/30" : "hover:border-white/20"
                }`}
            onClick={() => onSelect(template.id)}
        >
            {/* Thumbnail */}
            <div className="relative aspect-16/10 overflow-hidden grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700">
                <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Active Indicator Overlay */}
                <AnimatePresence>
                    {isSelected && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-brand-blue/20 backdrop-blur-[2px] flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(46,92,255,0.5)]"
                            >
                                <Check className="text-white w-6 h-6" strokeWidth={3} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Scanline Effect */}
                <motion.div
                    animate={{ top: ["0%", "100%"], opacity: [0, 0.4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-brand-blue/50 pointer-events-none"
                />
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono tracking-[0.3em] text-brand-blue uppercase">
                        {t(`onboarding.categories.${CATEGORY_MAP[template.category] || template.category.toLowerCase()}`)}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-600 uppercase">
                        {t('onboarding.selection.idLabel')}{template.id}
                    </span>
                </div>
                <h3 className={`text-xl font-bold font-display tracking-tight transition-colors duration-300 ${isSelected ? "text-brand-blue" : "text-white"
                    }`}>
                    {template.name}
                </h3>
            </div>

            {/* Bottom Accent */}
            <motion.div
                initial={false}
                animate={{ height: isSelected ? 4 : 0 }}
                className="absolute bottom-0 left-0 right-0 bg-brand-blue"
            />
        </motion.div>
    );
}
