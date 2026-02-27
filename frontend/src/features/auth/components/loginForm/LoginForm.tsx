import styles from './LoginForm.module.css';

import logo from '/logo.svg';

export const LoginForm = () => {
	return (
		<div className={styles.login}>
            <span className={styles.loginTitle}>Access your account</span>
			<form className={styles.loginForm}>
				<input type='email' id='email' className={styles.loginFormField} placeholder='Email' required />
				<input type='password' id='password' className={styles.loginFormField} placeholder='Password' required />
				<input type='submit' className={styles.loginFormButton} value='Register'/>
			</form>
			<a href='/auth/register'>Don't have an account yet?</a>
			<div className={styles.trademark}>
				<img src={logo} alt='Logo' className={styles.trademarkLogo} width={35} height={35} />
				<span className={styles.trademarkLabel}>OperationsERP</span>
			</div>
        </div>
	);
};
