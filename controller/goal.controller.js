const Goal = require("../model/Goal");
const SummaryController = require("../controller/summary.controller");

//Get goal record for the user
const getGoal = async (req, res) => {
  try {
    const userId = req.id;
    const goal = await Goal.find({ userId });
    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Create goal record
const createGoal = async (req, res) => {
  try {
    const userId = req.id;
    const { name, desc, price, store, image } = req.body;

    const goal = await Goal.create({
      userId,
      goalName: name,
      goalDescription: desc,
      goalPrice: price,
      goalStore: store,
      goalImage: image,
    });

    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(200).json({ success: true, message: `goal ${name} created`, data: goal });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// Update goal record
const updateGoal = async (req, res) => {
  try {
    const userId = req.id;
    const goalId = req.params.id;

    // find one and update savingsAmounts to prev value + new value
    const goal = await Goal.findOne({ _id: goalId });

    if (!goal) {
      return res.status(404).json({ success: false, message: "goal is not found" });
    }

    if (req.body.savingsAmount) {
      const difference = goal.goalPrice - goal.savingsAmount;
      const EXCEED_LIMIT = goal.savingsAmount + req.body.savingsAmount > goal.goalPrice;
      if (EXCEED_LIMIT) {
        return res
          .status(409)
          .json({ success: false, message: `You only need to save ${difference}` });
      }
      goal.savingsAmount += req.body.savingsAmount;
      await goal.save();
    } else {
      const updatedData = {
        ...req.body,
        updatedAt: new Date(),
      };

      await goal.updateOne(updatedData);
    }

    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Delete goal record
const deleteGoal = async (req, res) => {
  try {
    const userId = req.id;
    const goalId = req.params.id;
    const goal = await Goal.findOne({ _id: goalId });

    if (!goal) {
      return res.status(404).json({ success: false, message: "Goal is not found" });
    }

    await goal.deleteOne();

    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(200).json({ success: true, message: `Goal ${goal.goalName} deleted` });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createGoal,
  getGoal,
  updateGoal,
  deleteGoal,
};
