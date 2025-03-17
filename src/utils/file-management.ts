import { dirname, basename, join, relative, isAbsolute } from "path";
import * as prettier from "prettier";
import fs from "fs-extra";
import { cleanPath } from "./validation.js";

export type FileReplacement = {
    regex: RegExp,
    replacement: string
}

export type AppendFileRegex = {
    filePath: string;
    appendList: FileReplacement[];
}

export const titleCase = (text: string) => {
    return text.replace(
        /\w\S*/g,
        str => str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
    );
};

export const renameEtaFileFromPath = (filePath: string, rename: string) => {
    const dir = dirname(filePath);
    const baseName = basename(filePath);
    const  renamedBaseName = baseName.replace(/.*\.eta\./, `${rename}.`);
    return join(dir, renamedBaseName);
};

export const getAbsoluteDirectory = (directory: string) => {
    if (isAbsolute(directory)) {
        return directory;
    }

    return join(process.cwd(), cleanPath(directory));
}

export const appendFilesWithRegEx = async (filesRegexList: AppendFileRegex[]) => {
    for (const {filePath, appendList} of filesRegexList) {
        let fileContent = fs.readFileSync(filePath, "utf-8");

        try {
            fileContent = await appendFileWithRegEx(fileContent, appendList);
        } catch (error) {
            console.error(`${error} @${filePath.split(/[\\/]/).pop()}`);
            return;
        }

        try{
            fs.writeFileSync(filePath, fileContent, "utf-8");
        } catch (error) {
            throw error;
        }
    }
}

export const appendFileWithRegEx = async (file: string, replacements: FileReplacement[]) => {
    for (const { regex, replacement } of replacements) {
        if(!regex.test(file)) {
            throw new Error(`cannot perform task, file invalid ${regex}`);
        }

        file = file.replace(regex, replacement);
    }

    try {
        return await prettier.format(file, { parser: "typescript", tabWidth: 4 });
    } catch (error) {
        console.log("Unable to format file");
        throw error;
    }
}

export const hasCommonFiles = (dirToMatch: string, dirToCheck: string): boolean => {
    const filesToMatch = fs.readdirSync(dirToMatch, { recursive: true, encoding: "utf8", withFileTypes: true });
    const filteredFiles = filesToMatch.filter(file => !file.isDirectory())
    const stringFilesToMatch = filteredFiles.map((file): string => join(file.parentPath, file.name))
    const relativeFilesToMatch = stringFilesToMatch.map((file: string) => {
        return relative(dirToMatch, file);
    });

    for (const relativeFile of relativeFilesToMatch) {
        const absolutePath = join(dirToCheck, relativeFile);
        const match = fs.existsSync(absolutePath);
        if (match) {
            return true;
        }
    }

    return false;
}