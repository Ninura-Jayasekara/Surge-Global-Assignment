// const mongoose = require('mongoose');
// const db = require('./db')
// mongoose.connect(db);

// const User = require('./models/userModel');

// User.collection.drop();
// Event.collection.drop();

// // Hash password
// const salt = await bcrypt.genSalt(10)
// const hashedPassword = await bcrypt.hash(process.env.PASSWORD, salt)


// User.create([{
//   'email':process.env.EMAIL,
//   'password' : process.env.hashedPassword,
//   'accountType':"admin"
// }])
// .then(user => {
//   console.log(`${user.length} admin created`);
// })
// .catch((err) => {
//   console.log(err);
// })
// .finally(() => {
//   mongoose.connection.close();
// });