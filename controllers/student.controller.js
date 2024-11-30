const { Student } = require("../models/student.model.js");

const create = async (req, res) => {
  try {
    const studentData = req.body;
    await Student.create(studentData);
    res.status(201).json({ message: "Student data saves successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const read = async (req, res) => {
  try {
    const { usn } = req.query;
    const studentData = await Student.findOne({ usn: usn }, { _id: 0 });

    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(studentData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = req.body;
    const usn = data.usn;

    const studentData = await Student.findOne({ usn: usn });
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.findOneAndUpdate(
      { usn: usn },
      {
        $set: {
          name: data.name,
          age: data.age,
          gender: data.gender,
        },
      }
    );
    res.status(201).json({ message: "Student data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleted = async (req, res) => {
  try {
    const { usn } = req.query;
    console.log(usn)
    const deleteStudent = await Student.deleteOne({ usn: usn });

    if (deleteStudent.deletedCount === 0) {
      console.log("Student not found:", usn);
      return res.status(404).json({ message: "Student not found" });
    }

    console.log("Student data deleted successfully");
    return res
      .status(200)
      .json({ message: "Student data deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, read, update, deleted };
