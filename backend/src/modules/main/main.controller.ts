import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';
import { WorkspaceInviteRequestType } from '@prisma/client';

export class MainController {
	async listInvites(req: Request, res: Response) {
		const userId = req.user?.id;

		const invites = await prisma.workspaceInviteRequest.findMany({
			where: {
				userId,
				type: WorkspaceInviteRequestType.INVITE,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return res.status(200).json(invites);
	}

	async listRequests(req: Request, res: Response) {
		const userId = req.user?.id;

		const requests = await prisma.workspaceInviteRequest.findMany({
			where: {
				userId,
				type: WorkspaceInviteRequestType.REQUEST,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return res.status(200).json(requests);
	}
}
