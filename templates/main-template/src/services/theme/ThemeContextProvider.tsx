import { PropsWithChildren, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeContextProvider = (props: PropsWithChildren) => {
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
        document.documentElement.className = themeMode;
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;