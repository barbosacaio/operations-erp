import { useForm } from 'react-hook-form';
import { useCreateWorkspace } from '@/features/main/hooks/useCreateWorkspace';
import type { WorkspaceCreateRequest } from '@/features/main/types/workspace';

import styles from './CreateWorkspaceForm.module.css';

export const CreateWorkspaceForm = () => {
	const { workspace, isPending, setName } = useCreateWorkspace();
	const { register, handleSubmit } = useForm<WorkspaceCreateRequest>();

	const onSubmit = async (data: WorkspaceCreateRequest) => {
		setName(data.name);
		workspace(data);
		console.log(workspace);
	};

	return (
		<div className={styles.container}>
			<h2>Create a new workspace</h2>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
				autoComplete="off"
			>
				<input
					type="text"
					placeholder="Name"
					className={styles.nameField}
					{...register('name')}
					required
				></input>
				<button
					type="submit"
					disabled={isPending}
					className={styles.submitButton}
				>
					Create
				</button>
			</form>
			<span className={styles.nameGeneratorSpan}>
				Want some ideas?
				<button className={styles.nameGeneratorButton}>
					Generate a random name!
				</button>
			</span>
		</div>
	);
};
