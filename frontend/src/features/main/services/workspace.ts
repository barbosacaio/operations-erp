import { api } from '@/services/api';
import type { WorkspaceListResponse } from '../types/workspace';

export const workspaceService = {
	list: (search: string) =>
		api.get<WorkspaceListResponse>(
			'/workspace',
			search ? { search } : undefined,
		),
};
