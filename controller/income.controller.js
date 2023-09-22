// Note: need integration with DB
// const Income = require('../models/income');

// Create monhtly income record
const createMonthlyIncome = async (req, res) => {
  try {
    const { incomeName, incomeAmount } = req.body;
    const incomeMonthly = true;
    const userId = req.id; // Get the user ID from the authenticated user

    // Note : need integration with DB
    // const income = new Income({
    //   user: userId,
    //   incomeName,
    //   incomeAmount,
    //   incomeMonthly
    // });

    // await income.save();

    // res.json(income);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create income record
const createIncome = async (req, res) => {
    try {
      const { incomeName, incomeAmount } = req.body;
      const incomeMonthly = false;
      const userId = req.id; // Get the user ID from the authenticated user
  
      // Note : need integration with DB
      // const income = new Income({
      //   user: userId,
      //   incomeName,
      //   incomeAmount,
      //   incomeMonthly
      // });
  
      // await income.save();
  
      // res.json(income);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};

// Get income records for the user
const getIncome = async (req, res) => {
    try {
        const userId = req.id; // Get the user ID from the authenticated user
        
        // Note: need integration with DB
        // const income = await Income.find({ user: userId });
    
        // if (!income) {
        //     return res.status(404).json({ msg: 'Income record not found' });
        // }
    
        // res.json(income);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
  
// Update income record
const updateIncome = async (req, res) => {
    try {
        const userId = req.id; // Get the user ID from the authenticated user
        const { incomeName, incomeAmount } = req.body;

        // Note: need integration with DB
        // const income = await Income.findOne({ user: userId, incomeName: incomeName, incomeAmount:incomeAmount});

        // if (!income) {
        //     return res.status(404).json({ msg: 'Income record not found' });
        // }

        // income.incomeName = incomeName;
        // income.incomeAmount = incomeAmount;

        // await income.save();

        // res.json(income);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete income record
const deleteIncome = async (req, res) => {
    try {
        const userId = req.id; // Get the user ID from the authenticated user

        // Note: Need integration with DB
        // const income = await Income.findOne({ user: userId, incomeName: incomeName, incomeAmount:incomeAmount});

        // if (!income) {
        // return res.status(404).json({ msg: 'Income record not found' });
        // }

        // await income.remove();

        // res.json({ msg: 'Income record removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createMonthlyIncome,
    createIncome,
    getIncome,
    updateIncome,
    deleteIncome,
};