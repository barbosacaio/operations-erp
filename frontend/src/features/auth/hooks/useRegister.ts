import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/auth';
import { useAuth } from '@/context/auth.context';
import type { RegisterRequest } from '../types/register';
import { ApiError } from '@/services/api';

export function useRegister() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: RegisterRequest) =>
			toast.promise(authService.register(data), {
				loading: 'Registering...',
				success: null,
				error: null,
			}),

		onSuccess: ({ token, user }) => {
			login(token);
			toast.success(`Welcome, ${user.name}!`);
			navigate('/');
		},

		onError: (error: ApiError) => {
			toast.error(`[${error.status}] ${error.message}.`);
		},
	});

	return { register: mutate, isPending };
}
