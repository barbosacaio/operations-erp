import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/auth';
import type { LoginRequest } from '../types/login';
import { ApiError } from '@/services/api';

export function useLogin() {
	const navigate = useNavigate();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: LoginRequest) => authService.login(data),

		onSuccess: ({ token, user }) => {
			localStorage.setItem('token', token);
			toast.success(`Welcome, ${user.name}!`);
			navigate('/');
		},

		onError: (error: ApiError) => {
			toast.error(`[${error.status}] ${error.message}.`);
		},
	});

	return { login: mutate, isPending };
}
