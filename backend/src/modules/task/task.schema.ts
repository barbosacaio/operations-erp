import { z } from 'zod';

export const createTaskSchema = z.object({
	body: z.object({
		name: z.string().min(3),
		description: z.string().min(3),
		priority: z
			.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
			.default('MEDIUM')
			.optional(),
		status: z
			.enum(['BACKLOG', 'ONGOING', 'PAUSED', 'FINISHED', 'CANCELLED'])
			.default('BACKLOG')
			.optional(),
		dueDate: z.coerce.date().optional(),
	}),
	params: z.object({
		workspaceId: z.string().min(1),
		projectId: z.string().min(1),
	}),
	query: z.object({
		assigneeId: z.string().min(1).optional(),
	}),
});

export const updateTaskSchema = z.object({
	body: z.object({
		name: z.string().min(3).optional(),
		description: z.string().min(3).optional(),
		priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
		status: z
			.enum(['BACKLOG', 'ONGOING', 'PAUSED', 'FINISHED', 'CANCELLED'])
			.optional(),
		dueDate: z.coerce.date().optional(),
	}),
	params: z.object({
		workspaceId: z.string().min(1),
		projectId: z.string().min(1),
	}),
	query: z.object({
		assigneeId: z.string().min(1).optional(),
	}),
});

export const deleteTaskSchema = z.object({
	params: z.object({
		workspaceId: z.string().min(1),
		departmentId: z.string().min(1),
		projectId: z.string().min(1),
		taskId: z.string().min(1),
	}),
});
