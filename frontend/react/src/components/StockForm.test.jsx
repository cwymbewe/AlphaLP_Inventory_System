import { render, screen, fireEvent } from '@testing-library/react';
import StockForm from './StockForm';

describe('StockForm Component', () => {
    test('renders stock form', () => {
        render(<StockForm onStockSubmit={() => {}} />);
        expect(screen.getByPlaceholderText(/item/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/quantity/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/location/i)).toBeInTheDocument();
    });

    test('validates item and price', async () => {
        render(<StockForm onStockSubmit={() => {}} />);
        fireEvent.change(screen.getByPlaceholderText(/item/i), { target: { value: '' } });
        fireEvent.change(screen.getByPlaceholderText(/price/i), { target: { value: 0 } });
        fireEvent.click(screen.getByRole('button', { name: /add item/i }));
        expect(await screen.findByText(/please enter valid item and price/i)).toBeInTheDocument();
    });

    // Additional tests for successful stock submission and API call can be added here
});
