import { Outlet } from 'react-router-dom';
import { Header } from '@/features/main/components/header/Header';
import { Sidebar } from '@/features/main/components/sidebar/Sidebar';

export const WorkspaceLayout = () => {
	return (
		<div className="app">
			<Header />

			<div className="main">
				<Sidebar />
				<div className="content">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
