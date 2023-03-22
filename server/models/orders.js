const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ordersSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("Order", ordersSchema);

module.exports = user;
