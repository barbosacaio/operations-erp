import styles from './InvitesList.module.css';
import { Copy, Check, X } from 'lucide-react';

export const InvitesList = () => {
	const isEmpty = false; // Placeholder for empty state logic

	return (
		<div>
			<h2>Invites</h2>
			<table className={styles.invites}>
				<thead className={styles.invitesHead}>
					<tr>
						<th>ID</th>
						<th>Workspace Name</th>
						<th>Creation Date</th>
						<th></th>
					</tr>
				</thead>
				<tbody className={styles.invitesBody}>
					<tr>
						<td>
							<button
								className={styles.copyButton}
								onClick={() => {}}
							>
								<Copy />
							</button>
						</td>
						<td>Invite 1</td>
						<td>04/16/2004</td>
						<td>
							<div className={styles.actions}>
								<button className={styles.acceptButton}>
									<Check
										className={styles.acceptButtonIcon}
									/>
									<span className={styles.acceptButtonLabel}>
										Accept
									</span>
								</button>
								<button className={styles.declineButton}>
									<X className={styles.declineButtonIcon} />
									<span className={styles.declineButtonLabel}>
										Decline
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
						<td>Invite 2</td>
						<td>03/31/2016</td>
						<td>
							<div className={styles.actions}>
								<button className={styles.acceptButton}>
									<Check
										className={styles.acceptButtonIcon}
									/>
									<span className={styles.acceptButtonLabel}>
										Accept
									</span>
								</button>
								<button className={styles.declineButton}>
									<X className={styles.declineButtonIcon} />
									<span className={styles.declineButtonLabel}>
										Decline
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
						<td>Invite 3</td>
						<td>11/05/2026</td>
						<td>
							<div className={styles.actions}>
								<button className={styles.acceptButton}>
									<Check
										className={styles.acceptButtonIcon}
									/>
									<span className={styles.acceptButtonLabel}>
										Accept
									</span>
								</button>
								<button className={styles.declineButton}>
									<X className={styles.declineButtonIcon} />
									<span className={styles.declineButtonLabel}>
										Decline
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
						<td>Invite 4</td>
						<td>05/12/2022</td>
						<td>
							<div className={styles.actions}>
								<button className={styles.acceptButton}>
									<Check
										className={styles.acceptButtonIcon}
									/>
									<span className={styles.acceptButtonLabel}>
										Accept
									</span>
								</button>
								<button className={styles.declineButton}>
									<X className={styles.declineButtonIcon} />
									<span className={styles.declineButtonLabel}>
										Decline
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
