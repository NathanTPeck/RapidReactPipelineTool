import { dirname, join } from "path";
import { fileURLToPath } from "node:url";
import {cleanPath, isDirectoryEmpty} from "../utils/validation.js";
import {renderTemplate, TemplateDirectories} from "../utils/template-rendering.js";

const createProject = async (pages: number, name: string, targetDir: string) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    let targetPath = join(process.cwd(), cleanPath(targetDir));
    targetPath = join(targetPath, name);
    if (!await isDirectoryEmpty(targetPath)) {
        console.error(`The directory ${targetPath} is not empty, please use a name which does not represent an existing directory`);
        return;
    }

    const projectTemplatePath = join(__dirname, TemplateDirectories.base);

    const pageTemplatePath = join(__dirname, TemplateDirectories.pages);
    const pageTargetPath = join(targetPath, `src/pages`);

    try{
        await renderTemplate(projectTemplatePath, targetPath, { name: name, pages: pages }, null);

        if (pages > 0) {
            for (let i = 1; i < pages + 1; i++) {
                await renderTemplate(pageTemplatePath, pageTargetPath, { pageNum: i }, `Page${i}`);
            }
        }

        console.log(`Project created at ${targetPath}`);
    }
    catch(err){
        console.error(err);
    }
};

export default createProject;