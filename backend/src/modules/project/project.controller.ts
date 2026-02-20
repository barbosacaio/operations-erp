import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';
import { AppError } from '../../errors/AppError';
import { ProjectStatus } from '@prisma/client';

export class ProjectController {
	async listProject(req: Request, res: Response) {

		const projects = await prisma.project.findMany({
			select: {
				name: true,
				description: true,
				status: true,
				department: {
					select: {
						name: true,
					}
				}
			},
		});

		return res.status(200).json(projects);
	}

	async createProject(req: Request, res: Response) {
		const { name, description, status } = req.body;
		const departmentId = req.query.departmentId as string;
		const workspaceId = req.query.workspaceId as string;

		if (!await prisma.department.findUnique({ where: { id: departmentId }},)) {
			throw new AppError("This department doesn't exist", 404);
		}

		const workspace = await prisma.department.findUnique({ 
			where: { id: departmentId }, 
			select: { workspaceId: true },
		});

		if (workspace?.workspaceId !== workspaceId) {
			throw new AppError("This department doesn't exist", 404);
		}

		const data: {
			name: string,
			description: string,
			status?: ProjectStatus,
			departmentId: string,
		} = {
			name: name,
			description: description,
			departmentId: departmentId,
		}

		if (status) {
			data.status = status;
		}

		const project = await prisma.project.create({
			data,
		})

		return res.status(201).json(project);
	}

	async updateDepartment(req: Request, res: Response) {
		const { name, description, status } = req.body;
		const projectId = req.query.projectId as string;
		const workspaceId = req.query.workspaceId as string;
		const departmentId = req.query.departmentId as string;

		const project = await prisma.project.findUnique({
			where: { id: projectId, },
			include: { department: true, },
		});

		if (!project || project.department.workspaceId !== workspaceId) {
			throw new AppError("This project doesn't exist", 404);
		}

		const data: {
			name?: string,
			description?: string,
			status?: ProjectStatus,
			departmentId?: string,
		} = {}

		if (name) { data.name = name; }
		if (description) { data.description = description; }
		if (status) { data.status = status; }
		if (departmentId) {
			const isDepartmentInWorkspace = await prisma.department.findUnique({
				where: { id: departmentId, },
				include: { workspace: true, },
			});

			if (isDepartmentInWorkspace?.workspace.id !== workspaceId) {
				throw new AppError("This department doesn't exist", 404);
			} else {
				data.departmentId = departmentId; 
			}
		}

		const updatedProject = await prisma.project.update({
			where: { id: projectId, },
			data,
		})

		return res.status(200).json(updatedProject);
	}

	async deleteProject(req: Request, res: Response) {
		const projectId = req.query.projectId as string;
		const workspaceId = req.query.workspaceId as string;

		const project = await prisma.project.findUnique({
			where: { id: projectId, },
			include: { department: true, },
		});

		if (!project || project.department.workspaceId !== workspaceId) {
			throw new AppError("This project doesn't exist", 404);
		}

		await prisma.project.delete({
			where: { id: projectId },
		});

		return res.status(204).send();
	}
}
