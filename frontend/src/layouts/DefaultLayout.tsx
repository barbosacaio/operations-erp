import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header/Header';
import { Sidebar } from '../components/layout/Sidebar/Sidebar';

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
