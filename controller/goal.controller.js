const Goal = require("../model/Goal");

// Create goal record
const createGoal = async (req, res) =>{
    try{
        const userID = req.id;
        const { goalName, goalDescription, goalAmount, savingsAmount, savingsDuration, goalPercentage} =
            req.body;

        const goal = new Goal({
            userID,
            goalName,
            goalDescription,
            goalAmount,
            savingsAmount,
            savingsDuration,
            goalPercentage,
        });

        await goal.save();

        res.status(201).json({ success: true, data: goal });
    } catch (err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

//Get goal record for the user
const getGoal = async (req, res) =>{
    try{
        const userID = req.id;
        const goal = await Goal.findOne({ userID });

        if (!goal) {
            return res.status(404).json({ success: false, message: "Goal not found" });
          }

        res.status(200).json({ success: true, data: goal });
    } catch (err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Update goal record
const updateGoal = async (req, res) =>{
    try{
        const { goalName, goalDescription, goalAmount, savingsAmount, savingsDuration, goalPercentage } =
        req.body;
        const userID = req.id;

        let goal = await Goal.findOne({ userID });

        if (!goal) {
        return res.status(404).json({ success: false, message: "Goal not found" });
        }

        goal.goalName = goalName;
        goal.goalDescription = goalDescription;
        goal.goalAmount = goalAmount;
        goal.savingsAmount = savingsAmount;
        goal.savingsDuration = savingsDuration;
        goal.goalPercentage = goalPercentage;
    } catch (err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Delete goal record
const deleteGoal = async (req, res) =>{
    try{
        const userID = req.id;
        const goal = await Goal.findOne({ userID });

        if (!goal) {
        return res.status(404).json({ success: false, message: "Goal not found" });
        }

        await goal.remove();

        res.status(200).json({ success: true, message: "Goal deleted" });
    } catch (err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = {
    createGoal,
    getGoal,
    updateGoal,
    deleteGoal,
};