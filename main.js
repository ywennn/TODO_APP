const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const clearButton = document.getElementById("clear-all");
const clearCompletedButton = document.getElementById("clear-completed");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  if (todos.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Tidak ada todo. Silahkan tambahkan todo baru!";
    todoList.appendChild(emptyMessage);
    return;
  }
  todos.forEach((todo) => {
    const listTodo = document.createElement("li");
    listTodo.className = "todo-item";

    const textItem = document.createElement("span");
    textItem.textContent = todo.task;
    if (todo.completed) {
      textItem.style.textDecoration = "line-through";
      textItem.style.color = "gray";
    }

    const action = document.createElement("div");
    action.className = "action-buttons";

    const completed = document.createElement("input");
    completed.type = "checkbox";
    completed.className = "completed-checkbox";
    completed.checked = todo.completed;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.className = "delete-button";

    action.appendChild(completed);
    action.appendChild(deleteButton);
    listTodo.appendChild(textItem);
    listTodo.appendChild(action);
    todoList.appendChild(listTodo);

    completed.addEventListener("change", () => {
      todo.completed = completed.checked;
      if (todo.completed) {
        textItem.style.textDecoration = "line-through";
        textItem.style.color = "gray";
      } else {
        textItem.style.textDecoration = "none";
        textItem.style.color = "black";
      }
      updateLocalStorage();
    });

    deleteButton.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      updateLocalStorage();
      renderTodos();
    });
  });
}

function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  const todoText = input.value.trim();
  if (!todoText) {
    alert("Silahkan masukkan todo!");
    return;
  }

  const newTodo = {
    id: Date.now(),
    task: todoText,
    completed: false,
  };
  todos.push(newTodo);
  updateLocalStorage();
  renderTodos();
  input.value = "";
});
clearButton.addEventListener("click", () => {
  todos = [];
  updateLocalStorage();
  renderTodos();
});
clearCompletedButton.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  updateLocalStorage();
  renderTodos();
});

renderTodos();
