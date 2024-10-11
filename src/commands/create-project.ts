import { dirname, join } from "path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import { cleanPath } from "../utils/validation.js";

const createProject = (name: string, targetDir: string) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    let targetPath = join(process.cwd(), cleanPath(targetDir));
    targetPath = join(targetPath, name);

    const templatePath = join(__dirname, `../templates/test-template`);
    fs.copySync(templatePath, targetPath);
    console.log(`Creating pipeline tool created with name ${name} to go in ${targetPath}`);
};

export default createProject;