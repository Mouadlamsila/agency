"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TemplateCard from "./TemplateCard";
import { useTranslation } from "react-i18next";

interface Template {
    id: string;
    name: string;
    category: string;
    thumbnail: string;
}

interface TemplateGridProps {
    templates: Template[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export default function TemplateGrid({ templates, selectedId, onSelect }: TemplateGridProps) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === "ar";

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                    {t('onboarding.selection.availableModules')} <span className={`text-brand-blue ${isRtl ? 'mr-2' : 'ml-2'}`}>({templates.length})</span>
                </h2>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {templates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            isSelected={selectedId === template.id}
                            onSelect={onSelect}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {templates.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 border border-dashed border-white/5 rounded-sm"
                >
                    <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
                        {t('onboarding.selection.noModules')}
                    </span>
                </motion.div>
            )}
        </div>
    );
}
