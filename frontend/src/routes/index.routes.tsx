import { createBrowserRouter } from 'react-router-dom';

import { DefaultLayout } from '../features/main/layouts/DefaultLayout';
import { AuthLayout } from '@/features/auth/layouts/AuthLayout';

import { mainRoutes } from '@/features/main/routes/main.routes';
import { authRoutes } from '@/features/auth/routes/auth.routes';

export const router = createBrowserRouter([
	{
		element: <DefaultLayout />,
		children: mainRoutes,
	},
	{
		element: <AuthLayout />,
		children: authRoutes,
	},
]);
