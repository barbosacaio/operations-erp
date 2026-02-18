import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';

export async function isInWorkspace(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const workspace = await prisma.workspaceUser.findFirst({
		where: {
			userId: req.user?.id,
			workspaceId: req.query.workspaceId as string,
		},
		select: {
			id: true,
		},
	});

	if (!workspace?.id) {
		throw new AppError(
			"This workspace doesn't exist or you are not a part of it",
			404,
		);
	}

	return next();
}
