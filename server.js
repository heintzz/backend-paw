const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// Connect income and expenditure routes
app.use('/income', require('./routes/income'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
