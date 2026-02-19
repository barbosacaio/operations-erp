import { z } from 'zod';

export const createDepartmentSchema = z.object({
	body: z.object({
		name: z.string().min(3),
	}),
});

export const updateDepartmentSchema = z.object({
	body: z.object({
		name: z.string().min(3),
	}),
	query: z.object({
		id: z.string().min(1),
		workspaceId: z.string().min(1),
	}),
});

export const deleteDepartmentSchema = z.object({
	query: z.object({
		id: z.string().min(1),
	}),
});
