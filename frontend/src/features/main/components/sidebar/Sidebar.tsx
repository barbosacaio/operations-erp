import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.css';
import {
	UserRoundSearch,
	Boxes,
	FolderOpen,
	ListTodo,
	CircleDollarSign,
	ChartNoAxesCombined,
} from 'lucide-react';

export const Sidebar = () => {
	return (
		<aside className={styles.aside}>
			<nav>
				<NavLink to="/user" className={styles.navItem}>
					<UserRoundSearch
						color="#ECEEEB"
						size={30}
						className={styles.icon}
					/>
					<span className={styles.label}>Users</span>
				</NavLink>
				<NavLink to="/department" className={styles.navItem}>
					<Boxes color="#ECEEEB" size={30} className={styles.icon} />
					<span className={styles.label}>Departments</span>
				</NavLink>
				<NavLink to="/project" className={styles.navItem}>
					<FolderOpen
						color="#ECEEEB"
						size={30}
						className={styles.icon}
					/>
					<span className={styles.label}>Projects</span>
				</NavLink>
				<NavLink to="/task" className={styles.navItem}>
					<ListTodo
						color="#ECEEEB"
						size={30}
						className={styles.icon}
					/>
					<span className={styles.label}>Tasks</span>
				</NavLink>
				<NavLink to="/invoice" className={styles.navItem}>
					<CircleDollarSign
						color="#ECEEEB"
						size={30}
						className={styles.icon}
					/>
					<span className={styles.label}>Invoices</span>
				</NavLink>
				<NavLink to="/reports" className={styles.navItem}>
					<ChartNoAxesCombined
						color="#ECEEEB"
						size={30}
						className={styles.icon}
					/>
					<span className={styles.label}>Reports</span>
				</NavLink>
			</nav>
		</aside>
	);
};
