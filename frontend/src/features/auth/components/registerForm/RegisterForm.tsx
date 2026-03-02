import styles from './RegisterForm.module.css';

import logo from '/logo.svg';

export const RegisterForm = () => {
	return (
		<div className={styles.register}>
			<span className={styles.registerTitle}>Create a new account</span>
			<form className={styles.registerForm}>
				<input
					type="text"
					className={styles.registerFormField}
					placeholder="Name"
					required
				/>
				<input
					type="text"
					className={styles.registerFormField}
					placeholder="Surname"
					required
				/>
				<input
					type="email"
					className={styles.registerFormField}
					placeholder="Email"
					required
				/>
				<input
					type="password"
					className={styles.registerFormField}
					placeholder="Password"
					required
				/>
				<input
					type="confirmPassword"
					className={styles.registerFormField}
					placeholder="Confirm password"
					required
				/>
				<input
					type="submit"
					className={styles.registerFormButton}
					value="Register"
				/>
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
