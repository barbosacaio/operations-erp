import { z } from 'zod';

export const listWorkspaceUserSchema = z.object({
	params: z.object({
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
	params: z.object({
		workspaceId: z.string().min(1),
	}),
	query: z.object({
		departmentId: z.string().min(1).optional(),
	}),
});

export const updateWorkspaceUserSchema = z.object({
	body: z.object({
		role: z.enum(['OWNER', 'ADMIN', 'MEMBER']).default('MEMBER').optional(),
	}),
	query: z.object({
		departmentId: z.string().min(1).optional(),
	}),
	params: z.object({
		workspaceId: z.string().min(1),
		userId: z.string().min(1),
	}),
});

export const deleteWorkspaceUserSchema = z.object({
	params: z.object({
		workspaceId: z.string().min(1),
		userId: z.string().min(1),
	}),
});
