import { Server as NetServer } from 'http';
import { Socket as NetSocket } from 'net';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

interface Booking {
  id: number;
  customer: string;
  pickup: string;
  dropoff: string;
  status: string;
  driver?: string;
}

interface ExtendedNextApiResponse extends NextApiResponse {
  socket: NetSocket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
}

let bookings: Booking[] = [
  { id: 1, customer: 'John Doe', pickup: 'Location A', dropoff: 'Location B', status: 'Pending' },
  { id: 2, customer: 'Jane Smith', pickup: 'Location C', dropoff: 'Location D', status: 'Completed' },
];

const activityLog: string[] = [];

export default function handler(req: NextApiRequest, res: ExtendedNextApiResponse) {
  if (!res?.socket?.server?.io) {
    console.log('❌ WebSocket Not Initialized');
    return res.status(500).json({ error: 'WebSocket server not initialized' });
  }

  const io = res.socket.server.io;

  const filteredBookings = [...bookings];

  // ✅ Pagination Setup
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  if (req.method === 'GET') {
      return res.json({
        bookings: paginatedBookings,
        total: filteredBookings.length,
        page,
        totalPages: Math.ceil(filteredBookings.length / limit),
      });
  }

  if (req.method === 'POST') {
    const newBooking: Booking = { id: Date.now(), ...req.body };
    bookings.push(newBooking);
    activityLog.unshift(`Booking ${newBooking.id} created by Admin`);

    io.emit('bookingUpdate', {
      bookings: filteredBookings.slice(startIndex, endIndex),
      total: filteredBookings.length,
      page,
      totalPages: Math.ceil(filteredBookings.length / limit),
    });

    io.emit('activityUpdate', activityLog);
    return res.status(201).json(newBooking);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    bookings = bookings.filter((b) => b.id !== id);
    activityLog.unshift(`Booking ${id} deleted`);

    io.emit('bookingUpdate', {
      bookings: filteredBookings.slice(startIndex, endIndex),
      total: filteredBookings.length,
      page,
      totalPages: Math.ceil(filteredBookings.length / limit),
    });

    io.emit('activityUpdate', activityLog);
    return res.status(200).json({ message: 'Deleted successfully' });
  }
  if (req.method === 'PUT') {
    const { id, status, driver } = req.body;
    bookings = bookings.map((b) =>
      b.id === id ? { ...b, status, driver: driver || b.driver } : b
    );
    return res.status(200).json({ message: 'Updated successfully' });
  }

  res.status(405).json({ message: 'Method not allowed' });
}