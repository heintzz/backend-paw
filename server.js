require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const connectToDB = require("./config/dbConnection");
const cronScheduler = require("./config/cronScheduler");
const port = process.env.PORT || 3000;

connectToDB();
cronScheduler();

app.use(morgan(":method :url :status - :response-time ms"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/income", require("./routes/income.js"));
app.use("/expense", require("./routes/expense"));
app.use("/summary", require("./routes/summary"));
app.use("/goal", require("./routes/goal"));

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
});
