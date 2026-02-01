import { validateDueDate, validatePriority, validateTitle } from "./validator.js";

const tasks = [];
let idCounter = 1;

//Add new task
//Validate using imported functions
// If valid, add to tasks array
// Return success/error message
export function addTask(title, priority, dueDate) {
  let titleCheck = validateTitle(title);
  if (titleCheck !== true) return titleCheck;

  let priorityCheck = validatePriority(priority);
  if (priorityCheck !== true) return priorityCheck;

  let dateCheck = validateDueDate(dueDate);
  if (dateCheck !== true) return dateCheck;

  const task = {
    id: idCounter++,
    title: title,
    priority: priority,
    dueDate: dueDate,
    completed: false
  };

  tasks.push(task);
  return "Task added successfully";
}

//Get all tasks
export function getAllTasks() {
  return tasks;
}

//Mark task as complete
export function completeTask(taskId) {
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return "Task not found";
  }

  task.completed = true;
  return "Task completed";
}
