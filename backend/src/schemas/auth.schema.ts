import { z } from 'zod';

export const registerSchema = z.object({
	body: z.object({
		name: z.string().min(3, {
			message: 'Name must have at least 3 characters',
		}),
		surname: z.string().min(3, {
			message: 'Surname must have at least 3 characters',
		}),
		email: z
			.string()
			.refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
				message: 'Invalid email format',
			}),
		password: z.string().min(6, {
			message: 'Password must have at least 6 characters',
		}),
		confirmPassword: z.string().min(6, {
			message: 'Confirm password must have at least 6 characters',
		}),
	}),
});

export const loginSchema = z.object({
	body: z.object({
		email: z
			.string()
			.refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
				message: 'Invalid email format',
			}),
		password: z.string().min(6, {
			message: 'Password must have at least 6 characters',
		}),
	}),
});
