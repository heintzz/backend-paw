const express = require("express");
const {
  handleUserSignup,
  handleUserLogin,
} = require("../controller/auth.controller");
const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;
