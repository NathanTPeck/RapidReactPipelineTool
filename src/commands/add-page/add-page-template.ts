import fs from "fs-extra"
import { dirname, join } from "path"
import { renderTemplate } from "../../utils/template-rendering.js";
import { fileURLToPath } from "url";
import { validateFiles } from "../../utils/validation.js";
import { Paths, TemplateDirectories } from "../../utils/constants.js";
import { AppendFileRegex, appendFilesWithRegEx, getAbsoluteDirectory, titleCase } from "../../utils/file-management.js";

export class PageTypes {
    public static default = `default`;
}

const getAddPageAppendFileRegex = (absoluteDirectory: string, name: string, componentName: string, routeName: string) => {
    let appendFileRegex: AppendFileRegex[] = [];
    appendFileRegex.push({
        filePath: join(absoluteDirectory, Paths.routes),
        appendList: [
            {
                regex: /(import .*;\n)(?!(import|const|export))/,
                replacement: `$1import ${componentName} from "../pages/${componentName}";\n`
            },
            {
                regex: /(export const navRoutes: RouteComponent\[] = \[\r?\n)([\s\S]*?)(\s*];)/,
                replacement: `$1$2\n{ name: "${name}", path: "/${routeName}", element: <${componentName} /> },$3`
            }
        ]
    });

    return appendFileRegex;
}

const isValid = (absoluteDirectory: string, filename: string, appendFilesList: AppendFileRegex[]): boolean => {

    const pagesTargetPath = join(absoluteDirectory, Paths.pages);
    if(! fs.existsSync(pagesTargetPath)) {
        console.error(`Cannot find directory '${pagesTargetPath}', please ensure you entered your project directory correctly, and your project has not been corrupted`);
        return;
    }

    if (fs.existsSync(join(pagesTargetPath, filename))) {
        console.log(`${filename} already exists`)
        return false;
    }

    return validateFiles(appendFilesList);
};

const addPageTemplate = async (directory: string, name: string, pageType: string) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const absoluteDirectory = getAbsoluteDirectory(directory);

    const routeName = name.toLowerCase().replace(/ /g, '-');
    const componentName = titleCase(name).replace(/ /g, '');

    const appendFiles = getAddPageAppendFileRegex(absoluteDirectory, name, componentName, routeName)

    if (!isValid(absoluteDirectory, `${componentName}.tsx`, appendFiles)) {
        console.error("Validation failed: cancelling request");
        return;
    }

    if (!Object.values(PageTypes).includes(pageType)) {
        console.error(`${pageType} is not a valid page type, please enter one of: ${Object.values(PageTypes).join(', ')}`);
        return;
    }

    const pagesTargetPath = join(absoluteDirectory, Paths.pages);
    const pageTemplatePath = join(__dirname, TemplateDirectories.pages, `${pageType}`);

    try{
        await renderTemplate(pageTemplatePath, pagesTargetPath, { pageName: componentName }, componentName);

        await appendFilesWithRegEx(appendFiles);

    } catch (error) {
        console.error(error);
    }
};

export default addPageTemplate;

