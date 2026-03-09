import { ProtectedRoute } from '@/routes/protected.routes';

import Home from '../pages/Home';

export const workspaceRoutes = [
	{
		path: '/workspace/:workspaceId',
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
	},
];
