import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';
import { AppError } from '../../errors/AppError';
import { ProjectStatus } from '@prisma/client';

export class ProjectController {
	async listProject(req: Request, res: Response) {
		const departmentId = req.params.departmentId as string;
		const workspaceId = req.params.workspaceId as string;

		const department = await prisma.department.findUnique({
			where: { id: departmentId },
			select: { workspace: { select: { id: true } } },
		});

		if (!department || department.workspace.id !== workspaceId) {
			throw new AppError(
				"This department doesn't belong to this workspace or it doesn't exist",
				404,
			);
		}

		const projects = await prisma.project.findMany({
			where: {
				departmentId: departmentId,
			},
			select: {
				name: true,
				description: true,
				status: true,
				department: {
					select: {
						name: true,
					},
				},
			},
		});

		return res.status(200).json(projects);
	}

	async createProject(req: Request, res: Response) {
		const { name, description, status } = req.body;
		const departmentId = req.params.departmentId as string;
		const workspaceId = req.params.workspaceId as string;

		if (
			!(await prisma.department.findUnique({
				where: { id: departmentId, workspaceId: workspaceId },
			}))
		) {
			throw new AppError("This department doesn't exist", 404);
		}

		const data: {
			name: string;
			description: string;
			status?: ProjectStatus;
			departmentId: string;
		} = {
			name: name,
			description: description,
			departmentId: departmentId,
		};

		if (status) {
			data.status = status;
		}

		const project = await prisma.project.create({
			data,
		});

		return res.status(201).json(project);
	}

	async updateDepartment(req: Request, res: Response) {
		const { name, description, status } = req.body;
		const projectId = req.params.projectId as string;
		const workspaceId = req.params.workspaceId as string;
		const departmentId = req.params.departmentId as string;

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
			!(await prisma.project.findUnique({
				where: { id: projectId, departmentId: departmentId },
			}))
		) {
			throw new AppError(
				"This project doesn't belong to this department or it doesn't exist",
				404,
			);
		}

		const data: {
			name: string;
			description?: string;
			status?: ProjectStatus;
			departmentId?: string;
		} = {
			name: name,
			description: description,
			departmentId: departmentId,
		};

		if (status) {
			data.status = status;
		}

		const project = await prisma.project.update({
			where: { id: projectId },
			data,
		});

		return res.status(200).json(project);
	}

	async deleteProject(req: Request, res: Response) {
		const projectId = req.params.projectId as string;
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
			!(await prisma.project.findUnique({
				where: { id: projectId, departmentId: departmentId },
			}))
		) {
			throw new AppError(
				"This project doesn't belong to this department or it doesn't exist",
				404,
			);
		}

		await prisma.project.delete({
			where: { id: projectId },
		});

		return res.status(204).send();
	}
}
