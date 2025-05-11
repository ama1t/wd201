"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overdueItems = await Todo.overdue();
      overdueItems.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dueTodayItems = await Todo.dueToday();
      dueTodayItems.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dueLaterItems = await Todo.dueLater();
      dueLaterItems.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const today = new Date();
      const todayString = today.toISOString().slice(0, 10);
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: todayString,
          },
        },
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE TODAY
      const today = new Date();
      const todayString = today.toISOString().slice(0, 10);
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: todayString,
          },
        },
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const today = new Date();
      const todayString = today.toISOString().slice(0, 10);
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: todayString,
          },
        },
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      return await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        }
      );
    }

    displayableString() {
      const today = new Date();
      const todayString = today.toISOString().slice(0, 10);
      let checkbox = this.completed ? "[x]" : "[ ]";
      return this.dueDate === todayString
        ? `${this.id}. ${checkbox} ${this.title}`
        : `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
