import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files from src directory
import enCommon from '../locales/en/common.json';
import frCommon from '../locales/fr/common.json';
import arCommon from '../locales/ar/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  fr: {
    common: frCommon,
  },
  ar: {
    common: arCommon,
  },
};

// Get saved language from localStorage or use browser language
const getSavedLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('i18nextLng');
    if (saved && (saved === 'en' || saved === 'fr' || saved === 'ar')) {
      return saved;
    }
    // Fallback to browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ar') return 'ar';
    return browserLang === 'fr' ? 'fr' : 'en';
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Force initial render to match server (en) to prevent hydration mismatch
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Important for App Router
    },
  });

// Save language to localStorage whenever it changes
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('i18nextLng', lng);
  }
});

export default i18n;
