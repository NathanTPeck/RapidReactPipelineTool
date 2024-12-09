import { dirname, basename, join } from "path";

export const renameEtaFileFromPath = (filePath: string, rename: string) => {
    const dir = dirname(filePath);
    const baseName = basename(filePath);
    const  renamedBaseName = baseName.replace(/.*\.eta\./, `${rename}.`);
    return join(dir, renamedBaseName);
}