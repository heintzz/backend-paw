require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const connectToDB = require("./config/dbConnection");
const cronScheduler = require("./config/cronScheduler");
const port = process.env.PORT || 4000;
const cors = require("cors");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");

app.use(morgan(":method :url :status - :response-time ms"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(credentials);
app.use(cors(corsOptions));

app.use("/auth", require("./routes/auth"));
app.use("/income", require("./routes/income.js"));
app.use("/expense", require("./routes/expense"));
app.use("/summary", require("./routes/summary"));
app.use("/goal", require("./routes/goal"));
app.use("/tracker", require("./routes/tracker"));

connectToDB().then(() => {
  app.listen(port, () => {
    console.log("listening for requests");
    cronScheduler();
  });
});
