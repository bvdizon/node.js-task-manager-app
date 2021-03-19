require('../db/mongoose');
const Task = require('../models/task');

// 6054e85f63042917984e5b4c

Task.findByIdAndDelete('6054e85f63042917984e5b4c')
  .then(() => {
    console.log('task is successfully deleted');
    return Task.countDocuments({ completed: false });
  })
  .then((incompleteTasks) => {
    console.log(incompleteTasks);
  })
  .catch((error) => {
    console.log(error.message);
  });
