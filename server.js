const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
