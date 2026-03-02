import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

export function PublicRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
}
