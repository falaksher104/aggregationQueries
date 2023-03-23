const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let furnitureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const user = mongoose.model("Furniture", furnitureSchema);

module.exports = user;
