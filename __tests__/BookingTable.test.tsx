import { render, screen } from '@testing-library/react';
import BookingTable from '../components/BookingTable';

test('renders the booking table', () => {
  render(<BookingTable initialBookings={[]} totalPages={1} />);
  expect(screen.getByText(/Customer/)).toBeInTheDocument();
});
