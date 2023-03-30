const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const location = mongoose.model("Location", locationSchema);
module.exports = location;
