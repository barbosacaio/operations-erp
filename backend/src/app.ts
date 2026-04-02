import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { errorHandler } from './middlewares/errorHandler.middleware';
import { httpLogger } from './middlewares/logger.middleware';

import { authRoutes } from './routes/auth.routes';
import { mainRoutes } from './modules/main/main.routes';
import { workspaceRoutes } from './modules/workspace/workspace.routes';

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') ?? [];

// Global middlewares
app.use(helmet());
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error(`Origin blocked by CORS: ${origin}`));
			}
		},
		credentials: true,
	}),
);
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
app.use('/user', mainRoutes);
app.use('/workspace', workspaceRoutes);

// Error handling middleware
app.use(errorHandler);

export { app };
