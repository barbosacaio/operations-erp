import { ProtectedRoute } from '@/routes/protected.routes';

import Home from '../pages/Home';

export const mainRoutes = [
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
	},
];
