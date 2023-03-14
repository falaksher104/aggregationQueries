const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("Teacher", teacherSchema);

module.exports = user;
