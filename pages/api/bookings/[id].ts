import { NextApiRequest, NextApiResponse } from 'next';

interface Booking {
  id: number;
  customer: string;
  pickup: string;
  dropoff: string;
  status: string;
  driver?: string;
}

const bookings: Booking[] = [
  { id: 1, customer: 'John Doe', pickup: 'Location A', dropoff: 'Location B', status: 'Pending' },
  { id: 2, customer: 'Jane Smith', pickup: 'Location C', dropoff: 'Location D', status: 'Completed' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const booking = bookings.find((b) => b.id === parseInt(id as string));
    if (booking) {
      return res.status(200).json(booking);
    } else {
      return res.status(404).json({ error: 'Booking not found' });
    }
  }

  if (req.method === 'PUT') {
    const index = bookings.findIndex((b) => b.id.toString() === id);
    if (index === -1) return res.status(404).json({ message: 'Booking not found' });
    bookings[index] = { ...bookings[index], ...req.body };
    return res.json(bookings[index]);
  }

  res.status(405).end(`Method ${req.method} Not Allowed`);
}