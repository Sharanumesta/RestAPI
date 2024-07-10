const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Student');
        console.log("mongoDB is connected"); 
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

const studentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true 
    },
    usn: { 
        type: String, 
        required: true,
        unique: true,
        trim: true 
    },
    age: { 
        type: Number, 
        min: 1, 
        max: 100 
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'], 
        required: true 
    }
}, {
        versionKey: false
    }
);

const Students = mongoose.model('Students', studentSchema);

module.exports = { Students, connectDb};