import { dirname, basename, join, relative } from "path";
import * as prettier from "prettier";
import fs from "fs-extra";

export const renameEtaFileFromPath = (filePath: string, rename: string) => {
    const dir = dirname(filePath);
    const baseName = basename(filePath);
    const  renamedBaseName = baseName.replace(/.*\.eta\./, `${rename}.`);
    return join(dir, renamedBaseName);
};

export type FileReplacement = {
    regex: RegExp,
    replacement: string
}

export const appendFileWithRegEx = async (file: string, replacements: FileReplacement[]) => {
    for (const { regex, replacement } of replacements) {
        if(!regex.test(file)) {
            throw new Error(`cannot perform task, file invalid ${regex}`)
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

const testRegex = (file: string, regexList: RegExp[]) => {
    return regexList.some((regex) => {
        if (regex === undefined) return false;
        return !regex.test(file);
    });
}

export const validateFile = (filePath: string, regexList: RegExp[]) => {
    let fileContent = fs.readFileSync(filePath, "utf-8");

    if (testRegex(fileContent, regexList)) {
        console.log(`The file (${filePath}) has been altered and is incompatible to add requested feature`);
        return false;
    }
    return true;
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