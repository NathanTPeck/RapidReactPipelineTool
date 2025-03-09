import { createContext } from "react";

const ThemeContext = createContext({
    themeMode: "light",
    toggleTheme: () => {},
});

export default ThemeContext;