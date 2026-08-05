import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const prisma = new PrismaClient();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(express.json());
app.use(cors());
app.use(helmet());

// Auth Route
app.use('/api/auth', require('./routes/auth').default);

// Health Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// WebSockets (TV Mode)
io.on('connection', (socket) => {
  console.log('A TV connected:', socket.id);
  
  socket.on('heartbeat', (data) => {
    // Atualizar lastSeen da TV no banco
  });

  socket.on('disconnect', () => {
    console.log('TV disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
