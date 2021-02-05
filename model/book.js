const { Sequelize } = require("sequelize/types");

const Book = sequelize.define("books", {
  name: Sequelize.STRING,
  author: Sequelize.STRING,
  created_at,
  updated_at,
});

class Book extends Model {}

Book.init({
  id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true },
  name: Sequelize.STRING,
  author: Sequelize.STRING,
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updated_at: Sequelize.DATE,
});
