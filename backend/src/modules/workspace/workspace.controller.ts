import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';

export class WorkspaceController {
	async listWorkspace(req: Request, res: Response) {
		const workspaces = await prisma.workspace.findMany({
			select: {
				name: true,
			},
		});

		return res.status(200).json(workspaces);
	}

	async createWorkspace(req: Request, res: Response) {
		const { name } = req.body;

		const workspace = await prisma.workspace.create({
			data: {
				name,
				users: {
					create: {
						userId: req.user!.id,
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
