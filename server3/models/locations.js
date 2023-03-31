const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let locationSchema = new Schema({
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const location = mongoose.model("Location", locationSchema);
module.exports = location;
