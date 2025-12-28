"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { t, i18n } = useTranslation('common');
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: t('nav.work'), href: "/#work" },
        { name: t('nav.services'), href: "/#services" },
        { name: t('nav.process'), href: "/#process" },
        { name: t('nav.pricing'), href: "/#engagement" },
        { name: t('nav.team'), href: "/#team" },
        { name: t('nav.testimonials'), href: "/#testimonials" },
        { name: t('nav.contact'), href: "/#contact" },
    ];

    // Subtle opacity shift on scroll
    const navBgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);

    useEffect(() => {
        const updateScrolled = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", updateScrolled);
        return () => window.removeEventListener("scroll", updateScrolled);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1], // expoOut-ish
                    delay: 0.2,
                }}
                className={cn(
                    "fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 md:py-8 transition-all duration-500",
                    isScrolled ? "py-4 md:py-6" : "py-6 md:py-8"
                )}
            >
                {/* Background Blur Overlay (Subtle) */}
                <motion.div
                    style={{ opacity: navBgOpacity }}
                    className="absolute inset-0 bg-brand-dark/50 backdrop-blur-md -z-10"
                />

                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group relative mix-blend-difference"
                    >
                        <span dir="ltr" className="font-display text-2xl font-bold tracking-tighter text-white">
                            CODSELLA<span className="text-brand-blue">.</span>
                        </span>
                        <motion.div
                            className="absolute -bottom-1 left-0 w-0 h-px bg-brand-blue group-hover:w-full transition-all duration-500 ease-expo"
                        />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex  items-center gap-10">
                        <div className="flex  items-center gap-8">
                            {navLinks.map((link) => (
                                <NavLink key={link.name} href={link.href}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* Language Switcher */}
                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                            <button
                                onClick={() => i18n.changeLanguage('en')}
                                className={cn(
                                    "px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
                                    i18n.language === 'en'
                                        ? "bg-brand-blue text-white"
                                        : "text-white/40 hover:text-white/60"
                                )}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => i18n.changeLanguage('fr')}
                                className={cn(
                                    "px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
                                    i18n.language === 'fr'
                                        ? "bg-brand-blue text-white"
                                        : "text-white/40 hover:text-white/60"
                                )}
                            >
                                FR
                            </button>
                            <button
                                onClick={() => i18n.changeLanguage('ar')}
                                className={cn(
                                    "px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
                                    i18n.language === 'ar'
                                        ? "bg-brand-blue text-white"
                                        : "text-white/40 hover:text-white/60"
                                )}
                            >
                                AR
                            </button>
                        </div>

                        {/* CTA Button */}
                        <MagneticButton>
                            <Link href="/onboarding" className="relative group px-8 py-2.5 rounded-full overflow-hidden border border-white/10 bg-white/5 hover:border-white/20 transition-colors duration-500 inline-block">
                                <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors duration-500">
                                    {t('nav.startProject')}
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    initial={false}
                                />
                            </Link>
                        </MagneticButton>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white p-2 mix-blend-difference"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-brand-dark flex flex-col items-center justify-center gap-8 p-12 md:hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="font-display text-4xl font-bold tracking-tighter text-white hover:text-brand-blue transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}

                        {/* Mobile Language Switcher */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5"
                        >
                            <button
                                onClick={() => i18n.changeLanguage('en')}
                                className={cn(
                                    "px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300",
                                    i18n.language === 'en'
                                        ? "bg-brand-blue text-white"
                                        : "text-white/40"
                                )}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => i18n.changeLanguage('fr')}
                                className={cn(
                                    "px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300",
                                    i18n.language === 'fr'
                                        ? "bg-brand-blue text-white"
                                        : "text-white/40"
                                )}
                            >
                                FR
                            </button>
                            <button
                                onClick={() => i18n.changeLanguage('ar')}
                                className={cn(
                                    "px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300",
                                    i18n.language === 'ar'
                                        ? "bg-brand-blue text-white"
                                        : "text-white/40"
                                )}
                            >
                                AR
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8"
                        >
                            <Link href="/onboarding" className="px-12 py-4 rounded-full border border-white/20 font-mono text-xs uppercase tracking-widest text-white">
                                {t('nav.startProject')}
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return (
        <Link
            href={href}
            className="group relative font-mono text-[12px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-500 mix-blend-difference"
        >
            {children}
            <motion.span
                className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500 ease-out"
            />
        </Link>
    );
};

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

export default Navbar;
