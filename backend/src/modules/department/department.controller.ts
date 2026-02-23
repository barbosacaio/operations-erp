import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';
import { AppError } from '../../errors/AppError';

export class DepartmentController {
	async listDepartment(req: Request, res: Response) {
		const workspaceId = req.params.workspaceId as string;

		const departments = await prisma.department.findMany({
			where: { workspaceId: workspaceId },
			select: {
				name: true,
			},
		});

		return res.status(200).json(departments);
	}

	async addDepartment(req: Request, res: Response) {
		const { name } = req.body;
		const workspaceId = req.params.workspaceId as string;

		if (
			await prisma.department.findFirst({
				where: { name: name, workspaceId: workspaceId },
			})
		) {
			throw new AppError('This department already exists', 409);
		}

		const department = await prisma.department.create({
			data: {
				name: name,
				workspaceId: workspaceId,
			},
		});

		return res.status(201).json(department);
	}

	async updateDepartment(req: Request, res: Response) {
		const { name } = req.body;
		const departmentId = req.params.departmentId as string;
		const workspaceId = req.params.workspaceId as string;

		if (
			!(await prisma.department.findUnique({
				where: { id: departmentId, workspaceId: workspaceId },
			}))
		) {
			throw new AppError(
				"This department doesn't belong to this workspace or it doesn't exist",
				404,
			);
		}

		if (
			await prisma.department.findFirst({
				where: { name: name, workspaceId: workspaceId },
			})
		) {
			throw new AppError('This department already exists', 409);
		}

		const department = await prisma.department.update({
			where: { id: departmentId },
			data: { name: name },
		});

		return res.status(200).json(department);
	}

	async deleteDepartment(req: Request, res: Response) {
		const departmentId = req.params.departmentId as string;
		const workspaceId = req.params.workspaceId as string;

		if (
			!(await prisma.department.findUnique({
				where: { id: departmentId, workspaceId: workspaceId },
			}))
		) {
			throw new AppError(
				"This department doesn't belong to this workspace or it doesn't exist",
				404,
			);
		}

		await prisma.department.delete({ where: { id: departmentId } });

		return res.status(204).send();
	}
}
