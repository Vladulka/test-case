import { useContext } from "react";
import ThemeContext, { darkTheme } from "@/providers/ThemeProvider";
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {

	const { theme, handleThemeChange } = useContext(ThemeContext);

	return (
		<button onClick={handleThemeChange} className={styles.switcher}>
			{ theme === darkTheme ? '☀️' : '🌚' }
		</button>
	);
};

export default ThemeSwitcher;
