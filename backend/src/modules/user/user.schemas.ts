import { z } from 'zod';

export const listWorkspaceUserSchema = z.object({
	query: z.object({
		workspaceId: z.string().min(1),
	}),
});

export const addWorkspaceUserSchema = z.object({
	body: z.object({
		email: z
			.string()
			.refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
				message: 'Invalid email format',
			}),
		role: z.enum(['OWNER', 'ADMIN', 'MEMBER']).default('MEMBER').optional(),
	}),
	query: z.object({
		workspaceId: z.string().min(1),
		departmentId: z.string().min(1).optional(),
	}),
});

export const editWorkspaceUserSchema = z.object({
	body: z.object({
		role: z.enum(['OWNER', 'ADMIN', 'MEMBER']).default('MEMBER').optional(),
	}),
	query: z.object({
		workspaceId: z.string().min(1),
		userId: z.string().min(1),
		departmentId: z.string().min(1).optional(),
	}),
});

export const deleteWorkspaceUserSchema = z.object({
	query: z.object({
		workspaceId: z.string().min(1),
		userId: z.string().min(1),
	}),
});
