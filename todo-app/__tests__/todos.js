/* eslint-disable no-undef */
const request = require("supertest");
var cheerio = require("cheerio");

const db = require("../models/index");
const app = require("../app");

let server, agent;
function extractCsrfToken(res) {
  var $ = cheerio.load(res.text);
  return $("[name='_csrf']").val();
}

describe("Todo Application", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("Creates a todo and responds with json at /todos POST endpoint", async () => {
    const res = await agent.get("/");
    const csrfToken = extractCsrfToken(res);
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    expect(response.statusCode).toBe(302);
  });

  test("Marks a todo with the given ID as complete", async () => {
    let res = await agent.get("/");
    let csrfToken = extractCsrfToken(res);

    // Create a todo
    await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
      _csrf: csrfToken,
    });

    // Get all todos
    const todosResponse = await agent.get("/todos");
    const todos = JSON.parse(todosResponse.text);

    const today = new Date().toISOString().split("T")[0];
    let dueToday = todos.filter((todo) => todo.dueDate === today);
    const todoID = dueToday[dueToday.length - 1].id;

    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);

    const markCompleteResponse = await agent.put(`/todos/${todoID}`).send({
      completed: true,
      _csrf: csrfToken,
    });

    const parsedResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedResponse.completed).toBe(true);
  });

  test("Mark a todo as incomplete", async () => {
    let res = await agent.get("/");
    let csrfToken = extractCsrfToken(res);

    // Create a completed todo
    await agent.post("/todos").send({
      title: "Mark Incomplete",
      dueDate: new Date().toISOString().split("T")[0],
      completed: true,
      _csrf: csrfToken,
    });

    const todos = await agent.get("/todos");
    const latestTodo = JSON.parse(todos.text).slice(-1)[0];

    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);

    const updateResponse = await agent.put(`/todos/${latestTodo.id}`).send({
      completed: false,
      _csrf: csrfToken,
    });

    const updatedTodo = JSON.parse(updateResponse.text);
    expect(updatedTodo.completed).toBe(false);
  });

  //   test("Fetches all todos in the database using /todos endpoint", async () => {
  //     await agent.post("/todos").send({
  //       title: "Buy xbox",
  //       dueDate: new Date().toISOString(),
  //       completed: false,
  //     });
  //     await agent.post("/todos").send({
  //       title: "Buy ps3",
  //       dueDate: new Date().toISOString(),
  //       completed: false,
  //     });
  //     const response = await agent.get("/todos");
  //     const parsedResponse = JSON.parse(response.text);

  //     expect(parsedResponse.length).toBe(4);
  //     expect(parsedResponse[3]["title"]).toBe("Buy ps3");
  //   });

  test("Delete a todo by ID", async () => {
    let res = await agent.get("/");
    let csrfToken = extractCsrfToken(res);

    // Create a new todo
    await agent.post("/todos").send({
      title: "To be deleted",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
      _csrf: csrfToken,
    });

    const todos = await agent.get("/todos");
    const latestTodo = JSON.parse(todos.text).slice(-1)[0];

    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);

    const deleteResponse = await agent.delete(`/todos/${latestTodo.id}`).send({
      _csrf: csrfToken,
    });

    const parsed = JSON.parse(deleteResponse.text);
    expect(parsed.success).toBe(true);
  });
});
