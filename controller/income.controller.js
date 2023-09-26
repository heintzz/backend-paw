const Income = require("../model/income");
const SummaryController = require("../controller/summary.controller")

// Create income record
const createIncome = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.id;
    const { incomeName, incomeAmount, incomeMonthly } = req.body;

    const income = new Income({
      userId,
      incomeName,
      incomeAmount,
      incomeMonthly,
    });

    await income.save();

    // Update summary with the updated income
    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(201).json({ success: true, data: income });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get income records for the user
const getIncome = async (req, res) => {
  const filter = req.query;
  const { sortBy, orderBy } = filter;

  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = orderBy ? (orderBy === "desc" ? -1 : 1) : 0;
  }

  delete filter.sortBy;
  delete filter.orderBy;

  try {
    // Get the user ID from the authenticated user
    const userId = req.id;
    const income = await Income.find({ userId, ...filter }).sort(sortOptions);

    res.status(200).json({ success: true, data: income });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update income record
const updateIncome = async (req, res) => {
  try {
    const incomeId = req.params.id;

    const income = await Income.findByIdAndUpdate({ _id: incomeId }, req.body, {
      new: true,
    });

    if (!income) {
      return res.status(404).json({ msg: "Income record not found" });
    }

    await income.save();

    // Update summary with the updated income
    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(200).json({ success: true, data: income });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete income record
const deleteIncome = async (req, res) => {
  try {
    const incomeId = req.params.id;

    const income = await Income.findOne({ _id: incomeId });

    if (!income) {
      return res.status(404).json({ msg: "Income record not found" });
    }

    await income.deleteOne();

    // Update summary with the updated income
    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(200).json({ success: true, data: "Income record removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createIncome,
  getIncome,
  updateIncome,
  deleteIncome,
};
