const Expense = require("../model/Expense");
const SummaryController = require("../controller/summary.controller");

// Create expense record
const createExpense = async (req, res) => {
  try {
    const userId = req.id;

    const { expenseName, expenseAmount, expenseCategory, expenseMonthly } =
      req.body;

    const expense = new Expense({
      userId,
      expenseName,
      expenseAmount,
      expenseCategory,
      expenseMonthly,
    });

    await expense.save();

    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(201).json({ success: true, data: expense });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Get expense records for the user
const getExpense = async (req, res) => {
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

    const expense = await Expense.find({ userId, ...filter }).sort(sortOptions);

    res.status(200).json({ success: true, data: expense });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Update expense record
const updateExpense = async (req, res) => {
  try {
    const userId = req.id;
    const expenseId = req.params.id;

    const expense = await Expense.findOneAndUpdate(
      { _id: expenseId },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ msg: "Expense record not found" });
    }

    await expense.save();

    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(200).json({ success: true, data: expense });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Delete expense record
const deleteExpense = async (req, res) => {
  try {
    const userId = req.id;
    const expenseId = req.params.id;

    const expense = await Expense.findOne({ _id: expenseId });

    if (!expense) {
      return res.status(404).json({ msg: "Expense record not found" });
    }

    await expense.deleteOne();

    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(200).json({ success: true, data: "Expense record removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
};
