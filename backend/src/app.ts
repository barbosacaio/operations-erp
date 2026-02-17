import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { errorHandler } from './middlewares/errorHandler.middleware';
import { httpLogger } from './middlewares/logger.middleware';

import { authRoutes } from './routes/auth.routes';

const app = express();

// Global middlewares
app.use(helmet());
app.use(cors());
app.use(httpLogger);
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
	const health = {
		status: 'OK',
		message: 'OperationsERP is running!',
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	};

	req.log.debug({ health }, 'health_check');
	res.status(200).json(health);
});

// Routes
app.use('/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

export { app };
