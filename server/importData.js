const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Data = require("./models/DataModel");
const fs = require("fs");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    importData();
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

const importData = async () => {
  try {
    const jsonData = JSON.parse(fs.readFileSync("jsondata.json", "utf-8"));
    await Data.insertMany(jsonData);
    console.log("Data Imported Successfully");
    process.exit();
  } catch (err) {
    console.error("Error importing data:", err);
    process.exit(1);
  }
};
