// connect to db via mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/challenge1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create model
const Task = mongoose.model('Task', {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

// instantiating model
const task1 = new Task({
  description: 'The quick brown fox jumped over the lazy dogs.',
  completed: false,
});

// saving to db
task1
  .save()
  .then((result) => console.log('New task saved to db.'))
  .catch((err) => console.log('Cannot save task in db.', err));
