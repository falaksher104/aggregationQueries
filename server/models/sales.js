const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let salesSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const user = mongoose.model("Sale", salesSchema);

module.exports = user;
