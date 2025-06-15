export const Themes = {
	'light': 'light',
	'dark': 'dark'
} as const;

export type ITheme = typeof Themes[keyof typeof Themes];

export interface IThemeContext {
	theme: ITheme;
	setTheme: (theme: ITheme) => void
}