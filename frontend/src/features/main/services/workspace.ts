import { api } from '@/services/api';
import type {
	WorkspaceCreateRequest,
	WorkspaceJoinQuitRequest,
	WorkspaceListResponse,
	WorkspaceResponse,
	WorkspaceJoinResponse,
} from '../types/workspace';

export const workspaceService = {
	list: (search: string) =>
		api.get<WorkspaceListResponse>(
			'/workspace',
			search ? { search } : undefined,
		),
	create: (data: WorkspaceCreateRequest) =>
		api.post<WorkspaceResponse>('/workspace/add', data),
	join: (data: WorkspaceJoinQuitRequest) =>
		api.post<WorkspaceJoinResponse>(
			`/workspace/${data.id}/user/join`,
			data,
		),
	quit: (data: WorkspaceJoinQuitRequest) =>
		api.delete(`/workspace/${data.id}/user/quit`),
};
