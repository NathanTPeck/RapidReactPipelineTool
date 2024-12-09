import { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaRegMoon, FaRegSun, FaTimes } from "react-icons/fa";
import "./NavBar.css";
import { routes, RouteComponent } from "../../routes.tsx";
import Button from "../Button/Button.tsx";
import ThemeContext from "../../contexts/ThemeContext.tsx";

const NavBar = () => {
    const navRef = useRef<HTMLElement | null>(null);
    const { themeMode, toggleTheme } = useContext(ThemeContext);

    const showNavBar = () => {
        if (navRef.current) {
            navRef.current.classList.toggle("responsive_nav");
        }
    };

    return (
        <header>
            <a className="flex-shrink-0" href="/">
                <h2><%= it.name%></h2>
            </a>
            <div className="flex-grow flex">
                <nav ref={navRef} className="flex justify-self-start">
                    {routes.map(({ path, name }: RouteComponent, index) => (
                        <NavLink key={index} className="nav-link-button" to={path}>{name}</NavLink>
                    ))}
                    <button className="nav-btn nav-close" onClick={showNavBar}>
                        <FaTimes/>
                    </button>
                </nav>
                <div className="flex justify-between ml-auto">
                    <Button className="" onClick={toggleTheme} type="icon">
                        {themeMode === "dark" ? (<FaRegSun />) : (<FaRegMoon />)}
                    </Button>
                </div>
            </div>
            <button className="nav-btn burger" onClick={showNavBar}>
                <FaBars/>
            </button>
        </header>
    );
};

export default NavBar;
