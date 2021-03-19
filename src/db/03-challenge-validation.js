// connect to db
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/validation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create a model
const Password = mongoose.model('Password', {
  pass: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (value.length < 6) {
        throw new Error('Password must be 6 characters or more.');
      }

      if (value.toLowerCase().includes('password')) {
        throw new Error('Password must not contain the word "password" ');
      }
    },
  },
});

// instantiate model
const pw = new Password({ pass: '   123456PASSword' });

// save to db
pw.save()
  .then((result) => console.log('Password saved ', result))
  .catch((error) => console.log(error.message));
