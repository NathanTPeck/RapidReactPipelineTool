import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { cleanPath } from "../utils/validation.js";
import fs from "fs-extra";
import {renderTemplate, TemplateDirectories} from "../utils/template-rendering.js";
import {appendFileWithRegEx, FileReplacement} from "../utils/file-management.js";

const addAuthToRoutes = async (filePath: string) => {
    let fileContent = fs.readFileSync(filePath, "utf-8");


    const replacements: FileReplacement[] = [
        {
            regex: /(import .* from .*;\n)(?!(import|const|export))/,
            replacement: `$1import Signup from "./pages/Signup.tsx";\nimport Login from "./pages/Login";\n`
        },
        {
            regex: /(export const nonNavRoutes: RouteComponent\[] = \[\r?\n)([\s\S]*?)(\s*];)/,
            replacement: `$1$2    { name: "Login", path: "/login", element: <Login /> },\n    { name: "Signup", path: "/signup", element: <Signup /> },\n$3`
        }
    ];

    try {
        fileContent = appendFileWithRegEx(fileContent, replacements);
    } catch (error) {
        throw new Error(`${error} (routes.tsx)`);
    }

    try{
        fs.writeFileSync(filePath, fileContent, "utf-8");
    } catch (error) {
        throw error;
    }
};

const addAuthToNav = async (filePath: string) => {
    let fileContent = fs.readFileSync(filePath, "utf-8");

    const replacements: FileReplacement[] = [
        {
            regex: /(\s*<div className="flex mr-8 gap-2 ml-auto">)([\s\S]*?)(\s*<\/div>)/,
            replacement: `$1$2
                            <nav className="header-nav flex">
                                <NavLink className="nav-link-button min-w-fit" to={"/login"}>Log in</NavLink>
                                <NavLink className="nav-link-button min-w-fit" to={"/signup"}>Sign up</NavLink>
                            </nav>$3`
        }
    ]

    try {
        fileContent = appendFileWithRegEx(fileContent, replacements);
    } catch (error) {
        throw new Error(`${error} (Navbar.tsx)`);
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
            regex: /(<p className="sidebar-p">OPTIONS<\/p>)([\s\S]*?)(\s*<\/section>)/,
            replacement: `$1$2    <NavLink className="nav-link-side" to={"/login"}>Log in</NavLink>
                        <NavLink className="nav-link-side" to={"/signup"}>Sign up</NavLink>$3`
        }
    ]

    try {
        fileContent = appendFileWithRegEx(fileContent, replacements);
    } catch (error) {
        throw new Error(`${error} (Sidebar.tsx)`);
    }

    try{
        fs.writeFileSync(filePath, fileContent, "utf-8");
    } catch (error) {
        throw error;
    }
}

const addAuthBasicTemplate = async (directory: string) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const absoluteDirectory = join(process.cwd(), cleanPath(directory));

    const pagesTargetPath = join(absoluteDirectory, 'src/pages');
    if(! await fs.exists(pagesTargetPath)) {
        console.error(`Cannot find directory ${pagesTargetPath}, please ensure your project has not been corrupted`);
        return;
    }

    const pagesTemplatePath = join(__dirname, TemplateDirectories.pages, `auth`);
    const routesTargetPath = join(absoluteDirectory, `src/routes.tsx`);
    const navbarTargetPath = join(absoluteDirectory, `src/components/Navbar/NavBar.tsx`);
    const sidebarTargetPath = join(absoluteDirectory, `src/components/Sidebar/Sidebar.tsx`);

    try{
        await renderTemplate(pagesTemplatePath, pagesTargetPath);

        await addAuthToRoutes(routesTargetPath);

        await addAuthToNav(navbarTargetPath);

        await addAuthToSidebar(sidebarTargetPath);
    }
    catch(err){
        console.error(err);
    }
};

export default addAuthBasicTemplate;