const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    let overdue = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].dueDate < today) {
        overdue.push(all[i]);
      }
    }
    return overdue;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    let dueToday = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].dueDate === today) {
        dueToday.push(all[i]);
      }
    }
    return dueToday;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    let dueLater = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].dueDate > today) {
        dueLater.push(all[i]);
      }
    }
    return dueLater;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    let displayableList = "";
    let n = list.length;
    for (let i = 0; i < n; i++) {
      if (list[i].dueDate === today) {
        if (list[i].completed) {
          if (i == n - 1) {
            displayableList += "[x] " + list[i].title;
          } else {
            displayableList += "[x] " + list[i].title + " " + "\n";
          }
        } else {
          if (i == n - 1) {
            displayableList += "[ ] " + list[i].title;
          } else {
            displayableList += "[ ] " + list[i].title + " " + "\n";
          }
        }
      } else {
        if (list[i].completed) {
          if (i == n - 1) {
            displayableList += "[x] " + list[i].title + " " + list[i].dueDate;
          } else {
            displayableList +=
              "[x] " + list[i].title + " " + list[i].dueDate + "\n";
          }
        } else {
          if (i == n - 1) {
            displayableList += "[ ] " + list[i].title + " " + list[i].dueDate;
          } else {
            displayableList +=
              "[ ] " + list[i].title + " " + list[i].dueDate + "\n";
          }
        }
      }
    }
    return displayableList;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");
