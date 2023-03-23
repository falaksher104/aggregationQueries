const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let scoresSchema = new Schema({
  classId: {
    type: Number,
    required: true,
  },
  studentId: {
    type: Number,
    required: true,
  },
  scores: {
    type: Array,
    required: true,
  },
});

const student = mongoose.model("Score", scoresSchema);

module.exports = student;
