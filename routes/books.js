var express = require("express");
var router = express.Router();
const controller = require("../controllers/book");
const auth = require("../helpers/auth");

router.get("/", controller.getAllBooks);
// display add book page
router.get("/add", auth.isLoggedIn, controller.renderEmptyForm);
// add a new book
router.post("/add", auth.isLoggedIn, controller.addBook);
// display edit book page
router.get("/edit/(:id)", auth.isLoggedIn, controller.renderABookById);
// update book's info
router.post("/update/(:id)", auth.isLoggedIn, controller.editBook);
// physical removed
router.get("/delete/(:id)", auth.isLoggedIn, controller.deleteBook);

module.exports = router;
