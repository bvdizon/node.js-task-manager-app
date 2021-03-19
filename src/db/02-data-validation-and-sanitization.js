// connect to db via mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/challenge1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// node package
const validator = require('validator');

// create model
const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true, // making sure to require a value
    trim: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid.');
      }
    },
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

// instantiating model
const task1 = new Task({
  description: 'The quick brown fox jumped over the lazy dogs.',
  completed: false,
  count: 2,
  email: 'BVDIZON@gmail.com',
});

// saving to db
task1
  .save()
  .then((result) => console.log('New task saved to db.', result))
  .catch((err) => console.log(err.message));
