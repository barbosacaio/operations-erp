import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';
import { WorkspaceRole } from '@prisma/client';

export class UserController {
	async listWorkspaceUsers(req: Request, res: Response) {
		const workspaceId = req.query.workspaceId as string;

		const workspaceUsers = await prisma.workspaceUser.findMany({
			where: { workspaceId: workspaceId },
			select: {
				userId: true,
			},
		});

		const userIds = workspaceUsers.map((wu) => wu.userId);

		const users = await prisma.user.findMany({
			where: { id: { in: userIds } },
			select: {
				name: true,
				surname: true,
				email: true,
			},
		});

		return res.status(200).json(users);
	}

	async addWorkspaceUser(req: Request, res: Response) {
		const { email, role } = req.body;
		const workspaceId = req.query.workspaceId as string;
		const departmentId = req.query.departmentId as string;

		const userToBeAdded = await prisma.user.findFirst({
			where: { email: email },
			select: { id: true },
		});

		const data: {
			userId: string;
			workspaceId: string;
			departmentId?: string;
			role?: WorkspaceRole;
		} = {
			userId: userToBeAdded?.id as string,
			workspaceId,
		};

		if (departmentId) {
			if (
				await prisma.department.findFirst({
					where: { id: departmentId },
				})
			) {
				data.departmentId = departmentId;
			} else {
				return res
					.status(404)
					.json({ error: "This department doesn't exist" });
			}
		}

		if (role) {
			data.role = role;
		}

		const isAlreadyUser = await prisma.user.findFirst({
			where: { email: email },
		});

		if (!isAlreadyUser) {
			return res.status(404).json({ error: "This user doesn't exist" });
		}

		const isAlreadyMember = await prisma.workspaceUser.findFirst({
			where: { userId: isAlreadyUser.id },
		});

		if (isAlreadyMember) {
			return res
				.status(403)
				.json({ error: 'This user is already part of this workspace' });
		}

		const addedUser = await prisma.workspaceUser.create({
			data,
		});

		return res.status(200).json(addedUser);
	}

	async editWorkspaceUser(req: Request, res: Response) {
		const { role } = req.body;
		const workspaceId = req.query.workspaceId as string;
		const departmentId = req.query.departmentId as string;
		const userId = req.query.userId as string;

		if (
			!(await prisma.workspaceUser.findFirst({
				where: { userId: userId, workspaceId: workspaceId },
			}))
		) {
			return res
				.status(404)
				.json({
					error: "This user isn't part of this workspace or it doesn't exist",
				});
		}

		const data: {
			role?: WorkspaceRole;
			departmentId?: string;
		} = {};

		if (role) {
			data.role = role;
		}

		if (departmentId) {
			if (
				await prisma.department.findFirst({
					where: { id: departmentId },
				})
			) {
				data.departmentId = departmentId;
			} else {
				return res
					.status(404)
					.json({ error: "This department doesn't exist" });
			}
		}

		const editedUser = await prisma.workspaceUser.update({
			where: {
				userId_workspaceId: {
					userId: userId,
					workspaceId: workspaceId,
				},
			},
			data,
		});

		return res.status(200).json(editedUser);
	}

	async deleteWorkspaceUser(req: Request, res: Response) {
		const workspaceId = req.query.workspaceId as string;
		const userId = req.query.userId as string;

		if (
			!(await prisma.workspaceUser.findFirst({
				where: { workspaceId: workspaceId },
			}))
		) {
			return res
				.status(404)
				.json({ error: "This workspace doesn't exist" });
		}

		if (
			!(await prisma.workspaceUser.findFirst({
				where: { userId: userId },
			}))
		) {
			return res
				.status(404)
				.json({
					error: "This user isn't part of this workspace or it doesn't exist",
				});
		}

		await prisma.workspaceUser.delete({
			where: {
				userId_workspaceId: {
					workspaceId: workspaceId,
					userId: userId,
				},
			},
		});

		return res.status(204).send();
	}
}
