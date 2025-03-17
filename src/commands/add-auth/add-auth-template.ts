import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { validateFiles } from "../../utils/validation.js";
import { renderTemplate } from "../../utils/template-rendering.js";
import {
    AppendFileRegex,
    appendFilesWithRegEx,
    getAbsoluteDirectory,
    hasCommonFiles
} from "../../utils/file-management.js";
import { Paths, TemplateDirectories } from "../../utils/constants.js";

const getAddAuthAppendFileRegex = (absoluteDirectory: string, protectedRoute: boolean=false) => {
    let appendFileRegex: AppendFileRegex[] = [];
    appendFileRegex.push({
            filePath: join(absoluteDirectory, Paths.routes),
            appendList: [
                {
                    regex: /(import .*;\n)(?!(import|const|export))/,
                    replacement: `$1import Signup from "../pages/Signup.tsx";\nimport Login from "../pages/Login";\nimport ProtectedRoute from "./ProtectedRoute.tsx";\n`
                },
                {
                    regex: /(export const nonNavRoutes: RouteComponent\[] = \[)/,
                    replacement: `$1\n{ name: "Login", path: "/login", element: <Login /> },\n{ name: "Signup", path: "/signup", element: <Signup /> },`
                },
            ]
        },
        {
            filePath: join(absoluteDirectory, Paths.app),
            appendList: [
                {
                    regex: /(import .*;\n)(?!(import|const|export))/,
                    replacement: `$1import AuthContextProvider from "./services/auth/AuthContextProvider.tsx";\n`
                },
                {
                    regex: /(\s*)(<ThemeContextProvider>[\s\S]*?<\/ThemeContextProvider>)/,
                    replacement: `$1<AuthContextProvider>$1  $2$1</AuthContextProvider>`
                }
            ]
        },
        {
            filePath: join(absoluteDirectory, Paths.navbar),
            appendList: [
                {
                    regex: /(import .*;\n)(?!(import|const|export))/,
                    replacement: `$1import useAuth from "../../hooks/useAuth.ts";\n`
                },
                {
                    regex: /(const Navbar = \(\) => {\n)/,
                    replacement: `$1\nconst { user, isLoaded, logout } = useAuth();\n`
                },
                {
                    regex: /(const searchItems = allRoutes\.map\()([\s\S]*?)(\);)/,
                    replacement: `$1$2).filter((route) => !(!!user && (route.path === "/login" || route.path === "/signup")));`
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
        },
        {
            filePath: join(absoluteDirectory, Paths.sidebar),
            appendList: [
                {
                    regex: /(import .*;\n)(?!(import|const|export))/,
                    replacement: `$1import useAuth from "../../hooks/useAuth.ts";\n`
                },
                {
                    regex: /(const Sidebar = \(\{ toggleSidebar, showSidebar }: SidebarProps\) => \{\n)/,
                    replacement: `$1\nconst { user, isLoaded, logout } = useAuth();\n`
                },
                {
                    regex: /(const searchItems = allRoutes\.map\()([\s\S]*?)(\);)/,
                    replacement: `$1$2).filter((route) => !(!!user && (route.path === "/login" || route.path === "/signup")));`
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
        }
    );

    if (protectedRoute){
        appendFileRegex.find(fileRegex => fileRegex.filePath === join(absoluteDirectory, Paths.routes))
            .appendList.push({
                regex: /(<Route key={index} path={path} element={element} \/>)/,
                replacement: `<Route key={index} path={path} element={(\n<ProtectedRoute>{element}</ProtectedRoute>\n)}/>`,
            });
    }

    return appendFileRegex;
}

const isValid = (targetDirectoryAbsolute: string, templateDirectory: string, appendFilesList: AppendFileRegex[]): boolean => {
    if (hasCommonFiles(templateDirectory, targetDirectoryAbsolute)) {
        console.log("At least one authentication file to be added already exists");
        return false;
    }

    return validateFiles(appendFilesList);
}


const addAuthTemplate = async (directory: string, options: {[key: string]: any}) => {
    let protectedRoute = false;
    if (options.forceAuth === true) {
        protectedRoute = true;
    }
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const absoluteDirectory = getAbsoluteDirectory(directory);

    const appendFiles = getAddAuthAppendFileRegex(absoluteDirectory, protectedRoute);

    const authTemplatePath = join(__dirname, TemplateDirectories.auth);
    if (!isValid(absoluteDirectory, authTemplatePath, appendFiles)) {
        console.log("Validation failed: cancelling request");
        return;
    }

    try{
        await renderTemplate(authTemplatePath, absoluteDirectory);

        await appendFilesWithRegEx(appendFiles);

        console.log("Note: look for \"Todos\" in AuthContextProvider to setup authentication with your backend")
    }
    catch(err){
        console.error(err);
    }
};

export default addAuthTemplate;