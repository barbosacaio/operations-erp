import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { workspaceService } from '../services/workspace';
import { ApiError } from '@/services/api';
import type { WorkspaceJoinQuitRequest } from '../types/workspace';

export function useQuitWorkspace() {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation<
		unknown,
		ApiError,
		WorkspaceJoinQuitRequest
	>({
		mutationFn: (data: WorkspaceJoinQuitRequest) =>
			toast.promise(workspaceService.quit(data), {
				loading: 'Quitting...',
				success: null,
				error: null,
			}),

		onSuccess: () => {
			toast.success('Quit workspace successfully!');
			queryClient.invalidateQueries({ queryKey: ['workspaces'] });
		},

		onError: (error: ApiError) => {
			toast.error(`[${error.status}] ${error.message}.`);
		},
	});

	return {
		quitWorkspaceRequest: mutate,
		isPendingQuit: isPending,
	};
}
