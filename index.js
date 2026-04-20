let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return [...items];
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    const taskItem = deleteButton.closest(".to-do__item");
    if (taskItem) {
      taskItem.remove();
      saveTasks(getTasksFromDOM());
    }
  });

  duplicateButton.addEventListener("click", () => {
    const currentText = textElement.textContent;
    const newTask = createItem(currentText);
    listElement.prepend(newTask);
    saveTasks(getTasksFromDOM());
  });

  editButton.addEventListener("click", () => {
    textElement.contentEditable = "true";
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.contentEditable = "false";
    if (textElement.textContent.trim() === "") {
      textElement.textContent = item;
    }
    saveTasks(getTasksFromDOM());
  });

  return clone.firstElementChild;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((element) => {
    tasks.push(element.textContent);
  });
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const tasks = loadTasks();
  tasks.forEach((task) => {
    listElement.appendChild(createItem(task));
  });
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTaskText = inputElement.value.trim();
  if (newTaskText === "") return;
  
  const newTask = createItem(newTaskText);
  listElement.prepend(newTask);
  inputElement.value = "";
  saveTasks(getTasksFromDOM());
});

renderTasks();
