import { PublicRoute } from '@/routes/public.routes';

import Register from '../pages/Register';
import Login from '../pages/Login';

export const authRoutes = [
	{
		path: '/auth/register',
		element: (
			<PublicRoute>
				<Register />
			</PublicRoute>
		),
	},
	{
		path: '/auth/login',
		element: (
			<PublicRoute>
				<Login />
			</PublicRoute>
		),
	},
];
