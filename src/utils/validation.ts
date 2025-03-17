import fs from 'fs-extra';
import {Commands} from "../index.js";
import { AppendFileRegex } from "./file-management.js";

export const cleanPath = (inputPath: string) => {
    return inputPath.replace(/["']+/g, '');
}

export const isDirectoryEmpty = async (path: string) => {
    await fs.ensureDir(path);
    return (await fs.readdir(path)).length === 0;
}

export const validateAndParseOptions = (command: string, inputOptions: {[key: string]: any})=> {
    switch (command) {
        case Commands.createProject:
            let options = {
                name:  inputOptions.name,
                pages: parseInt(inputOptions.pages) ?? 0,
                auth: inputOptions.auth ? true : !!inputOptions.forceAuth,
                protected: !!inputOptions.forceAuth,
                barebones: !!inputOptions.barebones,
            }
            if (options.name === undefined || typeof(options.name) !== 'string' ) {
                throw new Error(`Invalid Project name`);
            }
            if (inputOptions.targetDir === undefined || typeof(inputOptions.targetDir) !== 'string' ) {
                throw new Error(`Invalid Target directory`);
            }

            return options;
        case Commands.addPage:
            break;
        case Commands.addAuth:
            break;
        default:
            console.error("command not found");

    }
};

const testRegex = (file: string, regexList: RegExp[]) => {
    return regexList.some((regex) => {
        if (regex === undefined) return false;
        return !regex.test(file);
    });
}

const validateFile = (filePath: string, regexList: RegExp[]) => {
    let fileContent = fs.readFileSync(filePath, "utf-8");

    if (testRegex(fileContent, regexList)) {
        console.log(`The file (${filePath}) has been altered and is incompatible to add requested feature`);
        return false;
    }
    return true;
}

export const validateFiles = (filesAppendRegexList: AppendFileRegex[]) => {
    for (const {filePath, appendList} of filesAppendRegexList) {
        const regexList = appendList.map(append => append.regex);
        if (!validateFile(filePath, regexList)) return false;
    }
    return true;
}

