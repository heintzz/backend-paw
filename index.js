require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectToDB = require("./config/dbConnection.js");
const cronScheduler = require("./config/cronScheduler.js");
const port = process.env.PORT || 4000;
const cors = require("cors");
const credentials = require("./middleware/credentials.js");
const corsOptions = require("./config/corsOptions.js");

app.use(morgan(":method :url :status - :response-time ms"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(credentials);
app.use(cors(corsOptions));

app.use("/auth", require("./routes/auth.js"));
app.use("/income", require("./routes/income.js"));
app.use("/expense", require("./routes/expense.js"));
app.use("/summary", require("./routes/summary.js"));
app.use("/goal", require("./routes/goal.js"));
app.use("/tracker", require("./routes/tracker.js"));

connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`listening for requests on port: ${port}`);
    cronScheduler();
  });
});
