import { allTasks, activeTasks, completedTasks, updateActiveCompletedArrays } from "./tasks.js";

const taskInputField = document.querySelector('.task-input-field');
const addTaskBtn = document.querySelector('.task-add-btn');
const tasksViewer = document.querySelector('.tasks-viewer');
const inputErrorEl = document.querySelector('.input-error');
const optionsElmenets = document.querySelectorAll('.tasks-options__option-btn');

window.addEventListener('load', () => {
  fullUpdate(allTasks);
});


optionsElmenets.forEach((option) => {

  option.addEventListener('click', (e) => {
    document.querySelector('.tasks-options__option-btn--selected').classList.remove('tasks-options__option-btn--selected');
    e.target.classList.add('tasks-options__option-btn--selected');

    const optionDatasetName =  e.target.dataset.selectedOption;

    (optionDatasetName === 'all') ? fullUpdate(allTasks)
    : (optionDatasetName === 'active') ? fullUpdate(activeTasks)
    : fullUpdate(completedTasks);
  
  });
  
});

addTaskBtn.addEventListener('click', e => {
  // Prevent Form from Submiiting
  e.preventDefault();

  const taskText = taskInputField.value;

  if (taskText.length < 3) {
    inputErrorEl.classList.add('input-error--visible');
  
    return false;
  }

  allTasks.push({
    taskText,
    completed: false,
  });

  const selectedOption = document.querySelector('.tasks-options__option-btn--selected').dataset.selectedOption;

  fullUpdate(selectedOption);
});


// #########
// Functions
// #########
function toggleTaskCompletion() {
  const tasksContainers = document.querySelectorAll('.tasks-viewer__task');

  tasksContainers.forEach((taskContainer) => {
    taskContainer.addEventListener('click', e => {
      // Prevent chekbox from clicking
      e.preventDefault();

      const taskId = taskContainer.dataset.taskId;

      taskContainer.classList.toggle('tasks-viewer__task--completed');

      if (taskContainer.classList.contains('tasks-viewer__task--completed')) {
        document.querySelector(`#task-${taskId}-checkbox`).checked = true;
        allTasks[taskId].completed = true;

      } else {
        document.querySelector(`#task-${taskId}-checkbox`).checked = false;
        allTasks[taskId].completed = false;
      }

      updateActiveCompletedArrays();
    });
  });
};

function updateHTML(selectedOption) {
  let tasksHTML = '';

  selectedOption.forEach((task, index) => {
    const taskCompleted = task.completed;

    tasksHTML += `
      <p class="tasks-viewer__task ${taskCompleted ? 'tasks-viewer__task--completed': ''}" data-task-id="${index}">
        <input type="checkbox" id="task-${index}-checkbox" class="tasks-viewer__task-checkbox" ${taskCompleted ? 'checked' : ''}>
        <label for="task-${index}-checkbox" class="tasks-viewer__task-text">${task.taskText}</label>
      </p>
    `;
  });

  tasksViewer.innerHTML = tasksHTML;
}

function fullUpdate(updateHTMLOption) {
  updateHTML(updateHTMLOption);
  updateActiveCompletedArrays();
  toggleTaskCompletion();
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}