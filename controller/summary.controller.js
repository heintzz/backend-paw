const Summary = require("../model/summary");
const Income = require("../model/income");
const Expense = require("../model/expense");
const cron = require("node-cron");

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

    // Update the summary record for the user
    const summary = await Summary.findOneAndUpdate(
      { userId },
      {
        totalIncome: totalIncome.length > 0 ? totalIncome[0].totalIncome : 0,
        totalExpense:
          totalExpense.length > 0 ? totalExpense[0].totalExpense : 0,
        expensesByCategory: expensesByCategory.map((item) => ({
          category: item._id,
          totalExpense: item.totalExpense,
        })),
      },
      { upsert: true, new: true }
    );

    return summary;
  } catch (err) {
    res.status(500).send("Server Error");
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
    res.status(500).send("Server Error");
  }
};

// Function to run at the beginning of each month
const monthlySummaryUpdate = async () => {
  try {
    // Get all users (you may have a more specific way to get users)
    const users = await User.find();

    for (const user of users) {
      // Calculate and update the summary for each user
      await updateSummary(user._id);
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Schedule the monthly summary update using cron
cron.schedule("0 0 1 * *", monthlySummaryUpdate);

// Get summary for a user
const getSummary = async (req, res) => {
  const userId = req.id;

  try {
    const summary = await Summary.findOne({ userId });

    res.status(200).json({ success: true, data: summary });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  updateSummary,
  handleIncomeExpenseChange,
  getSummary,
};
