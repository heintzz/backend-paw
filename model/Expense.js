const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  expenseName: {
    type: String,
    required: true,
  },
  expenseAmount: {
    type: Number,
    required: true,
  },
  expenseMonthly: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Expense', expenseSchema);
