import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { workspaceService } from '../services/workspace';
import { ApiError } from '@/services/api';
import type {
	WorkspaceJoinQuitRequest,
	WorkspaceJoinResponse,
} from '../types/workspace';

export function useJoinWorkspace() {
	const { mutate, isPending } = useMutation<
		WorkspaceJoinResponse,
		ApiError,
		WorkspaceJoinQuitRequest
	>({
		mutationFn: (data: WorkspaceJoinQuitRequest) =>
			toast.promise(workspaceService.join(data), {
				loading: 'Requesting...',
				success: null,
				error: null,
			}),

		onSuccess: () => {
			toast.success('Request sent successfully!');
		},

		onError: (error: ApiError) => {
			toast.error(`[${error.status}] ${error.message}.`);
		},
	});

	return {
		joinWorkspace: mutate,
		isPendingJoin: isPending,
	};
}
