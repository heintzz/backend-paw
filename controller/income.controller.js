// Note: need integration with DB
// const Income = require('../models/income');

// Create income record
const createIncome = async (req, res) => {
    try {
      const { incomeName, incomeAmount, incomeMonthly } = req.body;
      const userId = req.id; // Get the user ID from the authenticated user
  
      // Note : need integration with DB
      // const income = new Income({
      //   userId,
      //   incomeName,
      //   incomeAmount,
      //   incomeMonthly
      // });
  
      // await income.save();
  
      // res.status(201).json({ success: true, data: income });
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
        // const income = await Income.find({userId});
    
        // if (!income) {
        //     return res.status(404).json({ msg: 'Income record not found' });
        // }
    
        // res.status(200).json({ success: true, data: income });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
  
// Update income record
const updateIncome = async (req, res) => {
    try {
        const incomeId = req.params.id;
        const { incomeName, incomeAmount } = req.body;

        // Note: need integration with DB
        // const income = await Income.findOne({_id: incomeId});

        // if (!income) {
        //     return res.status(404).json({ msg: 'Income record not found' });
        // }

        // income.incomeName = incomeName;
        // income.incomeAmount = incomeAmount;

        // await income.save();

        // res.status(200).json({ success: true, data: income });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete income record
const deleteIncome = async (req, res) => {
    try {
        const incomeId = req.params.id; 

        // Note: Need integration with DB
        // const income = await Income.findOne({_id: incomeId});

        // if (!income) {
        // return res.status(404).json({ msg: 'Income record not found' });
        // }

        // await income.remove();

        // res.status(200).json({ success: true, data: 'Expense record removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createIncome,
    getIncome,
    updateIncome,
    deleteIncome,
};