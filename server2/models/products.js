const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const product = mongoose.model("Product", productSchema);
module.exports = product;
