import { Logger } from 'pino';

declare global {
	namespace Express {
		interface Request {
			log: Logger;
			requestId: string;
			user?: {
				id: string;
			};
			workspace?: {
				name: string;
			};
			workspaceUser?: {
				id: string;
				userId: string;
			};
		}
	}
}

export {};
