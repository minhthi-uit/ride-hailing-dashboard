import { MustBeAny } from '@/types';
import { Server } from 'socket.io';

export default function handler(res: MustBeAny) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
      socket.on('disconnect', () => console.log('User disconnected:', socket.id));
    });

    console.log('✅ WebSocket Server Initialized');
  } else {
    console.log('⚡ WebSocket Server Already Running');
  }

  res.end();
}
