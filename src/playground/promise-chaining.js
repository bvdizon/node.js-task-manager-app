require('../db/mongoose');
const User = require('../models/user');

// 6054e343496a7931dcc1b1d3

User.findByIdAndUpdate('6054e343496a7931dcc1b1d3', {
  email: 'updated@gmail.com',
  age: 37,
})
  .then((user) => {
    console.log(user);
    return User.countDocuments({ email: 'bvdizon@gmail.com' });
  })
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });
