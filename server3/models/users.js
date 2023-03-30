const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let userSchema = new Schema({
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
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
