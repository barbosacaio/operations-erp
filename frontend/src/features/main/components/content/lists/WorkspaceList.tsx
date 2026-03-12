import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useListWorkspace } from '../../../hooks/useListWorkspace';
import { useJoinWorkspace } from '@/features/main/hooks/useJoinWorkspace';
import { useQuitWorkspace } from '@/features/main/hooks/useQuitWorkspace';
import type {
	WorkspaceJoinQuitRequest,
	WorkspaceSearchRequest,
} from '../../../types/workspace';
import toast from 'react-hot-toast';

import styles from './WorkspaceList.module.css';
import {
	Search,
	LogIn,
	LogOut,
	X,
	Square,
	SquareCheckBig,
	Copy,
} from 'lucide-react';

export const WorkspaceList = () => {
	const navigate = useNavigate();
	const [showMyWorkspaces, setShowMyWorkspaces] = useState(true);
	const [isSearching, setIsSearching] = useState(false);
	const { myWorkspaces, workspaces, isLoading, refetch, setSearch } =
		useListWorkspace();
	const { joinWorkspace, isPendingJoin } = useJoinWorkspace();
	const { quitWorkspaceRequest, isPendingQuit } = useQuitWorkspace();
	const flattenedMyWorkspaces = myWorkspaces.flatMap((w) => w.workspace);

	const { register, handleSubmit, setValue } =
		useForm<WorkspaceSearchRequest>();

	const isEmpty =
		(!isLoading &&
			flattenedMyWorkspaces.length === 0 &&
			workspaces.length === 0) ||
		(!isLoading && !showMyWorkspaces && workspaces.length === 0);

	const onSubmit = async (data: WorkspaceSearchRequest) => {
		setSearch(data.search ?? '');
		if (data.search !== '') setIsSearching(true);
		await refetch();
	};

	const clearSearch = async () => {
		setSearch('');
		setValue('search', '');
		setIsSearching(false);
	};

	const handleShowMyWorkspaces = () => {
		setShowMyWorkspaces(!showMyWorkspaces);
	};

	const copyWorkspaceID = async (workspaceId: string) => {
		try {
			await navigator.clipboard.writeText(workspaceId);
			toast.success('Copied workspace ID!');
		} catch {
			toast.error('Could not copy');
		}
	};

	const accessWorkspace = (workspaceId: string) => {
		toast.success('Accessing workspace...');
		navigate(`/workspace/${workspaceId}`);
	};

	const quitWorkspace = (workspaceId: WorkspaceJoinQuitRequest) => {
		quitWorkspaceRequest(workspaceId);
	};

	const requestToJoinWorkspace = (workspaceId: WorkspaceJoinQuitRequest) => {
		joinWorkspace(workspaceId);
	};

	return (
		<div>
			<h2>Find workspaces</h2>
			<form
				className={styles.searchForm}
				onSubmit={handleSubmit(onSubmit)}
				autoComplete="off"
			>
				<input
					type="text"
					placeholder="Search by workspace name or ID"
					className={styles.searchField}
					{...register('search')}
				/>
				<button
					type="submit"
					disabled={isLoading}
					className={styles.searchButton}
				>
					<Search className={styles.searchIcon} />
				</button>
			</form>
			<div className={styles.filters}>
				<button
					onClick={clearSearch}
					style={{ display: isSearching ? 'flex' : 'none' }}
				>
					<X style={{ color: '#9C4C4C' }} />
					<span>Clear search</span>
				</button>
				<button
					onClick={() => handleShowMyWorkspaces()}
					style={{
						display: myWorkspaces.length !== 0 ? 'flex' : 'none',
					}}
				>
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
					{flattenedMyWorkspaces.map((workspace) => (
						<tr
							key={workspace.id}
							style={{ display: showMyWorkspaces ? '' : 'none' }}
						>
							<td>
								<button
									className={styles.copyButton}
									onClick={() =>
										copyWorkspaceID(workspace.id)
									}
								>
									<Copy />
								</button>
							</td>
							<td>{workspace.name}</td>
							<td>
								{new Date(
									workspace.createdAt,
								).toLocaleDateString('en-US', {
									month: '2-digit',
									day: '2-digit',
									year: 'numeric',
								})}
							</td>
							<td>
								<div className={styles.actions}>
									<button
										onClick={() =>
											accessWorkspace(workspace.id)
										}
										className={styles.accessButton}
									>
										<LogIn
											className={styles.accessButtonIcon}
										/>
										<span
											className={styles.accessButtonLabel}
										>
											Access
										</span>
									</button>
									<button
										onClick={() =>
											quitWorkspace({ id: workspace.id })
										}
										disabled={isPendingQuit}
										className={styles.quitButton}
									>
										<LogOut
											className={styles.quitButtonIcon}
										/>
										<span
											className={styles.quitButtonLabel}
										>
											Quit
										</span>
									</button>
								</div>
							</td>
						</tr>
					))}
					{workspaces.map((workspace) => (
						<tr key={workspace.id}>
							<td>
								<button
									className={styles.copyButton}
									onClick={() =>
										copyWorkspaceID(workspace.id)
									}
								>
									<Copy />
								</button>
							</td>
							<td>{workspace.name}</td>
							<td>
								{new Date(
									workspace.createdAt,
								).toLocaleDateString('en-US', {
									month: '2-digit',
									day: '2-digit',
									year: 'numeric',
								})}
							</td>
							<td>
								<div className={styles.actions}>
									<button
										onClick={() =>
											requestToJoinWorkspace({
												id: workspace.id,
											})
										}
										disabled={isPendingJoin}
										className={styles.joinButton}
									>
										<LogIn
											className={styles.joinButtonIcon}
										/>
										<span
											className={styles.joinButtonLabel}
										>
											Request to Join
										</span>
									</button>
								</div>
							</td>
						</tr>
					))}
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
