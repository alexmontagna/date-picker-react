import { lang } from './DatePicker';

export const translate = (word) => {
    const translations = {
        'en': {
            'Day': 'Day',
            'Month': 'Month',
            'Year': 'Year',
            'selectDate': 'Select a date',
            'dayOutOfRange': 'Day was out of range, so it was set to the last day of the month.'
        },
        'it': {
            'Day': 'Giorno',
            'Month': 'Mese',
            'Year': 'Anno',
            'selectDate': 'Seleziona una data',
            'dayOutOfRange': 'Il giorno era fuori dal range, quindi è stato impostato all\'ultimo giorno del mese.'
        },
        // Add more languages as needed
    };
    return translations[lang] ? translations[lang][word] : word;
};
