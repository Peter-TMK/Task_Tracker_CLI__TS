"use strict";
// // src/index.ts
// console.log("Welcome to Task-Tracker-CLI(TS)!");
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("./storage");
// console.log("argv values: ", process.argv);
const args = process.argv.slice(2);
const command = args[0];
switch (command) {
    case "add":
        // console.log("Add command recognized.");
        const description = args[1];
        if (!description) {
            console.log("Please provide a task description");
            break;
        }
        const newTask = (0, storage_1.addTask)(description);
        console.log(`Task added successfully (ID: ${newTask.id})`);
        break;
    case "list":
        // console.log("Still to come");
        const status = args[1];
        // if (!status) {
        //   console.log("Please provide a task status");
        //   break;
        // }
        const listTask = (0, storage_1.listTasks)(status);
        // console.log(listTask);
        if (storage_1.listTasks.length === 0) {
            console.log(`No tasks found with status "${status}".`);
        }
        else {
            listTask.forEach((task) => {
                console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.status}, Created At: ${task.createdAt}`);
            });
        }
        break;
    case "update":
        //   // console.log("Add command recognized.");
        const id = parseInt(args[1]);
        const updateDescription = args[2];
        if (isNaN(id)) {
            console.log(`ID: ${id} is NOT a valid number.`);
            break;
        }
        if (!updateDescription) {
            console.log("Please provide a new task description");
            break;
        }
        (0, storage_1.updateTask)(id, updateDescription);
        console.log(`Task with ID: ${id} updated successfully!`);
        break;
    case "delete":
        const _id = parseInt(args[1]);
        if (isNaN(_id)) {
            console.log(`ID: ${_id} is NOT a valid number.`);
            break;
        }
        (0, storage_1.deleteTask)(_id);
        // console.log(`Task with ID: ${_id} deleted successfully!`);
        break;
    case "in-progress":
        //   // console.log("Add command recognized.");
        const idInProgress = parseInt(args[1]);
        // const updateDescription = args[2];
        if (isNaN(idInProgress)) {
            console.log(`ID: ${idInProgress} is NOT a valid number.`);
            break;
        }
        // if (!updateDescription) {
        //   console.log("Please provide a new task description");
        //   break;
        // }
        (0, storage_1.markInProgress)(idInProgress);
        console.log(`Task with ID: ${idInProgress} updated successfully!`);
        break;
    case "done":
        //   // console.log("Add command recognized.");
        const idDone = parseInt(args[1]);
        // const updateDescription = args[2];
        if (isNaN(idDone)) {
            console.log(`ID: ${idDone} is NOT a valid number.`);
            break;
        }
        // if (!updateDescription) {
        //   console.log("Please provide a new task description");
        //   break;
        // }
        (0, storage_1.markDone)(idDone);
        console.log(`Task with ID: ${idDone} updated successfully!`);
        break;
    default:
        console.log("Command not recognized.");
        break;
}
// import { loadTasks, saveTasks } from "./storage";
// import { Task } from "./task";
// import { getCurrentDateTime } from "./utils";
// // Test to add a sample task and save to JSON
// const testTask: Task = {
//   id: 1,
//   description: "Sample task",
//   status: "todo",
//   createdAt: getCurrentDateTime(),
//   updatedAt: getCurrentDateTime(),
// };
// const tasks = loadTasks();
// tasks.push(testTask);
// saveTasks(tasks);
// console.log("Test task added to tasks.json");
