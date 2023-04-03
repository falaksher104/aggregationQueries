const express = require("express");
const mongoose = require("mongoose");
const apiGet = express.Router();
const Location = require("../../models/locations");
const User = require("../../models/users");

apiGet.get("/api/server3/getlocation/areaDistrictWise", async (req, res) => {
  const location = await Location.aggregate([
    {
      $group: {
        _id: "$district",
        locations: { $push: "$$ROOT" },
      },
    },
  ]);
  res.json({ location });
});

apiGet.get("/api/server3/get/users", async (req, res) => {
  const users = await User.aggregate([
    {
      $lookup: {
        from: "locations",
        localField: "locationId",
        foreignField: "_id",
        as: "location",
      },
    },
    {
      $group: {
        _id: "$location._id",
        data: { $push: "$$ROOT" },
      },
    },
  ]);
  res.json({ users });
});

// area wise get users

apiGet.get("/api/server3/get/users/areaWise", async (req, res) => {
  const areaWiseUsers = await User.aggregate([
    {
      $lookup: {
        from: "locations",
        localField: "locationId",
        foreignField: "_id",
        as: "location",
      },
    },
    {
      $match: { "location.area": "Madina Town" },
    },
  ]);

  res.json({ areaWiseUsers });
});

module.exports = apiGet;
