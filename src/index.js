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

// endpoint for getting ( reading ) users from mongoDB
app.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// endpoint for getting ( reading ) one user from mongoDB
app.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("Can't find user with that ID.");
      }
      res.send(user);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

// endpoint for fetching tasks
app.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.status(202).send(tasks);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

// endpoint for fetching a single task by ID
app.get('/tasks/:id', (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      if (!task) {
        return res.status(404).send("Can't find a task with that ID.");
      }
      res.status(202).send(task);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

// listening for changes at port specified
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
