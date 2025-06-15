'use client';
import { createContext, useEffect, useState } from 'react';
import { getItemFromLocalStorage, setItemInLocalStorage } from 'store/localStorage/localStorage';
import { ITheme, IThemeContext, Themes } from './types/themeContext.types';

export const ThemeContext = createContext<IThemeContext | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<ITheme>(Themes.light);

	useEffect(() => {
    const savedTheme = getItemFromLocalStorage('theme');
    if (savedTheme === Themes.dark || savedTheme === Themes.light) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    setItemInLocalStorage('theme', theme);
  }, [theme]);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}