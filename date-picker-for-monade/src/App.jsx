import DatePicker from './DatePicker';

const MIN_DATE = new Date(1900, 0, 1);
const MAX_DATE = new Date();

const App = () => {
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <>
      <DatePicker
        isDarkMode={isDarkMode}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
      />
    </>
  );
}

export default App;