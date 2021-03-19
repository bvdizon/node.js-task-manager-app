// express server setup
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// db connection and models
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

// converts incoming json to object
app.use(express.json());

// endpoint for creating users
app.post('/users', (req, res) => {
  const user = new User(req.body);
  // saving new user to db
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

// endpoint for creating tasks
app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  // saving new task to db
  task
    .save()
    .then(() => res.status(201).send(task))
    .catch((error) => res.status(400).send(error.message));
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
