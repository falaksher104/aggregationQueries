const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let usersSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  emailAddress: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
});

const user = mongoose.model("User", usersSchema);

module.exports = user;
