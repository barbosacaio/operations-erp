import express from 'express';
import cors from 'cors';

import { errorHandler } from './middlewares/errorHandler.middleware';
import { httpLogger } from './middlewares/logger.middleware';

const app = express();

// Global middlewares
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

// Error handling middleware
app.use(errorHandler);

export { app };
