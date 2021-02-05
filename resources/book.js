const model = require("../lib/models");
/* 
CRUD of books
Should create a scoped function with CRUD methos in it and then define those.
-findBookByName(name)
-findBookByAuthor(author)
-addBook( author, name)
-udpateBook(author, name)
-deleteBookByName(name)
-allBooks()
*/

/*
var controller= {
    findBookByName,
    addBook
}*/

function findAll() {
  /*return books.findAll().then((books) => {
    return books;
  });*/
  return book.findAll().then((book) => {
    return book;
  });
}

function findBookByName(bName) {
  return model.book.findOne({ where: { name: bName } }).then((book) => {
    console.log(book.name);
    return book;
  });
}

function addBook(name, author) {
  model.book.create({
    name: this.name,
    author: this.author,
  });
  return model.book
    .save()
    .then(() => console.log("New Book Succesfully saved on database"));
}

function findBookById(id) {
  return model.book.findOne({ where: { id: id } });
}

function editBook(id) {}

var controller = {
  findBookById,
  findBookByName,
  addBook,
  findAll,
};

module.exports = controller;
