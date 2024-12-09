import fs from "fs-extra";
import { Eta } from "eta";
import { join, relative } from "path";
import { renameEtaFileFromPath } from "./file-management.js";

export class TemplateDirectories {
    public static base = `../templates/main-template`;
    public static pages = `../templates/default-page`;
}

export const renderTemplate = async (templateDir: string, outputDir: string, userInput: {[key: string]: any}, rename: string | null) => {
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
                    if (rename !== null){
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