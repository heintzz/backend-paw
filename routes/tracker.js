const express = require("express");
const { getSummaryByMonth } = require("../controller/tracker.controller");
const verify = require("../middleware/verifyJWT");
const router = express.Router();

router.get("/", verify, getSummaryByMonth);

module.exports = router;
