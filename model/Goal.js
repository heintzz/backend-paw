const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  goalName: {
    type: String,
    required: true,
  },
  goalPrice: {
    type: Number,
    required: true,
  },
  goalStore: {
    type: String,
    required: true,
  },
  goalImage: {
    type: String,
    required: true,
  },
  goalDescription: {
    type: String,
    required: true,
  },
  savingsAmount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Goal", goalSchema);
