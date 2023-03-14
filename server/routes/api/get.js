const express = require("express");
const apiGet = express.Router();
const Teacher = require("../../models/teachers");

apiGet.get("/api/get/teachers/male", async (req, res) => {
  const maleTeachers = await Teacher.aggregate([
    { $match: { gender: "male" } },
  ]);
  res.json({ maleTeachers });
});
//group teachers by age
// and show all teacher  names group by age

apiGet.get("/api/get/teachers/groupTeachersByAge", async (req, res) => {
  const Teachers = await Teacher.aggregate([
    { $group: { _id: "$age", names: { $push: "$name" } } },
  ]);
  res.json({ Teachers });
});

// group teachers by age and also show complete document per age group
apiGet.get("/api/get/teachers/groupAllTeachersDataByAge", async (req, res) => {
  const Teachers = await Teacher.aggregate([
    { $group: { _id: "$age", names: { $push: "$$ROOT" } } },
  ]);
  res.json({ Teachers });
});

// give a count per age of male teachers
apiGet.get(
  "/api/get/teachers/getCountPerAgeOfMaleTeachers",
  async (req, res) => {
    const Teachers = await Teacher.aggregate([
      { $match: { gender: "male" } },
      { $group: { _id: "$age", count: { $sum: 1 } } },
    ]);
    res.json({ Teachers });
  }
);
module.exports = apiGet;
