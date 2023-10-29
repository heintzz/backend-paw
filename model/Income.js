const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  incomeName: {
    type: String,
    required: true,
  },
  incomeAmount: {
    type: Number,
    required: true,
  },
  incomeMonthly: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("Income", incomeSchema);
