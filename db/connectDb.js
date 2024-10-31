const mongoose = require('mongoose');

const connectDb = async(req, res) => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Student');
        console.log("Database connection successfully");
    } catch (error) {
        res.status(400).json({message: "Database connection Failed"});
    }
}

module.exports = connectDb;