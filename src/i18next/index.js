import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './languages/en';
import de from './languages/de';

const resources = { en, de };

i18n.use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        ns: ['global'],
        defaultNS: 'global',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
