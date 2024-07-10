const { Students } = require('./db');

const create = async (req, res) => {
    try {
      const studentData = req.body;
      const student = new Students(studentData);
      await student.save();
      res.status(201).json({ message : "Student data saves successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const read = async (req, res) => {
    try {
      const usn = req.query.usn;
      const studentData = await Students.findOne({usn:usn});
  
      if (!studentData) {
        return res.status(404).json({ message: "Student not found" });
      }
      
      res.status(200).json({studentData});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const update = async (req, res) => {
    try{
      const data = req.body;
      const usn = data.usn;
      console.log(data.usn);

      const studentData = await Students.findOne({usn:usn});
      if (!studentData) {
        return res.status(404).json({ message: "Student not found" });
      }

      const updateStudent = await Students.findOneAndUpdate({usn:usn},{
        $set: {
          name: data.name,
          usn: data.usn,
          age: data.age,
          gender: data.gender
        }
      })
      res.status(201).json({message: "Student data updated successfully"});
    }catch(error){
      res.status(500).json({ message: error.message });
    }
};

const deleted = async (req, res) => {
    try {
        const usn = req.query.usn;
        const deleteStudent = await Students.deleteOne({ usn: usn });
  
        if (deleteStudent.deletedCount === 0) {
            console.log("Student not found:", usn);
            return res.status(404).json({ message: "Student not found" });
        }
  
        console.log("Student data deleted successfully");
        return res.status(201);
  
    } catch (error) {
        console.error("Error deleting student:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {create, read, update, deleted};