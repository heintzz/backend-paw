const Income = require("../model/Income");
const SummaryController = require("../controller/summary.controller");

// Create income record
const createIncome = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.id;

    const income = new Income({
      userId,
      ...req.body,
    });

    await income.save();

    // Update summary with the updated income
    await SummaryController.handleIncomeExpenseChange(userId);

    res.status(201).json({ success: true, data: income });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Get income records for the user
const getIncome = async (req, res) => {
  const filter = req.query;
  const { sortBy, orderBy, ...otherFilters } = filter;

  let sortOptions = { createdAt: -1 };

  // NOTE: waiting for change in FE
  // sortOptions = sortBy && { [sortBy]: orderBy ? (orderBy === "desc" ? -1 : 1) : -1 };

  try {
    // Get the user ID from the authenticated user
    const userId = req.id;
    const income = await Income.find({ userId, ...otherFilters }).sort(sortOptions);

    res.status(200).json({ success: true, data: income });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Update income record
const updateIncome = async (req, res) => {
  try {
    const userId = req.id;
    const incomeId = req.params.id;
    const updatedData = {
      ...req.body,
      updatedAt: new Date(),
    };

    const income = await Income.findByIdAndUpdate({ _id: incomeId }, updatedData, { new: true });

    if (!income) {
      return res.status(404).json({ message: "Income record not found" });
    }

    // Update summary with the updated income
    await SummaryController.handleIncomeExpenseChange(userId);
    res.status(200).json({ success: true, data: income });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Delete income record
const deleteIncome = async (req, res) => {
  try {
    const userId = req.id;
    const incomeId = req.params.id;

    const income = await Income.findOneAndDelete({ _id: incomeId });

    if (!income) {
      return res.status(404).json({ message: "Income record not found" });
    }

    // Update summary with the updated income
    await SummaryController.handleIncomeExpenseChange(userId);
    res.status(200).json({ success: true, data: `Income ${income.incomeName} removed` });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createIncome,
  getIncome,
  updateIncome,
  deleteIncome,
};
