"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    static associate(models) {
      // define association here
    }
  }
  book.init(
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "book",
    }
  );
  return book;
};
