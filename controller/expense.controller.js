const Expense = require("../model/Expense");
const SummaryController = require("../controller/summary.controller");

// Create expense record
const createExpense = async (req, res) => {
  try {
    const userId = req.id;
    const expense = new Expense({ userId, ...req.body });

    await expense.save();

    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Get expense records for the user
const getExpense = async (req, res) => {
  const filter = req.query;
  const { sortBy, orderBy, ...otherFilters } = filter;

  const sortOptions = sortBy && { [sortBy]: orderBy ? (orderBy === "desc" ? -1 : 1) : 0 };

  try {
    // Get the user ID from the authenticated user
    const userId = req.id;
    const expense = await Expense.find({ userId, ...otherFilters }).sort(sortOptions);

    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Update expense record
const updateExpense = async (req, res) => {
  try {
    const userId = req.id;
    const expenseId = req.params.id;
    const updatedData = {
      ...req.body,
      updatedAt: new Date(),
    };

    const expense = await Expense.findOneAndUpdate({ _id: expenseId }, updatedData, { new: true });

    if (!expense) {
      return res.status(404).json({ message: "Expense record not found" });
    }

    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Delete expense record
const deleteExpense = async (req, res) => {
  try {
    const userId = req.id;
    const expenseId = req.params.id;

    const expense = await Expense.findOneAndDelete({ _id: expenseId });

    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(200).json({ success: true, data: `Expense ${expense.expenseName} removed` });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
};
