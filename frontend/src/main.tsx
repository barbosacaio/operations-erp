import React from 'react';
import ReactDom from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes/index.routes';
import { Toaster } from 'react-hot-toast';

import './index.css';

const queryClient = new QueryClient();

ReactDom.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Toaster position="top-right" />
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
);
