const mongoose = require("mongoose");
PORT = 5000;
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB CONNECTED");
  } catch (err) {
    console.log("errs", err);
  }
};
module.exports = dbConnect;
