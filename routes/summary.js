const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyJWT");
const summaryController = require("../controller/summary.controller");

// Get summary records for the user
router.get("/", verify, summaryController.getSummary);

module.exports = router;
