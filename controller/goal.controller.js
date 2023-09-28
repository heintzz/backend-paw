const Goal = require("../model/Goal");
const SummaryController = require("../controller/summary.controller");

//Get goal record for the user
const getGoal = async (req, res) => {
  try {
    const userId = req.id;
    const goal = await Goal.find({ userId });

    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

// Create goal record
const createGoal = async (req, res) => {
  try {
    const userId = req.id;
    const { goalName, goalAmount, savingsAmount } = req.body;

    const goal = await Goal.create({
      userId,
      goalName,
      goalAmount,
      savingsAmount,
    });

    await SummaryController.handleIncomeExpenseChange(userId);

    res
      .status(200)
      .json({ success: true, message: `goal ${goalName} created`, data: goal });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

// Update goal record
const updateGoal = async (req, res) => {
  try {
    const userId = req.id;
    const goalId = req.params.id;
    const { goalName, goalAmount } = req.body;

    // find one and update savingsAmounts to prev value + new value
    const goal = await Goal.findOneAndUpdate(
      { _id: goalId },
      { goalName, goalAmount },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!goal) {
      return res
        .status(404)
        .json({ success: false, message: "goal is not found" });
    }

    if (req.body.savingsAmount >= 0) {
      goal.savingsAmount += req.body.savingsAmount;
      await goal.save();
    }

    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

// Delete goal record
const deleteGoal = async (req, res) => {
  try {
    const userId = req.id;
    const goalId = req.params.id;
    const goal = await Goal.findOne({ _id: goalId });

    if (!goal) {
      return res
        .status(404)
        .json({ success: false, message: "goal is not found" });
    }

    await goal.deleteOne();

    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(200).json({ success: true, message: "goal deleted" });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

module.exports = {
  createGoal,
  getGoal,
  updateGoal,
  deleteGoal,
};