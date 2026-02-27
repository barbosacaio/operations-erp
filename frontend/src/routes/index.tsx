import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import Home from '../pages/Home/Home';

export const router = createBrowserRouter([
	{
		element: <DefaultLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
]);
