import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useLocaleText } from '../localizationContext/LocalizationProvider';
import { DialogContext } from './DialogContext';
import styles from './DialogProvider.module.scss';

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
	const [isShow, setIsShow] = useState(false);
	const [content, setContent] = useState<ReactNode>(null);
	const [submitAction, setSubmitAction] = useState<(() => void) | null>(null);
	const dialogRef = useRef<HTMLDivElement | null>(null);

	const localeText = useLocaleText().localeText.dialog;

	const openDialog = useCallback(
		(content: ReactNode, onSubmit?: () => void) => {
			setContent(content);
			setSubmitAction(() => onSubmit || null);
			setIsShow(true);
		},
		[]
	);

	const closeDialog = useCallback(() => {
		setIsShow(false);
		setContent(null);
		setSubmitAction(null);
	}, []);

	const onSubmit = () => {
		if (submitAction) submitAction();
		closeDialog();
	};

	const contextValue = useMemo(
		() => ({
			openDialog,
			closeDialog,
		}),
		[openDialog, closeDialog]
	);

	useEffect(() => {
		if (!isShow) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeDialog();
			}
		};

		const onClickOutside = (e: MouseEvent) => {
			if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
				closeDialog();
			}
		};

		document.addEventListener('mousedown', onClickOutside);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('mousedown', onClickOutside);
		};
	}, [isShow, closeDialog]);

	return (
		<DialogContext value={contextValue}>
			{children}
			{isShow &&
				createPortal(
					<div
						ref={dialogRef}
						className={styles.root}
						role='dialog'
						aria-modal='true'
					>
						<div className={styles.closeButton}>
							<span onClick={closeDialog}>Close Icon</span>
						</div>
						<div className={styles.content}>{content}</div>
						<div>
							<button onClick={onSubmit}>{localeText?.submit}</button>
						</div>
					</div>,
					document.body
				)}
		</DialogContext>
	);
};
