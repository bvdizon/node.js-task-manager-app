// express server setup
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// db connection and models
require('./src/db/mongoose');
const User = require('./src/models/user');

app.use(express.json());

app.post('/users', (req, res) => {
  console.log(req.body);

  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
