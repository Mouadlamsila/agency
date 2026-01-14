"use client";
import { useTranslation } from "react-i18next";
import { Footer as FooterComponent } from "@/components/ui/modem-animated-footer";
import {
    Twitter,
    Linkedin,
    Github,
    Mail,
    Plus,
} from "lucide-react";

export default function Footer() {
    const { t } = useTranslation('common');
    const socialLinks = [
        {
            icon: <Twitter className="w-5 h-5" />,
            href: "https://twitter.com",
            label: "Twitter",
        },
        {
            icon: <Linkedin className="w-5 h-5" />,
            href: "https://linkedin.com",
            label: "LinkedIn",
        },
        {
            icon: <Github className="w-5 h-5" />,
            href: "https://github.com",
            label: "GitHub",
        },
        {
            icon: <Mail className="w-5 h-5" />,
            href: "mailto:contact@codsilla.com",
            label: "Email",
        },
    ];

    const navLinks = [
        { label: t('nav.work'), href: "/#work" },
        { label: t('nav.services'), href: "/#services" },
        { label: t('nav.pricing'), href: "/#engagement" },
        { label: t('nav.contact'), href: "/contact" },
    ];

    return (
        <FooterComponent
            brandName="CODSELLA"
            brandDescription="Full-Stack Freelance Duo. Engineering-driven, cinematic, high-conversion websites."
            socialLinks={socialLinks}
            navLinks={navLinks}
            creatorName="CODSELLA Team"
            creatorUrl="#"
            brandIcon={<Plus className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-brand-blue drop-shadow-lg" />}
            brandIconLink="/onboarding"
            className="bg-brand-dark"
        />
    );
}
