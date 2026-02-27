import Register from '../pages/Register';
import Login from '../pages/Login';

export const authRoutes = [
	{
		path: '/auth/register',
		element: <Register />,
	},
	{
		path: '/auth/login',
		element: <Login />,
	},
];
