import { z } from 'zod';

export const createProjectSchema = z.object({
	body: z.object({
		name: z.string().min(3),
		description: z.string().min(3),
		status: z
			.enum(['BACKLOG', 'ONGOING', 'PAUSED', 'FINISHED', 'CANCELLED'])
			.default('BACKLOG')
			.optional(),
	}),
});

export const updateProjectSchema = z.object({
	body: z.object({
		name: z.string().min(3).optional(),
		description: z.string().min(3).optional(),
		status: z
			.enum(['BACKLOG', 'ONGOING', 'PAUSED', 'FINISHED', 'CANCELLED'])
			.optional(),
	}),
	params: z.object({
		projectId: z.string().min(1),
		workspaceId: z.string().min(1),
		departmentId: z.string().min(1),
	}),
});

export const deleteProjectSchema = z.object({
	params: z.object({
		projectId: z.string().min(1),
		departmentId: z.string().min(1),
		workspaceId: z.string().min(1),
	}),
});
