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

/**
 * Refactoring express routes with:
 *  -> try-catch and
 *  -> async-await
 */

// endpoint for creating users
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// endpoint for creating tasks
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// endpoint for getting ( reading ) users from mongoDB
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// endpoint for getting ( reading ) one user from mongoDB
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("Can't find a user with that ID.");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// endpoint for fetching tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(202).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// endpoint for fetching a single task by ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res.status(404).send("You don't have a task with that ID.");
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// listening for changes at port specified
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
