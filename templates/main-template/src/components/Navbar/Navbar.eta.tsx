import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaRegMoon, FaRegSun } from "react-icons/fa";
import "./Navbar.css";
import { allRoutes, navRoutes, RouteComponent } from "../../routes/Routes.tsx";
import Button from "../Button/Button.tsx";
import ThemeContext from "../../services/theme/ThemeContext.tsx";
import SearchBar from "../SearchBar/SearchBar.tsx";
import { AppName } from "../../App.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";
<% if (it.auth == true) { %>
import useAuth from "../../hooks/useAuth.ts";
<% } %>

const Navbar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const { themeMode, toggleTheme } = useContext(ThemeContext);
<% if (it.auth == true) { %>
    const { user, isLoaded, logout } = useAuth();
<% } %>

    const searchItems = allRoutes.map((route) => {
            return {
                label: route.name,
                path: route.path,
            }
<% if (it.auth == true) { %>
    }).filter((route) => !(!!user && (route.path === "/login" || route.path === "/signup")));
<% } %>
<% else { %>
    });
<% } %>

    const toggleSidebar = () => {
        setShowSidebar((prevState) => !prevState);
    };

    const filteredRoutes = navRoutes.filter((route) => route.path.split("/").length < 3);


    return (
        <>
            <div className="navbar-container backdrop-blur-xl">
                <header className="container mx-auto px-0 max-w-6xl">
                    <a className="flex-shrink-0 web-title" href="/">
                        <h2>{AppName}</h2>
                    </a>
                    <div className="flex-grow flex justify-between">
                        <nav className="header-nav flex">
                            {filteredRoutes.map(({ path, name }: RouteComponent, index) => (
                                <NavLink key={index} className="nav-link-button" to={path}>{name}</NavLink>
                            ))}
                        </nav>
                        <div className="flex mr-8 gap-2 ml-auto">
                            <SearchBar className="nav-search" items={searchItems}/>
<% if (it.auth == true) { %>
                            <nav className="header-nav flex">
                                {!user && isLoaded ? (
                                    <>
                                        <NavLink className="nav-link-button min-w-fit" to={"/login"}>Log in</NavLink>
                                        <NavLink className="nav-link-button min-w-fit" to={"/signup"}>Sign up</NavLink>
                                    </>
                                ) : (
                                    <button className="justify-between nav-link-button min-w-fit" onClick={logout}>
                                        Logout
                                    </button>
                                )}
                            </nav>
<% } %>
                            <Button onClick={toggleTheme} type="icon">
                                {themeMode === "dark" ? (<FaRegMoon className="my-auto" size={28}/>) : (
                                    <FaRegSun size={28}/>)}
                            </Button>
                        </div>
                    </div>
                    <button className="nav-btn burger" onClick={toggleSidebar}>
                        <FaBars/>
                    </button>
                </header>
            </div>
            <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar}/>
        </>
    );
};

export default Navbar;
