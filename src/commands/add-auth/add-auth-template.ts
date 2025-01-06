import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { cleanPath } from "../../utils/validation.js";
import {renderTemplate} from "../../utils/template-rendering.js";
import {  hasCommonFiles, validateFile } from "../../utils/file-management.js";
import { Paths, TemplateDirectories } from "../../utils/constants.js";
import { addAuthToExistingFiles } from "./append-existing-files.js";

const isValid = (targetDirectoryAbsolute: string, templateDirectory: string, protectedRoute: boolean=false): boolean => {
    if (hasCommonFiles(templateDirectory, targetDirectoryAbsolute)) {
        console.log("At least one authentication file to be added already exists");
        return false;
    }


    const routesTargetPath = join(targetDirectoryAbsolute, Paths.routes);
    const navbarTargetPath = join(targetDirectoryAbsolute, Paths.navbar);
    const sidebarTargetPath = join(targetDirectoryAbsolute, Paths.sidebar);
    const appTargetPath = join(targetDirectoryAbsolute, Paths.app);

    const importRegex = /(import .*;\n)(?!(import|const|export))/;

    if (!validateFile(routesTargetPath, [
        importRegex,
        /(export const nonNavRoutes: RouteComponent\[] = \[)/,
        protectedRoute ? /(<Route key={index} path={path} element={element} \/>)/ : undefined,
    ])) {
        return false;
    }

    if (!validateFile(navbarTargetPath, [
        importRegex,
        /(const NavBar = \(\) => {\n)/,
        /(\s*<div className="flex mr-8 gap-2 ml-auto">)([\s\S]*?)(\s*<\/div>)/,
    ])) {
        return false;
    }

    if (!validateFile(sidebarTargetPath, [
        importRegex,
        /(const Sidebar = \(\{ toggleSidebar, showSidebar }: SidebarProps\) => \{\n)/,
        /(<p className="sidebar-p">OPTIONS<\/p>)([\s\S]*?)(\s*<\/section>)/,
    ])) {
        return false;
    }

    if (!validateFile(appTargetPath, [
        importRegex,
        /(\s*)(<ThemeContextProvider>[\s\S]*?<\/ThemeContextProvider>)/,
    ])) {
        return false;
    }

    return true;
}



const addAuthTemplate = async (directory: string) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const absoluteDirectory = join(process.cwd(), cleanPath(directory));

    const authTemplatePath = join(__dirname, TemplateDirectories.auth);
    if (!isValid(absoluteDirectory, authTemplatePath)) {
        console.log("Validation failed: cancelling request");
        return;
    }

    try{
        await renderTemplate(authTemplatePath, absoluteDirectory);

        await addAuthToExistingFiles(absoluteDirectory);

        console.log("Note: look for \"Todos\" in AuthContextProvider to setup authentication with your backend")
    }
    catch(err){
        console.error(err);
    }
};

export default addAuthTemplate;