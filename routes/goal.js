const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  goalName: {
    type: String,
    required: true,
  },
  goalDescription: {
    type: String,
    required: true,
  },
  goalAmount: {
    type: Number,
    required: true,
  },
  savingsAmount:{
    type: Number,
    required: false,
  },
  savingsDuration:{
    type: Number,
    required: true,
  },
  goalPercentage: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Goal', goalSchema);