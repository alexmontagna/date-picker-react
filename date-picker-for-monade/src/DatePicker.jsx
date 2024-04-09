/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getDaysInMonth } from 'date-fns';
import { translate } from './translate';

export const lang = typeof document !== 'undefined' ? document.documentElement.lang || 'default' : 'default';

const getLocalizedMonths = () => {
    const formatter = new Intl.DateTimeFormat(lang, { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(0, i)));
};

const DatePicker = ({ isDarkMode, minDate, maxDate }) => {
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();
    const months = getLocalizedMonths();

    const defaultDay = translate('Day');
    const defaultMonth = translate('Month');
    const defaultYear = translate('Year');
    const defaultMessage = translate('selectDate');

    const [message, setMessage] = useState(defaultMessage);
    const [year, setYear] = useState(defaultYear);
    const [month, setMonth] = useState(defaultMonth);
    const [day, setDay] = useState(defaultDay);
    const [daysInMonth, setDaysInMonth] = useState(31);

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    useEffect(() => {
        if (year !== defaultYear && month !== defaultMonth && day !== defaultDay) {
            const monthIndex = months.indexOf(month);
            const newDaysInMonth = getDaysInMonth(new Date(year, monthIndex));
            setDaysInMonth(newDaysInMonth);
            if (day <= newDaysInMonth) {
                const selectedDate = new Date(year, monthIndex, day);
                setMessage(
                    <span style={{ color: isDarkMode ? '#FFDA40' : '#0945DF' }}>
                        {new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', day: 'numeric' }).format(selectedDate)}
                    </span>
                );
            }
            else if (day > newDaysInMonth) {
                console.log(`daysInMonth: ${daysInMonth} | if day (${day}) > newDaysInMonth (${newDaysInMonth})`);
                setDay(newDaysInMonth);
                setTimeout(() => {
                    if (typeof document !== 'undefined') {
                        document.documentElement.style.setProperty('--focus', 'var(--color-accent)');
                        setMessage(translate('dayOutOfRange'));
                        document.querySelector('select').focus();
                    }
                }, 50);
                setTimeout(() => {
                    if (typeof document !== 'undefined') {
                        document.documentElement.style.setProperty('--focus', 'var(--color-secondary)');
                    }
                }, 3000);
                
            }
        } 
    }, [year, month, day]);

    const baseClasses = "mr-2 p-2";
    const lightModeClasses = "bg-[#FFE88C] text-[#292929]";
    const darkModeClasses = "bg-gray-700 text-gray-100 border-2 border-[#FFE88C] rounded-lg";
    const classes = `${baseClasses} ${(isDarkMode ? darkModeClasses : lightModeClasses)}`;

    return (
        <>
            <div className={`rounded-lg text-center ${isDarkMode ? "p-4 m-4 mb-1 bg-gray-800" : "p-4 m-4 bg-yellow-300"}`}>
                <select className={classes} value={day} onChange={(e) => setDay(e.target.value)}>
                    <option>{defaultDay}</option>
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
                <select className={classes} value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option>{defaultMonth}</option>
                    {months.map((m, i) => (
                        <option key={i} value={m}>
                            {capitalizeFirstLetter(m)}
                        </option>
                    ))}
                </select>
                <select className={classes} value={year} onChange={(e) => setYear(e.target.value)}>
                    <option>{defaultYear}</option>
                    {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>
            <aside className={`rounded-lg text-center ${isDarkMode ? "p-0 mx-4 border border-slate-900 text-stone-400" : "p-0 mx-4 bg-yellow-300"}`}>
                {message}
            </aside>
        </>
    );
};

export default DatePicker;