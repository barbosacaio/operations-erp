import styles from './WorkspaceList.module.css';
import { Search, LogIn, LogOut } from 'lucide-react';

export const WorkspaceList = () => {
	return (
		<div>
			<span className={styles.pageTitle}>Find workspaces</span>
			<form className={styles.searchForm} autoComplete="off">
				<input
					type="text"
					placeholder="Search"
					className={styles.searchField}
					required
				/>
				<button type="submit" className={styles.searchButton}>
					<Search className={styles.searchIcon} />
				</button>
			</form>
			<table className={styles.workspaces}>
				<thead className={styles.workspacesHead}>
					<tr>
						<th>ID</th>
						<th>Workspace Name</th>
						<th>Creation Date</th>
						<th></th>
					</tr>
				</thead>
				<tbody className={styles.workspacesBody}>
					<tr>
						<td>1</td>
						<td>Workspace 1</td>
						<td>25/10/2026</td>
						<td>
							<button className={styles.joinButton}>
								<LogIn className={styles.joinButtonIcon} />
								<span className={styles.joinButtonLabel}>
									Request to Join
								</span>
							</button>
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Workspace 2</td>
						<td>17/02/2025</td>
						<td>
							<button className={styles.joinButton}>
								<LogIn className={styles.joinButtonIcon} />
								<span className={styles.joinButtonLabel}>
									Request to Join
								</span>
							</button>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Workspace 3</td>
						<td>02/12/2025</td>
						<td>
							<button className={styles.quitButton}>
								<LogOut className={styles.quitButtonIcon} />
								<span className={styles.quitButtonLabel}>
									Quit
								</span>
							</button>
						</td>
					</tr>
					<tr>
						<td>4</td>
						<td>Workspace 4</td>
						<td>02/12/2025</td>
						<td>
							<button className={styles.joinButton}>
								<LogIn className={styles.joinButtonIcon} />
								<span className={styles.joinButtonLabel}>
									Request to Join
								</span>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
