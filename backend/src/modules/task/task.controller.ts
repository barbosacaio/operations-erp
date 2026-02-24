import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';
import { AppError } from '../../errors/AppError';
import { TaskPriority, TaskStatus } from '@prisma/client';

export class TaskController {
	async listTask(req: Request, res: Response) {
		const projectId = req.params.projectId as string;
		const departmentId = req.params.departmentId as string;
		const workspaceId = req.params.workspaceId as string;

		const tasks = await prisma.task.findMany({
			where: {
				projectId: projectId,
				project: {
					departmentId: departmentId,
					department: {
						workspaceId: workspaceId,
					},
				},
			},
			select: {
				name: true,
				description: true,
				assignee: {
					select: {
						user: {
							select: {
								name: true,
							},
						},
					},
				},
				priority: true,
				status: true,
				dueDate: true,
				project: {
					select: {
						name: true,
						department: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		});

		if (tasks.length === 0) {
			throw new AppError(
				'There are no tasks within this workspace, department and project',
				404,
			);
		}

		return res.status(200).json(tasks);
	}

	async createTask(req: Request, res: Response) {
		const { name, description, priority, status, dueDate } = req.body;
		const projectId = req.params.projectId as string;
		const workspaceId = req.params.workspaceId as string;
		const assigneeId = req.query.assigneeId as string;

		const data: {
			name: string;
			description: string;
			priority?: TaskPriority;
			status?: TaskStatus;
			dueDate?: Date;
			projectId: string;
			assigneeId?: string;
		} = {
			name: name,
			description: description,
			projectId: projectId,
		};

		if (priority) {
			data.priority = priority;
		}
		if (status) {
			data.status = status;
		}
		if (dueDate) {
			data.dueDate = new Date(dueDate);
		}
		if (assigneeId) {
			if (
				!(await prisma.workspaceUser.findFirst({
					where: { userId: assigneeId, workspaceId: workspaceId },
				}))
			) {
				throw new AppError(
					"This user isn't part of this workspace or it doesn't exist",
					404,
				);
			}

			data.assigneeId = assigneeId;
		}

		const project = await prisma.project.findUnique({
			where: { id: projectId },
			select: {
				department: {
					select: {
						id: true,
						workspaceId: true,
					},
				},
			},
		});

		if (
			project?.department.id !== req.params.departmentId ||
			project?.department.workspaceId !== req.params.workspaceId
		) {
			throw new AppError(
				"This project isn't part of this department/workspace or it doesn't exist",
				404,
			);
		}

		const task = await prisma.task.create({ data });

		return res.status(201).json(task);
	}

	async updateTask(req: Request, res: Response) {
		const { name, description, priority, status, dueDate } = req.body;
		const taskId = req.params.taskId as string;
		const projectId = req.params.projectId as string;
		const workspaceId = req.params.workspaceId as string;
		const assigneeId = req.query.assigneeId as string;

		const data: {
			name?: string;
			description?: string;
			priority?: TaskPriority;
			status?: TaskStatus;
			dueDate?: Date;
			projectId?: string;
			assigneeId?: string;
		} = {};

		if (name) {
			data.name = name;
		}
		if (description) {
			data.description = description;
		}
		if (priority) {
			data.priority = priority;
		}
		if (status) {
			data.status = status;
		}
		if (dueDate) {
			data.dueDate = new Date(dueDate);
		}
		if (assigneeId) {
			if (
				!(await prisma.workspaceUser.findFirst({
					where: { userId: assigneeId, workspaceId: workspaceId },
				}))
			) {
				throw new AppError(
					"This user isn't part of this workspace or it doesn't exist",
					404,
				);
			}

			data.assigneeId = assigneeId;
		}

		const project = await prisma.project.findUnique({
			where: { id: projectId },
			select: {
				department: {
					select: {
						id: true,
						workspaceId: true,
					},
				},
			},
		});

		if (
			project?.department.id !== req.params.departmentId ||
			project?.department.workspaceId !== req.params.workspaceId
		) {
			throw new AppError(
				"This project isn't part of this department/workspace or it doesn't exist",
				404,
			);
		}

		if (
			!(await prisma.task.findFirst({
				where: { id: taskId, projectId: projectId },
			}))
		) {
			throw new AppError(
				"This task isn't part of this project or it doesn't exist",
				404,
			);
		}

		const task = await prisma.task.update({
			where: {
				id: taskId,
			},
			data,
		});

		return res.status(201).json(task);
	}

	async deleteTask(req: Request, res: Response) {
		const workspaceId = req.params.workspaceId as string;
		const departmentId = req.params.departmentId as string;
		const projectId = req.params.projectId as string;
		const taskId = req.params.taskId as string;

		const task = await prisma.task.findUnique({
			where: {
				id: taskId,
				projectId: projectId,
			},
			select: {
				id: true,
				projectId: true,
				project: {
					select: {
						departmentId: true,
						department: {
							select: {
								workspaceId: true,
							},
						},
					},
				},
			},
		});

		if (
			!task ||
			task.project.departmentId !== departmentId ||
			task.project.department.workspaceId !== workspaceId
		) {
			throw new AppError(
				"This task isn't part of this project/department/workspace or it doesn't exist",
				404,
			);
		}

		await prisma.task.delete({
			where: { id: taskId, projectId: projectId },
		});

		return res.status(204).send();
	}
}
