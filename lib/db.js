const db = require("./config/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "mysql://" +
    db.username +
    ":" +
    db.password +
    "@" +
    db.host +
    "/" +
    db.database
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    console.log("Server running on: http://localhost:3000/books");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.export = sequelize;
//var mysql = require("mysql");
/*var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dameunpass",
  database: "express",
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connected...!!");
  }
})

module.export = connection;


const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Notes App"));

app.listen(port, () => console.log(`notes-app listening on port ${port}!`));
*/
