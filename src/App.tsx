import ThemeSwitcher from "@components/ThemeSwitcher/ThemeSwither";
import CustomGraph from "@components/CustomGraph/CustomGraph";
import styles from './App.module.css';
import { useContext } from "react";
import ThemeContext from "@/providers/ThemeProvider";

function App() {

    const { theme } = useContext(ThemeContext);

    return (
        <div className={styles.root} style={{ background: theme.background}}>
            <ThemeSwitcher />
            <CustomGraph />
        </div>
    )
}

export default App
