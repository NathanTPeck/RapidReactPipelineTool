import { FC, PropsWithChildren } from "react";
import ThemeContextProvider from "./services/theme/ThemeContextProvider";
<% if (it.auth == true) { %>
import AuthContextProvider from "./services/auth/AuthContextProvider.tsx";
<% } %>

import "./styles/App.css";
import "./styles/Button.css";
import "./styles/Card.css";
<% if (it.barebones == false) { %>
import "./styles/Footer.css";
<% } %>
import "./styles/Form.css";
import "./styles/InputFields.css";
import "./styles/InputFieldWrapper.css";
<% if (it.barebones == false) { %>
import "./styles/LineGraphic.css";
<% } %>
import "./styles/Modal.css";
import "./styles/Navbar.css";
import "./styles/SearchBar.css";
import "./styles/Sidebar.css";

export const AppName = "<%= it.name%>";

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
