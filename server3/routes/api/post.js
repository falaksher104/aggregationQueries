const express = require("express");
const Location = require("../../models/locations");
const apiPost = express.Router();

apiPost.post("/api/server3/location/new", async (req, res) => {
  const { area, city, district, country } = req.body;
  const location = await Location.create({
    area,
    city,
    district,
    country,
  });
  res.json({ location });
});

apiPost.post("/api/server3/location/search", async (req, res) => {
  const { string } = req.body;
  const locations = await Location.aggregate([
    {
      $match: {
        $or: [],
      },
    },
  ]);
});

module.exports = apiPost;
