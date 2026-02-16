import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { logger } from '../config/logger';

export function httpLogger(req: Request, res: Response, next: NextFunction) {
	const start = Date.now();
	const requestId = (req.headers['x-request-id'] as string) || randomUUID();

	req.requestId = requestId;
	req.log = logger.child({
		requestId,
		method: req.method,
		path: req.originalUrl,
	});

	res.on('finish', () => {
		req.log.info(
			{
				statusCode: res.statusCode,
				duration: Date.now() - start,
			},
			'request_completed',
		);
	});

	next();
}
