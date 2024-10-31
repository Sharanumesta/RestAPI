const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    usn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 100,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "male", "female", "other"],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
