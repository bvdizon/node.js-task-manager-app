// required modules
const mongoose = require('mongoose');
const validator = require('validator');

// model - User
const User = mongoose.model('User', {
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Please provide a valid email.');
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minLength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password must not include the phrase "password"');
      }
    },
  },
});

const me = new User({
  name: 'Brian Dizon',
  email: 'bvdizon@gmail.com',
  password: ';asdnfaiosdfPasssword',
});

module.exports = User;
