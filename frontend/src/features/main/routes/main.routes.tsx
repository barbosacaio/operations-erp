import { ProtectedRoute } from '@/routes/protected.routes';

import Home from '../pages/Home';
import CreateWorkspace from '../pages/CreateWorkspace';
import Invites from '../pages/Invites';

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
	{
		path: '/invites',
		element: (
			<ProtectedRoute>
				<Invites />
			</ProtectedRoute>
		),
	},
];
