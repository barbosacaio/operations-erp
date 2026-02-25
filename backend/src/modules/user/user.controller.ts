import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';
import { WorkspaceRole } from '@prisma/client';
import { AppError } from '../../errors/AppError';

export class UserController {
	async listWorkspaceUsers(req: Request, res: Response) {
		const workspaceId = req.params.workspaceId as string;

		const workspaceUsers = await prisma.workspaceUser.findMany({
			where: { workspaceId: workspaceId },
			include: {
				user: true,
				department: true,
			},
		});

		const users = workspaceUsers.map((u) => ({
			id: u.id,
			name: u.user.name,
			surname: u.user.surname,
			role: u.role,
			email: u.user.email,
			department: u.department?.name,
		}));

		return res.status(200).json(users);
	}

	async addWorkspaceUser(req: Request, res: Response) {
		const { email, role } = req.body;
		const workspaceId = req.params.workspaceId as string;
		const departmentId = req.query.departmentId as string;

		const user = await prisma.user.findFirst({
			where: { email: email },
			select: { id: true },
		});

		if (!user) {
			throw new AppError("This user doesn't exist", 404);
		}

		const data: {
			userId: string;
			workspaceId: string;
			departmentId?: string;
			role?: WorkspaceRole;
		} = {
			userId: user?.id as string,
			workspaceId,
		};

		if (departmentId) {
			if (
				await prisma.department.findFirst({
					where: { id: departmentId, workspaceId: workspaceId },
				})
			) {
				data.departmentId = departmentId;
			} else {
				throw new AppError("This department doesn't exist", 404);
			}
		}

		if (role) {
			const currentUserRole = await prisma.workspaceUser.findFirst({
				where: {
					userId: req.user?.id,
					workspaceId: workspaceId,
				},
				select: { role: true, },
			});

			if (role === "OWNER" && currentUserRole?.role !== "OWNER") {
				throw new AppError("You can't set an user as an 'OWNER' unless you are an owner", 403);
			}

			data.role = role;
		}

		if (
			await prisma.workspaceUser.findFirst({ where: { userId: user.id } })
		) {
			throw new AppError(
				'This user is already part of this workspace',
				409,
			);
		}

		const addedUser = await prisma.workspaceUser.create({
			data,
		});

		return res.status(200).json(addedUser);
	}

	async updateWorkspaceUser(req: Request, res: Response) {
		const { role } = req.body;
		const workspaceId = req.params.workspaceId as string;
		const userId = req.params.userId as string;
		const departmentId = req.query.departmentId as string;

		const user = await prisma.workspaceUser.findUnique({
			where: {
				userId_workspaceId: {
					userId: userId,
					workspaceId: workspaceId,
				},
			},
		});

		if (!user) {
			throw new AppError(
				"This user isn't part of this workspace or it doesn't exist",
				404,
			);
		}

		const data: {
			role?: WorkspaceRole;
			departmentId?: string;
		} = {};

		if (role) {
			const currentUserRole = await prisma.workspaceUser.findFirst({
				where: {
					userId: req.user?.id,
					workspaceId: workspaceId,
				},
				select: { role: true, },
			});

			if (role === "OWNER" && currentUserRole?.role !== "OWNER") {
				throw new AppError("You can't set an user as an 'OWNER' unless you are an owner", 403);
			}

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
				throw new AppError("This department doesn't exist", 404);
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
		const workspaceId = req.params.workspaceId as string;
		const userId = req.params.userId as string;

		const user = await prisma.workspaceUser.findUnique({
			where: {
				userId_workspaceId: {
					userId: userId,
					workspaceId: workspaceId,
				},
			},
		});

		if (!user) {
			throw new AppError(
				"This user isn't part of this workspace or it doesn't exist",
				404,
			);
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
