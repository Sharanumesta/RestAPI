const express = require('express');
const bodyParcer = require('body-parser');
const connectDb = require('./db/connectDb.js');
const studentsRoutes = require('./routes/student.route.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParcer.json());

app.use("/api/v1/students", studentsRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
      console.log("Server is Started....");
  });
})