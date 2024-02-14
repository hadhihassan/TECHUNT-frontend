import { render, screen } from '@testing-library/react';
import OtpInputWithValidation from './otpPage';


test('renders learn react link', () => {
    render(<OtpInputWithValidation />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});