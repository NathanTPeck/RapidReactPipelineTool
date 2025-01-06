import fs from 'fs-extra';
import {Commands} from "../index.js";

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
        default:
            console.error("command not found");

    }
};