import styles from './Featured.module.css';

import logo from '/logo.svg';
import image from '@/assets/images/erp_schema_drawing.png';

export const Featured = () => {
	return (
		<div className={styles.featured}>
			<div className={styles.content}>
				<img
					src={logo}
					alt="Logo"
					className={styles.logo}
					width={50}
					height={50}
				/>
				<p className={styles.text}>
					Everything your business needs —
					<span style={{ color: '#52796F' }}>in one platform</span>
				</p>
			</div>

			<img
				src={image}
				alt="ERP Schema"
				className={styles.image}
				width={800}
				height={800}
			/>
		</div>
	);
};
