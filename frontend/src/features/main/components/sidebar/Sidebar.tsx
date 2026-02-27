import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.css';

import users from '@/assets/logos/users.svg';
import departments from '@/assets/logos/departments.svg';
import projects from '@/assets/logos/projects.svg';
import tasks from '@/assets/logos/tasks.svg';
import invoices from '@/assets/logos/invoices.svg';
import reports from '@/assets/logos/reports.svg';

export const Sidebar = () => {
	return (
		<aside className={styles.aside}>
			<nav>
				<NavLink to="/user" className={styles.navItem}>
					<img
						src={users}
						alt="Users section"
						className={styles.icon}
						width={30}
						height={30}
					/>
					<span className={styles.label}>Users</span>
				</NavLink>
				<NavLink to="/department" className={styles.navItem}>
					<img
						src={departments}
						alt="Departments section"
						className={styles.icon}
						width={30}
						height={30}
					/>
					<span className={styles.label}>Departments</span>
				</NavLink>
				<NavLink to="/project" className={styles.navItem}>
					<img
						src={projects}
						alt="Projects section"
						className={styles.icon}
						width={30}
						height={30}
					/>
					<span className={styles.label}>Projects</span>
				</NavLink>
				<NavLink to="/task" className={styles.navItem}>
					<img
						src={tasks}
						alt="Tasks section"
						className={styles.icon}
						width={30}
						height={30}
					/>
					<span className={styles.label}>Tasks</span>
				</NavLink>
				<NavLink to="/invoice" className={styles.navItem}>
					<img
						src={invoices}
						alt="Invoices section"
						className={styles.icon}
						width={30}
						height={30}
					/>
					<span className={styles.label}>Invoices</span>
				</NavLink>
				<NavLink to="/reports" className={styles.navItem}>
					<img
						src={reports}
						alt="Reports section"
						className={styles.icon}
						width={30}
						height={30}
					/>
					<span className={styles.label}>Reports</span>
				</NavLink>
			</nav>
		</aside>
	);
};
