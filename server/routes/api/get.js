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
apiGet.get(
  "/api/get/teachers/getCountsPerAgeOfMaleTeachersAndSortInDESC",
  async (req, res) => {
    const Teachers = await Teacher.aggregate([
      { $match: { gender: "male" } },
      { $group: { _id: "$age", numberOfTeachers: { $sum: 1 } } },
      { $sort: { numberOfTeachers: -1 } },
    ]);
    res.json({ Teachers });
  }
);
apiGet.get(
  "/api/get/teachers/getMaxCountsPerAgeOfMaleTeachersAndSortInDESC",
  async (req, res) => {
    const Teachers = await Teacher.aggregate([
      { $match: { gender: "male" } },
      { $group: { _id: "$age", numberOfTeachers: { $sum: 1 } } },
      { $sort: { numberOfTeachers: -1 } },
      {
        $group: {
          _id: null,
          maxNumberInAgeGroup: { $max: "$numberOfTeachers" },
        },
      },
    ]);
    res.json({ Teachers });
  }
);
// sum of ages in each age group
apiGet.get("/api/get/teachers/sumOfAgesInEachAgeGroup", async (req, res) => {
  const sumOfAges = await Teacher.aggregate([
    {
      $group: {
        _id: "$age",
        sumOfAges: { $sum: { $toDouble: "$age" } },
      },
    },
  ]);
  res.json({
    sumOfAges,
  });
});
// students

// find hobbies per age group
module.exports = apiGet;
