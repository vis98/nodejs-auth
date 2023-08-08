// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  displayName: String,
  loginMethod: String,
  email:String,
  password:String
});

module.exports = mongoose.model('User', userSchema);
