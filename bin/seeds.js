// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/repaso-roles', {useNewUrlParser: true})
  .then(x => {
    mongoose.connection.db.dropDatabase() // Aquí borramos la base de datos antes de crear los usuarios
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "Fan",
    password: bcrypt.hashSync("fan", bcrypt.genSaltSync(bcryptSalt)),
    role: "Fan"
  },
  {
    username: "Backliner",
    password: bcrypt.hashSync("backliner", bcrypt.genSaltSync(bcryptSalt)),
    role: "Backliner"
  },
  {
    username: "Artist",
    password: bcrypt.hashSync("artist", bcrypt.genSaltSync(bcryptSalt)),
    role: "Artist"
  },
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})