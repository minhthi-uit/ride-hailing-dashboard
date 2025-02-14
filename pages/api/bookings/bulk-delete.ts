import { NextApiRequest, NextApiResponse } from 'next';

interface Booking {
  id: number;
  customer: string;
  pickup: string;
  dropoff: string;
  status: string;
  driver?: string;
}

let bookings: Booking[] = [
  { id: 1, customer: 'John Doe', pickup: 'Location A', dropoff: 'Location B', status: 'Pending' },
  { id: 2, customer: 'Jane Smith', pickup: 'Location C', dropoff: 'Location D', status: 'Completed' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'Invalid request, ids should be an array' });
    }

    bookings = bookings.filter((booking) => !ids.includes(booking.id));

    return res.status(200).json({ message: 'Bookings deleted successfully' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}