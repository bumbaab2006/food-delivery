const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Bumbayar:Pi06252311@food-delivery.bhwicih.mongodb.net/"
    );
    console.log("Database connection succees");
  } catch (err) {
    console.log("Database connection failed", err);
  }
};
module.exports = connectToDB;
