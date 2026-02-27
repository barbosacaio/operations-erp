import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { Sidebar } from '../components/sidebar/Sidebar';

export const DefaultLayout = () => {
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
