'use client';
import { ruLocaleText } from 'locales/ru';
import { Router } from 'next/router';
import * as React from 'react';
import {
	BrandingContext,
	NavigationContext,
	RouterContext,
	WindowContext,
} from './context';
import { DialogProvider } from './dialogContext/DialogProivider';
import { LocalizationProvider } from './localizationContext/LocalizationProvider';
import { LocaleText } from './localizationContext/types/localization.types';
import { ThemeProvider } from './themeContext/ThemeContext';
import { ITheme } from './themeContext/types/themeContext.types';
import { Branding, Navigation } from './types/appProvider.types';

export interface NavigateOptions {
	history?: 'auto' | 'push' | 'replace';
}

export interface Navigate {
	(url: string | URL, options?: NavigateOptions): void;
}

/**
 * Abstract router used by Toolpad components.
 */

export interface Session {
	user?: {
		id?: string | null;
		name?: string | null;
		image?: string | null;
		email?: string | null;
	};
}

export interface Authentication {
	signIn: () => void;
	signOut: () => void;
}

export const AuthenticationContext = React.createContext<Authentication | null>(
	null
);

export const SessionContext = React.createContext<Session | null>(null);

export interface AppProviderProps {
	/**
	 * The content of the app provider.
	 */
	children: React.ReactNode;
	/**
	 * [Theme or themes](https://mui.com/toolpad/core/react-app-provider/#theming) to be used by the app in light/dark mode. A [CSS variables theme](https://mui.com/material-ui/customization/css-theme-variables/overview/) is recommended.
	 * @default createDefaultTheme()
	 */
	theme?: ITheme;
	/**
	 * Branding options for the app.
	 * @default null
	 */
	branding?: Branding | null;
	/**
	 * Navigation definition for the app. [Find out more](https://mui.com/toolpad/core/react-app-provider/#navigation).
	 * @default []
	 */
	navigation?: Navigation;
	/**
	 * Router implementation used inside Toolpad components.
	 * @default null
	 */
	router?: Router;
	/**
	 * Locale text for components
	 */
	localeText?: Partial<LocaleText>;
	/**
	 * Session info about the current user.
	 * @default ruLocaleText
	 */
	session?: Session | null;
	/**
	 * Authentication methods.
	 * @default null
	 */
	authentication?: Authentication | null;
	/**
	 * The window where the application is rendered.
	 * This is needed when rendering the app inside an iframe, for example.
	 * @default window
	 */
	window?: Window;
	/**
	 * The nonce to be used for inline scripts.
	 */
	nonce?: string;
}

function AppProvider(props: AppProviderProps) {
	const {
		children,
		// theme = Themes.dark,
		branding = null,
		navigation = [],
		localeText = ruLocaleText,
		router = null,
		authentication = null,
		session = null,
		window: appWindow,
	} = props;

	return (
		<WindowContext value={appWindow}>
			<AuthenticationContext value={authentication}>
				<SessionContext value={session}>
					<RouterContext value={router}>
						<ThemeProvider>
							<LocalizationProvider localeText={localeText}>
								{/* <NotificationsProvider> */}
								<DialogProvider>
									<BrandingContext.Provider value={branding}>
										<NavigationContext.Provider value={navigation}>
											{children}
										</NavigationContext.Provider>
									</BrandingContext.Provider>
								</DialogProvider>
								{/* </NotificationsProvider> */}
							</LocalizationProvider>
						</ThemeProvider>
					</RouterContext>
				</SessionContext>
			</AuthenticationContext>
		</WindowContext>
	);
}

export { AppProvider };
