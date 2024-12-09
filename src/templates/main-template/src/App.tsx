import { FC, ReactNode } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ThemeContextProvider from "./contexts/ThemeContextProvider";

type Props = {
  children: ReactNode;
};

const App: FC<Props> = ({ children }) => {
  return (
    <ThemeContextProvider>
      <NavBar />
      <div className="page-body">{children}</div>
    </ThemeContextProvider>
  );
};

export default App;
