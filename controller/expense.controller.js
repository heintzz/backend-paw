// Note: need integration with DB
// const Expense = require('../models/expense');

// Create expense record
const createExpense = async (req, res) => {
    try {
        const { expenseName, expenseAmount, expenseCategory, expenseMonthly} = req.body;
        const userId = req.id;
        
        // Note: need integration with DB
        // const expense = new Expense({
        //     userId,
        //     expenseName,
        //     expenseAmount,
        //     expenseCategory,
        //     expenseMonthly
        // });
    
        // await expense.save();
    
        // res.status(201).json({ success: true, data: expense });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

// Get expense records for the user
const getExpense = async (req, res) => {
  try {
    const userId = req.id; // Get the user ID from the authenticated user

    const expense = await Expense.find({userId});

    res.status(200).json({ success: true, data: expense });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update expense record
const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id; 
    const { expenseName, expenseAmount, expenseCategory} = req.body;

    // Note: need integration with DB
    // const expense = await Expense.findOne({ _id: expenseId});

    // if (!expense) {
    //   return res.status(404).json({ msg: 'Expense record not found' });
    // }

    // expense.expenseName = expenseName;
    // expense.expenseAmount = expenseAmount;
    // expense.expenseCategory = expenseCategory;

    // await expense.save();

    // res.status(200).json({ success: true, data: expense });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete expense record
const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id; 

    // Note: need integration with DB
    // const expense = await Expense.findOne({ _id: expenseId});

    // if (!expense) {
    //   return res.status(404).json({ msg: 'Expense record not found' });
    // }

    // await expense.remove();

    // res.status(200).json({ success: true, data: 'Expense record removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
    createExpense,
    getExpense,
    updateExpense,
    deleteExpense,
};
