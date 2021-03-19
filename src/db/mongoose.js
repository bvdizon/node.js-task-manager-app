// importing User model
const User = require('../models/user.js');

// connecting to db
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/task-manager-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
