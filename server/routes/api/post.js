const express = require("express");
const apiPost = express.Router();
const Teacher = require("../../models/teachers");
apiPost.post("/api/teachers/new", async (req, res) => {
  const { name, age, gender } = req.body;
  const teacher = await Teacher.create({
    name,
    age,
    gender,
  });
  res.json({ success: teacher });
});
module.exports = apiPost;
