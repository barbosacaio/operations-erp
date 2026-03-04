import { useState } from 'react';

import styles from './WorkspaceList.module.css';
import { Search, LogIn, LogOut, X, Square, SquareCheckBig } from 'lucide-react';

export const WorkspaceList = () => {
	const [showMyWorkspaces, setShowMyWorkspaces] = useState(true);

	const handleShowMyWorkspaces = () => {
		setShowMyWorkspaces(!showMyWorkspaces);
	};

	return (
		<div>
			<span className={styles.pageTitle}>Find workspaces</span>
			<form className={styles.searchForm} autoComplete="off">
				<input
					type="text"
					placeholder="Search by workspace name or ID"
					className={styles.searchField}
					required
				/>
				<button type="submit" className={styles.searchButton}>
					<Search className={styles.searchIcon} />
				</button>
			</form>
			<div className={styles.filters}>
				<button>
					<X style={{ color: '#9C4C4C' }} />
					<span>Clear search</span>
				</button>
				<button onClick={() => handleShowMyWorkspaces()}>
					<Square
						style={{ display: showMyWorkspaces ? 'none' : 'flex' }}
					/>
					<SquareCheckBig
						style={{
							color: '#52796F',
							display: showMyWorkspaces ? 'flex' : 'none',
						}}
					/>
					<span>Show my workspaces</span>
				</button>
			</div>
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
							<div className={styles.actions}>
								<button className={styles.joinButton}>
									<LogIn className={styles.joinButtonIcon} />
									<span className={styles.joinButtonLabel}>
										Request to Join
									</span>
								</button>
							</div>
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Workspace 2</td>
						<td>17/02/2025</td>
						<td>
							<div className={styles.actions}>
								<button className={styles.joinButton}>
									<LogIn className={styles.joinButtonIcon} />
									<span className={styles.joinButtonLabel}>
										Request to Join
									</span>
								</button>
							</div>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Workspace 3</td>
						<td>02/12/2025</td>
						<td>
							<div className={styles.actions}>
								<button className={styles.accessButton}>
									<LogIn
										className={styles.accessButtonIcon}
									/>
									<span className={styles.accessButtonLabel}>
										Access
									</span>
								</button>
								<button className={styles.quitButton}>
									<LogOut className={styles.quitButtonIcon} />
									<span className={styles.quitButtonLabel}>
										Quit
									</span>
								</button>
							</div>
						</td>
					</tr>
					<tr>
						<td>4</td>
						<td>Workspace 4</td>
						<td>02/12/2025</td>
						<td>
							<div className={styles.actions}>
								<button className={styles.joinButton}>
									<LogIn className={styles.joinButtonIcon} />
									<span className={styles.joinButtonLabel}>
										Request to Join
									</span>
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
