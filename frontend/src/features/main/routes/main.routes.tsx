import { ProtectedRoute } from '@/routes/protected.routes';

import Home from '../pages/Home';
import CreateWorkspace from '../pages/CreateWorkspace';

export const mainRoutes = [
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
	},
	{
		path: '/workspace/add',
		element: (
			<ProtectedRoute>
				<CreateWorkspace />
			</ProtectedRoute>
		),
	},
];
