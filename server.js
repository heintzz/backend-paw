require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const connectToDB = require("./config/dbConnection");
const port = process.env.PORT || 3000;

connectToDB();

app.use(morgan(":method :url :status - :response-time ms"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
});