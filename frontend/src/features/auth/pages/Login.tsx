import { Featured } from '../components/featured/Featured'
import { LoginForm } from '../components/loginForm/LoginForm';

export default function Register() {
	return (
		<div style={{display: 'flex', minHeight: '100vh'}}>
			<Featured />
			<LoginForm />
		</div>
	);
}
