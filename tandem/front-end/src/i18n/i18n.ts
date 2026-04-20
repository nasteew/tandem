import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enNavbar from './locales/en/navbar.json';
import ruNavbar from './locales/ru/navbar.json';
import enHero from './locales/en/hero.json';
import ruHero from './locales/ru/hero.json';
import enFeatures from './locales/en/features.json';
import ruFeatures from './locales/ru/features.json';
import enDashboard from './locales/en/dashboard.json';
import ruDashboard from './locales/ru/dashboard.json';
import enStatistic from './locales/en/statistic.json';
import ruStatistic from './locales/ru/statistic.json';
import enAuth from './locales/en/auth.json';
import ruAuth from './locales/ru/auth.json';
import enAgent from './locales/en/agent.json';
import ruAgent from './locales/ru/agent.json';
import enWidgets from './locales/en/widgets.json';
import ruWidgets from './locales/ru/widgets.json';
import enProfile from './locales/en/profile.json';
import ruProfile from './locales/ru/profile.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        navbar: enNavbar,
        hero: enHero,
        features: enFeatures,
        dashboard: enDashboard,
        statistic: enStatistic,
        auth: enAuth,
        agent: enAgent,
        widgets: enWidgets,
        profile: enProfile,
      },
      ru: {
        navbar: ruNavbar,
        hero: ruHero,
        features: ruFeatures,
        dashboard: ruDashboard,
        statistic: ruStatistic,
        auth: ruAuth,
        agent: ruAgent,
        widgets: ruWidgets,
        profile: ruProfile,
      },
    },
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    ns: [
      'navbar',
      'hero',
      'features',
      'dashboard',
      'statistic',
      'auth',
      'agent',
      'widgets',
      'profile',
    ],
    defaultNS: 'navbar',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
