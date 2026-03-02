import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useLogin';
import type { LoginRequest } from '../../types/login';

import styles from './LoginForm.module.css';

import logo from '/logo.svg';

export const LoginForm = () => {
	const { login: loginUser, isPending } = useLogin();

	const { register, handleSubmit } = useForm<LoginRequest>();

	return (
		<div className={styles.login}>
			<span className={styles.loginTitle}>Access your account</span>
			<form
				className={styles.loginForm}
				onSubmit={handleSubmit((data) => loginUser(data))}
				autoComplete="off"
			>
				<input
					type="email"
					className={styles.loginFormField}
					placeholder="Email"
					{...register('email')}
					required
				/>
				<input
					type="password"
					className={styles.loginFormField}
					placeholder="Password"
					{...register('password')}
					minLength={6}
					required
				/>
				<button
					type="submit"
					className={styles.loginFormButton}
					disabled={isPending}
				>
					{isPending ? '...' : 'Login'}
				</button>
			</form>
			<a href="/auth/register">Don't have an account yet?</a>
			<div className={styles.trademark}>
				<img
					src={logo}
					alt="Logo"
					className={styles.trademarkLogo}
					width={35}
					height={35}
				/>
				<span className={styles.trademarkLabel}>OperationsERP</span>
			</div>
		</div>
	);
};
