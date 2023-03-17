const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  hobbies: {
    type: Array,
    required: true,
  },
  hasMacBook: {
    type: Boolean,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  experience: {
    type: Array,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const student = mongoose.model("Student", studentSchema);

module.exports = student;
