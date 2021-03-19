// connecting to database 'test' ( if none exists, mongodb will create one )
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test-mongoose', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// With Mongoose, everything is derived from a Schema, then
// compiling our schema into a Model.
// A model is a class with which we construct documents.
const User = mongoose.model('User', {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

// creating a new instance from a model
// each document will be a User with properties and behaviors as declared in our schema.
const me = new User({
  name: 'Brian Dizon',
  age: 37,
});

// Each document can be saved to the database by calling its save method
// The first argument to the callback will be an error if any occurred.
// Below, we use then-catch as .save() returns a Promise
me.save()
  .then((me) => {
    console.log(me);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });
