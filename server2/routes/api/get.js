const express = require("express");
const mongoose = require("mongoose");
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
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $group: { _id: "$user.location", orderList: { $push: "$$ROOT" } },
    },
    {
      $project: {
        _id: 0,
        location: "$_id",
        orderList: 1,
        userName: "$orderList.user.name",
        userEmailAddress: "$orderList.user.emailAddress",
        productName: "$orderList.product.name",
        productPrice: "$orderList.product.price",
        productQuantity: "$orderList.quantity",
      },
    },
  ]);
  res.json({
    orders,
  });
});

// Question # 03
// get quantity wise orders (asending order)

apiGet.get("/api/orders/get/quantityWiseOrder", async (req, res) => {
  const quantityWiseOrder = await Order.aggregate([
    {
      $sort: { quantity: 1 },
    },
  ]);
  res.json({ quantityWiseOrder });
});

// Question # 04
// get single user orders

apiGet.get("/api/orders/get/userOrders", async (req, res) => {
  const singleUserOrders = await Order.aggregate([
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
      $match: { userId: mongoose.Types.ObjectId("6420265b953b5615dce4b81c") },
    },
    {
      $project: {
        _id: 0,
        location: "$_id",
        orderList: 1,
        userName: "$user.name",
        userEmailAddress: "$user.emailAddress",
        productName: "$product.name",
        productPrice: "$product.price",
        productQuantity: "$quantity",
        totalPrice: {
          $multiply: ["$quantity", { $arrayElemAt: ["$product.price", 0] }],
        },
      },
    },
  ]);
  res.json({ singleUserOrders });
});

// Question # 05
// Get product minimum price to maximum price
apiGet.get("/api/orders/get/categoryWiseOrder", async (req, res) => {
  const categoryWiseOrders = await Order.aggregate([
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
      $group: {
        _id: "$product.category",
        orders: { $push: "$$ROOT" },
      },
    },
  ]);
  res.json({ categoryWiseOrders });
});
module.exports = apiGet;
