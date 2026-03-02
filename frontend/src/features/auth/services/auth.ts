import { api } from '@/services/api';
import type { RegisterRequest, RegisterResponse } from '../types/register';

export const authService = {
	register: (data: RegisterRequest) =>
		api.post<RegisterResponse>('/auth/register', data),
};
