import fs from "fs-extra";
import { Eta } from "eta";
import { join, relative } from "path";
import { renameEtaFileFromPath } from "./file-management.js";

export class TemplateDirectories {
    public static base = `../templates/main-template`;
    public static pages = `../templates/pages`;
}

export const renderTemplate = async (templateDir: string, outputDir: string, userInput?: {[key: string]: any}, rename?: string) => {
    const eta = new Eta({views: templateDir})

    const renderDirectory = (currentDir: string) => {
        const dirItems = fs.readdirSync(currentDir, {withFileTypes: true});

        dirItems.forEach((item) => {
            const itemPath = join(currentDir, item.name);
            const relativePath = relative(templateDir, itemPath);
            const outputPath = join(outputDir, relativePath);

            try {
                if (item.isDirectory()) {
                    fs.ensureDirSync(outputPath);
                    renderDirectory(itemPath);
                }

                else if (item.isFile() && item.name.includes(".eta.")) {
                    const renderedFile = eta.render(relativePath, userInput);
                    if (renderedFile === null) {
                        console.error(`File (${item.name}) did not render any content`)
                    }

                    let outputFilePath: string;
                    if (rename !== undefined) {
                        outputFilePath = renameEtaFileFromPath(outputPath, rename);
                    }
                    else{
                        outputFilePath = outputPath.replace(".eta.", ".");
                    }

                    fs.writeFileSync(outputFilePath, renderedFile);
                }

                else {
                    fs.copyFileSync(itemPath, outputPath);
                }
            } catch (err) {
                throw new Error(err);
            }
        });
    }

    fs.ensureDirSync(outputDir);
    renderDirectory(templateDir);
}

export const deleteTemplate = async (templateDir: string) => {
    try{
        await fs.remove(templateDir);
    }
    catch(error){
        console.error(error);
    }
}