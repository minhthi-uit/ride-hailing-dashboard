import { NextApiRequest, NextApiResponse } from 'next';

const drivers = [
  { id: 1, name: 'Alice Johnson', contact: 'alice@example.com', vehicle: 'Toyota Camry', completedRides: 25, rating: 4.8 },
  { id: 2, name: 'Bob Smith', contact: 'bob@example.com', vehicle: 'Honda Civic', completedRides: 30, rating: 4.9 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.json(drivers);
  }

  if (req.method === 'POST') {
    const newDriver = { id: Date.now(), ...req.body };
    drivers.push(newDriver);
    return res.status(201).json(newDriver);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
