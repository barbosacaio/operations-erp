import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';

export async function isOwner(req: Request, res: Response, next: NextFunction) {
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
		throw new Error("This workspace doesn't exist");
	}

	if (workspace?.role !== 'OWNER') {
		throw new Error('You are not the owner of this workspace');
	}

	return next();
}
