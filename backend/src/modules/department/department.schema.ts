import { z } from 'zod';

export const listDepartmentSchema = z.object({
	params: z.object({
		workspaceId: z.string().min(1),
	}),
});

export const addDepartmentSchema = z.object({
	body: z.object({
		name: z.string().min(3),
	}),
	params: z.object({
		workspaceId: z.string().min(1),
	}),
});

export const updateDepartmentSchema = z.object({
	body: z.object({
		name: z.string().min(3),
	}),
	params: z.object({
		departmentId: z.string().min(1),
		workspaceId: z.string().min(1),
	}),
});

export const deleteDepartmentSchema = z.object({
	params: z.object({
		departmentId: z.string().min(1),
		workspaceId: z.string().min(1),
	}),
});
