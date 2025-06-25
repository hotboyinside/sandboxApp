'use client';

import { Card } from '@/components/ui/Paper';
import { Grid } from '@mui/material';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
	return (
		<div className={styles.root}>
			<Grid container spacing={3}>
				<Grid size='grow'>
					<Card>
						<h1>тайтл 1</h1>
					</Card>
				</Grid>
				<Grid size='grow'>
					<Card>
						<h1>тайтл 2</h1>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};
