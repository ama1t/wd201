const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("TodoList Test Suite", () => {
  const formattedDate = (d) => {
    return d.toISOString().slice(0, 10);
  };

  const dateToday = new Date();
  const today = formattedDate(dateToday);
  const yesterday = formattedDate(
    new Date(dateToday.setDate(dateToday.getDate() - 1))
  );
  const tomorrow = formattedDate(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );

  beforeAll(() => {
    add({ title: "Test Todo", completed: false, dueDate: today });
    add({ title: "go to gym", completed: false, dueDate: yesterday });
    add({ title: "go to market", completed: true, dueDate: yesterday });
    add({ title: "go to town", completed: false, dueDate: tomorrow });
  });

  test("Should add new todo", () => {
    const todoitemsCount = all.length;
    add({
      title: "buy milk",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });

    expect(all.length).toBe(todoitemsCount + 1);
  });

  test("Should mark todo as completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const overdueItems = overdue();
    expect(overdueItems.length).toBeGreaterThan(0);
    expect(overdueItems[0].title).toBe("go to gym");
  });

  test("Should retrieve due today items", () => {
    const dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBeGreaterThan(0);
    expect(dueTodayItems[0].dueDate).toBe(today);
  });

  test("Should retrieve due later items", () => {
    const dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBeGreaterThan(0);
    expect(dueLaterItems[0].dueDate).toBe(tomorrow);
    expect(dueLaterItems[0].title).toBe("go to town");
  });
});
