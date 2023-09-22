// Note: need integration with DB
// const Expense = require('../models/expense');

// Create monthly expense record
const createMonthlyExpense = async (req, res) => {
  try {
    const { expenseName, expenseAmount } = req.body;
    const expenseMonthly = true;
    const userId = req.id;
    
    // Note: need integration with DB
    // const expense = new Expense({
    //     userId,
    //     expenseName,
    //     expenseAmount,
    //     expenseMonthly
    // });

    // await expense.save();

    // res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create expense record
const createExpense = async (req, res) => {
    try {
        const { expenseName, expenseAmount } = req.body;
        const expenseMonthly = false;
        const userId = req.id;
        
        // Note: need integration with DB
        // const expense = new Expense({
        //     userId,
        //     expenseName,
        //     expenseAmount,
        //     expenseMonthly
        // });
    
        // await expense.save();
    
        // res.json(expense);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

// Get expense records for the user
const getExpense = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user

    const expense = await Expense.find({ user_id: userId });

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update expense record
const updateExpense = async (req, res) => {
  try {
    const userId = req.id; // Get the user ID from the authenticated user
    const { expenseName, expenseAmount } = req.body;

    // Note: need integration with DB
    // const expense = await Expense.findOne({ user_id: userId, expenseName: expenseName, expenseAmount:expenseAmount});

    // if (!expense) {
    //   return res.status(404).json({ msg: 'Expense record not found' });
    // }

    // expense.expense_name = expenseName;
    // expense.expense_amount = expenseAmount;

    // await expense.save();

    // res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete expense record
const deleteExpense = async (req, res) => {
  try {
    const userId = req.id; // Get the user ID from the authenticated user
    const { expenseName, expenseAmount } = req.body;

    // Note: need DB integration
    // const expense = await Expense.findOne({ user_id: userId, expenseName: expenseName, expenseAmount:expenseAmount});

    // if (!expense) {
    //   return res.status(404).json({ msg: 'Expense record not found' });
    // }

    // await expense.remove();

    // res.json({ msg: 'Expense record removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
    createMonthlyExpense,
    createExpense,
    getExpense,
    updateExpense,
    deleteExpense,
};
