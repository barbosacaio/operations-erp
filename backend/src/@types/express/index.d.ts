import { Logger } from 'pino';
import { User } from '@prisma/client';

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
