const express = require("express");
const router = express.Router();
const summaryController = require("../controller/summary.controller");

// Get summary records for the user
router.get("/", summaryController.getSummary);

module.exports = router;
