const Expense = require("../model/Expense");
const Income = require("../model/Income");

const aggregateByDay = async (Model, matchQuery, amountField) => {
  const aggregation = [
    { $match: matchQuery },
    {
      $group: {
        _id: { $dayOfMonth: "$createdAt" },
        totalAmount: { $sum: `$${amountField}` },
      },
    },
    { $sort: { _id: 1 } },
  ];
  return await Model.aggregate(aggregation);
};

const aggregateByMonth = async (Model, matchQuery, amountField) => {
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

const trackHistory = async (req, res) => {
  const year = req.query?.year || new Date().getFullYear();
  const month = req.query?.month || false;

  let start = new Date(`${year}-01-01`);
  let end = new Date(`${Number(year) + 1}-01-01`);

  if (month) {
    start = new Date(`${year}-${month}-01`);
    end =
      month === "12"
        ? new Date(`${Number(year) + 1}-01-01`)
        : new Date(`${year}-${Number(month) + 1}-01`);
  }

  try {
    const userMatchQuery = {
      userId: req.id,
      createdAt: {
        $gte: start,
        $lt: end,
      },
    };

    const expenseAgg = month
      ? await aggregateByDay(Expense, userMatchQuery, "expenseAmount")
      : await aggregateByMonth(Expense, userMatchQuery, "expenseAmount");
    const incomeAgg = month
      ? await aggregateByDay(Income, userMatchQuery, "incomeAmount")
      : await aggregateByMonth(Income, userMatchQuery, "incomeAmount");

    const mergedAgg = new Map();

    // for the expenseAgg find the matching incomeAgg and merge the data
    expenseAgg.forEach((expenseItem) => {
      const matchingIncome = incomeAgg.find((incomeItem) => incomeItem._id === expenseItem._id);
      mergedAgg[expenseItem._id] = {
        totalExpense: expenseItem.totalAmount,
        totalIncome: matchingIncome ? matchingIncome.totalAmount : 0,
      };
    });

    // to prevent missing data, add the incomeAgg data that is not in expenseAgg
    incomeAgg.forEach((incomeItem) => {
      if (!mergedAgg[incomeItem._id]) {
        mergedAgg[incomeItem._id] = {
          totalExpense: 0,
          totalIncome: incomeItem.totalAmount,
        };
      }
    });

    const mergedArray = Object.keys(mergedAgg).map((key) => ({
      _id: key,
      ...mergedAgg[key],
    }));

    res.status(200).json({ success: true, data: mergedArray });
    // res.status(200).json({ success: true, data: combined });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  trackHistory,
};
