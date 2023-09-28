const Summary = require("../model/Summary");
const Income = require("../model/Income");
const Expense = require("../model/Expense");
const Goal = require("../model/Goal");

// Function to calculate and update summary for a user
const updateSummary = async (userId) => {
  try {
    // Calculate total income for the user (including non-monthly income)
    const totalIncome = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalIncome: { $sum: "$incomeAmount" } } },
    ]);

    // Calculate total expense for the user (including non-monthly expense)
    const totalExpense = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalExpense: { $sum: "$expenseAmount" } } },
    ]);

    // Calculate total saving for the user (including non-monthly expense)
    const totalSaving = await Goal.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalSaving: { $sum: "$savingsAmount" } } },
    ]);

    // Calculate expenses by category
    const expensesByCategory = await Expense.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$expenseCategory",
          totalExpense: { $sum: "$expenseAmount" },
        },
      },
    ]);

    // Calculate income by category
    const incomesByCategory = await Income.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            $cond: {
              if: "$incomeMonthly",
              then: "Bulanan",
              else: "Non Bulanan",
            },
          },
          totalIncome: { $sum: "$incomeAmount" },
        },
      },
    ]);

    // Update the summary record for the user
    await Summary.findOneAndUpdate(
      { userId },
      {
        totalIncome: totalIncome.length > 0 ? totalIncome[0].totalIncome : 0,
        totalExpense:
          totalExpense.length > 0 ? totalExpense[0].totalExpense : 0,
        totalSaving: totalSaving.length > 0 ? totalSaving[0].totalSaving : 0,
        expensesByCategory: expensesByCategory.map((item) => ({
          category: item._id,
          totalExpense: item.totalExpense,
        })),
        incomesByCategory: incomesByCategory.map((item) => ({
          category: item._id,
          totalIncome: item.totalIncome,
        })),
      },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error(err.message);
  }
};

// Create or update summary when new income or expense is added
const handleIncomeExpenseChange = async (userId) => {
  try {
    const summary = await Summary.findOne({ userId });

    if (!summary) {
      // If summary doesn't exist, create a new one
      await Summary.create({ userId });
    }

    // Calculate and update the summary
    await updateSummary(userId);
  } catch (err) {
    console.error(err.message);
  }
};

// Get summary for a user
const getSummary = async (req, res) => {
  const userId = req.id;

  try {
    const summary = await Summary.findOne({ userId });

    res.status(200).json({ success: true, data: summary });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  updateSummary,
  handleIncomeExpenseChange,
  getSummary,
};
