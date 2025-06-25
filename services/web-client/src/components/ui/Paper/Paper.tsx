import { Card as CardUi } from '@mui/material';

export const Card = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<CardUi className={className} variant='outlined'>
			{children}
		</CardUi>
	);
};
