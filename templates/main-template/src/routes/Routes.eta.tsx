import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ReactNode } from "react";
<% if (it.barebones == false) { %>
import Home from "../pages/Home.tsx";
<% } %>
import Error404 from "../pages/Error404.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
<% if (it.barebones == false) { %>
import Footer from "../components/Footer/Footer.tsx";
<% } %>
import Features from "../pages/Features.tsx";
<% if (it.pages > 0) { %>
<% for (let i = 1; i<= it.pages; i++) { %>
import Page<%= i%> from "../pages/Page<%= i %>";
<% } %>
<% } %>
<% if (it.auth == true) { %>
import Signup from "../pages/Signup.tsx";
import Login from "../pages/Login";
<% } %>
<% if (it.protected == true) { %>
import ProtectedRoute from "./ProtectedRoute.tsx";
<% } %>

export type RouteComponent = {
    name: string;
    path: string;
    element: ReactNode;
}

export const navRoutes: RouteComponent[] = [
<% if (it.barebones == false) { %>
    { name: "Home", path: "/home", element: <Home /> },
<% } %>
    { name: "Features", path: "/features", element: <Features /> },
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
<% } %>];

export const allRoutes: RouteComponent[] = [...navRoutes, ...nonNavRoutes];

const LayoutWithoutNavbar = () => (
    <>
        <div className="page-body page-height-no-header">
            <Outlet/>
        </div>
<% if (it.barebones == false) { %>
        <Footer />
<% } %>
    </>
);

const LayoutWithNavbar = () => (
    <>
        <Navbar/>
        <div className="page-body page-height">
            <Outlet />
        </div>
<% if (it.barebones == false) { %>
        <Footer />
<% } %>
    </>
);

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/<%= it.barebones ? "features" : "home" %>" replace />} />
            <Route element={<LayoutWithNavbar />}>
                {navRoutes.map(({ path, element }: RouteComponent, index) => (
<% if (it.protected == true) { %>
                    <Route key={index} path={path} element={(
                        <ProtectedRoute>{element}</ProtectedRoute>
                    )}/>
<% } %>
<% else { %>
                    <Route key={index} path={path} element={element} />
<% } %>
                ))}
                <Route key="404" path="/*" element={<Error404/>}/>
            </Route>

            <Route element={<LayoutWithoutNavbar />}>
                {nonNavRoutes.map(({ path, element }: RouteComponent, index) => (
                    <Route key={100+index} path={path} element={element} />
                ))}
            </Route>
        </Routes>
    );
}

export default AppRoutes;
