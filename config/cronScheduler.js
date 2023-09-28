const User = require("../model/User");
const Income = require("../model/Income");
const Expense = require("../model/Expense");
const cron = require("node-cron");
const { updateSummary } = require("../controller/summary.controller");

// update summary, income, and expense for each user monthly
const monthlyJobs = async () => {
  try {
    // get all users (you may have a more specific way to get users)
    const users = await User.find();
    for (const user of users) {
      // get expenses that happen at this month
      const incomes = await Income.find({
        userId: user._id,
        incomeMonthly: true,
        createdAt: {
          $gte: new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            1
          ),
          $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      });
      // get expenses that happen at this month
      const expenses = await Expense.find({
        userId: user._id,
        expenseMonthly: true,
        createdAt: {
          $gte: new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            1
          ),
          $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      });

      if (expenses.length === 0 && incomes.length === 0) {
        return;
      }

      for (const income of incomes) {
        const newIncome = await Income.create({
          userId: income.userId,
          incomeName: income.incomeName,
          incomeAmount: income.incomeAmount,
          incomeMonthly: income.incomeMonthly,
        });

        await newIncome.save();
      }
      for (const expense of expenses) {
        const newExpense = await Expense.create({
          userId: expense.userId,
          expenseName: expense.expenseName,
          expenseAmount: expense.expenseAmount,
          expenseCategory: expense.expenseCategory,
          expenseMonthly: expense.expenseMonthly,
        });

        await newExpense.save();
      }

      // calculate and update summary for the user
      await updateSummary(user._id);
    }
  } catch (error) {
    console.log(error.message);
  }
};

// schedule the monthly jobs using cron
const cronScheduler = () => {
  cron.schedule(`0 0 1 * * `, monthlyJobs, { timezone: "Asia/Jakarta" });
};

module.exports = cronScheduler;