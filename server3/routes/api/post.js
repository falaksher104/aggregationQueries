const express = require("express");
const Location = require("../../models/locations");
const User = require("../../models/users");
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
        $or: [
          { area: { $regex: string, $options: "i" } },
          { city: { $regex: string, $options: "i" } },
          { district: { $regex: string, $options: "i" } },
          { country: { $regex: string, $options: "i" } },
        ],
      },
    },
  ]);
  res.json({ locations });
});

apiPost.post("/api/server3/user/new", async (req, res) => {
  const { name, emailAddress, locationId } = req.body;
  const user = await User.create({
    name,
    emailAddress,
    locationId,
  });
  res.json({ user });
});

module.exports = apiPost;
