import axios from 'axios';

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

type ValidationField = {
	errors?: string[];
};

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (!error.response) {
			throw new ApiError('No server connection', 0);
		}

		const { data, status } = error.response;

		let message = 'Unexpected error';

		if (data?.error === 'Validation error') {
			const validationErrors =
				data?.details?.properties?.body?.properties;

			if (validationErrors) {
				const firstField = Object.values(
					validationErrors,
				)[0] as ValidationField;
				message = firstField?.errors?.[0] ?? message;
			}
		} else {
			message = data?.message ?? data?.error ?? message;
		}

		if (status === 401) {
			const token = localStorage.getItem('token');

			if (token) {
				localStorage.removeItem('token');
				window.location.href = '/auth/login';
			}
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
