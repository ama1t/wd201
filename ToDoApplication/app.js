let todos = [];
function addTodo() {
  const input = document.getElementById("todoInput");
  if (input.value.trim() !== "") {
    todos.push(input.value.trim());
    input.value = "";
    console.log(todos);
    renderTodos();
  }
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = todo;
    list.appendChild(listItem);
  });
}
