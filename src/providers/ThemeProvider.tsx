import { createContext, useEffect, useState } from "react";
import type {ReactNode} from "react";

interface Theme {
	background: string;
	textColor: string;
	grid: string;
	ticks: string;
}

interface ThemeContextType {
	theme: Theme;
	handleThemeChange: () => void;
}

interface ThemeProviderProps {
	children: ReactNode;
}

export const lightTheme = {
	background: '#FFFFFF',
	textColor: '#333333',
	grid: '#E0E0E0',
	ticks: '#333333'
};

export const darkTheme = {
	background: '#1E1E1E',
	textColor: '#FFFFFF',
	grid: '#424242',
	ticks: '#FFFFFF'
};

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme;

const ThemeContext = createContext<ThemeContextType>({
	theme: systemTheme,
	handleThemeChange: () => {},
});

export const ThemeProvider= ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState(systemTheme);
	const [isSystemTheme, setIsSystemTheme] = useState(true);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => {
			setTheme(mediaQuery.matches ? darkTheme : lightTheme);
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	const handleThemeChange = () => {
		if (isSystemTheme) {
			setTheme(theme === darkTheme ? lightTheme : darkTheme);
			setIsSystemTheme(false);
		} else {
			setTheme(systemTheme);
			setIsSystemTheme(true);
		}
	};

	return (
		<ThemeContext.Provider value={{ theme, handleThemeChange }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContext;
