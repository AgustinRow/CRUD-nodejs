const authSucces = async (req, res) => {
  // Successful authentication, redirect home.
  req.flash("success", "Authentication done succesfully");
  res.redirect("/books");
};

module.exports = { authSucces };
