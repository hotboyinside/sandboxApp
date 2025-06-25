'use client';

import '@/styles/index.scss';
import { DashboardLayout } from '@toolpad/core';
import { NextAppProvider } from '@toolpad/core/nextjs';

import { LogoIcon } from 'icons/LogoIcon';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body>
				<NextAppProvider
					branding={{
						logo: <LogoIcon width={25} height={25} fill='red' />,
						title: 'Dota Fights',
					}}
					navigation={[
						{
							segment: 'dashboard',
							title: 'Новости',
						},
						{
							segment: 'dashboard/profile',
							title: 'Профиль',
						},
					]}
				>
					<DashboardLayout>{children}</DashboardLayout>
				</NextAppProvider>
			</body>
		</html>
	);
}
