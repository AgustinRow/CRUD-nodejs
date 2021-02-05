var express = require("express");
var router = express.Router();
const model = require("../lib/models");
const controller = require("../resources/book");

//TODO: check error when responding an sequelize promise
router.get("/", function (req, res, next) {
  model.book.findAll().then((response) => {
    try {
      // render to views/books/index.ejs
      res.render("books", { data: response });
    } catch (err) {
      req.flash("error", err);
      // render to views/books/index.ejs
      res.render("books", { data: "" });
    }
  });
});

// display add book page
router.get("/add", function (req, res, next) {
  res.render("books/add", {
    name: "",
    author: "",
  });
});

// add a new book
router.post("/add", function (req, res, next) {
  let name = req.body.name;
  let author = req.body.author;
  let errors = false;

  if (name.length === 0 || author.length === 0) {
    errors = true;
    req.flash("error", "Please enter name and author");
    res.render("books/add", {
      name: name,
      author: author,
    });
  }

  if (!errors) {
    var form_data = {
      name: name,
      author: author,
    };
    model.book.create({ name: name, author: author }).then(() => {
      try {
        req.flash("success", "Book succesfully added");
        res.redirect("/books");
      } catch (err) {
        req.flash("error", err);
        res.render("books/add", {
          name: form_data.name,
          author: form_data.author,
        });
      }
    });
  }
});

// display edit book page
router.get("/edit/(:id)", function (req, res, next) {
  let id = req.params.id;
  controller.findBookById(id).then((book) => {
    try {
      if (book.length <= 0) {
        req.flash("error", "Book not found with id = " + id);
        res.redirect("/books");
      } else {
        res.render("books/edit", {
          title: "Edit Book",
          id: book.id,
          name: book.name,
          author: book.author,
        });
      }
    } catch (err) {
      req.flash("error", err);
    }
  });
});

router.post("/update/(:id)", function (req, res, next) {
  let id = req.params.id;
  let name = req.body.name;
  let author = req.body.author;
  let errors = false;

  if (name.length === 0 || author.length === 0) {
    errors = true;
    req.flash("error", "Please enter name and author");
    res.render("books/edit", {
      id: req.params.id,
      name: name,
      author: author,
    });
  }

  if (!errors) {
    var form_data = {
      name: name,
      author: author,
    };

    model.book
      .update(
        { name: form_data.name, author: form_data.author },
        { where: { id: id } }
      )
      .then((result) => {
        try {
          req.flash("success", "Book successfully updated");
          res.redirect("/books");
        } catch (err) {
          // set flash message
          req.flash("error", err);
          // render to edit.ejs
          res.render("books/edit", {
            id: req.params.id,
            name: form_data.name,
            author: form_data.author,
          });
        }
      });
  }
});

router.get("/delete/(:id)", function (req, res, next) {
  let id = req.params.id;
  model.book.destroy({ where: { id: id } }).then((result) => {
    try {
      req.flash("succes", "Book succesfully deleted!");
      res.redirect("/books");
    } catch {
      // set flash message
      req.flash("error", err);
      // redirect to books page
      res.redirect("/books");
    }
  });
});

module.exports = router;
