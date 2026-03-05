import { NavLink } from 'react-router-dom';

import { useLogOut } from '../../hooks/useLogOut';

import styles from './SidebarNoWorkspace.module.css';
import { Building2, Plus, Inbox, LogOut } from 'lucide-react';

export const SidebarNoWorkspace = () => {
	const { logout: logOutUser, isPending } = useLogOut();

	return (
		<aside className={styles.aside}>
			<nav>
				<NavLink to="/" className={styles.navItem}>
					<Building2
						color="#ECEEEB"
						size={30}
						className={styles.icon}
					/>
					<span className={styles.label}>Workspaces</span>
				</NavLink>
				<NavLink to="/workspace/add" className={styles.navItem}>
					<Plus color="#ECEEEB" size={30} className={styles.icon} />
					<span className={styles.label}>Create a workspace</span>
				</NavLink>
				<NavLink to="/" className={styles.navItem}>
					<Inbox color="#ECEEEB" size={30} className={styles.icon} />
					<span className={styles.label}>Invites</span>
				</NavLink>
			</nav>
			<nav className={styles.aside}>
				<button
					type="button"
					className={styles.navItem}
					onClick={() => logOutUser()}
					disabled={isPending}
					style={{
						background: 'none',
						border: 'none',
						cursor: 'pointer',
					}}
				>
					<LogOut color="#ECEEEB" size={30} className={styles.icon} />
					<span className={styles.label}>Log out</span>
				</button>
			</nav>
		</aside>
	);
};
