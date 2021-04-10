const passport = require("passport");
require("../passport-setup");

//login check
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
//logout function
const logout = async (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/books");
};
//google oauth
const googleAuth = async (req, res) => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};

//google oauth callback
const googleCallback = async (req, res) => {
  passport.authenticate("google", { failureRedirect: "/books" }),
    function (req, res) {
      // Successful authentication, redirect home.
      req.flash("success", "Authentication done succesfully");
      res.redirect("/books");
    };
};

module.exports = {
  isLoggedIn,
  googleAuth,
  googleCallback,
  logout,
};
