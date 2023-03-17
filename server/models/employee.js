const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let employeeSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("Employee", employeeSchema);

module.exports = user;
