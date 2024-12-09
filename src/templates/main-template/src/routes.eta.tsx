import { Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import { ReactNode } from "react";
<% if (it.pages > 0) { %>
<% for (let i = 1; i<= it.pages; i++) { %>
import Page<%= i%> from "./pages/Page<%= i %>";
<% } %>
<% } %>

export type RouteComponent = {
    name: string;
    path: string;
    element: ReactNode;
}

export const routes: RouteComponent[] = [
    { name: "Home", path: "/", element: <Home /> },
<% if (it.pages > 0) { %>
<% for (let i = 1; i <= it.pages; i++) { %>
    { name: "Page <%= i %>", path: "/Page<%= i %>", element: <Page<%= i %> /> },
<% } %>
<% } %>
]

const AppRoutes = () => {
    return (
        <App>
            <Routes>
                {routes.map(({ path, element }: RouteComponent, index) => (
                    <Route key={index} path={path} element={element} />
                ))}
                <Route key="404" path="/*" element={<Error404 />} />
            </Routes>
        </App>
    );
}

export default AppRoutes;