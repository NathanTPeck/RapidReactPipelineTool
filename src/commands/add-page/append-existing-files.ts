import fs from "fs-extra";
import { appendFileWithRegEx, FileReplacement } from "../../utils/file-management.js";
import { join } from "path";
import { Paths } from "../../utils/constants.js";

const addPageToRoutes = async (filePath: string, newPageName: string): Promise<void> => {

    let fileContent = fs.readFileSync(filePath, "utf-8");

    const noWsName = newPageName.replace(/ /g, '');

    const replacements: FileReplacement[] = [
        {
            regex: /(import .*;\n)(?!(import|const|export))/,
            replacement: `$1import ${noWsName} from "../pages/${noWsName}";\n`
        },
        {
            regex: /(export const navRoutes: RouteComponent\[] = \[\r?\n)([\s\S]*?)(\s*];)/,
            replacement: `$1$2\n{ name: "${newPageName}", path: "/${noWsName}", element: <${noWsName} /> },$3`
        }
    ];

    try {
        fileContent = await appendFileWithRegEx(fileContent, replacements);
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

export const addPageToExistingFiles = async (absoluteDirectory: string, name: string) => {
    const routesTargetFilepath = join(absoluteDirectory, Paths.routes);

    try {
        await addPageToRoutes(routesTargetFilepath, name);
    } catch (error) {
        throw error;
    }
}