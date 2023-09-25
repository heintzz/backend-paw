const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyJWT");
const incomeController = require("../controller/income.controller");

// Create income record
router.post("/", verify, incomeController.createIncome);

// Get income records for the user
router.get("/", verify, incomeController.getIncome);

// Update income record
router.patch("/:id", verify, incomeController.updateIncome);

// Delete income record
router.delete("/:id", verify, incomeController.deleteIncome);

module.exports = router;
