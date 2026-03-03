import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import styles from './Header.module.css';
import {
	CircleUserRound,
	Menu,
	BotMessageSquare,
	Settings,
	Search,
} from 'lucide-react';

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className={styles.header}>
			<img
				src="/logo_white.svg"
				alt="Header logo"
				className={styles.logo}
				width={60}
				height={60}
			/>
			<a href="/" className={styles.workspaceName}>
				OperationsERP
			</a>
			<button
				className={styles.menuButton}
				onClick={() => setIsOpen(!isOpen)}
			>
				<Menu color="#ECEEEB" size={35} />
			</button>

			<nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
				<NavLink to="/search" className={styles.navItem}>
					<Search color="#ECEEEB" size={35} className={styles.icon} />
					<span className={styles.label}>Search</span>
				</NavLink>
				<NavLink
					to="https://github.com/barbosacaio/operations-erp/issues"
					target="_blank"
					className={styles.navItem}
				>
					<BotMessageSquare
						color="#ECEEEB"
						size={35}
						className={styles.icon}
					/>
					<span className={styles.label}>Feedback</span>
				</NavLink>
				<NavLink to="/settings" className={styles.navItem}>
					<Settings
						color="#ECEEEB"
						size={35}
						className={styles.icon}
					/>
					<span className={styles.label}>Settings</span>
				</NavLink>
				<NavLink to="/user/me" className={styles.userWrapper}>
					<CircleUserRound
						color="#ECEEEB"
						size={35}
						className={styles.icon}
					/>
					<span className={styles.label}>Profile</span>
				</NavLink>
			</nav>
		</header>
	);
};
