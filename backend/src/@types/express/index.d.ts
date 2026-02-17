import { Logger } from 'pino';
import { user } from '@prisma/client';

declare global {
	namespace Express {
		interface Request {
			log: Logger;
			requestId: string;
			user?: User;
		}
	}
}

export {};
