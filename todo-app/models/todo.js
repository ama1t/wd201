"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Todo.belongsTo(models.User, {
        foreignKey: "userId",
      });
      // define association here
    }
    static addTodo(title, dueDate, userId) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
        userId: userId,
      });
    }

    static async getTodos(userId) {
      return this.findAll({
        where: {
          userId: userId,
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async remove(id, userID) {
      return this.destroy({
        where: {
          id: id,
          userId: userID,
        },
      });
    }

    setCompletionStatus(status) {
      return this.update({ completed: status });
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "TodoItem cannot be null" },
          len: {
            args: [5],
            msg: "TodoItem must be at least 5 characters long",
          },
        },
      },

      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: { msg: "dueDate cannot be null" },
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
