import { api } from '@/services/api';
import type { RegisterRequest, RegisterResponse } from '../types/register';
import type { LoginRequest, LoginResponse } from '../types/login';

export const authService = {
	register: (data: RegisterRequest) =>
		api.post<RegisterResponse>('/auth/register', data),
	login: (data: LoginRequest) => api.post<LoginResponse>('/auth/login', data),
};
