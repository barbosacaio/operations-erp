import { z } from 'zod';

export const listWorkspaceSchema = z.object({
	query: z.object({
		search: z.string().optional(),
	}),
});

export const createWorkspaceSchema = z.object({
	body: z.object({
		name: z
			.string()
			.min(3, {
				message: 'Workspace name must have at least 3 characters',
			})
			.max(30, {
				message: 'Workspace name can have up to 30 characters',
			}),
	}),
});

export const updateWorkspaceSchema = z.object({
	body: z.object({
		name: z
			.string()
			.min(3, {
				message: 'Workspace name must have at least 3 characters',
			})
			.max(30, {
				message: 'Workspace name can have up to 30 characters',
			}),
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
