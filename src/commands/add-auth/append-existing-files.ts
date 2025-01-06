import fs from "fs-extra";
import { appendFileWithRegEx, FileReplacement } from "../../utils/file-management.js";
import { join } from "path";
import { Paths } from "../../utils/constants.js";

const addAuthToRoutes = async (filePath: string, protectedRoute: boolean=false) => {
    let fileContent = fs.readFileSync(filePath, "utf-8");


    const replacements: FileReplacement[] = [
        {
            regex: /(import .*;\n)(?!(import|const|export))/,
            replacement: `$1import Signup from "../pages/Signup.tsx";\nimport Login from "../pages/Login";\nimport ProtectedRoute from "./ProtectedRoute.tsx";\n`
        },
        {
            regex: /(export const nonNavRoutes: RouteComponent\[] = \[)/,
            replacement: `$1\n{ name: "Login", path: "/login", element: <Login /> },\n{ name: "Signup", path: "/signup", element: <Signup /> },`
        },
    ];

    if (protectedRoute) {
        replacements.push({
            regex: /(<Route key={index} path={path} element={element} \/>)/,
            replacement: `<Route key={index} path={path} element={(\n<ProtectedRoute>{element}</ProtectedRoute>\n)}/>`,
        });
    }

    try {
        fileContent = await appendFileWithRegEx(fileContent, replacements);
    } catch (error) {
        throw new Error(`${error} @${filePath}`);
    }

    try{
        fs.writeFileSync(filePath, fileContent, "utf-8");
    } catch (error) {
        throw error;
    }
};

const addAuthToApp = async (filePath: string) => {
    let fileContent = fs.readFileSync(filePath, "utf-8");

    const replacements: FileReplacement[] = [
        {
            regex: /(import .*;\n)(?!(import|const|export))/,
            replacement: `$1import AuthContextProvider from "./services/auth/AuthContextProvider.tsx";\n`
        },
        {
            regex: /(\s*)(<ThemeContextProvider>[\s\S]*?<\/ThemeContextProvider>)/,
            replacement: `$1<AuthContextProvider>$1  $2$1</AuthContextProvider>`
        }
    ];

    try {
        fileContent = await appendFileWithRegEx(fileContent, replacements);
    } catch (error) {
        throw new Error(`${error} @${filePath}`);
    }

    try{
        fs.writeFileSync(filePath, fileContent, "utf-8");
    } catch (error) {
        throw error;
    }
}

const addAuthToNav = async (filePath: string) => {
    let fileContent = fs.readFileSync(filePath, "utf-8");
    const replacements: FileReplacement[] = [
        {
            regex: /(import .*;\n)(?!(import|const|export))/,
            replacement: `$1import useAuth from "../../hooks/useAuth.ts";\n`
        },
        {
            regex: /(const NavBar = \(\) => {\n)/,
            replacement: `$1\nconst { user, isLoaded, logout } = useAuth();\n`
        },
        {
            regex: /(\s*<div className="flex mr-8 gap-2 ml-auto">)([\s\S]*?)(\s*<\/div>)/,
            replacement: `$1$2
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
                            </nav>$3`
        }
    ]

    try {
        fileContent = await appendFileWithRegEx(fileContent, replacements);
    } catch (error) {
        throw new Error(`${error} @${filePath}`);
    }

    try{
        fs.writeFileSync(filePath, fileContent, "utf-8");
    } catch (error) {
        throw error;
    }
}

const addAuthToSidebar = async (filePath: string) => {
    let fileContent = fs.readFileSync(filePath, "utf-8");

    const replacements: FileReplacement[] = [
        {
            regex: /(import .*;\n)(?!(import|const|export))/,
            replacement: `$1import useAuth from "../../hooks/useAuth.ts";\n`
        },
        {
            regex: /(const Sidebar = \(\{ toggleSidebar, showSidebar }: SidebarProps\) => \{\n)/,
            replacement: `$1\nconst { user, isLoaded, logout } = useAuth();\n`
        },
        {
            regex: /(<p className="sidebar-p">OPTIONS<\/p>)([\s\S]*?)(\s*<\/section>)/,
            replacement: `$1$2{!user && isLoaded ? (
                            <>
                                <NavLink className="nav-link-side" to={"/login"}>Log in</NavLink>
                                <NavLink className="nav-link-side" to={"/signup"}>Sign up</NavLink>
                            </>
                        ) : (
                            <button className="flex nav-link-side min-w-fit" onClick={logout}>
                                Logout
                            </button>
                        )}$3`
        }
    ]

    try {
        fileContent = await appendFileWithRegEx(fileContent, replacements);
    } catch (error) {
        throw new Error(`${error.message} @${filePath}`);
    }

    try{
        fs.writeFileSync(filePath, fileContent, "utf-8");
    } catch (error) {
        throw error;
    }
}

export const addAuthToExistingFiles = async (absoluteDirectory: string) => {
    const routesTargetPath = join(absoluteDirectory, Paths.routes);
    const navbarTargetPath = join(absoluteDirectory, Paths.navbar);
    const sidebarTargetPath = join(absoluteDirectory, Paths.sidebar);
    const appTargetPath = join(absoluteDirectory, Paths.app);

    try {
        await addAuthToRoutes(routesTargetPath);

        await addAuthToNav(navbarTargetPath);

        await addAuthToSidebar(sidebarTargetPath);

        await addAuthToApp(appTargetPath);
    } catch (error){
        throw error;
    }
}
