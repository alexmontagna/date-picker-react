import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DatePicker from './DatePicker';

test('renders DatePicker with required props', () => {
    const minDate = new Date(1900, 0, 1);
    const maxDate = new Date();
    render(<DatePicker isDarkMode={false} minDate={minDate} maxDate={maxDate} />);

    expect(screen.getByText('Day')).to.exist;
    expect(screen.getByText('Month')).to.exist;
    expect(screen.getByText('Year')).to.exist;
});
