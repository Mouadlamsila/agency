"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Send, Mail, Phone, MapPin, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
    const { t } = useTranslation('common');
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setFormState({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setStatus("idle"), 3000);
        }, 2000);
    };

    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <main className="min-h-screen bg-brand-dark flex flex-col font-sans selection:bg-brand-blue selection:text-white">
            <Navbar />

            <section className="flex-1 relative pt-32 pb-20 px-6 lg:px-12 flex flex-col items-center">
                {/* Engineered Background Grid */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(to right, #404040 1px, transparent 1px), linear-gradient(to bottom, #404040 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    />
                    <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* LEFT COLUMN: Context & Info */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: expoOut }}
                        >
                            <span className="font-mono text-xs text-brand-blue tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                                {t('contactPage.title')} // SYSTEM_JUMPSTART
                            </span>

                            <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95] mb-8">
                                {t('contactPage.subtitle').split(' ').map((word, i) => (
                                    <span key={i} className={i === 1 ? "text-white/50" : ""}>{word} </span>
                                ))}
                            </h1>

                            <p className="text-neutral-400 text-lg leading-relaxed max-w-md mb-12">
                                We help forward-thinking companies build engineered digital systems.
                                Ready to scale your capabilities?
                            </p>

                            {/* Contact Data Points */}
                            <div className="grid grid-cols-1 gap-6">
                                <ContactItem
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Direct Channel"
                                    value={t('contactPage.info.email')}
                                    delay={0.2}
                                />
                                <ContactItem
                                    icon={<Phone className="w-5 h-5" />}
                                    label="Voice Link"
                                    value={t('contactPage.info.phone')}
                                    delay={0.3}
                                />
                                <ContactItem
                                    icon={<MapPin className="w-5 h-5" />}
                                    label="Base of Operations"
                                    value={t('contactPage.info.address')}
                                    delay={0.4}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: The Interface (Form) */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: expoOut, delay: 0.2 }}
                            className="relative bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 lg:p-12 overflow-hidden group"
                        >
                            {/* Decorative scan line */}
                            <motion.div
                                animate={{ top: ['0%', '100%'], opacity: [0, 0.5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                className="absolute left-0 right-0 h-px bg-brand-blue/30 pointer-events-none"
                            />

                            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-8 border-b border-white/5 pb-4 flex justify-between items-center">
                                <span>Input_Parameters</span>
                                <span className="text-brand-blue">v2.0</span>
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput
                                        label={t('contactPage.form.name')}
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        placeholder="Enter designation..."
                                    />
                                    <FormInput
                                        label={t('contactPage.form.email')}
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        placeholder="name@company.com"
                                    />
                                </div>
                                <FormInput
                                    label={t('contactPage.form.subject')}
                                    name="subject"
                                    value={formState.subject}
                                    onChange={handleChange}
                                    placeholder="Briefing title..."
                                />
                                <div className="relative group/field">
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 block group-focus-within/field:text-brand-blue transition-colors">
                                        {t('contactPage.form.message')}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-700 focus:outline-none focus:border-brand-blue/50 focus:bg-white/5 transition-all duration-300 resize-none font-sans"
                                        placeholder="Transmit project details..."
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    disabled={status === "sending" || status === "success"}
                                    type="submit"
                                    className={`relative w-full h-14 overflow-hidden rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 ${status === 'success'
                                        ? 'bg-green-500/10 text-green-500 border border-green-500/50'
                                        : status === 'error'
                                            ? 'bg-red-500/10 text-red-500 border border-red-500/50'
                                            : 'bg-brand-blue text-white hover:bg-brand-blue/90 border border-brand-blue'
                                        }`}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {status === 'idle' && (
                                            <>
                                                {t('contactPage.form.submit')}
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                        {status === 'sending' && (
                                            <>
                                                Scanning
                                                <span className="animate-pulse">...</span>
                                            </>
                                        )}
                                        {status === 'success' && (
                                            <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                {t('contactPage.form.success')}
                                            </>
                                        )}
                                    </span>
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

function ContactItem({ icon, label, value, delay }: { icon: React.ReactNode, label: string, value: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.8 }}
            className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all duration-300 group"
        >
            <div className="p-3 rounded-lg bg-white/5 text-neutral-400 group-hover:text-brand-blue group-hover:bg-brand-blue/10 transition-colors">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
                <p className="text-white font-medium group-hover:text-white transition-colors">{value}</p>
            </div>
        </motion.div>
    );
}

function FormInput({ label, name, value, onChange, placeholder, type = "text" }: any) {
    return (
        <div className="relative group/field">
            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 block group-focus-within/field:text-brand-blue transition-colors">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-700 focus:outline-none focus:border-brand-blue/50 focus:bg-white/5 transition-all duration-300 font-sans"
                placeholder={placeholder}
            />
        </div>
    );
}
