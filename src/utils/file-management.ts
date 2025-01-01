import { dirname, basename, join } from "path";

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

export const appendFileWithRegEx = (file: string, replacements: FileReplacement[]): string => {
    for (const { regex, replacement } of replacements) {
        if(!regex.test(file)) {
            throw new Error(`cannot perform task, file invalid ${regex}`)
        }

        file = file.replace(regex, replacement);
    }

    return file;
}