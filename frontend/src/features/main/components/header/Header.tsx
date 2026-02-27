import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import styles from './Header.module.css';

import userLogo from '@/assets/logos/userLogo.svg';
import menuButton from '@/assets/logos/menuButton.svg';
import feedbackLogo from '@/assets/logos/feedbackLogo.svg';
import settingsLogo from '@/assets/logos/settingsLogo.svg';
import searchLogo from '@/assets/logos/searchLogo.svg';

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className={styles.header}>
			<img
				src="/logo.svg"
				alt="Header logo"
				className={styles.logo}
				width={60}
				height={60}
			/>
			<a href="/" className={styles.workspaceName}>
				Workspace Name
			</a>
			<button
				className={styles.menuButton}
				onClick={() => setIsOpen(!isOpen)}
			>
				<img
					src={menuButton}
					alt="Menu button"
					width={35}
					height={35}
				/>
			</button>

			<nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
				<NavLink to="/search" className={styles.navItem}>
					<img
						src={searchLogo}
						alt="Search logo"
						className={styles.icon}
						width={35}
						height={35}
					/>
					<span className={styles.label}>Search</span>
				</NavLink>
				<NavLink
					to="https://github.com/barbosacaio/operations-erp/issues"
					target="_blank"
					className={styles.navItem}
				>
					<img
						src={feedbackLogo}
						alt="Feedback logo"
						className={styles.icon}
						width={35}
						height={35}
					/>
					<span className={styles.label}>Feedback</span>
				</NavLink>
				<NavLink to="/settings" className={styles.navItem}>
					<img
						src={settingsLogo}
						alt="Settings logo"
						className={styles.icon}
						width={35}
						height={35}
					/>
					<span className={styles.label}>Settings</span>
				</NavLink>
				<NavLink to="/user/me" className={styles.userWrapper}>
					<img
						src={userLogo}
						alt="User logo"
						className={styles.icon}
						width={35}
						height={35}
					/>
					<span className={styles.label}>Profile</span>
				</NavLink>
			</nav>
		</header>
	);
};
