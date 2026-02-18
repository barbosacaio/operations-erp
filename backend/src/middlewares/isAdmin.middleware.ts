import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
	const workspace = await prisma.workspaceUser.findFirst({
		where: {
			userId: req.user?.id,
			workspaceId: req.query.workspaceId as string,
		},
		select: {
			id: true,
			role: true,
		},
	});

	if (!workspace?.id) {
		throw new AppError("This workspace doesn't exist", 404);
	}

	if (workspace?.role !== 'ADMIN' && workspace?.role !== 'OWNER') {
		throw new AppError('You are not an admin of this workspace', 403);
	}

	return next();
}
