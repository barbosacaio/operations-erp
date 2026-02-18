import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';

export class WorkspaceController {
	async listWorkspace(req: Request, res: Response) {
		if (!req.user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const user = await prisma.user.findUnique({
			where: { id: req.user.id },
		});

		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}

		const workspaces = await prisma.workspace.findMany({
			select: {
				name: true,
				createdAt: true,
			},
		});

		return res.status(200).json(workspaces);
	}

	async createWorkspace(req: Request, res: Response) {
		const { name } = req.body;

		if (!req.user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const user = await prisma.user.findUnique({
			where: { id: req.user.id },
		});

		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}

		const workspace = await prisma.workspace.create({
			data: {
				name,
				users: {
					create: {
						userId: req.user.id,
						role: 'OWNER',
					},
				},
			},
		});

		return res.status(201).json(workspace);
	}

	async updateWorkspace(req: Request, res: Response) {
		const { name } = req.body;
		const workspaceId = req.query.workspaceId as string;

		if (!req.user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const user = await prisma.user.findUnique({
			where: { id: req.user.id },
		});

		if (!user) {
			return res.status(401).json({ error: 'User not found ' });
		}

		const workspace = await prisma.workspace.update({
			where: { id: workspaceId as string },
			data: { name },
		});

		return res.status(200).json(workspace);
	}

	async deleteWorkspace(req: Request, res: Response) {
		const workspaceId = req.query.workspaceId as string;

		await prisma.workspace.delete({
			where: { id: workspaceId as string },
		});

		return res.status(204).send();
	}
}
