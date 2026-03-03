import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/auth.context';
import { ApiError } from '@/services/api';

export function useLogOut() {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			logout();
		},

		onSuccess: () => {
			logout();
			toast.success('Logged out!');
			navigate('/auth/login');
		},

		onError: (error: ApiError) => {
			toast.error(`[${error.status}] ${error.message}.`);
		},
	});

	return { logout: mutate, isPending };
}
