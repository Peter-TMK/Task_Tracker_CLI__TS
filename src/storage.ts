import * as fs from "fs";
import path from "path";
import { Task } from "./task";
import { getCurrentDateTime } from "./utils";

const FILE_PATH = "./tasks.json";
// const FILE_PATH = path.join(__dirname, "./tasks.json");

export function loadTasks(): Task[] {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data) as Task[];
  } catch (error) {
    if ((error as { code: string }).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export function saveTasks(tasks: Task[]): void {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

export function addTask(description: string): Task {
  const tasks = loadTasks();
  const newTask: Task = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    description,
    status: "todo",
    createdAt: getCurrentDateTime(),
    updatedAt: getCurrentDateTime(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
}

export function listTasks(status?: "todo" | "in-progress" | "done"): Task[] {
  const tasks = loadTasks();
  const filteredTasks = status
    ? tasks.filter((task) => task.status === status)
    : tasks;
  if (filteredTasks.length === 0) {
    console.log(`Task with status ${status} NOT found!`);
  }
  return filteredTasks;
}

export function updateTask(id: number, updatedTask: string): void {
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

export function deleteTask(id: number): void {
  const tasks = loadTasks();
  const filteredTask = tasks.filter((task) => task.id !== id);

  if (tasks.length === filteredTask.length) {
    console.log(`Task with ID: ${id} NOT found!`);
  }
  saveTasks(filteredTask);
  return;
}

export function markInProgress(id: number): void {
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

export function markDone(id: number): void {
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
