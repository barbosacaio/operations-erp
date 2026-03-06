import { api } from '@/services/api';
import type {
	WorkspaceCreateRequest,
	WorkspaceListResponse,
	WorkspaceResponse,
} from '../types/workspace';

export const workspaceService = {
	list: (search: string) =>
		api.get<WorkspaceListResponse>(
			'/workspace',
			search ? { search } : undefined,
		),
	create: (data: WorkspaceCreateRequest) =>
		api.post<WorkspaceResponse>('/workspace/add', data),
};
