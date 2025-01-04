import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { cleanPath } from "../utils/validation.js";
import fs from "fs-extra";
import {renderTemplate, TemplateDirectories} from "../utils/template-rendering.js";
import {appendFileWithRegEx, FileReplacement} from "../utils/file-management.js";

const confirmValidation = (absoluteDirectory: string): boolean => {
    const pagesTargetPath = join(absoluteDirectory, 'src/pages');
    if (fs.existsSync(join(pagesTargetPath, `Login.tsx`)) || fs.existsSync(join(pagesTargetPath, `Signup.tsx`))) {
        console.log("Login and/or Signup pages already exist")
        return false;
    }

    const routesTargetPath = join(absoluteDirectory, `src/routes.tsx`);
    const navbarTargetPath = join(absoluteDirectory, `src/components/Navbar/NavBar.tsx`);
    const sidebarTargetPath = join(absoluteDirectory, `src/components/Sidebar/Sidebar.tsx`);

    let fileContent = fs.readFileSync(routesTargetPath, "utf-8");
    const routesImportRegex = /(import .* from .*;\n)(?!(import|const|export))/;
    const routesComponentRegex = /(export const nonNavRoutes: RouteComponent\[] = \[\r?\n)([\s\S]*?)(\s*];)/;

    if(!routesImportRegex.test(fileContent) || !routesComponentRegex.test(fileContent)) {
        console.log("The routes.tsx file has been altered and is incompatible to add requested feature");
        return false;
    }

    fileContent = fs.readFileSync(navbarTargetPath, "utf-8");
    const navbarRegex = /(\s*<div className="flex mr-8 gap-2 ml-auto">)([\s\S]*?)(\s*<\/div>)/;

    if(!navbarRegex.test(fileContent)) {
        console.log("The Navbar.tsx file has been altered and is incompatible to add requested feature");
        return false;
    }

    fileContent = fs.readFileSync(sidebarTargetPath, "utf-8");
    const sidebarRegex = /(<p className="sidebar-p">OPTIONS<\/p>)([\s\S]*?)(\s*<\/section>)/;

    if(sidebarRegex.test(fileContent)) {
        console.log("The Sidebar.tsx file has been altered and is incompatible to add requested feature");
        return false;
    }

    return true;
}

const addAuthToRoutes = async (filePath: string) => {
    let fileContent = fs.readFileSync(filePath, "utf-8");


    const replacements: FileReplacement[] = [
        {
            regex: /(import .* from .*;\n)(?!(import|const|export))/,
            replacement: `$1import Signup from "./pages/Signup.tsx";\nimport Login from "./pages/Login";\n`
        },
        {
            regex: /(export const nonNavRoutes: RouteComponent\[] = \[\r?\n)([\s\S]*?)(\s*];)/,
            replacement: `$1$2\n    { name: "Login", path: "/login", element: <Login /> },\n    { name: "Signup", path: "/signup", element: <Signup /> },$3`
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

const addAuthTemplate = async (directory: string) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const absoluteDirectory = join(process.cwd(), cleanPath(directory));

    if (!confirmValidation(absoluteDirectory)) {
        console.log("Cancelling request")
        return;
    }

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

export default addAuthTemplate;