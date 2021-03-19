require('../db/mongoose');
const Task = require('../models/task');

const deleteTaskAndCount = async (id) => {
  const taskToDelete = await Task.findByIdAndDelete(id);
  const incompleteTasks = await Task.countDocuments({ completed: false });
  return { taskToDelete, incompleteTasks };
};

deleteTaskAndCount('6054e97abdd9611d5406e7f9')
  .then((data) => {
    const { incompleteTasks: count } = data;
    console.log(`Total incomplete tasks: ${count}`);
  })
  .catch((err) => console.log(`Error: ${err}`));
