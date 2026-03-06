import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { workspaceService } from '../services/workspace';
import { ApiError } from '@/services/api';
import type {
	WorkspaceCreateRequest,
	WorkspaceResponse,
} from '../types/workspace';

export function useCreateWorkspace() {
	const navigate = useNavigate();
	const [name, setName] = useState('');

	const { mutate, isPending } = useMutation<
		WorkspaceResponse,
		ApiError,
		WorkspaceCreateRequest
	>({
		mutationFn: (data: WorkspaceCreateRequest) =>
			toast.promise(workspaceService.create(data), {
				loading: 'Creating workspace...',
				success: null,
				error: null,
			}),

		onSuccess: (workspace: WorkspaceResponse) => {
			toast.success(`Workspace created! Accessing ${name}...`);
			navigate(`/workspace/${workspace.id}`);
		},

		onError: (error: ApiError) => {
			toast.error(`[${error.status}] ${error.message}.`);
		},
	});

	return {
		workspace: mutate,
		setName,
		isPending,
	};
}
