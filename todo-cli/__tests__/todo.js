const todoList = require("../todo");
const { all, markAsComplete, add } = todoList();

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "go to gym",
      completed: false,
      duedate: new Date().toISOString().slice(0, 10) + 1,
    });
  });
  test("Should add new todo", () => {
    const todoitemsCount = all.length;
    add({
      title: "Test Todo",
      completed: false,
      duedate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoitemsCount + 1);
  });

  test("Should mark todo as completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
