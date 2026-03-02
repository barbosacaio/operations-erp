import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (!error.response) {
			throw new ApiError('No server connection', 0);
		}

		const message = error.response.data?.message ?? 'Unexpected error';
		const status = error.response.status;

		if (status === 401) {
			localStorage.removeItem('token');
			navigate('/auth/login');
		}

		throw new ApiError(message, status);
	},
);

export const api = {
	get: <T>(
		endpoint: string,
		queryParams?: Record<string, string | number | boolean>,
	) =>
		instance
			.get<T>(endpoint, { params: queryParams })
			.then((res) => res.data),
	post: <T>(endpoint: string, body: unknown) =>
		instance.post<T>(endpoint, body).then((res) => res.data),
	put: <T>(endpoint: string, body: unknown) =>
		instance.put<T>(endpoint, body).then((res) => res.data),
	delete: <T>(endpoint: string) =>
		instance.delete<T>(endpoint).then((res) => res.data),
};
