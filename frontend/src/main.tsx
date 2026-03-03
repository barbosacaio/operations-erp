import React from 'react';
import ReactDom from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes/index.routes';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/auth.context';

import './index.css';

const queryClient = new QueryClient();

ReactDom.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<Toaster position="top-right" reverseOrder={true} />
				<RouterProvider router={router} />
			</QueryClientProvider>
		</AuthProvider>
	</React.StrictMode>,
);
