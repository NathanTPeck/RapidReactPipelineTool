import Button from "../Button/Button.tsx";
import SearchBar from "../SearchBar/SearchBar.tsx";
import { FaTimes } from "react-icons/fa";
import { AppName } from "../../App.tsx";
import { RouteComponent, navRoutes, allRoutes } from "../../routes.tsx";
import { NavLink } from "react-router-dom";
import "./SideBar.css"


type SidebarProps = {
    showSidebar: boolean;
    toggleSidebar: () => void;
};

const Sidebar = ({ toggleSidebar, showSidebar }: SidebarProps) => {
    const searchItems = allRoutes.map((route) => {
        return {
            label: route.name,
            path: route.path,
        }
    });

    const filteredRoutes = navRoutes.filter((route) => route.path.split("/").length < 3);

    return (
        <div className={`backdrop-blur-md sidebar-backdrop ${showSidebar ? "show" : "hide"}-backdrop`}>
            <div className={`relative sidebar ${showSidebar ? "show" : "hide"}-sidebar`}>
                <nav className="sidebar-nav flex gap-8">
                    <Button type="icon" className="nav-close" onClick={toggleSidebar}>
                        <FaTimes size={18}/>
                    </Button>
                    <a className="mb-4">
                        <h2>{AppName}</h2>
                    </a>
                    <SearchBar items={searchItems} />
                    <section className="flex flex-col">
                        <p className="sidebar-p">MENU</p>
                        {filteredRoutes.map(({ path, name }: RouteComponent, index) => (
                            <NavLink key={index} className="nav-link-side" to={path}
                                     onClick={toggleSidebar}>
                                {name}
                            </NavLink>
                        ))}
                    </section>
                    <section className="flex flex-col">
                        <p className="sidebar-p">OPTIONS</p>
<% if (it.auth == true) { %>
                        <NavLink className="nav-link-side" to={"/login"}>Log in</NavLink>
                        <NavLink className="nav-link-side" to={"/signup"}>Sign up</NavLink>
<% } %>
                    </section>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;