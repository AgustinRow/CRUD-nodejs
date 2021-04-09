var express = require("express");
var router = express.Router();
const passport = require("passport");
require("../passport-setup");

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/books" }),
  function (req, res) {
    // Successful authentication, redirect home.
    req.flash("success", "Authentication done succesfully");
    res.redirect("/books");
  }
);

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/books");
});

module.exports = router;
