let currentLang = 'en'; // Default language

export const getLang = () => currentLang;

export const setLang = (lang) => {
    currentLang = lang;
};

export const translate = (word, overrideLang) => {
    const translations = {
        'en': {
            'appTitle': 'Date Picker for Mònade',
            'Day': 'Day',
            'Month': 'Month',
            'Year': 'Year',
            'selectDate': 'Select a date',
            'dayOutOfRange': 'Day was out of range, so it was set to the last day of the month.',
            'selectYearRange': 'Select the year range:',
            'changeLanguage': 'Cambia all\'Italiano'
        },
        'it': {
            'appTitle': 'Selettore di date per Mònade',
            'Day': 'Giorno',
            'Month': 'Mese',
            'Year': 'Anno',
            'selectDate': 'Seleziona una data',
            'dayOutOfRange': 'Il giorno era fuori dal range, quindi è stato impostato all\'ultimo giorno del mese.',
            'selectYearRange': 'Seleziona l\'intervallo di anni:',
            'changeLanguage': 'Change to English'
        }
    };
    const currentLang = overrideLang || getLang();
    return translations[currentLang] ? translations[currentLang][word] : word;
};
