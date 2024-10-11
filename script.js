let selectedDay = "monday";
let editingTaskIndex = 0;

function getTodoTasks() {
  const tasks = localStorage.getItem("toDoTaskList");
  return tasks ? JSON.parse(tasks) : [];
}



function saveTodoTasks(data) {
  localStorage.setItem("toDoTaskList", JSON.stringify(data));
}



function addNewTodoTask() {
  const newTask = document.querySelector("#newTaskInput").value;
  if (newTask == "") {
    alert("Elementas tuščias");
  }

  const listOption = document.querySelector("#assingListOption").value;

  if (listOption == "default") {
    alert("Pasirinkite diena");
  }

  const toDoTask = {
    taskName: newTask,
    taskDay: listOption,
    taskIsDone: false,
  };

  const storagelist = getTodoTasks();
  storagelist.push(toDoTask);

  saveTodoTasks(storagelist); 
  updateTodoList();
}



function selectDay(day, dayText, element) {
  document.querySelectorAll(".weekListElement").forEach((el) => {
    el.classList.remove("active");
  });

  element.classList.add("active");

  document.querySelector(
    ".selectedDayText"
  ).textContent = `${dayText} užduotys:`;

  selectedDay = day;

  updateTodoList();
}



function updateTodoList() {
  const tasks = getTodoTasks();
  const filteredTasks = tasks.filter((task) => task.taskDay === selectedDay); // Filter tasks for the selected day
  const listContainer = document.querySelector(".listContainer");
  listContainer.innerHTML = ""; // Clear the current list

  filteredTasks.forEach((item, index) => {
    listContainer.innerHTML += `
 <div class="todo">
      <article class="${item.taskIsDone ? "taskDone" : ""}">
          <input type="checkbox" onclick="markAsDoneTask(${index})" ${
      item.taskIsDone ? "checked" : ""
    }/>
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



function markAsDoneTask(id) {
  const tasks = getTodoTasks();

  tasks[id].taskIsDone = !tasks[id].taskIsDone;

  saveTodoTasks(tasks);

  updateTodoList();
}



function editTodoTask(id) {
  const editContainer = document.querySelector(".editContainer");
  editContainer.style.display = "flex";
  const tasks = getTodoTasks();
  if (id < 0 || id >= tasks.length) {
    return;
  }
  const task = tasks[id];
  const editInput = document.querySelector("#editInputVal");
  editInput.value = task.taskName;
  const assignListOption = document.querySelector("#editAssingListOption");
  assignListOption.value = task.taskDay;
  assingListOption.forEach((element) => {
    if (element.value === taskToEdit.taskTodoDate) {
      element.selected = true;
    } else {
      element.selected = false;
    }
  });
  editingTaskIndex = id;
}



function deleteTodoTask(id) {
  const tasks = getTodoTasks();
  tasks.splice(id, 1);
  saveTodoTasks(tasks);
  updateTodoList();
}



function saveEdit() {
  try {
    // 1. Gauti užduočių masyvą iš localStorage
    const tasks = JSON.parse(localStorage.getItem("toDoTaskList")) || [];

    // 2. Gauti naujas užduoties reikšmes iš formos
    const newTaskName = document.getElementById("editInputVal").value;
    const newTaskDay = document.getElementById("editAssingListOption").value;

    tasks[editingTaskIndex] = {
      taskName: newTaskName,
      taskDay: newTaskDay,
    };

    localStorage.setItem("toDoTaskList", JSON.stringify(tasks));

    updateTodoList();

    closeEditTodoTask();
  } catch (error) {
    console.error("Klaida išsaugant pakeitimus:", error);
    alert("Įvyko klaida išsaugant pakeitimus. Prašome pabandyti dar kartą.");
  }
}


function closeEditTodoTask() {
  const editContainer = document.querySelector(".editContainer");
  editContainer.style.display = "none";
}
