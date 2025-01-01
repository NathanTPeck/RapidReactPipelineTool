import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import App from "./App";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import NavBar from "./components/NavBar/NavBar.tsx";
import Footer from "./components/Footer/Footer.tsx";
<% if (it.pages > 0) { %>
<% for (let i = 1; i<= it.pages; i++) { %>
import Page<%= i%> from "./pages/Page<%= i %>";
<% } %>
<% } %>
<% if (it.auth == true) { %>
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login";
<% } %>

export type RouteComponent = {
    name: string;
    path: string;
    element: ReactNode;
}

export const navRoutes: RouteComponent[] = [
    { name: "Home", path: "/home", element: <Home /> },
<% if (it.pages > 0) { %>
<% for (let i = 1; i <= it.pages; i++) { %>
    { name: "Page <%= i %>", path: "/Page<%= i %>", element: <Page<%= i %> /> },
<% } %>
<% } %>
];

export const nonNavRoutes: RouteComponent[] = [
<% if (it.auth == true) { %>
    { name: "Login", path: "/login", element: <Login /> },
    { name: "Signup", path: "/signup", element: <Signup /> },
<% } %>
];

export const allRoutes: RouteComponent[] = [...navRoutes, ...nonNavRoutes];

const LayoutWithoutNavBar = () => (
    <>
        <div className="page-body-no-header pt-5">
            <Outlet/>
        </div>
        <Footer />
    </>
);

const LayoutWithNavBar = () => (
    <>
        <NavBar/>
        <div className="page-body pt-5">
            <Outlet />
        </div>
        <Footer />
    </>
);

const AppRoutes = () => {
    return (
        <App>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route element={<LayoutWithNavBar />}>
                    {navRoutes.map(({ path, element }: RouteComponent, index) => (
                        <Route key={index} path={path} element={element} />
                    ))}
                    <Route key="404" path="/*" element={<Error404/>}/>
                </Route>

                <Route element={<LayoutWithoutNavBar />}>
                    {nonNavRoutes.map(({ path, element }: RouteComponent, index) => (
                        <Route key={100+index} path={path} element={element} />
                    ))}
                </Route>
            </Routes>
        </App>
    );
}

export default AppRoutes;
