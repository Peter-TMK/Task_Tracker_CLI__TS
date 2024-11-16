# Task Tracker CLI (TypeScript)

A simple **Command Line Interface (CLI)** application for managing tasks built with **Node.js** and **TypeScript**. This CLI tool allows users to add, update, delete, and manage task statuses (`todo`, `in-progress`, `done`).

---

## Features

- **Add Tasks**: Create a new task with a description.
- **List Tasks**: Display tasks by their statuses or list all tasks.
- **Update Tasks**: Modify the description of an existing task.
- **Delete Tasks**: Remove tasks by their ID.
- **Mark Task Status**: Update task status to `in-progress` or `done`.

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **npm** or **yarn**
- A basic understanding of TypeScript and the command line.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Peter-TMK/Task_Tracker_CLI__TS.git
   cd Task_Tracker_CLI__TS
   ```

2. Install dependencies:

```
npm install
```

3. Compile TypeScript files:

```
npm run build
```

4. Run the CLI application:

```
node dist/index.js
```

### Usage

Run the CLI with specific commands:

#### Add a Task

```
node dist/index.js add "Task Description"
```

##### Example:

```
node dist/index.js add "Buy groceries"
```

#### List Tasks

```
node dist/index.js list [status]
```

- status: Optional. Filter tasks by todo, in-progress, or done. Example:

```
node dist/index.js list todo
```

#### Update Task Description

```
node dist/index.js update <taskID> "Updated Description"
```

##### Example:

```
node dist/index.js update 1 "Buy groceries and cook dinner"
```

#### Delete a Task

```
node dist/index.js delete <taskID>
```

##### Example:

```
node dist/index.js delete 1
```

#### Mark Task as In-Progress

```
node dist/index.js in-progress <taskID>
```

##### Example:

```
node dist/index.js in-progress 2
```

#### Mark Task as Done

```
node dist/index.js done <taskID>
```

##### Example:

```
node dist/index.js done 2
```

### File Structure

- src/index.ts: Entry point for handling CLI commands.
- src/storage.ts: Functions for task management (add, update, delete, mark statuses).
- src/task.ts: TypeScript Task interface for defining task structure.
- src/utils.ts: Helper utilities like getting the current date-time.
- tasks.json: JSON file for storing tasks.

### Task Structure

Each task is stored in tasks.json with the following structure:

```
{
  "id": 1,
  "description": "Sample task",
  "status": "todo",
  "createdAt": "2024-11-11T10:00:00.000Z",
  "updatedAt": "2024-11-11T10:00:00.000Z"
}
```

### Example Workflow

1. Add tasks:

```
node dist/index.js add "Write documentation"
node dist/index.js add "Review code"
```

2. List tasks:

```
node dist/index.js list
```

3. Mark tasks as in-progress or done:

```
node dist/index.js in-progress 1
node dist/index.js done 1
```

4. Delete a task:

```
node dist/index.js delete 2
```

### Future Improvements

- Add user authentication for task management.
- Enhance error handling and validation.
- Implement sorting and searching tasks.
- Add test cases using Jest.

### License

This project is licensed under the MIT License.

### Author

[Tunde Wey](https://github.com/Peter-TMK/Task_Tracker_CLI__TS)

Feel free to contribute, report issues, or suggest improvements! 🎉
