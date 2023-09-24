const express = require("express");
const handleUserSignup = require("../controller/authController");
const router = express.Router();

router.post("/signup", handleUserSignup);

module.exports = router;
