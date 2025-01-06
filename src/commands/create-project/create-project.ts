import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {cleanPath, isDirectoryEmpty, validateAndParseOptions} from "../../utils/validation.js";
import {deleteTemplate, renderTemplate } from "../../utils/template-rendering.js";
import {Commands} from "../../index.js";
import { Paths, TemplateDirectories } from "../../utils/constants.js";

const createProject = async (name: string, targetDir: string, inputOptions: {[key: string]: any}) => {
    const options = validateAndParseOptions(Commands.createProject, {name, targetDir, ...inputOptions});

    const __dirname = dirname(fileURLToPath(import.meta.url));

    let targetPath = join(process.cwd(), cleanPath(targetDir));
    targetPath = join(targetPath, name);
    if (!await isDirectoryEmpty(targetPath)) {
        console.error(`The directory ${targetPath} is not empty, please use a name which does not represent an existing directory`);
        return;
    }

    const projectTemplatePath = join(__dirname, TemplateDirectories.base);

    try{
        await renderTemplate(projectTemplatePath, targetPath, options);

        if (options.pages > 0) {
            const pageTemplatePath = join(__dirname, TemplateDirectories.pages, "default");
            const pageTargetPath = join(targetPath, Paths.pages);

            for (let i = 0; i < options.pages; i++) {
                await renderTemplate(pageTemplatePath, pageTargetPath, { pageName: `Page${i+1}` }, `Page${i+1}`);
            }
        }

        if (options.auth) {
            const authTemplatePath = join(__dirname, TemplateDirectories.auth);

            await renderTemplate(authTemplatePath, targetPath, options);
        }

        console.log(`Project created at ${targetPath}`);
    }
    catch(err){
        console.error(err);
        await deleteTemplate(targetPath);
    }
};

export default createProject;