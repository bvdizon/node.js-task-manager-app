require('../db/mongoose');
const User = require('../models/user');

const updateAgeAndShowCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return { user, count };
};

updateAgeAndShowCount('6054e4a4ab95852ba0743b9c', 37)
  .then((data) => {
    const { user, count } = data;
    console.log(count);
    console.log(user);
  })
  .catch((error) => console.log('Error: ', error));
