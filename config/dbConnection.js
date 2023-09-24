const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.DATABASE_URL;

const connectToDB = async () => {
  try {
    const res = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (res) {
      console.log("connected to MongoDB");
    }
  } catch (error) {
    console.log("error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToDB;
