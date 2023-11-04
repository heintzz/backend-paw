const User = require("../model/User");
const Income = require("../model/Income");
const Expense = require("../model/Expense");
const cron = require("node-cron");
const { updateSummary } = require("../controller/summary.controller");

// update summary, income, and expense for each user monthly
const monthlyJobs = async () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const startOfPreviousMonth = new Date(currentYear, currentMonth - 1, 1);
  const endOfPreviousMonth = new Date(currentYear, currentMonth + 1, 1);

  try {
    const users = await User.find();

    for (const user of users) {
      const incomes = await Income.find({
        userId: user._id,
        incomeMonthly: true,
        createdAt: {
          $gte: startOfPreviousMonth,
          $lt: endOfPreviousMonth,
        },
      });

      const expenses = await Expense.find({
        userId: user._id,
        expenseMonthly: true,
        createdAt: {
          $gte: startOfPreviousMonth,
          $lt: endOfPreviousMonth,
        },
      });

      if (expenses.length === 0 && incomes.length === 0) {
        return;
      }

      for (const income of incomes) {
        const { userId, incomeName, incomeAmount, incomeMonthly } = income;
        const newIncome = await Income.create({
          userId,
          incomeName,
          incomeAmount,
          incomeMonthly,
          createdAt: new Date(),
          autoAdd: true,
        });
        await newIncome.save();
      }

      for (const expense of expenses) {
        const { userId, expenseName, expenseAmount, expenseCategory, expenseMonthly } = expense;
        const newExpense = await Expense.create({
          userId,
          expenseName,
          expenseAmount,
          expenseCategory,
          expenseMonthly,
          createdAt: new Date(),
          autoAdd: true,
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
