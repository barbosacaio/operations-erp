import { z } from 'zod';

export const listWorkspaceSchema = z.object({
	query: z.object({
		search: z
			.string()
			.min(1, {
				message: 'The search can not be empty',
			})
			.optional(),
	}),
});

export const createWorkspaceSchema = z.object({
	body: z.object({
		name: z.string().min(3),
	}),
});

export const updateWorkspaceSchema = z.object({
	body: z.object({
		name: z.string().min(3),
	}),
	params: z.object({
		workspaceId: z.string().min(1),
	}),
});

export const deleteWorkspaceSchema = z.object({
	params: z.object({
		workspaceId: z.string().min(1),
	}),
});
