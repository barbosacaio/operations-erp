import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/auth';
import type { RegisterRequest } from '../types/register';
import { ApiError } from '@/services/api';

export function useRegister() {
	const navigate = useNavigate();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: RegisterRequest) => authService.register(data),

		onSuccess: ({ token, user }) => {
			localStorage.setItem('token', token);
			toast.success(`Welcome, ${user.name}!`);
			navigate('/');
		},

		onError: (error: ApiError) => {
			toast.error(`[${error.status}] ${error.message}.`);
		},
	});

	return { register: mutate, isPending };
}
