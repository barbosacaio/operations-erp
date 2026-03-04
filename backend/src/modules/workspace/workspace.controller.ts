import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';

export class WorkspaceController {
	async listWorkspace(req: Request, res: Response) {
		const { search } = req.query;

		let workspaces, myWorkspaces;

		if (typeof search === 'string') {
			workspaces = await prisma.workspace.findMany({
				where: {
					OR: [
						{ id: { contains: search, mode: 'insensitive' } },
						{ name: { contains: search, mode: 'insensitive' } },
					],
				},
				orderBy: {
					name: 'asc',
				},
			});

			myWorkspaces = await prisma.workspaceUser.findMany({
				where: {
					userId: req.user?.id,
					workspace: {
						OR: [
							{ id: { contains: search, mode: 'insensitive' } },
							{ name: { contains: search, mode: 'insensitive' } },
						],
					},
				},
				select: {
					workspace: true,
				},
			});
		} else {
			workspaces = await prisma.workspace.findMany({
				orderBy: { name: 'asc' },
			});

			myWorkspaces = await prisma.workspaceUser.findMany({
				where: { userId: req.user?.id },
				select: {
					workspace: true,
				},
			});
		}

		const myWorkspacesIDs = new Set(
			myWorkspaces.map((item) => item.workspace.id),
		);
		const filteredWorkspaces = workspaces.filter(
			(workspace) => !myWorkspacesIDs.has(workspace.id),
		);

		return res
			.status(200)
			.json({ myWorkspaces, workspaces: filteredWorkspaces });
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
		const workspaceId = req.params.workspaceId as string;

		const workspace = await prisma.workspace.update({
			where: { id: workspaceId as string },
			data: { name },
		});

		return res.status(200).json(workspace);
	}

	async deleteWorkspace(req: Request, res: Response) {
		const workspaceId = req.params.workspaceId as string;

		await prisma.workspace.delete({
			where: { id: workspaceId as string },
		});

		return res.status(204).send();
	}
}
