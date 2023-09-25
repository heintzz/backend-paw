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
});

module.exports = mongoose.model('Summary', summarySchema);