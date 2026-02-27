import { Featured } from '../components/featured/Featured'
import { RegisterForm } from '../components/registerForm/RegisterForm';

export default function Register() {
	return (
		<div style={{display: 'flex', minHeight: '100vh'}}>
			<Featured />
			<RegisterForm />
		</div>
	);
}
