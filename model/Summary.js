const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  totalIncome: {
    type: Number,
    default: 0,
  },
  totalExpense: {
    type: Number,
    default: 0,
  },
  totalSaving: {
    type: Number,
    default: 0,
  },
  expensesByCategory: [
    {
      category: String,
      totalExpense: Number,
    },
  ],
  incomesByCategory: [
    {
      category: String,
      totalExpense: Number,
    },
  ],
});

module.exports = mongoose.model('Summary', summarySchema);