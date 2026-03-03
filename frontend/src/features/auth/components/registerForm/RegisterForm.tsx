import { useForm } from 'react-hook-form';
import { useRegister } from '../../hooks/useRegister';
import type { RegisterRequest } from '../../types/register';

import styles from './RegisterForm.module.css';

import logo from '/logo.svg';

export const RegisterForm = () => {
	const { register: registerUser, isPending } = useRegister();

	const { register, handleSubmit } = useForm<RegisterRequest>();

	return (
		<div className={styles.register}>
			<span className={styles.registerTitle}>Create a new account</span>
			<form
				className={styles.registerForm}
				onSubmit={handleSubmit((data) => registerUser(data))}
				autoComplete="off"
			>
				<input
					type="text"
					className={styles.registerFormField}
					placeholder="Name"
					{...register('name')}
					required
				/>
				<input
					type="text"
					className={styles.registerFormField}
					placeholder="Surname"
					{...register('surname')}
					required
				/>
				<input
					type="string"
					className={styles.registerFormField}
					placeholder="Email"
					{...register('email')}
					required
				/>
				<input
					type="password"
					className={styles.registerFormField}
					placeholder="Password"
					{...register('password')}
					required
				/>
				<input
					type="password"
					className={styles.registerFormField}
					placeholder="Confirm password"
					{...register('confirmPassword')}
					required
				/>
				<button
					type="submit"
					disabled={isPending}
					className={styles.registerFormButton}
				>
					{isPending ? '...' : 'Register'}
				</button>
			</form>
			<a href="/auth/login">Already have an account?</a>
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
