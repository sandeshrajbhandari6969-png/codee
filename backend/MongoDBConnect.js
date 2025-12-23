const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/FashionDB";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;
