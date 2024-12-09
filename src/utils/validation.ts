import fs from 'fs-extra';

export const cleanPath = (inputPath: string) => {
    return inputPath.replace(/["']+/g, '');
}

export const isDirectoryEmpty = async (path: string) => {
    await fs.ensureDir(path);
    return (await fs.readdir(path)).length === 0;
}