import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
	return (
		<div className="app">
			<div className="main">
				<div className="content">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
