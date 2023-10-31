const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyJWT");
const trackerController = require("../controller/tracker.controller");

router.get("/", verify, trackerController.trackHistory);

module.exports = router;
