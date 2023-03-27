const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
