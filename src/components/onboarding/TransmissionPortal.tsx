"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Terminal, ShieldCheck, ArrowLeft, Send, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface TransmissionPortalProps {
    data: {
        projectName: string;
        category: string;
        templateId: string;
    };
    onConfirm: () => void;
    onCancel: () => void;
    isUploading: boolean;
}

const CATEGORY_MAP: Record<string, string> = {
    "ALL": "all",
    "E-COMMERCE": "ecommerce",
    "SAAS": "saas",
    "CREATIVE": "creative"
};

export default function TransmissionPortal({
    data,
    onConfirm,
    onCancel,
    isUploading,
}: TransmissionPortalProps) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === "ar";
    const [lines, setLines] = useState<string[]>([]);
    const timestamp = new Date().toISOString();

    const terminalLines = [
        `> ${t('onboarding.transmission.terminal.init')}`,
        `> ${t('onboarding.transmission.terminal.auth')}`,
        `> ${t('onboarding.transmission.terminal.project')} "${data.projectName.toUpperCase()}"`,
        `> ${t('onboarding.transmission.terminal.category')} ${t(`onboarding.categories.${CATEGORY_MAP[data.category] || data.category.toLowerCase()}`).toUpperCase()}`,
        `> ${t('onboarding.transmission.terminal.template')} MOD_${data.templateId}`,
        `> ${t('onboarding.transmission.terminal.timestamp')} ${timestamp}`,
        `> ${t('onboarding.transmission.terminal.encrypt')}`,
        `> ${t('onboarding.transmission.terminal.ready')}`,
    ];

    useEffect(() => {
        if (lines.length < terminalLines.length) {
            const timeout = setTimeout(() => {
                setLines(prev => [...prev, terminalLines[prev.length]]);
            }, 150);
            return () => clearTimeout(timeout);
        }
    }, [lines]);

    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: expoOut }}
                className={`relative w-full max-w-2xl glass-panel border-white/10 overflow-hidden ${isRtl ? 'font-arabic' : ''}`}
            >
                {/* Visual Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/2">
                    <div className="flex items-center gap-3">
                        <Terminal className="w-4 h-4 text-brand-blue" />
                        <span className="font-mono text-[10px] tracking-[.3em] text-neutral-400 uppercase">
                            {t('onboarding.transmission.portal')}
                        </span>
                    </div>
                    {!isUploading && (
                        <button
                            onClick={onCancel}
                            className="text-neutral-500 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="p-8 space-y-8">
                    {/* Terminal Display */}
                    <div className="bg-black/60 rounded-sm p-6 border border-white/5 font-mono text-[11px] leading-relaxed min-h-[220px]">
                        {lines.map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, x: isRtl ? 5 : -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={i >= 2 && i <= 5 ? "text-brand-blue" : "text-neutral-500"}
                            >
                                {line}
                            </motion.p>
                        ))}
                        {lines.length === terminalLines.length && !isUploading && (
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2 bg-brand-blue"
                            >
                                _
                            </motion.span>
                        )}

                        {isUploading && (
                            <div className="mt-6 space-y-4">
                                <p className="text-white animate-pulse">{t('onboarding.transmission.status.syncing')}</p>
                                <div className="h-1 w-full bg-white/5 relative overflow-hidden">
                                    <motion.div
                                        initial={{ x: isRtl ? "100%" : "-100%" }}
                                        animate={{ x: "0%" }}
                                        transition={{ duration: 3, ease: "easeInOut" }}
                                        className="absolute inset-0 bg-brand-blue"
                                    />
                                    <motion.div
                                        animate={{ x: isRtl ? ["100%", "-200%"] : ["-100%", "200%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className={`absolute inset-0 bg-white/40 ${isRtl ? '-skew-x-12' : 'skew-x-12'}`}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    {!isUploading && (
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onCancel}
                                className="flex-1 px-8 py-4 border border-white/5 text-neutral-500 font-mono text-[10px] uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-3"
                            >
                                {isRtl ? <ArrowRight className="w-3 h-3" /> : <ArrowLeft className="w-3 h-3" />}
                                {t('onboarding.actions.abort')}
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 px-8 py-4 bg-brand-blue text-white font-mono text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(46,92,255,0.2)]"
                            >
                                {t('onboarding.actions.confirm')}
                                <Send className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Background Decor */}
                <div className={`absolute -bottom-12 ${isRtl ? '-left-12' : '-right-12'} w-32 h-32 bg-brand-blue/10 blur-3xl pointer-events-none`} />
            </motion.div>
        </motion.div>
    );
}
