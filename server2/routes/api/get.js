const express = require("express");
const apiGet = express.Router();

const User = require("../../models/users");
const Product = require("../../models/products");
const Order = require("../../models/orders");

// Question # 1
// get list of all orders in the possible manner

apiGet.get("/api/orders/get", async (req, res) => {
  const ordersList = await Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $project: {
        productName: "$product.name",
        productPrice: "$product.price",
        quantity: "$quantity",
        userName: "$user.name",
        userAddress: "$user.location",
      },
    },
  ]);
  res.json({ ordersList });
});

// Question # 02
// get location wise orders

apiGet.get("/api/orders/get/locationWiseOrder", async (req, res) => {
  const orders = await Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $group: { _id: "$user.location", orderList: { $push: "$$ROOT" } },
    },
  ]);
  res.json({
    orders,
  });
});

module.exports = apiGet;
