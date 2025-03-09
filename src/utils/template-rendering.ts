import fs from "fs-extra";
import { Eta } from "eta";
import { join, relative } from "path";
import { renameEtaFileFromPath } from "./file-management.js";

export const renderTemplate = async (templateDir: string, outputDir: string, userInput?: {[key: string]: any}, rename?: string) => {
    const eta = new Eta({views: templateDir})

    const renderDirectory = (currentDir: string, exclude: string[]) => {
        const dirItems = fs.readdirSync(currentDir, {withFileTypes: true});

        dirItems.forEach((item) => {
            if (exclude.includes(item.name)) return;
            const itemPath = join(currentDir, item.name);
            const relativePath = relative(templateDir, itemPath);
            const outputPath = join(outputDir, relativePath);

            try {
                if (item.isDirectory()) {
                    fs.ensureDirSync(outputPath);
                    renderDirectory(itemPath, exclude);
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

    const exclude = getExcludes(userInput);

    fs.ensureDirSync(outputDir);
    renderDirectory(templateDir, exclude);
}

const getExcludes = (userInput?: {[key: string]: any}) => {
    let exclude: string[] = []

    if (userInput?.barebones === true) {
        exclude.push("Footer", "Home.tsx", "LineGraphic", "graphicLineGenerator.ts", "Footer.css", "LineGraphic.css");
    }

    return exclude;
}

export const deleteTemplate = async (templateDir: string) => {
    try{
        await fs.remove(templateDir);
    }
    catch(error){
        console.error(error);
    }
}