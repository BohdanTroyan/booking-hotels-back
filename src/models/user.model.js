const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  login: String,
  password: String,
  balance: Number,
});

module.exports = mongoose.model("User", UserSchema);
