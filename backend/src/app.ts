import express from 'express';
import cors from 'cors';

import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'OperationsERP is running!',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
})

// Error handling middleware
app.use(errorHandler);

export { app };