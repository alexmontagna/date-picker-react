import { useState, useEffect } from 'react';
import DatePicker from './DatePicker';
import { translate, setLang, getLang } from './translate';

const App = () => {
  const [lang, setAppLang] = useState(getLang());
  const [minDate, setMinDate] = useState(new Date(1900, 0, 1));
  const [maxDate, setMaxDate] = useState(new Date());
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'it' : 'en';
    setLang(newLang);
    setAppLang(newLang);
  };

  const handleMinYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    if (newYear >= 1000 && newYear <= maxDate.getFullYear()) {
      setMinDate(new Date(newYear, 0, 1));
    }
  };

  const handleMaxYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    if (newYear >= minDate.getFullYear() && newYear <= new Date().getFullYear()) {
      setMaxDate(new Date(newYear, 11, 31));
    }
  };

  return (
    <>
      <header className=" text-black p-4 text-center">
        <h1 className="text-xl font-bold">{translate('appTitle')}</h1>
        <div className="mt-2 bg-blue-500 text-white pt-3 pb-5 rounded-lg">
          <label htmlFor="year-range" className="block">{translate('selectYearRange')}</label>
          <div className="flex justify-center gap-2">
            <input
              id="min-year"
              type="number"
              value={minDate.getFullYear()}
              onChange={handleMinYearChange}
              className="mt-1 p-2 border border-gray-300 rounded text-black"
              min="1000"
              max={maxDate.getFullYear()}
            />
            <input
              id="max-year"
              type="number"
              value={maxDate.getFullYear()}
              onChange={handleMaxYearChange}
              className="mt-1 p-2 border border-gray-300 rounded text-black"
              min={minDate.getFullYear()}
              max={new Date().getFullYear()}
            />
          </div>
        </div>
      </header>
      <DatePicker
        isDarkMode={isDarkMode}
        minDate={minDate}
        maxDate={maxDate}
      />
      <div className="flex justify-center mt-16">
        <button onClick={toggleLanguage} className="bg-gray-200 p-2 rounded mt-4">
          {translate('changeLanguage')}
        </button>
      </div>
    </>
  );
}

export default App;
