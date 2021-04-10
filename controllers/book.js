const model = require("../lib/models");

const getAllBooks = async (req, res) => {
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
};

const renderEmptyForm = async (req, res, next) => {
  res.render("books/add", {
    name: "",
    author: "",
  });
};

const addBook = async (req, res) => {
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
        model.book.save();
      } catch (err) {
        req.flash("error", err);
        res.render("books/add", {
          name: form_data.name,
          author: form_data.author,
        });
      }
    });
  }
};

const renderABookById = async (req, res) => {
  let id = req.params.id;
  model.book.findOne({ where: { id: id } }).then((book) => {
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
};

const editBook = async (req, res) => {
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
          // render edit.ejs
          res.render("books/edit", {
            id: req.params.id,
            name: form_data.name,
            author: form_data.author,
          });
        }
      });
  }
};

const deleteBook = async (req, res) => {
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
};

const controller = {
  renderABookById,
  addBook,
  getAllBooks,
  renderEmptyForm,
  editBook,
  deleteBook,
};

module.exports = controller;
