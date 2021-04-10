const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const passport = require("passport");
const auth = require("../helpers/auth");
require("../passport-setup");

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/books" }),
  controller.authSucces
);

router.get("/logout", auth.logout);

module.exports = router;
