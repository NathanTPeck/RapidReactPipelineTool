import fs from "fs-extra"
import { dirname, join } from "path"
import { renderTemplate } from "../../utils/template-rendering.js";
import { fileURLToPath } from "url";
import { cleanPath } from "../../utils/validation.js";
import { validateFile } from "../../utils/file-management.js";
import { Paths, TemplateDirectories } from "../../utils/constants.js";
import { addPageToExistingFiles } from "./append-existing-files.js";

export class PageTypes {
    public static default = `default`;
}

const isValid = (absoluteDirectory: string, filename: string): boolean => {

    const pagesTargetPath = join(absoluteDirectory, Paths.pages);
    if(! fs.existsSync(pagesTargetPath)) {
        console.error(`Cannot find directory ${pagesTargetPath}, please ensure your project has not been corrupted`);
        return;
    }

    if (fs.existsSync(join(pagesTargetPath, filename))) {
        console.log(`${filename} already exists`)
        return false;
    }

    const routesTargetPath = join(absoluteDirectory, Paths.routes);

    if (!validateFile(routesTargetPath, [
        /(import .*;\n)(?!(import|const|export))/,
        /(export const navRoutes: RouteComponent\[] = \[\r?\n)([\s\S]*?)(\s*];)/
    ])){
        return false;
    }

    return true;
}

const addPageTemplate = async (directory: string, name: string, pageType: string) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const absoluteDirectory = join(process.cwd(), cleanPath(directory));

    const noWsName = name.replace(/ /g, '');

    if (!isValid(absoluteDirectory, `${noWsName}.tsx`)) {
        console.log("Validation failed: cancelling request");
        return;
    }

    if (!Object.values(PageTypes).includes(pageType)) {
        console.error(`${pageType} is not a valid page type, please enter one of: ${Object.values(PageTypes).join(', ')}`);
        return;
    }

    const pagesTargetPath = join(absoluteDirectory, Paths.pages);
    const pageTemplatePath = join(__dirname, TemplateDirectories.pages, `${pageType}`);

    try{
        await renderTemplate(pageTemplatePath, pagesTargetPath, { pageName: noWsName }, noWsName);

        await addPageToExistingFiles(absoluteDirectory, name);

    } catch (error) {
        console.error(error);
    }


}

export default addPageTemplate;

