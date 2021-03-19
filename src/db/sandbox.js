// connect and create db with mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/sandbox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connecting to db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // setting up schema with one property
  const kittySchema = new mongoose.Schema({
    name: String,
  });

  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  // Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:
  kittySchema.methods.speak = function () {
    const greeting = this.name
      ? 'Meow name is ' + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  // compiling schema into a model
  const Kitten = mongoose.model('Kitten', kittySchema);

  // instantiating model
  const silence = new Kitten({
    name: 'Silence',
  });

  const fluffy = new Kitten({ name: 'Fluffy' });

  /*
    console.log(silence.name);
    silence.speak();
    */

  // Each document can be saved to the database by calling its save method. The first argument to the callback will be an error if any occurred.
  silence.save((err, silence) => {
    if (err) return console.log(err);
    // silence.speak();
  });

  fluffy.save((err, fluffy) => {
    if (err) return console.log(err);
    // silence.speak();
  });

  // loggin all kittens from db to console
  Kitten.find((err, kittens) => {
    if (err) return console.log(err);
    console.log(kittens);
    kittens.forEach((kitten) => {
      console.log(kitten.speak());
    });
  });
});
