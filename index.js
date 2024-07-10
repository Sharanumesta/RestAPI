const express = require('express');
const bodyParcer = require('body-parser');
const { Students, connectDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParcer.json());

app.post('/api/students', async (req, res) => {
    try {
      const studentData = req.body;
      const student = new Students(studentData);
      await student.save();
      res.status(201).json({ message : "Student data saves successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

app.get('/api/students', async (req, res) => {
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
});

app.put("/api/students/", async (req, res) => {
  try{
    const data = req.body;
    const usn = data.usn;
    const updateStudent = await Students.findOneAndUpdate({usn:usn},{
      $set: {
        name: data.name,
        usn: data.usn,
        age: data.age,
        gender: data.gender
      }
    })
    console.log(updateStudent)
    res.status(201).json({message: "Student data updated successfully"});
  }catch(error){
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/students', async (req, res) => {
  try {
      const usn = req.query.usn;
      const deleteStudent = await Students.deleteOne({ usn: usn });

      if (deleteStudent.deletedCount === 0) {
          console.log("Student not found:", usn);
          return res.status(404).json({ message: "Student not found" });
      }

      console.log("Student data deleted successfully");
      res.status(204);

  } catch (error) {
      console.error("Error deleting student:", error.message);
      res.status(500).json({ error: error.message });
  }
});

connectDb().then(() => {
  app.listen(PORT, () => {
      console.log("Server is Started....");
  });
})