import { FC, ReactNode } from "react";
import "./App.css";
import ThemeContextProvider from "./contexts/Theme/ThemeContextProvider";

export const AppName = "<%= it.name%>"

type Props = {
    children: ReactNode;
};

const App: FC<Props> = ({ children }) => {
    return (
        <ThemeContextProvider>
            {children}
        </ThemeContextProvider>
    );
};

export default App;
