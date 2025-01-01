#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();
import createProject from "./commands/create-project.js";
import addPageTemplate from "./commands/add-page-template.js";
import addAuthBasicTemplate from "./commands/add-auth-basic-template.js";

export const Commands = {
    createProject: "create-project",
    addPage: "add-page",
    addAuth: "add-auth",
}

program
    .version('1.0.0')
    .name('react-pipeline-tool');

program
    .command(Commands.createProject)
    .argument('<project-name>', "project name")
    .argument('<directory>', "directory for project to be added")
    .option('-p, --pages <number>', "number of extra pages to add")
    .option('-a, --auth', "include authentication pages")
    .action(async (projectName: string, directory: string, options: {[key: string]: any}) => {
        await createProject(projectName, directory, options);
    });

program
    .command(Commands.addPage)
    .argument('<directory>', "directory of project, and type of page to add if supplied")
    .argument('<name>', "name of page to add")
    .argument('[page-type]', "type of page to add if specified", "default")
    .action(async (directory: string, name: string, pageType: string) => {
        console.log("hello")
        await addPageTemplate(directory, name, pageType);
    });

program
    .command(Commands.addAuth)
    .argument('<directory>', "directory of project, and type of auth")
    .action(async (directory: string) => {
        await addAuthBasicTemplate(directory);
    })

program.parse(process.argv);