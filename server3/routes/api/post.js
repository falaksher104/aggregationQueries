const express = require("express");
const apiPost = express.Router();
const User = require("../../models/users");
const Product = require("../../models/products");
const Order = require("../../models/orders");

apiPost.post("/api/user/new", async (req, res) => {
  const { name, emailAddress, location, gender } = req.body;
  const user = await User.create({
    name,
    emailAddress,
    location,
    gender,
  });
  res.json({ success: true, user });
});

apiPost.post("/api/product/new", async (req, res) => {
  const { name, category, price } = req.body;
  const product = await Product.create({
    name,
    category,
    price,
  });
  res.json({ success: true, product });
});

apiPost.post("/api/order/new", async (req, res) => {
  const { userId, productId, quantity, status } = req.body;
  const order = await Order.create({
    userId,
    productId,
    quantity,
    status,
  });
  res.json({ success: true, order });
});

module.exports = apiPost;
