export const allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
export let activeTasks = [];
export let completedTasks = [];

export function updateActiveCompletedArrays() {
  const active = [];
  const completed = [];
  
  allTasks.forEach((task) => {
    
    if (task.completed) {
      completed.push(task);
    } else {
      active.push(task);
    }

  });

  activeTasks = active;
  completedTasks = completed;

  console.log(allTasks)
  console.log(activeTasks)
  console.log(completedTasks)
}