// importing User model
const User = require('../models/user.js');

// connecting to db
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/task-manager-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const me = new User({
//   name: 'budoy dizon',
//   email: 'brianvictoriadizon@gmail.com',
//   password: 'Bvd021584',
// });

// me.save()
//   .then((result) => console.log('New user added.'))
//   .catch((error) => console.log(error.message));
