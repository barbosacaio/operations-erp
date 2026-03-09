import { createBrowserRouter } from 'react-router-dom';

import { DefaultLayout } from '../features/main/layouts/DefaultLayout';
import { AuthLayout } from '@/features/auth/layouts/AuthLayout';
import { WorkspaceLayout } from '@/features/workspace/layouts/WorkspaceLayout';

import { mainRoutes } from '@/features/main/routes/main.routes';
import { authRoutes } from '@/features/auth/routes/auth.routes';
import { workspaceRoutes } from '@/features/workspace/routes/workspace.routes';

export const router = createBrowserRouter([
	{
		element: <DefaultLayout />,
		children: mainRoutes,
	},
	{
		element: <AuthLayout />,
		children: authRoutes,
	},
	{
		element: <WorkspaceLayout />,
		children: workspaceRoutes,
	},
]);
