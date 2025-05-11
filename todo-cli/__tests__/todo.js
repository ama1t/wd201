const db = require("../models");

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });

    await db.Todo.addTask({
      title: "Test todo 2",
      completed: false,
      dueDate: "2025-05-13",
    });

    await db.Todo.addTask({
      title: "Test todo 3",
      completed: false,
      dueDate: "2025-05-10",
    });

    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 3);
  });
  test("Should list all todos", async () => {
    const todos = await db.Todo.findAll();
    expect(todos.length).toBe(3);
  });
  test("Should mark todo as complete", async () => {
    const todo = await db.Todo.findOne({
      where: {
        completed: false,
      },
      order: [["id", "DESC"]],
    });
    await db.Todo.markAsComplete(todo.id);
    const updatedTodo = await db.Todo.findByPk(todo.id);
    expect(updatedTodo.completed).toBe(true);
  });
  test("Should return items due today", async () => {
    const todos = await db.Todo.dueToday();
    expect(todos.length).toBe(1);
  });
  test("Should return items due later", async () => {
    const todos = await db.Todo.dueLater();
    expect(todos.length).toBe(1);
  });
  test("should return overdue items", async () => {
    const todos = await db.Todo.overdue();
    expect(todos.length).toBe(1);
  });
});
