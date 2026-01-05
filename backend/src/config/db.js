const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL || process.env.MONGO_LOCAL_URL;
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1); // stop the program because something went wrong!
  }
};

module.exports = connectDB;
