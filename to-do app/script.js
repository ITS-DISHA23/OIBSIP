const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

window.onload = loadTasks;

// ---------------- ADD TASK ----------------
function addTask() {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (title === "" || description === "") {
    alert("Please fill in both Title and Description");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    description,
    status: "pending",
    addedAt: new Date().toLocaleString(),
    completedAt: null
  };

  saveTask(task);
  renderTask(task);

  titleInput.value = "";
  descInput.value = "";
}

// ---------------- SAVE TASK ----------------
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---------------- LOAD TASKS ----------------
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(renderTask);
}

// ---------------- RENDER TASK ----------------
function renderTask(task) {
  const li = document.createElement("li");
  li.className = "task-card";

  li.innerHTML = `
    <div class="task-left">
      <h3 class="task-title">${task.title}</h3>
      <p class="task-desc">${task.description}</p>
      <small class="task-time">
        ${
          task.status === "pending"
            ? `Added: ${task.addedAt}`
            : `Completed: ${task.completedAt}`
        }
      </small>
    </div>

    <div class="task-actions">
      ${
        task.status === "pending"
          ? `<button onclick="completeTask(${task.id})">✓</button>`
          : ""
      }
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">X</button>
    </div>
  `;

  if (task.status === "pending") {
    pendingList.appendChild(li);
  } else {
    completedList.appendChild(li);
  }
}


// ---------------- COMPLETE TASK ----------------
function completeTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks = tasks.map(task => {
    if (task.id === id) {
      task.status = "completed";
      task.completedAt = new Date().toLocaleString();
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshUI();
}

// ---------------- DELETE TASK ----------------
function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshUI();
}

// ---------------- EDIT TASK ----------------
function editTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find(t => t.id === id);

  const newTitle = prompt("Edit title", task.title);
  const newDesc = prompt("Edit description", task.description);

  if (newTitle && newDesc) {
    task.title = newTitle;
    task.description = newDesc;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshUI();
  }
}

// ---------------- REFRESH UI ----------------
function refreshUI() {
  pendingList.innerHTML = "";
  completedList.innerHTML = "";
  loadTasks();
}
