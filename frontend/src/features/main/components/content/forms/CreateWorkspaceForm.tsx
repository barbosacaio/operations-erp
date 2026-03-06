import styles from './CreateWorkspaceForm.module.css';

export const CreateWorkspaceForm = () => {
	return (
		<div className={styles.container}>
			<h2>Create a new workspace</h2>
			<form className={styles.form} autoComplete="off">
				<input
					type="text"
					placeholder="Name"
					className={styles.nameField}
				></input>
				<button type="submit" className={styles.submitButton}>
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
