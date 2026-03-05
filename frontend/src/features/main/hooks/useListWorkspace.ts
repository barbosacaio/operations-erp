import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { workspaceService } from '../services/workspace';
import { ApiError } from '@/services/api';

export function useListWorkspace() {
	const [search, setSearch] = useState('');

	const query = useQuery({
		queryKey: ['workspaces', search],
		queryFn: () => workspaceService.list(search),
	});

	const manualRefetch = () => {
		return toast.promise(query.refetch(), {
			loading: 'Fetching workspaces...',
			success: undefined,
			error: (error) => {
				if (error instanceof ApiError)
					return `[${error.status}] ${error.message}.`;
				if (error instanceof Error)
					return `[${error.name}] ${error.message}.`;
				return 'Unexpected error.';
			},
		});
	};

	return {
		myWorkspaces: query.data?.myWorkspaces ?? [],
		workspaces: query.data?.workspaces ?? [],
		isLoading: query.isLoading,
		error: query.error,
		refetch: manualRefetch,
		setSearch,
	};
}
