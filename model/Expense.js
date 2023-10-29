const mongoose = require("mongoose");

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
  expenseCategory: {
    type: String,
    required: true,
  },
  autoAdd: {
    type: Boolean,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
