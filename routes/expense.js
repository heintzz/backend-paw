const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyJWT');
const expenseController = require('../controllers/expense.controller');

// Create monthly expense record
router.post('/monthly/', verify, expenseController.createExpense);

// Create expense record
router.post('/', verify, expenseController.createExpense);

// Get expense records for the user
router.get('/', verify, expenseController.getExpense);

// Update expense record
router.put('/:id', verify, expenseController.updateExpense);

// Delete expense record
router.delete('/:id', verify, expenseController.deleteExpense);

module.exports = router;
