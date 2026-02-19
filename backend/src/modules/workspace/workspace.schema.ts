import { z } from 'zod';

export const createWorkspaceSchema = z.object({
	body: z.object({
		name: z.string().min(3),
	}),
});

export const updateWorkspaceSchema = z.object({
	body: z.object({
		name: z.string().min(3),
	}),
	query: z.object({
		workspaceId: z.string().min(1),
	}),
});

export const deleteWorkspaceSchema = z.object({
	query: z.object({
		workspaceId: z.string().min(1),
	}),
});
