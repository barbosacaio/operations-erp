import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';
// import { Sidebar } from '../components/sidebar/Sidebar';
import { SidebarNoWorkspace } from '../components/sidebarNoWorkspace/SidebarNoWorkspace';

export const DefaultLayout = () => {
	return (
		<div className="app">
			<Header />

			<div className="main">
				<SidebarNoWorkspace />
				<div className="content">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
