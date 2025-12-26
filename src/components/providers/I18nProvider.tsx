"use client";

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function I18nProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // Ensure i18n is initialized with the correct language from localStorage
        const savedLang = localStorage.getItem('i18nextLng');
        if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
            if (i18n.language !== savedLang) {
                i18n.changeLanguage(savedLang);
            }
        }
    }, []);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
