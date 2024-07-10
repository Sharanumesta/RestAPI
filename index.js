const express = require('express');
const bodyParcer = require('body-parser');
const { connectDb } = require('./db');
const {create, read, update, deleted} = require('./routs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParcer.json());

app.post('/api/students', create );

app.get('/api/students', read );

app.put("/api/students/", update);

app.delete('/api/students', deleted);

connectDb().then(() => {
  app.listen(PORT, () => {
      console.log("Server is Started....");
  });
})