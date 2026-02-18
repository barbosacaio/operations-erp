import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';
import { AppError } from '../../errors/AppError';

export class DepartmentController {
	async listDepartment(req: Request, res: Response) {
		if (!req.user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const user = await prisma.user.findUnique({
			where: { id: req.user.id },
		});

		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}

		const departments = await prisma.department.findMany({
			select: {
				name: true,
			},
		});

		return res.status(200).json(departments);
	}

	async createDepartment(req: Request, res: Response) {
		const { name } = req.body;
		const workspaceId = req.query.workspaceId as string;

		if (!req.user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const user = await prisma.user.findUnique({
			where: { id: req.user.id },
		});

		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}

		if (!workspaceId) {
			return res.status(404).json({ error: 'Workspace not found' });
		}

		let department = await prisma.department.findFirst({
			where: { name: name },
		});

		if (department && department.workspaceId === workspaceId) {
			return res
				.status(401)
				.json({
					error: 'A department with that name already exists on this workspace',
				});
		} else {
			department = await prisma.department.create({
				data: {
					name,
					workspaceId,
				},
			});
		}

		return res.status(201).json(department);
	}

	async updateDepartment(req: Request, res: Response) {
		const { name } = req.body;
		const departmentId = req.query.id as string;
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

		if (!departmentId) {
			return res.status(404).json({ error: 'Department not found' });
		}

		if (!workspaceId) {
			return res.status(404).json({ error: 'Workspace not found' });
		}

		let department = await prisma.department.findFirst({
			where: { id: departmentId },
		});

		const usedName = await prisma.department.findFirst({
			where: {
				name: name,
				workspaceId: workspaceId,
			},
		});

		if (!department) {
			throw new AppError('Department not found', 404);
		} else if (usedName) {
			return res
				.status(401)
				.json({
					error: 'A department with that name already exists on this workspace',
				});
		} else {
			department = await prisma.department.update({
				where: { id: departmentId },
				data: { name },
			});
		}

		return res.status(200).json(department);
	}

	async deleteDepartment(req: Request, res: Response) {
		const departmentId = req.query.id as string;
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

		if (!departmentId) {
			return res.status(404).json({ error: 'Department not found' });
		}

		if (!workspaceId) {
			return res.status(404).json({ error: 'Workspace not found' });
		}

		let department = await prisma.department.findFirst({
			where: { id: departmentId },
			select: {
				id: true,
				workspaceId: true,
			},
		});

		if (workspaceId !== department?.workspaceId) {
			return res
				.status(403)
				.json({
					error: "This department doesn't belong to this workspace",
				});
		}

		if (!department) {
			throw new AppError('Department not found', 404);
		} else {
			department = await prisma.department.delete({
				where: { id: departmentId },
			});
		}

		return res.status(204).send();
	}
}
