let todos = [];
// eslint-disable-next-line no-unused-vars
function addTodo() {
  const input = document.getElementById("todoInput");
  if (input.value.trim() !== "") {
    todos.push(input.value.trim());
    input.value = "";
    console.log(todos);
    renderTodos();
  }
}

function removeTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = todo;
    // Add a delete button to each todo item
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.color = "red";
    deleteButton.onclick = function () {
      removeTodo(index);
    };
    listItem.appendChild(deleteButton);
    list.appendChild(listItem);
  });
}
