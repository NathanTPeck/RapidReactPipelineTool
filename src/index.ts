#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();
import createProject from "./commands/create-project/create-project.js";
import addPageTemplate from "./commands/add-page/add-page-template.js";
import addAuthTemplate from "./commands/add-auth/add-auth-template.js";

export const Commands = {
    createProject: "create-project",
    addPage: "add-page",
    addAuth: "add-auth",
}

program
    .version('1.0.0')
    .name('rapid');

program
    .command(Commands.createProject)
    .argument('<directory>', "directory for project to be added")
    .argument('<project-name>', "project name")
    .option('-p, --pages <number>', "number of extra pages to add")
    .option('-a, --auth', "include authentication setup")
    .option('-f, --force-auth', "include authentication setup with protected routes")
    .action(async (directory: string, projectName: string, options: {[key: string]: any}) => {
        await createProject(projectName, directory, options);
    });

program
    .command(Commands.addPage)
    .argument('<directory>', "directory of project, and type of page to add if supplied")
    .argument('<name>', "name of page to add")
    .argument('[page-type]', "type of page to add if specified", "default")
    .action(async (directory: string, name: string, pageType: string) => {
        await addPageTemplate(directory, name, pageType);
    });

program
    .command(Commands.addAuth)
    .argument('<directory>', "directory of project, and type of auth")
    .option('-f, --force-auth', "include authentication setup with protected routes")
    .action(async (directory: string, options: {[key: string]: any}) => {
        await addAuthTemplate(directory, options);
    })

program.parse(process.argv);