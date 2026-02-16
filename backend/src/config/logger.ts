import pino from 'pino';
import dotenv from 'dotenv';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
	name: process.env.SERVICE_NAME || 'operations-erp-backend',
	level: process.env.LOG_LEVEL || 'info',
	base: {
		service: process.env.SERVICE_NAME || 'operations-erp-backend',
		environment: process.env.NODE_ENV || 'development',
	},

	timestamp: pino.stdTimeFunctions.isoTime,
	transport: isProduction
		? undefined
		: {
				target: 'pino-pretty',
				options: {
					colorize: true,
					translateTime: 'SYS:standard',
				},
			},

	serializers: {
		err: pino.stdSerializers.err,
	},
});
