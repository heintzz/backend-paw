const express = require("express");
const handleUserSignup = require("../controller/auth.controller");
const router = express.Router();

router.post("/signup", handleUserSignup);

module.exports = router;
