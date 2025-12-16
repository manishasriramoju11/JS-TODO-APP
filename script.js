const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load saved tasks on page load
tasks.forEach(task => renderTask(task));

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    id: Date.now(), // unique ID
    text: taskText,
    completed: false,
    time: new Date().toLocaleString() // date & time
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);

  input.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;

  const span = document.createElement("span");
  span.textContent = `${task.text} (${task.time})`;

  if (task.completed) {
    span.classList.add("completed");
  }

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.onclick = () => {
    task.completed = !task.completed;
    span.classList.toggle("completed");
    saveTasks();
  };

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
