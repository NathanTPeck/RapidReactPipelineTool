import { ReactNode, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

type Props = {
    children: ReactNode;
}

const ThemeContextProvider = ({ children }: Props) => {
    const [themeMode, setThemeMode] = useState(
        localStorage.getItem("theme") ??
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );

    const toggleTheme = () => {
        setThemeMode((prevState) => {
            const theme = prevState === "dark" ? "light" : "dark";
            localStorage.setItem("theme", theme);
            return theme;
        });
    }

    useEffect(() => {
        console.log("changing to ", themeMode);
        document.documentElement.className = themeMode;
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;