'use client';

import { useLocaleText } from '@/components/appProvider/localizationContext/LocalizationProvider';

export default function Page() {
	const localeText = useLocaleText().localeText.dashboard;
	return (
		<div>
			<h1>{localeText?.title}</h1>
		</div>
	);
}
