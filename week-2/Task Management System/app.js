import { addTask, getAllTasks, completeTask } from "./task.js";
 // TODO: Import task functions
  // 1. Add some tasks
console.log(addTask("Learn JS", "high", "2026-01-30"));
console.log(addTask("Do HW", "medium", "2026-02-10"));

 // 2. Display all tasks
console.log("All Tasks:");
console.log(getAllTasks());

// 3. Complete a task
console.log("Completing Task 1:");
console.log(completeTask(1));

// 4. Display all tasks again
console.log("All Tasks After Completion:");
console.log(getAllTasks());
