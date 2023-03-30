const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const order = mongoose.model("Order", orderSchema);
module.exports = order;
