import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
    test('renders login form', () => {
        render(<Login onLogin={() => {}} />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test('validates email and password', async () => {
        render(<Login onLogin={() => {}} />);
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    });

    // Additional tests for successful login and API call can be added here
});
