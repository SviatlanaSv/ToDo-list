let selectedDay = "monday"; // Default selected day
let editingTaskIndex = 0; // Index of the task currently being edited

// Get the list of to-do tasks from localStorage
function getTodoTasks() {
  const tasks = localStorage.getItem("toDoTaskList");
  return tasks ? JSON.parse(tasks) : [];
}

// Save the list of to-do tasks to localStorage
function saveTodoTasks(data) {
  localStorage.setItem("toDoTaskList", JSON.stringify(data));
}

// Add a new task to the to-do list
function addNewTodoTask() {
  const newTask = document.querySelector("#newTaskInput").value;
  if (newTask == "") {
    alert("Elementas tuščias"); // Alert if the task is empty
  }

  const listOption = document.querySelector("#assingListOption").value;

  if (listOption == "default") {
    alert("Pasirinkite diena"); // Alert if no day is selected
  }

  const toDoTask = {
    taskName: newTask,
    taskDay: listOption,
    taskIsDone: false,
  };

  const storagelist = getTodoTasks();
  storagelist.push(toDoTask); // Add the new task to the list

  saveTodoTasks(storagelist); // Save the updated list to localStorage
  updateTodoList(); // Update the displayed task list
}

// Select a day and display tasks for that day
function selectDay(day, dayText, element) {
  document.querySelectorAll(".weekListElement").forEach((el) => {
    el.classList.remove("active"); // Remove the active class from all days
  });

  element.classList.add("active"); // Add the active class to the selected day

  document.querySelector(
    ".selectedDayText"
  ).textContent = `${dayText} užduotys:`; // Display the selected day text

  selectedDay = day;

  updateTodoList(); // Update the task list based on the selected day
}

// Update the displayed task list
function updateTodoList() {
  const tasks = getTodoTasks();
  const filteredTasks = tasks.filter((task) => task.taskDay === selectedDay); // Filter tasks for the selected day
  const listContainer = document.querySelector(".listContainer");
  listContainer.innerHTML = ""; // Clear the current list

  filteredTasks.forEach((item, index) => {
    listContainer.innerHTML += `
 <div class="todo">
      <article class="${item.taskIsDone ? "taskDone" : ""}">
          <input type="checkbox" onclick="markAsDoneTask(${index})" ${item.taskIsDone ? "checked" : ""}/>
          <span>${item.taskName}</span>
      </article>
      <div class="btnContainer">
          <button onclick="editTodoTask(${index})">
          <i class="fa-solid fa-pen-to-square blue"></i>
          </button>
          <button onclick="deleteTodoTask(${index})"><i class="fa-solid fa-trash red"></i></button>
      </div>
    </div>
    `;
  });
}

// Mark a task as done or not done
function markAsDoneTask(id) {
  const tasks = getTodoTasks();

  tasks[id].taskIsDone = !tasks[id].taskIsDone; // Toggle the task status

  saveTodoTasks(tasks); // Save the updated list to localStorage

  updateTodoList(); // Update the displayed task list
}

// Edit an existing task
function editTodoTask(id) {
  const editContainer = document.querySelector(".editContainer");
  editContainer.style.display = "flex"; // Show the edit form
  const tasks = getTodoTasks();
  if (id < 0 || id >= tasks.length) {
    return;
  }
  const task = tasks[id];
  const editInput = document.querySelector("#editInputVal");
  editInput.value = task.taskName; // Set the task name in the edit input
  const assignListOption = document.querySelector("#editAssingListOption");
  assignListOption.value = task.taskDay; // Set the task day in the edit input
  assingListOption.forEach((element) => {
    if (element.value === taskToEdit.taskTodoDate) {
      element.selected = true;
    } else {
      element.selected = false;
    }
  });
  editingTaskIndex = id; // Save the index of the task being edited
}

// Delete a task from the list
function deleteTodoTask(id) {
  const tasks = getTodoTasks();
  tasks.splice(id, 1); // Remove the task from the list
  saveTodoTasks(tasks); // Save the updated list to localStorage
  updateTodoList(); // Update the displayed task list
}

// Save the edited task
function saveEdit() {
  try {
    // 1. Get the tasks array from localStorage
    const tasks = JSON.parse(localStorage.getItem("toDoTaskList")) || [];

    // 2. Get the new task values from the edit form
    const newTaskName = document.getElementById("editInputVal").value;
    const newTaskDay = document.getElementById("editAssingListOption").value;

    tasks[editingTaskIndex] = {
      taskName: newTaskName,
      taskDay: newTaskDay,
    }; // Update the task with the new values

    localStorage.setItem("toDoTaskList", JSON.stringify(tasks)); // Save the updated list to localStorage

    updateTodoList(); // Update the displayed task list

    closeEditTodoTask(); // Close the edit form
  } catch (error) {
    console.error("Klaida išsaugant pakeitimus:", error);
    alert("Įvyko klaida išsaugant pakeitimus. Prašome pabandyti dar kartą."); // Display an error alert
  }
}

// Close the edit form without saving
function closeEditTodoTask() {
  const editContainer = document.querySelector(".editContainer");
  editContainer.style.display = "none"; // Hide the edit form
}
