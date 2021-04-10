const express = require("express");
const router = express.Router();
const auth = require("../helpers/auth");

router.get("/", auth.googleAuth);

router.get("/callback", auth.googleCallback);

router.get("/logout", auth.logout);

module.exports = router;
