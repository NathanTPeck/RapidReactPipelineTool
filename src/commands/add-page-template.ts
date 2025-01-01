import fs from "fs-extra"
import {dirname, isAbsolute, join} from "path"
import {deleteTemplate, renderTemplate, TemplateDirectories} from "../utils/template-rendering.js";
import {fileURLToPath} from "url";
import {cleanPath} from "../utils/validation.js";
import {appendFileWithRegEx, FileReplacement} from "../utils/file-management.js";

export class PageTypes {
    public static default = `default`;
}

const addPageToRoutes = async (filePath: string, newPageName: string): Promise<void> => {

    let fileContent = fs.readFileSync(filePath, "utf-8");

    const noWsName = newPageName.replace(/ /g, '');

    const replacements: FileReplacement[] = [
        {
            regex: /(import .* from .*;\n)(?!(import|const|export))/,
            replacement: `$1import ${noWsName} from "./pages/${noWsName}";\n`
        },
        {
            regex: /(export const navRoutes: RouteComponent\[] = \[\r?\n)([\s\S]*?)(\s*];)/,
            replacement: `$1$2    { name: "${newPageName}", path: "/${noWsName}", element: <${noWsName} /> },\n$3`
        }
    ];

    try {
        fileContent = appendFileWithRegEx(fileContent, replacements);
    } catch (error) {
        console.error(`${error} ${filePath.split(/[\\/]/).pop()}`);
        return;
    }

    try{
        fs.writeFileSync(filePath, fileContent, "utf-8");
    } catch (error) {
        throw error;
    }
};

const addPageTemplate = async (directory: string, name: string, pageType: string) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const absoluteDirectory = join(process.cwd(), cleanPath(directory));

    if (!Object.values(PageTypes).includes(pageType)) {
        console.error(`${pageType} is not a valid page type, please enter one of: ${Object.values(PageTypes).join(', ')}`);
        return;
    }

    const pageTargetPath = join(absoluteDirectory, `src/pages`);
    if(! await fs.exists(pageTargetPath)) {
        console.error(`Cannot find directory ${pageTargetPath}, please ensure your project has not been corrupted`);
        return;
    }

    const pageTemplatePath = join(__dirname, TemplateDirectories.pages, `${pageType}`);
    const routesTargetFilepath = join(absoluteDirectory, `src/routes.tsx`);

    const noWsName = name.replace(/ /g, '');

    try{
        await renderTemplate(pageTemplatePath, pageTargetPath, { pageName: noWsName }, noWsName);

        await addPageToRoutes(routesTargetFilepath, name);

    } catch (error) {
        console.error(error);
    }


}

export default addPageTemplate;

