const Expense = require("../model/Expense");
const Income = require("../model/Income");

const aggregateDataByMonth = async (Model, matchQuery, amountField) => {
  const aggregation = [
    { $match: matchQuery },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalAmount: { $sum: `$${amountField}` },
      },
    },
    { $sort: { _id: 1 } },
  ];
  return await Model.aggregate(aggregation);
};

const getSummaryByMonth = async (req, res) => {
  const year = req.query?.year || new Date().getFullYear();
  const startOfTheYear = new Date(`${year}-01-01`);
  const endOfTheYear = new Date(`${Number(year) + 1}-01-01`);

  try {
    const userMatchQuery = {
      userId: req.id,
      createdAt: {
        $gte: startOfTheYear,
        $lt: endOfTheYear,
      },
    };

    const expensePerMonth = await aggregateDataByMonth(Expense, userMatchQuery, "expenseAmount");
    const incomePerMonth = await aggregateDataByMonth(Income, userMatchQuery, "incomeAmount");

    const mergedData = expensePerMonth.map((expenseItem) => {
      const correspondingIncome = incomePerMonth.find(
        (incomeItem) => incomeItem._id === expenseItem._id
      );
      return {
        month: expenseItem._id,
        totalExpense: expenseItem.totalAmount,
        totalIncome: correspondingIncome ? correspondingIncome.totalAmount : 0,
      };
    });

    res.status(200).json({ success: true, data: mergedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSummaryByMonth,
};
