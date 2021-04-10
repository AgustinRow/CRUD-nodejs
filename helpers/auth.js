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

module.exports = {
  isLoggedIn,
  logout,
};
