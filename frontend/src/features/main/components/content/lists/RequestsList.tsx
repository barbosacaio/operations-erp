import styles from './RequestsList.module.css';
import { Copy, X } from 'lucide-react';

export const RequestsList = () => {
	const isEmpty = false; // Placeholder for empty state logic

	return (
		<div style={{ marginTop: '3vh' }}>
			<h2>Requests</h2>
			<table className={styles.requests}>
				<thead className={styles.requestsHead}>
					<tr>
						<th>ID</th>
						<th>Workspace Name</th>
						<th>Creation Date</th>
						<th></th>
					</tr>
				</thead>
				<tbody className={styles.requestsBody}>
					<tr>
						<td>
							<button
								className={styles.copyButton}
								onClick={() => {}}
							>
								<Copy />
							</button>
						</td>
						<td>Request 1</td>
						<td>04/16/2004</td>
						<td>
							<div className={styles.actions}>
								<button className={styles.cancelButton}>
									<X className={styles.cancelButtonIcon} />
									<span className={styles.cancelButtonLabel}>
										Cancel
									</span>
								</button>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<button
								className={styles.copyButton}
								onClick={() => {}}
							>
								<Copy />
							</button>
						</td>
						<td>Request 2</td>
						<td>03/31/2016</td>
						<td>
							<div className={styles.actions}>
								<button className={styles.cancelButton}>
									<X className={styles.cancelButtonIcon} />
									<span className={styles.cancelButtonLabel}>
										Cancel
									</span>
								</button>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<button
								className={styles.copyButton}
								onClick={() => {}}
							>
								<Copy />
							</button>
						</td>
						<td>Request 3</td>
						<td>11/05/2026</td>
						<td>
							<div className={styles.actions}>
								<button className={styles.cancelButton}>
									<X className={styles.cancelButtonIcon} />
									<span className={styles.cancelButtonLabel}>
										Cancel
									</span>
								</button>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<button
								className={styles.copyButton}
								onClick={() => {}}
							>
								<Copy />
							</button>
						</td>
						<td>Request 4</td>
						<td>05/12/2022</td>
						<td>
							<div className={styles.actions}>
								<button className={styles.cancelButton}>
									<X className={styles.cancelButtonIcon} />
									<span className={styles.cancelButtonLabel}>
										Cancel
									</span>
								</button>
							</div>
						</td>
					</tr>
					<tr>
						<td
							colSpan={4}
							style={{
								display: isEmpty ? '' : 'none',
								alignContent: 'center',
								padding: 'clamp(20px, 1.5vw, 60px)',
							}}
						>
							No workspaces found
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
