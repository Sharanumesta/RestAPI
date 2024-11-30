const mongoose = require("mongoose");

const connectDb = async () => {
  console.log(process.env.MONGODB_URI);
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log(`💻 MONGODB CONNECTER !! DB HOST: ${connectionInstance.connection.host}`);
    // await mongoose.connect('mongodb://localhost:27017/Student');
  } catch (error) {
    console.log("MONGODB connection error :", error);
    process.exit(1);
  }
};

module.exports = connectDb;