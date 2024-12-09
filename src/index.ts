#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();
import createProject from "./commands/create-project.js";

program
    .version('1.0.0')
    .name('react-pipeline-tool');

program
    .command('create-project')
    .argument('<features>', "project features option")
    .argument('<project-name>', "project name")
    .argument('<directory>', "directory for project to be added")
    .action(async (pages: number, projectName: string, directory: string) => {
        await createProject(pages, projectName, directory);
    })

program.parse(process.argv);