import { FC, PropsWithChildren } from "react";
import "./App.css";
import ThemeContextProvider from "./services/theme/ThemeContextProvider";
<% if (it.auth == true) { %>
import AuthContextProvider from "./services/auth/AuthContextProvider.tsx";
<% } %>

export const AppName = "<%= it.name%>"

const App: FC<PropsWithChildren> = (props: PropsWithChildren) => {
    return (
        <ThemeContextProvider>
<% if (it.auth == true) { %>
            <AuthContextProvider>
                {props.children}
            </AuthContextProvider>
<% } %>
<% else { %>
            {props.children}
<% } %>
        </ThemeContextProvider>
    );
};

export default App;
