"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTasks = loadTasks;
exports.saveTasks = saveTasks;
exports.addTask = addTask;
exports.listTasks = listTasks;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.markInProgress = markInProgress;
exports.markDone = markDone;
const fs = __importStar(require("fs"));
const utils_1 = require("./utils");
const FILE_PATH = "./tasks.json";
// const FILE_PATH = path.join(__dirname, "./tasks.json");
function loadTasks() {
    try {
        const data = fs.readFileSync(FILE_PATH, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        if (error.code === "ENOENT") {
            return [];
        }
        throw error;
    }
}
function saveTasks(tasks) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}
function addTask(description) {
    const tasks = loadTasks();
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        description,
        status: "todo",
        createdAt: (0, utils_1.getCurrentDateTime)(),
        updatedAt: (0, utils_1.getCurrentDateTime)(),
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}
function listTasks(status) {
    const tasks = loadTasks();
    const filteredTasks = status
        ? tasks.filter((task) => task.status === status)
        : tasks;
    if (filteredTasks.length === 0) {
        console.log(`Task with status ${status} NOT found!`);
    }
    return filteredTasks;
}
function updateTask(id, updatedTask) {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        console.log(`Task with ID ${id} NOT found!`);
    }
    tasks[taskIndex].description = updatedTask;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    saveTasks(tasks);
    //   console.log(`Task ID ${id} updated successfully.`);
}
function deleteTask(id) {
    const tasks = loadTasks();
    const filteredTask = tasks.filter((task) => task.id !== id);
    if (tasks.length === filteredTask.length) {
        console.log(`Task with ID: ${id} NOT found!`);
    }
    saveTasks(filteredTask);
    return;
}
function markInProgress(id) {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        console.log(`Task with ID ${id} NOT found!`);
    }
    tasks[taskIndex].status = "in-progress";
    tasks[taskIndex].updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ID ${id} marked as in-progress.`);
}
function markDone(id) {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        console.log(`Task with ID ${id} NOT found!`);
    }
    tasks[taskIndex].status = "done";
    tasks[taskIndex].updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ID ${id} marked as done.`);
}
