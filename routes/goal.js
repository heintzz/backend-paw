const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyJWT");
const goalController = require("../controller/goal.controller");

// Create goal record
router.post("/", verify, goalController.createGoal);

// Get goal records for the user
router.get("/", verify, goalController.getGoal);

// Update goal record
router.patch("/:id", verify, goalController.updateGoal);

// Delete goal record
router.delete("/:id", verify, goalController.deleteGoal);

module.exports = router;